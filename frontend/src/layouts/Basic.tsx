import React from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useAppSelector } from "../store/store";

function Basic() {
  const { isAuthenticated } = useAppSelector((state) => state.auth);
  const navigation = useNavigate();
  React.useEffect(() => {
    if (isAuthenticated) {
      navigation("/");
    }
  }, [isAuthenticated]);
  return <Outlet />;
}

export default Basic;
