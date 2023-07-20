import jwtDecode from "jwt-decode";
interface decode {
  id: string;
  name: string;
}
export const JWT_Decode = (token: string) => {
  const decode: decode = jwtDecode(token);
  return decode;
};
