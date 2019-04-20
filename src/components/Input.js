import React from 'react';
import TextField from '@material-ui/core/TextField';
import { createMuiTheme, MuiThemeProvider } from '@material-ui/core/styles';
import blue from '@material-ui/core/colors/blue';
import Send from '@material-ui/icons/SendRounded';
import IconButton from '@material-ui/core/IconButton';
import Paper from '@material-ui/core/Paper';

const theme = createMuiTheme({
    palette: {
      primary: { main: blue[600] }
    },
    typography: { 
        useNextVariants: true,
        fontSize: 20      
     },
  });

class Input extends React.Component {
    constructor() {
        super();

        this.state = {
            value: ''
        }

        this.baseState = this.state;
    }

    resetInput(){
        this.setState (this.baseState);
    }

    updateInput = val => this.setState ({value: val.target.value})

    render() {
        return(
            <MuiThemeProvider theme={theme}>
            <div style = {{display: 'grid', gridTemplateColumns: '1fr 48px', gridColumnGap: '15px'}}>
            <TextField 
                variant="standard"
                label = 'Enter your todo'
                margin = 'normal'
                onKeyPress = {(e) => {
                    if(e.key === 'Enter' && e.target.value !== ''){
                        this.props.handleChange(e.target.value);
                        this.resetInput();
                    }
                }}
                onChange = {this.updateInput}
                value = {this.state.value}
                fullWidth = {true}
            />
            <IconButton 
                style = {{height: '48px', margin: 'auto', marginBottom: '0', transition: 'all ease-in-out .25s'}}
                onClick = {() => {
                    if(this.state.value !== ''){
                        this.props.handleChange(this.state.value);
                        this.resetInput();
                    }
                }}
                title = 'Add'
                arial-label = 'Add'
            >
                <Send/>
            </IconButton>
            </div>
            </MuiThemeProvider>
        );
    }
}

export default Input;