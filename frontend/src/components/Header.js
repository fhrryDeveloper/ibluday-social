import React from "react";

import { connect } from "react-redux";
import { changeDrawerState } from "@actions/config";
import { acceptFriend } from "@actions/members";
import { getFriendRequests } from "@actions/members";
import { history } from "@app/history";

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import InputBase from '@material-ui/core/InputBase';
import MoreIcon from '@material-ui/icons/MoreVert';
import Divider from '@material-ui/core/Divider';
import SettingsIcon from '@material-ui/icons/Settings';
import ChatIcon from '@material-ui/icons/Chat';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import AppsIcon from '@material-ui/icons/Apps';
import SearchIcon from '@material-ui/icons/Search';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import Badge from '@material-ui/core/Badge';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import Avatar from '@material-ui/core/Avatar';
import Fade from '@material-ui/core/Fade';
import Drawer from "@components/Drawer";
import Configure from "@config";
import CardContent from '@material-ui/core/CardContent';
import CardHeader from '@material-ui/core/CardHeader';
import PersonAddIcon from '@material-ui/icons/PersonAdd';
import PersonAddDisabledIcon from '@material-ui/icons/PersonAddDisabled';
import CommentIcon from '@material-ui/icons/Comment';
import ThumbsUpDownIcon from '@material-ui/icons/ThumbsUpDown';

