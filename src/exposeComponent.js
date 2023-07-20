import React from "react";
import ReactDOM from "react-dom";
import Auth from "./Views/Login/Auth";

export const mount = (containerId) => {
  ReactDOM.render(<Auth />, document.getElementById(containerId));
};
