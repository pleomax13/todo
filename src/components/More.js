import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Button from '@material-ui/core/Button';
  
class More extends React.Component {
    constructor(){
        super();

        this.state = {
            anchorEl: null,
            open: false,
            todos: ''
        };

        this.deleteAll = this.deleteAll.bind(this);
        this.deleteCompleted = this.deleteCompleted.bind(this);
        this.handleOpenModal = this.handleOpenModal.bind(this);
        this.handleCloseModal = this.handleCloseModal.bind(this);

    }
    
    handleClick = event => {
        this.setState({ anchorEl: event.currentTarget });
    };
    
    handleClose = () => {
        this.setState({ anchorEl: null, open: false });
    };

    handleOpenModal = (flag) => {
        this.setState({ 
            open: true, 
            todos: flag ? 'all' : 'completed'
        });
    };

    handleCloseModal = () => {
        this.setState({ open: false });
    };
    
    deleteAll() {
        this.handleClose();
        this.props.handleDeleteAll();
    }

    deleteCompleted() {
        this.handleClose();
        this.props.handleDeleteCompleted();
    }

    render() {
        const { anchorEl } = this.state;
        const open = Boolean(anchorEl);
        const options = this.props.disableDelComplItem ? ['Delete all'] : ['Delete completed','Delete all'];

        return (
            <>
                <IconButton
                    aria-label="More"
                    aria-owns={open ? 'menu' : undefined}
                    aria-haspopup="true"
                    onClick={this.handleClick}
                    style = {{margin: 'auto', marginRight: 0}}
                >
                    <MoreVertIcon />
                </IconButton>
                <Menu
                    id="menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={this.handleClose}
                    disableAutoFocusItem
                >
                    {options.map(option => (
                        <MenuItem key={option} onClick={() => option === 'Delete all' ? this.handleOpenModal(true) : this.handleOpenModal(false)}>
                            {option}
                        </MenuItem>
                    ))}
                </Menu>
                <Dialog
                    open = {this.state.open}
                    onClose = {this.handleCloseModal}
                    aria-labelledby="alert-dialog-title"
                >
                   <DialogTitle id="alert-dialog-title">{`Delete ${this.state.todos} todos?`}</DialogTitle> 
                   <DialogActions>
                   <Button onClick={this.handleCloseModal} color="primary">
                        Disagree
                    </Button>
                    <Button onClick={this.state.todos === 'all' ? this.deleteAll : this.deleteCompleted} color="secondary">
                        Agree
                    </Button>
                   </DialogActions>
                </Dialog>
            </>
        );
    }
}

export default More;