import React from 'react';
import Clsx from 'clsx';
import { connect } from "react-redux";
import Link from '@material-ui/core/Link';
import Grid from "@material-ui/core/Grid"; 
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import HelpIcon from '@material-ui/icons/Help';
import ThumbUp from '@material-ui/icons/ThumbUp';
import ThumbDown from '@material-ui/icons/ThumbDown';
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import PersonPinIcon from '@material-ui/icons/PersonPin';
import ShoppingBasket from '@material-ui/icons/ShoppingBasket';
import IconButton from '@material-ui/core/IconButton';
import Table from '@material-ui/core/Table';
import TableRow from '@material-ui/core/TableRow';
import TableCell from '@material-ui/core/TableCell';
import TableBody from '@material-ui/core/TableBody';
import ImageIcon from '@material-ui/icons/Image';
import BackupIcon from '@material-ui/icons/Backup';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import SaveIcon from '@material-ui/icons/Save';
import CancelIcon from '@material-ui/icons/Cancel';
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import Fade from '@material-ui/core/Fade';
import Zoom from '@material-ui/core/Zoom';
import Fab from '@material-ui/core/Fab';
import CheckIcon from '@material-ui/icons/Check';
import CircularProgress from '@material-ui/core/CircularProgress';
import {changeProfileImage} from "@actions/profile";
import Config from "@config";

import RenderGroupList from "@components/GroupsList";
import RenderPhotoList from "@components/PhotoList";
import RenderFriendList from "@components/FriendList";
import RenderBlogList from "@components/BlogList";
import RenderPostList from "@components/PostList";
import ImageCropper from '@components/ImageCropper';

const AboutMe = ({data}) => {
    var title = "";
    var component = [];

    const getTitle = key => {
        key = key.toString();
        key = key.toLowerCase();
        var newkey = [];
        for(var i = 0; i < key.length; i ++){
            if(i === 0) newkey.push(key[i].toUpperCase());
            else newkey.push(key[i])
        }
        newkey = newkey.join("");
        return newkey;
    }

    const checkTitle = key => {
        var unallowedKeys = [
            "__v", "_id", "avatar", "userRole", "googleId", "password", "isSession", "coverImage"
        ]
        for(var i = 0; i < unallowedKeys.length; i ++){
            if(key === unallowedKeys[i])
                return false;
        }
        return true;
    }
    for(var key in data){
        if(!checkTitle(key))
            continue;
        title = getTitle(key);
        component.push(
            <TableRow key={key}>
                <TableCell className="app-profile-about-table-cell" align="left">{title}</TableCell>
                <TableCell className="app-profile-about-table-cell" align="center">:</TableCell>
                <TableCell className="app-profile-about-table-cell" align="left">{data[key] || "Not registered"}</TableCell>
            </TableRow>
        )
    }
    return component;
}

