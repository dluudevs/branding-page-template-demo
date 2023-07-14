/*
 * Copyright (C) 2022-2023 Indoc Research
 *
 * Contact Indoc Research for any questions regarding the use of this source code.
 */
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import Backend from 'i18next-http-backend';
import { PLATFORM, SUPPORT_EMAIL, ORGANIZATION_PORTAL_DOMAIN } from './config';
i18n
  .use(initReactI18next)
  .use(Backend)
  .init({
    debug: false,
    lng: 'en',
    ns: ['errormessages'],
    backend: {
      loadPath: `${process.env.PUBLIC_URL}/locales/{{lng}}/{{ns}}.json`,
    },
    interpolation: {
      escapeValue: false, // not needed for react as it escapes by default
      defaultVariables: {
        PLATFORM: PLATFORM,
        SUPPORT_EMAIL: SUPPORT_EMAIL,
        ORGANIZATION: ORGANIZATION_PORTAL_DOMAIN,
      },
    },
  });
export default i18n;
