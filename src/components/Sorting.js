import React from 'react';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

class Sorting extends React.Component{
    constructor(props) {
        super(props);

        this.state = {
            value: 0
        }

        this.handleChange = this.handleChange.bind(this)
    }

    handleChange = (event, value) => {
            this.setState({ value });
            this.props.handleSorting(value);
    };

    componentDidUpdate() {
        if(this.state.value !== 0) {
            if (this.props.disableTab === this.state.value) {
                if (this.state.value === 1) {
                    this.props.handleSorting(2);
                    this.setState({ value: 2 });
                    //console.log('1111')
                }
                else if (this.state.value === 2) {
                        this.props.handleSorting(1);
                        this.setState({ value: 1 });
                        //console.log('2222')
                    }
            }
            else if(this.props.disableTab === 3){
                    this.props.handleSorting(0);
                    this.setState({ value: 0 });
                    //console.log('3333')
                }
            if (this.props.showAll) {
                this.props.handleSorting(0);
                this.setState({ value: 0 });
                //console.log('4444');
            }
        }
    }

    render() {
        return(
            <Tabs 
                indicatorColor="primary"
                textColor="primary"
                value = {this.state.value}
                onChange = {this.handleChange}
                variant= 'fullWidth'
            >
                <Tab label = 'all'/>
                <Tab label = 'active' disabled = {this.props.disableTab === 1 || this.props.disableTab === 3}/>
                <Tab label = 'completed' disabled = {this.props.disableTab === 2 || this.props.disableTab === 3}/>
            </Tabs>
        );
    }
}

export default Sorting;