const data = Config.fakeDB;
const prefixUrl = Config.prefixUrl;
class Profile extends React.Component{  
    state = {
        isOpenCoverEditModal : false,
        isOpenAvatarEditModal : false,
        image : null,
        uploadSuccess : false,
        loadingDialog : false,
        uploading : true,
        cropdata : {
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 10 / 5,
            cropShape : 'rect',
            cropSize: {
                height : 250,
                width : 500
            }
        },
        avatarcropdata : {
            crop: { x: 0, y: 0 },
            zoom: 1,
            aspect: 1,
            cropShape : 'round',
            cropSize: {
                height : 250,
                width : 250
            }
        }
    }
    handleFile = (e, type) => {
        const fileReader = new FileReader();
        fileReader.onloadend = () => {
            switch(type){
                case "coverImage" :
                    this.setState({ coverImage : fileReader.result });
                    break;
                case "avatar" : 
                    this.setState({ avatarImage : fileReader.result });
                    break;
                default : 
                    return
            }
        }   
        fileReader.readAsDataURL(e.target.files[0])
    }
    handleUpdateImage = image => {
        this.setState({ image })
    }
    uploadImage = (type) => {
        this.props.changeProfileImage(this.state.image, type);
    }
    componentDidUpdate(){
        if(this.state.uploading){
            if(this.props.uploadState === "success"){
                this.setState({ uploadSuccess : true, 
                    uploading : false, 
                    loadingDialog : false,
                    isOpenCoverEditModal : false,
                    isOpenAvatarEditModal : false
                });
                setTimeout(() => {
                    window.location.reload();
                }, 500)
            }
        }
    }
    render(){
        const user = this.props.auth.session;
        console.log(user)
        const coverImage = this.state.coverImage || prefixUrl(user.coverImage, "coverimage");
        const avatarImage = this.state.avatarImage || prefixUrl(user.avatar, "avatar");
        const cropdata = this.state.cropdata;
        const avatarcropdata = this.state.avatarcropdata;
        const transitionDuration = {enter: 1, exit: 1};
        return(
            <div className="app-profile">
                <Card className="app-card-box-shadow">
                    <div className="app-profile-cover-parent">
                        <CardMedia
                            className="app-profile-cover"
                            image={prefixUrl(user.coverImage, "coverimage")}
                            title="Paella dish"
                        />
                        <Zoom
                            in={true}
                            timeout={transitionDuration}
                            style={{
                                transitionDelay: transitionDuration.exit,
                            }}
                        >
                            <Fab 
                                aria-label='Edit Profile Cover' 
                                className="app-profile-edit-cover" 
                                color="primary"
                                onClick={() => this.setState({isOpenCoverEditModal : true})}
                            >
                                <ImageIcon />
                            </Fab>
                        </Zoom>
                        <Modal
                            aria-labelledby="edit-image"
                            aria-describedby="edit-profile-cover-image"
                            className="app-profile-edit-cover-modal"
                            open={this.state.isOpenCoverEditModal}
                            onClose={() => this.setState({isOpenCoverEditModal : false})}
                            closeAfterTransition
                            BackdropComponent={Backdrop}
                            BackdropProps={{
                                timeout: 500,
                            }}
                        >
                            <Fade in={this.state.isOpenCoverEditModal}>
                                <div className="app-profile-modal-paper">
                                    <ImageCropper 
                                        image={coverImage} 
                                        cropdata={cropdata} 
                                        imageHandler={this.handleUpdateImage}
                                    />
                                    <Fab 
                                        aria-label='Edit Profile Cover' 
                                        className="app-profile-edit-cover upload" 
                                        color="primary"
                                        onClick={() => {
                                            document.getElementById("coverImageUpload").click();
                                        }}
                                    >
                                        <input 
                                            className="app-styles-hide"
                                            id="coverImageUpload" 
                                            type="file" 
                                            onChange={e => this.handleFile(e, "coverImage")} 
                                        />
                                        <BackupIcon />
                                    </Fab>
                                    <Fab 
                                        aria-label='Edit Profile Cover' 
                                        className="app-profile-edit-cover save" 
                                        color="primary"
                                        onClick={() => {
                                            this.setState({
                                                loadingDialog : true,
                                                uploading : true,
                                                uploadSuccess : false
                                            });
                                            this.uploadImage("coverimage")
                                        }}
                                    >
                                        <SaveIcon />
                                    </Fab>
                                    <Fab
                                        aria-label='Edit Profile Cover' 
                                        className="app-profile-edit-cover cancel" 
                                        color="primary"
                                        onClick={() => this.setState({isOpenCoverEditModal : false})}
                                    >
                                        <CancelIcon />
                                    </Fab>
                                </div>
                            </Fade>
                        </Modal>
                    </div>
                    <div>
                        <div className="app-profile-full">
                            <Avatar 
                                alt={user.username}  
                                src={avatarImage} 
                                className="app-profile-avatar"
                                onClick={() => this.setState({isOpenAvatarEditModal : true})}
                            />
                            <Typography display="block">
                                {user.username}
                            </Typography>
                            <Link href={"mailto:" + user.email} underline="none">{user.email || ""}</Link>
                            <Modal
                                aria-labelledby="edit-image"
                                aria-describedby="edit-user-avatar-image"
                                className="app-profile-edit-cover-modal"
                                open={this.state.isOpenAvatarEditModal}
                                onClose={() => this.setState({isOpenAvatarEditModal : false})}
                                closeAfterTransition
                                BackdropComponent={Backdrop}
                                BackdropProps={{
                                    timeout: 500,
                                }}
                            >
                                <Fade in={this.state.isOpenAvatarEditModal}>
                                    <div className="app-profile-modal-paper">
                                        <ImageCropper 
                                            image={avatarImage} 
                                            cropdata={avatarcropdata} 
                                            imageHandler={this.handleUpdateImage}
                                        />
                                        <Fab 
                                            aria-label='Edit Profile Cover' 
                                            className="app-profile-edit-cover upload" 
                                            color="primary"
                                            onClick={() => {
                                                document.getElementById("avatarImageUpload").click();
                                            }}
                                        >
                                            <input 
                                                className="app-styles-hide"
                                                id="avatarImageUpload" 
                                                type="file" 
                                                onChange={e => this.handleFile(e, "avatar")} 
                                            />
                                            <BackupIcon />
                                        </Fab>
                                        <Fab 
                                            aria-label='Edit Profile Cover' 
                                            className="app-profile-edit-cover save" 
                                            color="primary"
                                            onClick={() => {
                                                this.setState({
                                                    loadingDialog : true,
                                                    uploading : true,
                                                    uploadSuccess : false
                                                });
                                                this.uploadImage("avatar")
                                            }}
                                        >
                                            <SaveIcon />
                                        </Fab>
                                        <Fab
                                            aria-label='Edit Profile Cover' 
                                            className="app-profile-edit-cover cancel" 
                                            color="primary"
                                            onClick={() => this.setState({isOpenAvatarEditModal : false})}
                                        >
                                            <CancelIcon />
                                        </Fab>
                                    </div>
                                </Fade>
                            </Modal>
                        </div>
                    </div>
                    <CardContent>
                    </CardContent>
                </Card>
                <Card className="app-profile-tabcard">
                    <CardContent className="app-profile-tabbar">
                        <Tabs
                            value={false}
                            variant="scrollable"
                            scrollButtons="on"
                            indicatorColor="primary"
                            textColor="primary"
                            aria-label="scrollable force tabs example"
                        >
                            <Tab label="Item One" icon={<PhoneIcon />} />
                            <Tab label="Item Two" icon={<FavoriteIcon />} />
                            <Tab label="Item Three" icon={<PersonPinIcon />} />
                            <Tab label="Item Four" icon={<HelpIcon />} />
                            <Tab label="Item Five" icon={<ShoppingBasket />} />
                            <Tab label="Item Six" icon={<ThumbDown />} />
                            <Tab label="Item Seven" icon={<ThumbUp />} />
                        </Tabs>
                    </CardContent>
                </Card>
                <Grid container spacing={3}>
                    <Grid className="app-grid-mini-one" item xs={12} md={4} lg={3}>
                        <Card className={Clsx("app-card-box-shadow", "app-list-card")}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                subheader="ABOUT ME"
                            />
                            <CardContent>
                                <Typography variant="body2" color="textSecondary" component="p">
                                    This impressive paella is a perfect party dish and a fun meal to cook together with your
                                    guests. Add 1 cup of frozen peas along with the mussels, if you like.
                                </Typography>
                                <Table className="app-profile-userinfo-table" aria-label="simple table">
                                    <TableBody>
                                        <AboutMe data={user} />
                                    </TableBody>
                                </Table>
                            </CardContent>
                        </Card>
                        <div className="app-space-between-cards" />
                        <Card className={Clsx("app-card-box-shadow", "app-list-card")}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                subheader={ <>FRIENDS<b className="app-card-badge">{data.friendList.length}</b></> }
                            />
                            <div>
                                <RenderFriendList data={data.friendList}/>
                                <div className="app-space-between-cards" />
                            </div>
                        </Card>
                        <div className="app-space-between-cards" />
                        <Card className={Clsx("app-card-box-shadow", "app-list-card")}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                subheader={ <>POSTS<b className="app-card-badge">{data.postList.length}</b></> }
                            />
                            <div>
                                <RenderPostList data={data.postList}/>
                                <div className="app-space-between-cards" />
                            </div>
                        </Card>
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={6}>
                        <RenderBlogList data={data.blogList}/>
                    </Grid>
                    <Grid className="app-grid-mini-two" item xs={12} lg={3}>
                        <Card className={Clsx("app-card-box-shadow", "app-list-card")}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                subheader={ <>GROUPS<b className="app-card-badge">{data.groupList.length}</b></> }
                            />
                            <RenderGroupList data={data.groupList}/>
                            <div className="app-space-between-cards" />
                        </Card>
                        <div className="app-space-between-cards" />
                        <Card className={Clsx("app-card-box-shadow", "app-list-card")}>
                            <CardHeader
                                action={
                                    <IconButton aria-label="settings">
                                        <MoreVertIcon />
                                    </IconButton>
                                }
                                subheader="PHOTOS"
                            />
                            <CardContent className="app-profile-photo-list">
                                <RenderPhotoList data={data.photoList}/>
                            </CardContent>
                        </Card>
                    </Grid>
                </Grid>
                <Dialog 
                    onClose={() => {
                        if(!this.state.uploading){
                            this.setState({loadingDialog : false})
                        }
                    }} 
                    aria-labelledby="simple-dialog-title" 
                    open={this.state.loadingDialog}
                    className="app-styles-dialog"
                >
                    <div className="app-styles-dialog-spinner">
                        <Fab
                            aria-label="save"
                            color="primary"
                            className={Clsx("app-styles-dialog-loading", {"app-styles-dialog-success" : this.state.uploadSuccess})}
                        >
                            {this.state.uploadSuccess ? <CheckIcon /> : ""}
                        </Fab>
                        {this.state.uploading && <CircularProgress className="app-styles-dialog-progress" size={68}/>}
                    </div>
                    <div className="app-space-between-cards" />
                    <DialogTitle>{this.state.uploadSuccess ? "Successed" : "Uploading..."}</DialogTitle>
                </Dialog>
            </div>
        )
    }
}
const mapStateToProps = state => {
    console.log(state.profile.coverImageUploadState)
    return {
        auth : state.auth,
        uploadState : state.profile.coverImageUploadState.status
    }
}
export default connect(mapStateToProps, {
    changeProfileImage,
})(Profile)