import React from "react";
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import { withStyles } from "@material-ui/core/styles";
import Dashboard from "./components/Dashboard";
import Welcome from "./components/Welcome";
import BottomNavigation from "./components/BottomNavigation";
import Tasks from "../Tasks";
import Expenses from "../Expenses";
import Profile from "../Profile";
import TasksAdd from "../Tasks/TaskCreate"
import ExpenseAdd from "../Expenses/ExpenseCreate"
import Members from "../Members";
import CreateHouse from "./components/Welcome/components/CreateHouse";
import NotFound from "../NotFound";
import Loading from "../Loading";
import styles from "./styles";

const View = ( { isMember, collapse, setMember, setCollapse, classes, pending, loading } ) => {

  return ( 
    <Router>
      <div>
        <div className={ `${ classes.homeWrapper } ${ collapse ? classes.homeWrapperCollapsed : '' }` }>
          <Switch>
            <Route exact path="/" render={ ( props ) => {
              return loading
                ? <Loading /> 
                : isMember
                    ? pending 
                      ? <span>Convite Pendente</span> 
                      : <Dashboard setCollapse={ setCollapse }/>
                    : <Welcome setMember={ setMember }/>
            } }/>
            <Route path="/perfil" component={ Profile }/>
            <Route exact path="/tarefas" component={ Tasks }/>
            <Route path="/tarefas/nova" component={ TasksAdd }/>
            <Route path="/tarefas/:id" component={ TasksAdd }/>
            <Route exact path="/financas" component={ Expenses }/>
            <Route path="/financas/nova" component={ ExpenseAdd }/>
            <Route path="/financas/:id" component={ ExpenseAdd }/>
            <Route path="/membros" component={ Members }/>
            <Route path="/nova-republica" render={ ( props ) => <CreateHouse setMember={ setMember }/> }/>
            <Route component={ NotFound }/>
          </Switch>
        </div>
        {
          isMember && !pending
            ? (
              <BottomNavigation 
                className={ classes.bottomNavigation }
                setCollapse={ setCollapse }
              />
            ) : ''
        }
      </div>
    </Router>
  );
};

export default withStyles(styles)(View);
