import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Done from '@material-ui/icons/DoneRounded';
//import Delete from '@material-ui/icons/DeleteRounded';
import Clear from '@material-ui/icons/ClearRounded';
import './TodoItem.css';
import ListItem from '@material-ui/core/ListItem';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import { Checkbox } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';

class TodoItem extends React.Component {
    constructor(props){
        super(props);

        this.state = {
            completed: this.props.completed,
            color: 'default'
        }

        this.checkboxHandler = this.checkboxHandler.bind(this);
    }

    checkboxHandler () {
        this.setState({
            completed: !this.state.completed
        });
        this.props.checkboxHandler(this.props.id);
    }

    render() {
        const done = this.state.completed ? 'done' : '';

        return (
            <Paper elevation = {4}>
                <ListItem 
                    dense 
                    button
                    onClick = {this.checkboxHandler}
                    style = {{transitionDuration: '.25s'}}
                    title = 'Switch status'
                    aria-label = 'Switch status'
                >
                    <Checkbox 
                        disableRipple
                        checkedIcon = {<Done color = 'disabled' aria-label = 'Completed'/>}
                        icon = {<Done color = 'primary' aria-label = 'Active'/>}
                        checked = {this.state.completed}
                    />
                    <ListItemText 
                        className = {done} 
                        style = {{fontSize: '18px'}} 
                        primary = {this.props.text}
                        disableTypography = {true}
                    />
                    <ListItemSecondaryAction>
                        <IconButton 
                            color = {this.state.color} 
                            style = {{transition: 'all ease-in-out .25s'}}
                            onClick = {() => this.props.handleDeleteElement(this.props.id)}
                            onMouseOver = {() => this.setState({color: 'secondary'})}
                            onMouseOut = {() => this.setState({color: 'default'})}
                            aria-label = 'Delete'
                            title = 'Delete'
                        >
                            <Clear/>
                        </IconButton>
                    </ListItemSecondaryAction>
                </ListItem>
            </Paper>
        );
    }
}

export default TodoItem;