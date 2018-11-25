import React from "react";
import { Provider } from "react-redux";
import { BrowserRouter as Router, Route, Switch, Redirect } from "react-router-dom";
import { CssBaseline, createMuiTheme, MuiThemeProvider } from "@material-ui/core";
import { grey } from "@material-ui/core/colors";
import Members from "../Members";
import PrivacyPolicy from "../PrivacyPolice";
import TermsOfService from "../TermsOfService";
import Home from "../Home";
import Login from "../Login";
import Tasks from "../Tasks";
import Expenses from "../Expenses";
import Profile from "../Profile";
import NotFound from "../NotFound";
import TasksAdd from "../TaskCreate"
import ExpenseAdd from "../ExpenseCreate"

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

function verificaAutenticacao(props, store) {
  if(store.firebase.auth().currentUser) {
    if ( props.match.url == '/tarefas') {
      return <Tasks />
    }
    if ( props.match.url == '/financas') {
      return <Expenses />
    }
    if ( props.match.url == '/membros') {
      return <Members />
    }
    if ( props.match.url == '/perfil') {
      return <Profile />
    }
    if ( props.match.url == '/tarefasAdd') {
      return <TasksAdd />
    }
    if ( props.match.url == '/financasAdd') {
      return <ExpenseAdd />
    }
  }
 
  return <Redirect to='/' />
}

export default ( { store } ) => {

  return (
    <Provider store={ store }>
      <MuiThemeProvider theme={ theme }>
        <CssBaseline>
          <Router>
            <Switch>
              <Route exact path="/"  render={props => {
                    var auth = store.firebase.auth().currenUser;
                    if (auth !== undefined) {
                        return <Home />
                    }
                    return <Login {...props} />
              }}/>
              <Route path="/termos-de-uso" component={ TermsOfService } />
              <Route path="/politica-de-privacidade" component={ PrivacyPolicy }/>
              <Route path="/tarefas"  render={(props) => verificaAutenticacao(props,store)} />
              <Route path="/financas" render={(props) => verificaAutenticacao(props,store)}/>
              <Route path="/tarefasAdd"  render={(props) => verificaAutenticacao(props,store)} />
              <Route path="/financasAdd" render={(props) => verificaAutenticacao(props,store)}/>
              <Route path="/membros" render={(props) => verificaAutenticacao(props,store)}/>
              <Route path="/perfil" render={(props) => verificaAutenticacao(props,store)}/>

              <Route component={ NotFound }/>
            </Switch>

          </Router>
        </CssBaseline>
      </MuiThemeProvider>
    </Provider>
  );
};

