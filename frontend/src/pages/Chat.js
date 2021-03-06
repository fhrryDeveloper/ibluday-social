import React from "react";
import socket_client from "socket.io-client";
import config from "@config";

import { renderToString } from 'react-dom/server'

import { connect } from "react-redux";
import { getChatList } from "@actions/chat";
import { getFriends } from "@actions/members";
import { getMembers } from "@actions/members";
import { getMembersCount } from "@actions/members";

import Box from "@material-ui/core/Box";
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Grid from "@material-ui/core/Grid";
import Card from "@material-ui/core/Card";
import TextField from '@material-ui/core/TextField';
import Container from "@material-ui/core/Container";
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import InputAdornment from '@material-ui/core/InputAdornment';
import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';

import SearchIcon from "@material-ui/icons/Search";
import PhoneIcon from '@material-ui/icons/Phone';
import FavoriteIcon from '@material-ui/icons/Favorite';
import TextsmsIcon from '@material-ui/icons/Textsms';
import NotificationsIcon from '@material-ui/icons/Notifications';
import SendIcon from '@material-ui/icons/Send';

import Scrollbars from "react-custom-scrollbars";
import Divider from '@material-ui/core/Divider';

const a11yProps = (index) => {
    return {
        id: `scrollable-force-tab-${index}`,
        'aria-controls': `scrollable-force-tabpanel-${index}`,
    };
}

const TabPanel = ({ children, value, index, ...rest }) => {
    return (
        <Box
            role="tabpanel"
            className="app-chat-tabpanel"
            hidden={value !== index}
            id={`wrapped-tabpanel-${index}`}
            aria-labelledby={`wrapped-tab-${index}`}
            {...rest}
        >
            {value === index && (
                <>{children}</>
            )}
        </Box>
    );
}

