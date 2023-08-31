import jwtDecode from "jwt-decode";
import moment from "moment";
import Resizer from "react-image-file-resizer";
interface decode {
  id: string;
  name: string;
}
export const JWT_Decode = (token: string) => {
  const decode: decode = jwtDecode(token);
  return decode;
};

type ImageProps = {
  file: File;
  width: number;
  height: number;
  type: string;
};

export const Image_Compresser = (props: ImageProps): Promise<string> => {
  return new Promise<string>((resolve) => {
    Resizer.imageFileResizer(
      props.file,
      props.width, // desired width
      props.height, // desired height
      props.type, // output format
      80, // quality
      0, // rotation
      (uri: any) => {
        resolve(uri);
      },
      "file" // output type
    );
  });
};
export const BlobToFile = (
  blobUrl: string,
  fileName: string
): Promise<File> => {
  return fetch(blobUrl)
    .then((response) => response.blob())
    .then(
      (blobData) => new File([blobData], fileName, { type: blobData.type })
    );
};

export const formatTime = (time: string) => {
  const currentTime = time; // Convert to Indian Standard Time
  // const currentTime = moment.utc(time).utcOffset("+05:30"); // Convert to Indian Standard Time

  const duration = moment.duration(moment().diff(currentTime));

  if (duration.asHours() < 1) {
    return moment(currentTime).format("HH:mm");
  } else if (duration.asDays() < 1) {
    return `${Math.floor(duration.asHours())} h`;
  } else if (duration.asWeeks() < 1) {
    return `${Math.floor(duration.asDays())} d`;
  } else if (duration.asMonths() < 1) {
    return `${Math.floor(duration.asWeeks())} w`;
  } else if (duration.asYears() < 1) {
    return `${Math.floor(duration.asMonths())} m`;
  } else if (duration.asYears() > 1) {
    return `${Math.floor(duration.asYears())} y`;
  }
};

export const getImageDimensions = async (
  imageBase64: string
): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      resolve({ width: naturalWidth, height: naturalHeight });
    };
    img.onerror = () => {
      reject(new Error("Unable to load image"));
    };
    img.src = imageBase64;
  });
};

export const base64toFileWithDimensions =async (
  base64String: string,
  fileName: string,
  mimeType: string
): Promise<{ file: File; dimensions: { width: number; height: number } }> => {
  try {
    const arr = base64String.split(",");
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
    const blob = new Blob([u8arr], { type: mimeType });

    const dimensions = await getImageDimensions(base64String);

    const file = new File([blob], fileName, { type: mimeType });

    return { file, dimensions };
  } catch (error: any) {
    throw new Error("Error converting base64 to file: " + error.message);
  }
};
