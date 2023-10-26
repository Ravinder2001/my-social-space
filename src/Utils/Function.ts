import jwtDecode from "jwt-decode";
import moment from "moment";
import Resizer from "react-image-file-resizer";
import { Max_Server_Image_Upload_Size } from "./Constant";
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

export const Image_Compresser = async (props: ImageProps): Promise<File> => {
  if (props.file.size <= Max_Server_Image_Upload_Size * 1024 * 1024) {
    // If the image is 1 MB or smaller, no need to compress
    return props.file;
  }

  return new Promise<File>((resolve) => {
    Resizer.imageFileResizer(
      props.file,
      props.width, // desired width
      props.height, // desired height
      props.type, // output format
      60, // quality
      0, // rotation
      (uri: any) => {
        // Create a new File object from the compressed image data
        const compressedImageFile = new File([uri], props.file.name, {
          type: props.type, // Set the same type as the original file
        });

        resolve(compressedImageFile);
      },
      "file" // output type as base64
    );
  });
};

export const BlobToFile = (blobUrl: string, fileName: string): Promise<File> => {
  return fetch(blobUrl)
    .then((response) => response.blob())
    .then((blobData) => new File([blobData], fileName, { type: blobData.type }));
};

export const formatTime = (time: string) => {
  const currentTime = time; // Convert to Indian Standard Time
  // const currentTime = moment.utc(time).utcOffset("+05:30"); // Convert to Indian Standard Time

  const duration = moment.duration(moment().diff(currentTime));

  if (duration.asHours() < 1) {
    return "at" + " "+moment(currentTime).format("HH:mm");
  } else if (duration.asDays() < 1) {
    return `${Math.floor(duration.asHours())} h ago`;
  } else if (duration.asWeeks() < 1) {
    return `${Math.floor(duration.asDays())} d ago`;
  } else if (duration.asMonths() < 1) {
    return `${Math.floor(duration.asWeeks())} w ago`;
  } else if (duration.asYears() < 1) {
    return `${Math.floor(duration.asMonths())} m ago`;
  } else if (duration.asYears() > 1) {
    return `${Math.floor(duration.asYears())} y ago`;
  }
};

export const getImageDimensions = async (image: string | File): Promise<{ width: number; height: number }> => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => {
      const { naturalWidth, naturalHeight } = img;
      resolve({ width: naturalWidth, height: naturalHeight });
    };
    img.onerror = () => {
      reject(new Error("Unable to load image"));
    };

    if (typeof image === "string") {
      img.src = image; // If the input is a base64-encoded image
    } else if (image instanceof File) {
      const reader = new FileReader();
      reader.onload = () => {
        img.src = reader.result as string; // If the input is a File object
      };
      reader.onerror = () => {
        reject(new Error("Unable to read image file"));
      };
      reader.readAsDataURL(image);
    } else {
      reject(new Error("Invalid input type"));
    }
  });
};

export const base64toFileWithDimensions = async (
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
