import React from "react";
import ReactDOM from "react-dom";
import Auth from "./Views/Login/Auth";

export const mount = (containerId, props) => {
  const { keycloakLogin, sessionIdCookie, uploadList } = props;

  ReactDOM.render(
    <Auth
      keycloakLogin={keycloakLogin}
      sessionIdCookie={sessionIdCookie}
      uploadList={uploadList}
      {...props}
    />,
    document.getElementById(containerId)
  );
};
