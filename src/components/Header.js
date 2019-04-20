import React from 'react';
import More from './More';

class Header extends React.Component {
    render() {
        return(
            <header 
                className = 'head'
            >
                    {
                        (this.props.empty || this.props.length !== 0)? 
                        <More 
                            handleDeleteAll = {this.props.handleDeleteAll}
                            handleDeleteCompleted = {this.props.handleDeleteCompleted}
                            disableDelComplItem = {this.props.disableDelComplItem}
                        /> : 
                        <div style = {{height: '48px'}}/>
                    }
                <span>TO DO</span>
            </header>
        );
    }
}

export default Header;