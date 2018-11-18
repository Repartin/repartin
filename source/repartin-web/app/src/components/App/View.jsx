import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route } from "react-router-dom";
import { CssBaseline, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import FrontPage from "../FrontPage";
import PrivacyPolicy from "../PrivacyPolice";
import TermsOfService from "../TermsOfService";

const theme = createMuiTheme( {
  palette: {
    text: {
      primary: grey[ 50 ]
    }
  },
  typography: {
    useNextVariants: true
  }
} );

export default ( { store } ) => {

  return (
    <Provider store={ store }>
      <MuiThemeProvider theme={ theme }>
        <CssBaseline>
          <Router>
            <div className="App">
              <Route exact path="/" component={ FrontPage }/>
              <Route path="/termos-de-uso" component={ TermsOfService }/>
              <Route path="/politica-de-privacidade" component={ PrivacyPolicy }/>
            </div>
          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    </Provider>
  );
};

