/*
 * Copyright (C) 2022-2023 Indoc Research
 *
 * Contact Indoc Research for any questions regarding the use of this source code.
 */
import namespace from "./namespace";
import { message } from "antd";
import _ from "lodash";
import i18n from "../i18n";
/**
 * Create a error message object to trigger the error message
 * @param {string} name the namespace of the API
 */

export default function ErrorMessager(name) {
  const _namespaces = {
    [namespace.login.auth]: {
      400: (err, params) => {
        message.error(i18n.t("errormessages:login.400.0"));
      },
      401: (err, params) => {
        message.error(i18n.t("errormessages:login.401.0"));
      },
      500: (err, params) => {
        message.error(i18n.t("errormessages:login.500.0"));
      },
      default: (err, params) => {
        message.error(i18n.t("errormessages:login.default.0"));
      },
    },
  };

  this.messageObj = _namespaces[name];
  this.namespace = name;
  if (this.messageObj === undefined) {
    throw new Error(`the namespace doesn't exist`);
  }

  if (!this.messageObj["401"]) {
    this.messageObj["401"] = () => {};
  }
}
/**
 * the method to trigger the message
 *
 * @param {string | number} errorCode typically the HTTP status code. you can also define your own under the corresponding namespace.
 * @param {Error} err the error object from axios. If the message needs some arguments, you can get from here.
 * @param {object} params some other useful context. If the message needs some arguments besides err, you can get from here.
 */
ErrorMessager.prototype.triggerMsg = function (errorCode, err, params) {
  if (typeof errorCode !== "string") {
    errorCode = String(errorCode);
  }
  const messageFunc =
    this.messageObj[errorCode] !== undefined
      ? this.messageObj[errorCode]
      : this.messageObj["default"];
  _.isFunction(messageFunc) && messageFunc(err, params);
  if (
    this.namespace === namespace?.project?.files?.preUpload &&
    parseInt(errorCode) === 409
  ) {
    return;
  }
};
