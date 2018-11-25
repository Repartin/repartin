import React, { Component } from 'react'
import View from './View'
import service from "../../services/service";
import { firebaseConnect  } from 'react-redux-firebase'
import { compose } from 'redux'
import { withRouter } from 'react-router-dom';

class ExpenseCreate extends Component {

    constructor(props) {
        super(props);
        this.state = {
            name: '',
            value: '',
            useId: '',
            payments: [],
            dueDate: '',
            repeatingExpenseID: '',
            houseID: 0,
            removed: 0
        }
    }

    handleChange = (e) => {
        const { name, value } = e.target;
        this.setState({ ...this.state, [name]: value })
        e.target.value = value;
    }


    handleSubmit = async (e) => {
        var useId =  this.props.firebase.auth().currentUser.uid;
        this.setState({useId})
        const form = this.state;
        await service.create('expense', form);
        e.preventDefault();
    }
    
    render() {
        return (
            <View handleChange={this.handleChange}
                handleSubmit={this.handleSubmit} />
        )
    }
};

export default compose(
    withRouter,
    firebaseConnect()
  )(ExpenseCreate);
  