class Header extends React.Component{
    constructor(){
        super();
        this.state = {
            accountMenu : null,
            notificationMenu : null,
            mobileMenu : null,
            messagesMenu : null,
            friendRequestMenu : null
        }
        this.accountMenuId = 'account-menu';
        this.notificationsMenuId = 'notification-menu';
        this.friendRequestMenuId = 'friend-request-menu';
        this.messageMenuId = 'messages-menu';
        this.mobileMenuId = 'mobile-menu';
    }
    toggleDrawer = () => {
        this.props.changeDrawerState(!this.props.config.drawerOpen);
    };
    handleSignout = () => {
        sessionStorage.clear();
        window.location.reload();
    }
    handleGoPage = page => {
        history.push("/" + page);
    }
    handleAccountMenuClose = e => {
        this.setState({ accountMenu : null });
    }
    handleAccountMenuOpen = e => {
        this.setState({ accountMenu : e.target });
    }
    handleNotificationClose = () => {
        this.setState({ notificationMenu : null });
    }
    handleNotificationOpen = e => {
        this.setState({ notificationMenu : e.target});
    }
    handleFriendRequestOpen = e => {
        this.setState({ friendRequestMenu : e.target });
    }
    handleFriendRequestClose = () => {
        this.setState({ friendRequestMenu : null });
    }
    handleMessagesClose = () => {
        this.setState({ messagesMenu : null });
    }
    handleMessagesOpen = e => {
        this.setState({ messagesMenu : e.target });
    }
    handleMobileMenuClose = () => {
        this.setState({ mobileMenu : null });
    }
    handleMobileMenuOpen = e => {
        this.setState({ mobileMenu : e.target });
    }
    handleAddFriend = id => {
        this.props.acceptFriend(id);
    }
    handleRejectFriend = id => {
        console.log(id)
    }
    componentDidMount(){
        this.props.getFriendRequests(this.props.auth.session._id);
    }
    render(){
        const notificationsList = Configure.fakeDB.notifications;
        const messages = Configure.fakeDB.messages;
        return(
            <>
                <AppBar
                    position="fixed"
                    className={"app-header-appbar"}
                >
                    <Toolbar className="app-header-toolbar">
                        <Typography className="app-header-logo-parent" variant="h6">
                            <img src="assets/logo.png" alt="logo" className="app-header-logo-image" />
                        </Typography>
                        <Typography className="app-header-appname" variant="h6" noWrap>
                            BLUEDAY INC
                        </Typography>
                        <IconButton
                            color="inherit"
                            aria-label="open drawer"
                            onClick={this.toggleDrawer}
                            edge="start"
                            className="app-header-menu-button"
                        >
                            <AppsIcon />
                        </IconButton>
                        <div className="app-header-grow" />
                        <div className="app-header-search">
                            <div className="app-header-search-icon">
                                <SearchIcon />
                            </div>
                            <InputBase
                                placeholder="Search…"
                                classes={{
                                    root: "app-header-search-input-root",
                                    input: "app-header-search-input-input",
                                }}
                                inputProps={{ 'aria-label': 'search' }}
                            />
                        </div>
                        <div className="app-header-section-desktop">
                            <Divider className="app-header-divider" orientation="vertical" flexItem />
                            <IconButton aria-label="show 4 new mails" color="inherit">
                                <Badge color="secondary" variant="dot">
                                    <MailIcon />
                                </Badge>
                            </IconButton>
                            <IconButton 
                                aria-label="notifications list"
                                aria-controls={this.notificationsMenuId}
                                aria-haspopup="true"
                                onClick={this.handleNotificationOpen}
                                color="inherit"
                            >
                                <Badge color="secondary" variant="dot">
                                    <NotificationsIcon />
                                </Badge>
                            </IconButton>
                            <IconButton 
                                aria-label="messages"
                                aria-controls={this.messageMenuId}
                                aria-haspopup="true"
                                onClick={this.handleMessagesOpen}
                                color="inherit"
                            >
                                <Badge color="secondary" variant="dot">
                                    <ChatIcon />
                                </Badge>
                            </IconButton>
                            <IconButton
                                aria-label="friend request"
                                aria-controls={this.friendRequestMenuId}
                                aria-haspopup="true"
                                onClick={this.handleFriendRequestOpen}
                                color="inherit"
                            >
                                <Badge color="secondary" badgeContent={this.props.friendRequestsList.length} max={5}>
                                    <EmojiEmotionsIcon />
                                </Badge>
                            </IconButton>
                            <Divider className="app-header-divider" orientation="vertical" flexItem />
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={this.accountMenuId}
                                aria-haspopup="true"
                                onClick={this.handleAccountMenuOpen}
                                color="inherit"
                            >
                                <SettingsIcon />
                            </IconButton>
                        </div>
                        <div className="app-header-section-mobile">
                            <IconButton
                                aria-label="show more"
                                aria-controls={this.mobileMenuId}
                                aria-haspopup="true"
                                onClick={this.handleMobileMenuOpen}
                                color="inherit"
                            >
                                <MoreIcon />
                            </IconButton>
                        </div>
                    </Toolbar>
                </AppBar>

                {/* Account Menu */}
                <Menu
                    anchorEl={this.state.accountMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                    id={this.accountMenuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'center' }}
                    open={Boolean(this.state.accountMenu)}
                    TransitionComponent={Fade}
                    onClose={this.handleAccountMenuClose}
                >
                    <div className="app-header-setting">
                        <Avatar className="app-header-setting-user-avatar" alt={this.props.auth.session.username} src={Configure.prefixUrl(this.props.auth.session.avatar, "avatar")} />
                        <div className="app-header-setting-user">
                            <Typography display="block">
                                {`Hi, ${this.props.auth.session.username ? this.props.auth.session.username.split(" ")[0] : ""}`}
                            </Typography>
                            <Typography display="block">
                                {this.props.auth.session.email}
                            </Typography>
                        </div>
                    </div>
                    <MenuItem onClick={() => this.handleGoPage("profile")}>My account</MenuItem>
                    <MenuItem onClick={() => this.handleSignout()}>Sign out</MenuItem>
                </Menu>

                {/* Notifications Menu */}
                <Menu
                    anchorEl={this.state.notificationMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    id={this.notificationsMenuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(this.state.notificationMenu)}
                    TransitionComponent={Fade}
                    className="app-menu"
                    onClose={this.handleNotificationClose}
                >
                    <Typography variant="subtitle2" className="app-menu-title">
                        NOTIFICATIONS
                    </Typography>
                    <CardContent className="app-menu-root">
                        {notificationsList.map((item, index) => {
                            return(
                                <CardHeader
                                    key={"notification" + index}
                                    className="app-menu-list"
                                    avatar={
                                        <Avatar alt={item.title} src={item.avatar} className="app-menu-avatar" />
                                    }
                                    action={
                                        <IconButton className="app-menu-icon">
                                            {item.type === "comment" ? <CommentIcon /> : ""}
                                            {item.type === "reaction" ? <ThumbsUpDownIcon /> : ""}
                                        </IconButton>
                                    }
                                    title={<Typography className="app-menu-notification-title" variant="subtitle2" color="textSecondary">{item.title}</Typography>}
                                    subheader={<Typography variant="overline" color="textSecondary">{item.date}</Typography>}
                                />
                            )
                        })}
                    </CardContent>
                </Menu>
                
                {/* Friend Request El */}
                <Menu
                    anchorEl={this.state.friendRequestMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    id={this.friendRequestMenuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(this.state.friendRequestMenu)}
                    TransitionComponent={Fade}
                    className="app-menu"
                    onClose={this.handleFriendRequestClose}
                >
                    <Typography variant="subtitle2" className="app-menu-title">
                        Friend Requests
                    </Typography>
                    <CardContent className="app-menu-root">
                        {this.props.friendRequestsList.map((item, index) => {
                            return(
                                <CardHeader
                                    key={"notification" + index}
                                    className="app-menu-list app-menu-friend"
                                    avatar={
                                        <Avatar alt={item.username} src={Configure.prefixUrl(item.avatar, "avatar")} className="app-menu-avatar" />
                                    }
                                    action={
                                        <>
                                            <IconButton className="app-menu-icon" onClick={() => this.handleAddFriend(item._id)}>
                                                <PersonAddIcon />
                                            </IconButton>
                                            <IconButton className="app-menu-icon" onClick={() => this.handleRejectFriend(item._id)}>
                                                <PersonAddDisabledIcon />
                                            </IconButton>
                                        </>
                                    }
                                    title={<Typography className="app-menu-notification-title" variant="subtitle2" color="textSecondary">{item.username}</Typography>}
                                    subheader={<Typography variant="body2" color="textSecondary">{item.email}</Typography>}
                                />
                            )
                        })}
                    </CardContent>
                </Menu>
                
                {/* Messages Menu */}
                <Menu
                    anchorEl={this.state.messagesMenu}
                    getContentAnchorEl={null}
                    anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
                    id={this.messageMenuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(this.state.messagesMenu)}
                    TransitionComponent={Fade}
                    className="app-menu"
                    onClose={this.handleMessagesClose}
                >
                    <Typography variant="subtitle2" className="app-menu-title">
                        MESSAGES
                    </Typography>
                    <CardContent className="app-menu-root">
                        {messages.map((item, index) => {
                            return(
                                <CardHeader
                                    key={"notification" + index}
                                    className="app-menu-list"
                                    avatar={
                                        <Avatar alt="user" src={item.avatar} className="app-menu-avatar" />
                                    }
                                    title={
                                        <div className="app-menu-message-title">
                                            <Typography noWrap variant="subtitle2" color="textSecondary">{item.username}</Typography>
                                            <Typography variant="caption" color="textSecondary">{item.date}</Typography>
                                        </div>
                                    }
                                    subheader={<Typography noWrap className="app-menu-message-content" variant="overline" color="textSecondary">{item.message}</Typography>}
                                />
                            )
                        })}
                    </CardContent>
                </Menu>
                
                {/* Mobile Menu */}
                <Menu
                    anchorEl={this.state.mobileMenu}
                    anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                    id={this.mobileMenuId}
                    keepMounted
                    transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                    open={Boolean(this.state.mobileMenu)}
                    onClose={this.handleMobileMenuClose}
                >
                    <MenuItem>
                        <IconButton aria-label="show 4 new mails" color="inherit">
                            <Badge badgeContent={4} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <p>Messages</p>
                    </MenuItem>
                    <MenuItem>
                        <IconButton aria-label="show 11 new notifications" color="inherit">
                            <Badge badgeContent={11} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <p>Notifications</p>
                    </MenuItem>
                    <MenuItem onClick={this.handleAccountMenuOpen}>
                        <IconButton
                            aria-label="account of current user"
                            aria-controls="primary-search-account-menu"
                            aria-haspopup="true"
                            color="inherit"
                        >
                            <AccountCircle />
                        </IconButton>
                        <p>Profile</p>
                    </MenuItem>
                </Menu>
                
                {/* Drawer */}
                <Drawer />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        config : state.config,
        friendRequestsList : state.members.friendRequestsList
    }
}

export default connect(mapStateToProps, {
    acceptFriend,
    changeDrawerState,
    getFriendRequests
})(Header)