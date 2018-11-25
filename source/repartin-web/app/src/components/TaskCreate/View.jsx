import React from "react";
import TextField from '@material-ui/core/TextField';

export default props => (
    <div>
        <TextField
        name='name'
        label='Nome da tarefa'
        onChange={props.handleChange}
        />
        <button onClick={props.handleSubmit}></button>
    </div>
)