class Chat extends React.Component{
    constructor(){
        super();
        this.socket = null;
        this.prevMessageList = null;
        this.state = {
            activeTab : 0,
            newMessage : "",
            messageList : [],
            chatUser : null
        }
    }
    componentDidMount(){
        this.socket = socket_client(config.HOSTURL, {query : { user : JSON.stringify(this.props.auth.session)}});
        this.socket.on("connection-backend", (data) => {
            alert("You are connected successfully", "success");
        })
        this.socket.on("error", error => {
            alert(error, "error");
        })
        this.socket.on("new_user", (newUser) => {
            alert(`${newUser.username} is online`, "info");
        })
        this.socket.on("new_message", ({ message, sender }) => {
            console.log(message)
            let chatComp = document.querySelector("#chat-list > div");
            let messageComponent = renderToString(
                <Box id={message.messageId} className="app-chat-list-box left">
                    <Card className="app-chat-list app-chat-list-left animate__animated animate__fadeIn">
                        <CardContent className="app-chat-list-content">
                            <Typography>{message.message}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            );
            chatComp.appendChild(config.stringToHtml(messageComponent))
            chatComp.scrollTop = chatComp.scrollHeight;
            alert(`${message.message} :: ${sender.email}`, "info");
        })
        this.getFriends();
    }
    getFriends = () => {
        const params = {
            userId : this.props.auth.session._id
        }
        this.props.getFriends(params);
    }
    changeActiveTab = (e, newTab) => {
        this.setState({ activeTab : newTab });
    }
    componentDidUpdate(prevProps){
        if(prevProps.messageList !== this.props.messageList){
            this.renderMessageList(this.props.messageList)
        }
    }
    setOpenChat = (chatUser) => {
        this.props.getChatList({
            senderId : chatUser._id,
            receiverId : this.props.auth.session._id
        })
        this.setState({ chatUser });
    }
    handleSendNewMessage = () => {
        if(!this.state.chatUser){
            alert("Please select user to send message", "warning")
            return;
        }
        if(this.state.newMessage === "")
            return;
        else{
            let messageObj = {
                messageId : Date.now(),
                message : this.state.newMessage,
                date : new Date(),
                reactions : [],
            }
            let chatComp = document.querySelector("#chat-list > div");
            let messageComponent = renderToString(
                <Box id={messageObj.messageId} className="app-chat-list-box right">
                    <Card className="app-chat-list app-chat-list-right animate__animated animate__fadeIn">
                        <CardContent className="app-chat-list-content">
                            <Typography>{messageObj.message}</Typography>
                        </CardContent>
                    </Card>
                </Box>
            )
            chatComp.appendChild(config.stringToHtml(messageComponent))
            chatComp.scrollTop = chatComp.scrollHeight;
            this.socket.emit("new_message", {
                message : messageObj,
                sender : this.props.auth.session,
                receiver : this.state.chatUser
            });
            this.setState({ newMessage : "" });
        }
    }
    handleNewMessaageKey = e => {
        if(e.code === "Enter"){
            this.handleSendNewMessage()
        }
    }
    renderMessageList = messages => {
        let chatComp = document.querySelector("#chat-list > div");
        chatComp.innerHTML = "";
        for(var i = 0; i < messages.length; i ++){
            if(this.props.auth.session._id === messages[i].senderId){
                let isNew = false;
                if(i !== 0){
                    if(messages[i - 1].senderId !== this.props.auth.session._id)
                        isNew = true;
                    else
                        isNew = false;
                } else {
                    isNew = true;
                }
                let messageComponent = renderToString(
                    <Box 
                        id={messages[i].messageId} 
                        className="app-chat-list-box right"
                        style={{paddingTop : isNew ? "25px" : "0px"}}
                    >
                        <Avatar 
                            alt={messages[i].senderEmail} 
                            src={config.prefixUrl(messages[i].senderAvatar, "avatar")} 
                            className={isNew ? "app-avatar" : "app-avatar no-visible"}
                        />
                        {isNew ?
                            <Typography 
                                variant="caption" 
                                color="textSecondary"
                                className="app-date-username right"
                            >
                                {messages[i].date}
                            </Typography> : ""
                        }
                        <Card 
                            className="app-chat-list app-chat-list-right animate__animated animate__fadeIn"
                            style={{margin : isNew ? "4px 0px 0.5px 0px" : "0.5px"}}
                        >
                            <CardContent className="app-chat-list-content">
                                <Typography>{messages[i].message}</Typography>
                            </CardContent>
                        </Card>
                    </Box>
                );
                chatComp.appendChild(config.stringToHtml(messageComponent))
                chatComp.scrollTop = chatComp.scrollHeight;
            } else {
                let isNew = false;
                if(i !== 0){
                    if(messages[i - 1].receiverId !== this.props.auth.session._id)
                        isNew = true;
                    else
                        isNew = false;
                } else {
                    isNew = true;
                }
                let messageComponent = renderToString(
                    <>
                        {/* {isNew ? messages[i].status ? "" : <Divider /> : ""} */}
                        <Box 
                            id={messages[i].messageId} 
                            className="app-chat-list-box left"
                            style={{paddingTop : isNew ? "25px" : "0px"}}
                        >
                            <Avatar 
                                alt={messages[i].senderEmail} 
                                src={config.prefixUrl(messages[i].senderAvatar, "avatar")} 
                                className={isNew ? "app-avatar" : "app-avatar no-visible"}
                            />
                            {isNew ?
                                <Typography 
                                    variant="caption" 
                                    color="textSecondary"
                                    className="app-date-username left"
                                >
                                    {`${messages[i].senderName}, ${messages[i].date}`}
                                </Typography> : ""
                            }
                            <Card 
                                className="app-chat-list app-chat-list-left animate__animated animate__fadeIn"
                                style={{margin : isNew ? "4px 0px 0.5px 0px" : "0.5px"}}
                            >
                                <CardContent className="app-chat-list-content">
                                    <Typography>{messages[i].message}</Typography>
                                </CardContent>
                            </Card>
                        </Box>
                    </>
                );
                chatComp.appendChild(config.stringToHtml(messageComponent))
                chatComp.scrollTop = chatComp.scrollHeight;
            }
        }
    }
    render(){
        return(
            <Box className="app-chat">  
                <Grid container className="app-chst-section" spacing={2}>
                    <Grid item className="app-chat-left-section">
                        <Card className="app-card-box-shadow app-chat-section-container">
                            <CardContent className="app-chat-card-content">
                                <TextField 
                                    fullWidth 
                                    variant="outlined"
                                    label="Search ID, Email, Name..."
                                    InputProps={{
                                        startAdornment: (
                                            <InputAdornment position="start">
                                                <IconButton edge="start" onClick={this.uploadCoverImage}>
                                                    <SearchIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Tabs
                                    value={this.state.activeTab}
                                    variant="fullWidth"
                                    indicatorColor="primary"
                                    textColor="primary"
                                    aria-label="scrollable force tabs example"
                                    onChange={this.changeActiveTab}
                                    TabIndicatorProps={{ className : "app-styles-hide"}}
                                >
                                    <Tab label="CHAT" className="app-chat-section-tab" icon={<TextsmsIcon />} {...a11yProps(0)} />
                                    <Tab label="FRIENDS" className="app-chat-section-tab" icon={<FavoriteIcon />} {...a11yProps(1)} />
                                    <Tab label="CALL" className="app-chat-section-tab" icon={<PhoneIcon />} {...a11yProps(2)} />
                                    <Tab label="NOTIFICATION" className="app-chat-section-tab" icon={<NotificationsIcon />} {...a11yProps(3)} />
                                </Tabs>
                                <Divider />
                                <Box className="app-chat-user-list">
                                    <TabPanel value={this.state.activeTab} index={0}>
                                        <Scrollbars className="app-styles-scroll-bar">  
                                        <Box className="app-space-between-cards" />
                                        <Box className="app-space-between-cards" />
                                        </Scrollbars>
                                    </TabPanel>
                                    <TabPanel value={this.state.activeTab} index={1}>
                                        <Scrollbars className="app-styles-scroll-bar">  
                                        <Box className="app-space-between-cards" />
                                        {this.props.friends.map((item, index) => {
                                            return(
                                                <Box key={index} className="app-card-list-padding">
                                                    <CardHeader
                                                        avatar={
                                                            <Avatar alt={item.username} src={config.prefixUrl(item.avatar, "avatar")} className="app-avartar">
                                                                R
                                                            </Avatar>
                                                        }
                                                        onClick={() => this.setOpenChat(item)}
                                                        className="app-styles-card-header"
                                                        title={item.username}
                                                        subheader={item.email}
                                                    />
                                                </Box>
                                            )
                                        })}
                                        </Scrollbars>
                                    </TabPanel>
                                    <TabPanel value={this.state.activeTab} index={2}>
                                        Item Three
                                    </TabPanel>
                                    <TabPanel value={this.state.activeTab} index={3}>
                                        Item Three
                                    </TabPanel>
                                </Box>
                            </CardContent>
                        </Card>
                    </Grid>
                    <Grid item className="app-chat-right-section">
                        <Card className="app-card-box-shadow app-chat-section-container">
                            <Container className="app-chat-chat-container">
                                {this.state.chatUser ?
                                    <CardHeader
                                        avatar={
                                            <Avatar alt={this.state.chatUser.username} src={config.prefixUrl(this.state.chatUser.avatar, "avatar")} className="app-avartar">
                                                R
                                            </Avatar>
                                        }
                                        className="app-styles-card-header"
                                        title={this.state.chatUser.username}
                                        subheader={this.state.chatUser.email}
                                    /> : <Box className='app-chat-card-header-skelton'></Box>
                                }
                                <Divider />
                                <Box className="app-chat-chat-list">
                                    <Scrollbars 
                                        id="chat-list" 
                                        className="app-styles-scroll-bar"
                                        renderTrackHorizontal={() => {
                                            return(<div></div>)
                                        }}
                                    />
                                </Box>
                                <Box className="app-chat-chat-message">
                                    <TextField 
                                        fullWidth 
                                        variant="outlined"
                                        label="Send Message..."
                                        value={this.state.newMessage}
                                        onChange={e => this.setState({ newMessage : e.target.value })}
                                        onKeyPress={e => this.handleNewMessaageKey(e)}
                                        InputProps={{
                                            endAdornment: (
                                                <InputAdornment position="end">
                                                    <IconButton edge="end" onClick={() => this.handleSendNewMessage()}>
                                                        <SendIcon />
                                                    </IconButton>
                                                </InputAdornment>
                                            ),
                                        }}
                                    />
                                </Box>
                            </Container>
                        </Card>
                    </Grid>
                </Grid>
            </Box>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        friends : state.members.friends,
        count : state.members.count,
        messageList : state.chat.list
    }
}
export default connect(mapStateToProps, {
    getMembers,
    getChatList,
    getFriends,
    getMembersCount
})(Chat)