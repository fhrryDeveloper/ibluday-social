import React from "react";

import { connect } from "react-redux";
import { savePost } from "@actions/forum";
import { getAllForums } from "@actions/forum";

import config from "@config";

import Box from "@material-ui/core/Box";
import Fab from "@material-ui/core/Fab";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import Card from '@material-ui/core/Card';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import CardContent from '@material-ui/core/CardContent';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from "@material-ui/core/Typography";
import PostAddIcon from '@material-ui/icons/PostAdd';
import Dialog from '@material-ui/core/Dialog';
import Slide from '@material-ui/core/Slide';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import BackupIcon from '@material-ui/icons/Backup';
import Scrollbars from "react-custom-scrollbars";
import LoadingDialog from "@components/LoadingDialog";

const Transition = React.forwardRef(function Transition(props, ref) {
    return <Slide direction="up" ref={ref} {...props} />;
});

class Forum extends React.Component{
    state = {
        postAddDialog : false,
        title : "ADD NEW POST",
        content : "INPUT CONTENT",
        coverImage : null,
        coverImageFile : null,
        coverImageName : "",
        isUploaded : false,
        saving : false,
        processing : false,
        success : false,
    }
    postAddDialogOpen = () => {
        this.setState({ postAddDialog : true });
    }
    handlePostAddDialogClose = () => {
        this.setState({ postAddDialog : false });
    }
    handleChangeTitle = e => {
        this.setState({ title : e.target.value });
    }
    handleChangeContent = e => {
        this.setState({ content : e.target.value });
    }
    handleCoverImage = (e) => {
        const image = e.target.files[0];
        const me = this;
        var reader = new FileReader();
        reader.onload = function (e) {
            me.setState({ 
                isUploaded : true,
                coverImage : e.target.result,
                coverImageName : image.name,
                coverImageFile : image
            })
        }
        reader.readAsDataURL(image);
    }
    uploadCoverImage = () => {
        document.getElementById("upload-cover-image").click();
    }
    removeCoverImage = () => {
        this.setState({
            isUploaded : false,
            coverImage : null,
            coverImageName : "",
            coverImageFile : null
        })
    }
    savePost = (e) => {
        e.preventDefault();
        const data = {
            title : this.state.title,
            content : this.state.content,
            coverImage : this.state.coverImageFile,
            coverImageName : this.state.coverImageName,
            posterId : this.props.auth.session._id,
            posterEmail : this.props.auth.session.email,
        }
        this.props.savePost(data);
        this.setState({
            saving : true,
            processing : true
        });
        setTimeout(() => {
            this.setState({ success : true, processing : false });
            window.location.reload();
        }, 3000)
    }
    componentDidMount(){
        this.props.getAllForums();
    }
    render(){
        return(
            <>
                <Grid container spacing={2}>
                    {this.props.list.map((item, index) => (
                        <Grid key={`forum_${index}`} item md={12} lg={6}>
                            <Card className="app-card-box-shadow app-forum-card">
                                <CardContent>
                                    <Box className="app-forum-card-box">
                                        <Box className="app-forum-card-media" style={{ background : `url(${config.prefixUrl(item.coverImage, "forum")})` }}/>
                                        <Box className="app-forum-card-content">
                                            <Link href="/#" underline="none" className="app-forum-card-header">
                                                <Typography variant="h5">{item.title}</Typography>
                                            </Link> 
                                            <Typography variant="subtitle1" className="app-forum-card-body" color="textSecondary">
                                                {item.content}
                                            </Typography>
                                            <Typography variant="subtitle2" className="app-forum-card-footer" color="textSecondary">
                                                By <Link href="/#" underline="none">{item.posterEmail}</Link> {item.date}
                                            </Typography>
                                        </Box>
                                    </Box>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
                <Box className="app-space-between-cards" />
                <Fab 
                    aria-label='Edit Profile Cover' 
                    className="app-forum-post-add" 
                    color="primary"
                    onClick={() => this.postAddDialogOpen()}
                >
                    <PostAddIcon />
                </Fab>
                <Dialog fullScreen open={this.state.postAddDialog} onClose={this.handlePostAddDialogClose} TransitionComponent={Transition}>
                    <AppBar className="app-forum-dialog-header">
                        <Toolbar>
                            <IconButton edge="start" color="inherit" aria-label="close" onClick={this.handlePostAddDialogClose}>
                                <CloseIcon />
                            </IconButton>
                            <Typography className="app-forum-dialog-title" variant="h6">
                                ADD NEW POST
                            </Typography>
                            <Button autoFocus color="inherit" onClick={this.savePost}>
                                SAVE
                            </Button>
                        </Toolbar>
                    </AppBar>
                    <Grid container className="app-forum-dialog-body">
                        <Grid item className="app-forum-dialog-edit">
                            <Card className="app-card-box-shadow card">
                                <Scrollbars className="app-styles-scroll-bar">   
                                    <CardContent>
                                        <form onSubmit={this.savePost}>
                                            <TextField 
                                                fullWidth 
                                                required
                                                label="TITLE"
                                                variant="outlined"
                                                onChange={this.handleChangeTitle}
                                            />
                                            <Box className="app-space-between-cards" />
                                            <TextField 
                                                fullWidth 
                                                required
                                                label="Cover Image"
                                                variant="outlined"
                                                value={this.state.coverImageName}
                                                InputProps={{
                                                    endAdornment: (
                                                        <InputAdornment position="start">
                                                            {!this.state.isUploaded ?
                                                                (<IconButton edge="end" onClick={this.uploadCoverImage}>
                                                                    <BackupIcon />
                                                                </IconButton>) :
                                                                (<IconButton edge="end" onClick={this.removeCoverImage}>
                                                                    <CloseIcon />
                                                                </IconButton>)
                                                            }
                                                        </InputAdornment>
                                                    ),
                                                }}
                                            />
                                            <input className="app-styles-hide" onChange={this.handleCoverImage} id="upload-cover-image" type="file" />
                                            <Box className="app-space-between-cards" />
                                            <TextField 
                                                fullWidth 
                                                label="Content"
                                                multiline
                                                required
                                                rowsMax={30}
                                                variant="outlined"
                                                onChange={this.handleChangeContent}
                                            />
                                            <Box className="app-space-between-cards" />
                                            <Button variant="contained" fullWidth color="primary" type="submit">
                                                SAVE
                                            </Button>
                                        </form>
                                    </CardContent>
                                </Scrollbars>
                            </Card>
                        </Grid>
                        <Grid item className="app-forum-dialog-preview">
                            <Card className="card">
                                <Scrollbars className="app-styles-scroll-bar">   
                                    <CardContent>
                                        <Typography variant="h4">{this.state.title}</Typography>
                                    </CardContent>
                                    <CardMedia
                                        className={this.state.coverImage ? "app-inner-media" : ""}
                                        title={this.state.coverImageName}
                                        image={this.state.coverImage ? this.state.coverImage : "#"}  
                                    />
                                    <CardContent>
                                        <Typography variant="h6" component="pre">{this.state.content}</Typography>
                                    </CardContent>
                                </Scrollbars>
                            </Card>
                        </Grid>
                    </Grid>
                </Dialog>
                <LoadingDialog 
                    active={this.state.saving} 
                    processing={this.state.processing} 
                    success={this.state.success} 
                    loadingText="Saving..."
                />
            </>
        )
    }
}

const mapStateToProps = state => {
    console.log(state.forum)
    return {
        auth : state.auth,
        list : state.forum.list
    }
}

export default connect(mapStateToProps, {
    getAllForums,
    savePost
})(Forum);