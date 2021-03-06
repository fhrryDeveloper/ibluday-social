import React from "react";

import Fab from "@material-ui/core/Fab";
import Dialog from "@material-ui/core/Dialog";
import CheckIcon from '@material-ui/icons/Check';
import DialogTitle from "@material-ui/core/DialogTitle";
import CircularProgress from '@material-ui/core/CircularProgress';
import PropTypes from 'prop-types';

class LoadingDialog extends React.Component{
    render(){
        return(
            <>
                <Dialog 
                    onClose={() => {
                        if(!this.props.processing){
                            this.setState({active : false})
                        }
                    }} 
                    aria-labelledby="simple-dialog-title" 
                    open={this.props.active}
                    className="app-styles-dialog"
                >
                    <div className="app-styles-dialog-spinner">
                        <Fab
                            aria-label="save"
                            color="primary"
                            className={this.props.success ? "app-styles-dialog-loading app-styles-dialog-success" : "app-styles-dialog-loading"}
                        >
                            {this.props.success ? <CheckIcon /> : ""}
                        </Fab>
                        {this.props.processing && <CircularProgress className="app-styles-dialog-progress" size={68}/>}
                    </div>
                    <div className="app-space-between-cards" />
                    <DialogTitle>{this.props.success ? "Successed" : this.props.loadingText}</DialogTitle>
                </Dialog>
            </>
        )
    }
}

LoadingDialog.propTypes = {
    active: PropTypes.bool,
    processing: PropTypes.bool,
    success: PropTypes.bool,
    loadingText: PropTypes.string
};

export default LoadingDialog;