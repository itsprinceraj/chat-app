declare module "*.svg" {
  import React from "react";
  export const ReactComponent: React.FC<React.SVGProps<SVGSVGElement>>;
  const src: string;
  export default src;
}

interface User {
  _id: string;
  name: string;
  email: string;
  active: boolean;
  role: "USER" | "ADMIN";
}

interface ApiResponse<T> {
  data: T;
  message: string;
  sucess: boolean
}