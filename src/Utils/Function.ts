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
