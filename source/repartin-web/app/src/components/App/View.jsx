import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import { CssBaseline, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import FrontPage from "../FrontPage";
import Members from "../Members";
import PrivacyPolicy from "../PrivacyPolice";
import TermsOfService from "../TermsOfService";
import TaskCreate from "../TaskCreate";
import ExpenseCreate from "../TaskCreate";
import NotFound from "../NotFound";

const theme = createMuiTheme( {
  palette: {
    type: "dark",
    background: {
      default: grey[900]
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
              <Switch>
                <Route exact path="/" component={ FrontPage }/>
                <Route path="/membros" component={ Members }/>
                <Route path="/termos-de-uso" component={ TermsOfService }/>
                <Route path="/politica-de-privacidade" component={ PrivacyPolicy }/>
                <Route path="/tarefas" component={ TaskCreate }/>
                <Route path="/financeiro" component={ ExpenseCreate }/>
                <Route component={ NotFound }/>
              </Switch>
            </div>
          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    </Provider>
  );
};

