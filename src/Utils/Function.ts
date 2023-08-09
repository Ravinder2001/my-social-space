import jwtDecode from "jwt-decode";
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
  type:string
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
      "file", // output type
    );
  });
};

