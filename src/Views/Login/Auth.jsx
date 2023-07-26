/*
 * Copyright (C) 2022-2023 Indoc Research
 *
 * Contact Indoc Research for any questions regarding the use of this source code.
 */
import React, { Component } from "react";
import { Button, Modal, notification, message } from "antd";
import { ExclamationCircleOutlined, UserOutlined } from "@ant-design/icons";
import { instanceOf } from "prop-types";
import { withCookies, Cookies } from "react-cookie";
import styles from "./index.module.scss";
import { PORTAL_PREFIX, PLATFORM, SUPPORT_EMAIL } from "../../config";
import { keycloak } from "../../Service/keycloak/config";
import { docs } from "../../externalLinks";
import packageInfo from "../../../package.json";
import i18n from "../../i18n";
const { confirm } = Modal;

class Auth extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cookiesDrawer: false,
      notificationKey: null,
      btnLoading: false,
      jobStatus: {},
    };
  }
  static propTypes = {
    cookies: instanceOf(Cookies).isRequired,
  };

  async componentDidMount() {
    this.setTermsOfUse();
    // const { JOB_STATUS } = await import("portal/jobStatus");
    // this.setState({ jobStatus: JOB_STATUS });
  }

  componentWillUnmount() {
    const key = this.state.notificationKey;
    notification.close(key);
  }

  setTermsOfUse = () => {
    const cookiesNotified = localStorage.getItem("cookies_notified");

    if (!cookiesNotified) {
      const closeNotification = () => {
        notification.close(key);
        localStorage.setItem("cookies_notified", true);
      };
      const key = `open${Date.now()}`;
      this.setState({ notificationKey: key });
      const btn = (
        <Button type="primary" size="small" onClick={closeNotification}>
          OK
        </Button>
      );

      notification.open({
        message: "Cookies on this site",
        description: (
          <>
            <p>
              We use cookies to make your experience better by keeping your
              session information and login status. By using the {PLATFORM} you
              accept our use of cookies in accordance with our{" "}
              <a
                target="_blank"
                rel="noopener noreferrer"
                href={docs.privacyPolicy}
              >
                Privacy Policy
              </a>
            </p>
          </>
        ),
        key,
        btn,
        duration: 0,
        onClose: closeNotification,
      });
    }
  };

  onFinish = async (values) => {
    try {
      await new Promise((resolve, reject) => {
        const uploadList = JSON.parse(
          localStorage.getItem("portal-uploadList")
        );
        const uploadingList = uploadList.filter(
          // (item) => item.status === this.state.jobStatus.RUNNING,
          (item) => item.status === 'RUNNING',
        );
        if (
          uploadingList.length === 0 ||
          this.props.allCookies.username === values.username
        ) {
          resolve();
          return;
        }
        confirm({
          title: `Are you sure to log in as ${values.username}?`,
          icon: <ExclamationCircleOutlined />,
          content: `The file uploading is still in progress in another tab. Progress will be lost if you login as ${values.username}`,
          onOk() {
            resolve();
          },
          onCancel() {
            reject();
          },
        });
      });
    } catch (err) {
      return;
    }

    this.setState({ btnLoading: true });

    await keycloak.init({ checkLoginIframe: false });
    keycloak
      .login({ redirectUri: window.location.origin + "/landing" })
      .catch((err) => {
        if (err.response) {
          message.error(i18n.t(`errormessages:login.${err.response.status}.0`));
          this.setState({ btnLoading: false });
        }
      });
  };

  render() {
    if (this.props.allCookies?.sessionId && this.props.containerId) {
      window.location.href = `${PORTAL_PREFIX}/landing`; // only redirect if being mounted by a container
    }

    return (
      <>
        <div className={styles.bg}>
          <div className={styles.container}>
            <div className={styles.header}>
              <span className={styles["header__logo"]}>
                <img
                  alt=""
                  src={require("../../Images/pilot-Logo-White.svg").default}
                />
              </span>
              <Button
                id="header_login_btn"
                onClick={this.onFinish}
                loading={this.state.btnLoading}
              >
                <UserOutlined
                  style={{
                    marginRight: 13,
                    strokeWidth: "30",
                    stroke: "white",
                  }}
                />
                Login
              </Button>
            </div>
            <div className={styles["descr-banner"]}>
              <div className={styles["descr-banner__img"]}>
                <img
                  alt=""
                  src={require("../../Images/PILOT-Display-MockUp.png")}
                />
              </div>
              <div
                className={styles["descr-banner-right"]}
                style={{ marginLeft: "12rem" }}
              >
                <img
                  className={styles["descr-banner__logo"]}
                  alt=""
                  src={require("../../Images/PilotPoweredLogo.png")}
                />
                <div className={styles["descr-banner__text"]} style={{}}>
                  Branding Page Template Demo - Main Branch
                </div>
              </div>
            </div>
            <div className={styles["descr-dataGateway"]} style={{}}>
              <div className={styles["descr-dataGateway__img"]}>
                <img alt="" src={require("../../Images/Illustration.png")} />
              </div>
              <div
                className={styles["descr-dataGateway-right"]}
                style={{ marginLeft: "8.7rem" }}
              >
                <div className={styles["descr-dataGateway__text"]} style={{}}>
                  Data gateway that provides project and role based access
                  controls
                </div>
              </div>
            </div>
            <div>
              <div className={styles["trapezoid"]}></div>
              <div className={styles["descr-trapezoid"]} style={{}}>
                <div className={styles["descr-trapezoid-right"]} style={{}}>
                  <div className={styles["descr-trapezoid__text"]} style={{}}>
                    Data zones that support ingestion of all types of data
                    across modalities and sensitivities
                  </div>
                </div>
                <div className={styles["descr-trapezoid__img"]}>
                  <img alt="" src={require("../../Images/Illustration.png")} />
                </div>
              </div>
            </div>
            <div
              className={styles["descr-workbench"]}
              style={{
                alignItems: "center",

                marginTop: "55rem",
              }}
            >
              <div className={styles["descr-workbench__img"]}>
                <img alt="" src={require("../../Images/Illustration.png")} />
              </div>
              <div
                className={styles["descr-workbench-right"]}
                style={{ marginLeft: "11.56rem" }}
              >
                <div className={styles["descr-workbench__text"]} style={{}}>
                  A workspace that provides access to analysis and visualization
                  tools
                </div>
              </div>
            </div>
            <div className={styles.footer}>
              <span className={styles["footer-logo"]}>
                <a
                  target="_blank"
                  href="https://www.indocsystems.com/"
                  rel="noopener noreferrer"
                >
                  <img
                    alt=""
                    src={require("../../Images/PilotPoweredLogo.png")}
                  />
                </a>
              </span>

              <div className={styles["footer-links"]}>
                <span className={styles["footer-links__text"]}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={docs.documentation}
                  >
                    Documentation
                  </a>
                </span>

                <span className={styles["footer-links__text"]}>
                  <a href={"mailto:" + SUPPORT_EMAIL}>Support</a>
                </span>
                <span className={styles["footer-links__text"]}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={docs.termsOfUse}
                  >
                    Terms of Use
                  </a>
                </span>
                <span className={styles["footer-links__text"]}>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={docs.privacyPolicy}
                  >
                    Privacy Policy
                  </a>
                </span>
              </div>
              <div className={styles["footer-right"]}>
                <Button
                  id="footer_login_btn"
                  onClick={this.onFinish}
                  loading={this.state.btnLoading}
                >
                  <UserOutlined style={{ marginRight: 13 }} />
                  Login
                </Button>
                <span className={styles["footer-right__version"]}>
                  V {packageInfo.version} Copyright ©{new Date().getFullYear()},
                  <a
                    href="https://www.indocsystems.com/"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    Indoc Systems
                  </a>
                  . All rights reserved
                </span>
              </div>
            </div>
          </div>

          <div className={styles["bg-icon"]}>
            <img
              alt=""
              src={require("../../Images/Pilot-icon.png")}
              width={150}
            />
          </div>
        </div>
      </>
    );
  }
}

export default withCookies(Auth);
