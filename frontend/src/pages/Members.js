import React from "react";
import clsx from "clsx";

import { connect } from "react-redux";
import { history } from "@app/history";
import { addFriend } from "@actions/members";
import { getMembers } from "@actions/members";
import { getFriends } from "@actions/members";
import { getMembersCount } from "@actions/members";
import queryString from 'query-string'

import Box from '@material-ui/core/Box';
import Tab from '@material-ui/core/Tab';
import Tabs from '@material-ui/core/Tabs';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import Avatar from '@material-ui/core/Avatar';
import Button from "@material-ui/core/Button";
import CardMedia from "@material-ui/core/CardMedia";
import InputBase from "@material-ui/core/InputBase";
import IconButton from "@material-ui/core/IconButton";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";
import Select from "@material-ui/core/Select";
import MenuItem from "@material-ui/core/MenuItem";
import ViewModuleIcon from '@material-ui/icons/ViewModule';
import ViewListIcon from '@material-ui/icons/ViewList';
import ContactsIcon from '@material-ui/icons/Contacts';
import SearchIcon from "@material-ui/icons/Search";
import ChatIcon from '@material-ui/icons/Chat';
import Pagination from '@material-ui/lab/Pagination';
import Config from "@config";

class Members extends React.Component{
    state = {
        data : Config.fakeDB,
        category : 0,
        perPage : 8,
        activeGrid : 0,
        index : 1,
    }
    componentDidMount(){
        this.props.getMembersCount();
        var { index, perPage, category } = queryString.parse(this.props.location.search);
        if(index && perPage && category){
            index = parseInt(index);
            perPage = parseInt(perPage);
            category = parseInt(category);
            this.setState({index, perPage, category});
            this.getMemberList(index, perPage, category);
            this.getFriendList();
        } else {
            this.getMemberList(this.state.index, this.state.perPage, this.state.category);
            this.getFriendList();
        }
    }
    getMemberList = (index, perPage, category) => {
        var q = "new";
        if(!category)
            category = this.state.category;
        switch(category){
            case 0 : q = "friend"; break;
            case 1 : q = "new"; break;
            case 2 : q = "alpha"; break;
            default : break;
        }
        const indexStart = this.state.perPage * (index - 1)
        const params = {
            q : q,
            start : indexStart,
            count : perPage,
            email : this.props.auth.session.email
        }
        this.props.getMembers(params);
    }
    addFriend = (id, email) => {
        var params = {
            userId : this.props.auth.session._id,
            userEmail : this.props.auth.session.email,
            friendId : id,
            friendEmail : email
        }
        this.props.addFriend(params);
    }
    getFriendList = () => {
        var params = {
            userId : this.props.auth.session._id
        };
        this.props.getFriends(params);
    }
    handleChange = (event, newValue) => {
        history.push(`/members?index=${this.state.index}&perPage=${this.state.perPage}&category=${newValue}`);
        window.location.reload();
    };
    handleChangePerPage = value => {
        history.push(`/members?index=${this.state.index}&perPage=${value}&category=${this.state.category}`);
        window.location.reload();
    }
    handleChangePagination = (e, value) => {
        history.push(`/members?index=${value}&perPage=${this.state.perPage}&category=${this.state.category}`);
        window.location.reload();
    }
    isFriend = id => {
        const friends = this.props.friends;
        for(var i = 0; i < friends.length; i ++){
            if(id === friends[i].friendId)
                return true;
        }
        return false;
    }
    render(){
        // const prefixUrl = Config.prefixUrl;
        return(
            <>
                <Card className="app-card-box-shadow app-list-card">
                    <CardContent className="app-styles-card-header">
                        <div className="app-styles-card-header-search">
                            <InputBase
                                placeholder="Search Members"
                                inputProps={{ 'aria-label': 'Search Members' }}
                            />
                            <IconButton type="submit" aria-label="search">
                                <SearchIcon />
                            </IconButton>
                        </div>
                        <Tabs
                            value={this.state.category}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            className="app-styles-card-header-tabs"
                        >
                            <Tab label="Friend" />
                            <Tab label="Newest" />
                            <Tab label="Alphabetical" />
                        </Tabs>
                        <div>
                            <IconButton 
                                className={clsx(
                                    "app-styles-card-header-actions",
                                    {
                                        "active" : this.state.activeGrid === 0
                                    })
                                }
                                onClick={() => {
                                    this.setState({ activeGrid : 0})
                                }}
                            >
                                <ViewModuleIcon />
                            </IconButton>
                            <IconButton 
                                className={clsx(
                                    "app-styles-card-header-actions",
                                    {
                                        "active" : this.state.activeGrid === 1
                                    })
                                }
                                onClick={() => {
                                    this.setState({ activeGrid : 1})
                                }}
                            >
                                <ViewListIcon />
                            </IconButton>
                        </div>
                    </CardContent>
                </Card>
                <Box className="app-space-between-cards" />
                <Grid container spacing={2}>
                    {
                        this.props.list.map((item, index) => {
                            return(
                                <Grid key={"member" + index} item xs={12} sm={6} md={4} lg={3}>
                                    <Card className="app-card-box-shadow app-list-card app-card-no-padding">
                                        <CardMedia
                                            image={Config.prefixUrl(item.coverImage, "coverimage")}
                                            className="app-members-card-media"
                                        />
                                        <div className="app-style-card-member-info">
                                            <Avatar 
                                                className="app-styles-card-avatar" 
                                                src={Config.prefixUrl(item.avatar, "avatar")}
                                                alt="avatar" 
                                            />
                                            <div className="app-space-between-cards" />
                                            <Typography variant="h5">{item.username}</Typography>
                                            <Link href={"mailto:" + item.email} underline="none">{item.email}</Link>
                                            <div className="app-space-between-cards" />
                                            <CardContent>
                                                <Typography variant="body2" align="center" color="textSecondary">
                                                    I am outgoing, dedicated, and open-minded. I get across to people and adjust to changes with ease. I believe that a person should work on developing their professional skills and learning new things all the time. Currently, I am looking for new career opportunities my current job position cannot provide.
                                                </Typography>
                                            </CardContent>
                                        </div>
                                        <CardContent className="app-members-card-social-links">
                                            <img src="assets/social/facebook.svg" alt="facebook"/>
                                            <img src="assets/social/google.svg" alt="facebook"/>
                                            <img src="assets/social/instagram.svg" alt="facebook"/>
                                            <img src="assets/social/linkedin.svg" alt="facebook"/>
                                            <img src="assets/social/twitter.svg" alt="facebook"/>
                                        </CardContent>
                                        <CardContent className="app-members-card-actions">
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                disabled={this.isFriend(item._id)}
                                                startIcon={<ContactsIcon />}
                                                onClick={() => this.addFriend(item._id, item.email)}
                                            >
                                                {this.isFriend(item._id) ? "ADDED" : "ADD"}
                                            </Button>
                                            <Button
                                                variant="contained"
                                                color="primary"
                                                startIcon={<ChatIcon />}
                                            >
                                                Chat
                                            </Button>
                                        </CardContent>
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </Grid>
                <div className="app-space-between-cards" />
                <div className="app-space-between-cards" />
                <div className="app-space-between-cards" />
                <div className="app-styles-pagination">
                    <div className="app-styles-pagination-perpage">
                        <Typography variant="overline">Per Page</Typography>
                        <Select
                            labelId="demo-simple-select-label"
                            id="demo-simple-select"
                            value={this.state.perPage}
                            onChange={(e) => this.handleChangePerPage(e.target.value)}
                        >
                            <MenuItem value={8}>8</MenuItem>
                            <MenuItem value={16}>16</MenuItem>
                            <MenuItem value={24}>24</MenuItem>
                        </Select>
                    </div>
                    <Pagination page={this.state.index} onChange={(e, value) => this.handleChangePagination(e, value)} count={Math.ceil((this.props.count - 1) / this.state.perPage)} />
                </div>
                <div className="app-space-between-cards" />
                <div className="app-space-between-cards" />
            </>
        )
    }
}

const mapStateToProps = state => {
    return {
        list : state.members.list,
        count : state.members.count,
        auth : state.auth,
        friends : state.members.friends
    }
}
export default connect(mapStateToProps, {
    addFriend,
    getMembers,
    getFriends,
    getMembersCount
})(Members)