/*
 * Copyright (C) 2022-2023 Indoc Research
 *
 * Contact Indoc Research for any questions regarding the use of this source code.
 */
import Keycloak from "keycloak-js";
import { DEFAULT_AUTH_URL, KEYCLOAK_REALM } from "../../config";

const keycloakConfig = {
  realm: KEYCLOAK_REALM,
  url: DEFAULT_AUTH_URL + "/",
  "ssl-required": "external",
  resource: "react-app",
  "public-client": true,
  "verify-token-audience": true,
  "use-resource-role-mappings": true,
  "confidential-port": 0,
  clientId: "react-app",
};

const keycloak = new Keycloak(keycloakConfig);
export { keycloak };
