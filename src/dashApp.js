import React from "react"
import { Provider } from "react-redux"
import { store, history } from "./redux/store"
import PublicRoutes from "./router"
import { ThemeProvider } from "styled-components"
import { LocaleProvider } from "antd"
import { IntlProvider } from "react-intl"
import themes from "./settings/themes"
import AppLocale from "./languageProvider"
import config, {
  getCurrentLanguage
} from "./containers/LanguageSwitcher/config"
import { themeConfig } from "./settings"
import DashAppHolder from "./dashAppStyle"
import '../src/style/styles.less'
import firebase from 'firebase'

const firebaseConfig = {
  apiKey: "AIzaSyBm9uQ4ESMQZzRoF9xUoz-BiArdXNg0MkY",
  authDomain: "hireq-api.firebaseapp.com",
  databaseURL: "https://hireq-api.firebaseio.com",
  projectId: "hireq-api",
  storageBucket: "hireq-api.appspot.com",
  messagingSenderId: "893222093024"
}
firebase.initializeApp(firebaseConfig)

const currentAppLocale =
  AppLocale[getCurrentLanguage(config.defaultLanguage || "english").locale]

const DashApp = () => (
  <LocaleProvider locale={currentAppLocale.antd}>
    <IntlProvider
      locale={currentAppLocale.locale}
      messages={currentAppLocale.messages}
    >
      <ThemeProvider theme={themes[themeConfig.theme]}>
        <DashAppHolder>
          <Provider store={store}>
            <PublicRoutes history={history} />
          </Provider>
        </DashAppHolder>
      </ThemeProvider>
    </IntlProvider>
  </LocaleProvider>
)

export default DashApp
export { AppLocale }
