import React, { Component, Fragment } from "react";
import View from "./View";
import service from "../../services/service";
import { firebaseConnect  } from 'react-redux-firebase'
import { compose } from 'redux'
import { connect } from 'react-redux'
import { withRouter } from 'react-router-dom';
import Home from '../Home';
class Login extends Component {

  constructor(props) {
    super(props);
    this.state = { loading: false};
  }


    componentWillMount = () => {
    this.setState({loading: true});
    this.props.firebase.auth().onAuthStateChanged(async auth => {
      if (auth) {
        const response = await service.getById('user',auth.uid);
        this.setState({loading: false})

        if (response !== undefined) {
          const user = response.user;
          
          if (!user.removed) {
            await service.update('user', user._id, {
              name: auth.displayName,
              email: auth.email,
              uid: auth.uid,
              houseID: null,
              removed: false
            });
          }
        } else {
          await service.create('user', { 
            name: auth.displayName,
            email: auth.email,
            uid: auth.uid,
            houseID: null,
            removed: false
          });
        }
      } else {
        const credential = service.getCredential();
          if (credential) {
            let cred;
            if (credential.providerId === 'facebook.com') {
              cred = this.props.firebase.auth.FacebookAuthProvider.credential(credential);
            }
      
            if (credential.providerId === 'google.com') {
              cred =  this.props.firebase.auth.GoogleAuthProvider.credential(credential);
            }
          if (cred) {
              this.props.firebase.auth().signInAndRetrieveDataWithCredential(cred)
              .then(() => {
                this.setState({loading: false})
                console.log('Logado via storage');
              }).catch(function(error) {
                this.setState({loading: false})
                console.log(`Erro ao logar via storage ${JSON.stringify(error)}`)
              });
            }
         
        } else {
          this.setState({loading: false})

        }
      }

    });
  };
  
  render() {
    
    return (
      <Fragment>
        { this.props.firebase.auth().currentUser == null ?
          this.state.loading == true ? 
          <span>Carregando</span> : 
          <View { ...this.props }/>
          :
          <Home />
        }
      </Fragment>
    );
  }
}



export default compose(
  firebaseConnect(),
  withRouter,
)(Login);