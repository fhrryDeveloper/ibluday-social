import React from 'react';
import Box from "@material-ui/core/Box"; 
import Grid from "@material-ui/core/Grid"; 
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Config from "@config";
import {connect} from "react-redux";
import RenderBlogList from "@components/BlogList";
import ProfileState from '@components/ProfileState';
import Calendar from "@components/Calendar";
import Friends from "@components/Friends";
import Groups from "@components/Groups";
import Bigsale from '@components/Bigsale';
import Reactions from '@components/Reactions';
import FriendsActivity from '@components/FriendsActivity';

class NewsFeed extends React.Component{
    render(){
        const data = Config.fakeDB;
        const user = this.props.auth.session || {};
        return(
            <div className="app-news-root">
                <Card className="app-news-latest-news-cover app-card-box-shadow">
                    <CardMedia
                        className="app-news-media"
                        image="assets/cover/2021.jpg"
                        title="Paella dish"
                    />
                    <img src="assets/newsfeed/latestnews.png" alt="ribbon" />
                </Card>
                <Box className="app-space-between-cards" />
                <Grid container spacing={3}>
                    <Grid className="app-grid-mini-one" item xs={12} md={4} lg={3}>
                        <ProfileState user={user} />
                        <Box className="app-space-between-cards" />
                        <Friends data={data} />
                        <Box className="app-space-between-cards" />
                        <Reactions data={data} />
                        <Box className="app-space-between-cards" />
                        <Bigsale data={data} />
                        <Box className="app-space-between-cards" />
                    </Grid>
                    <Grid item xs={12} sm={12} md={8} lg={6}>
                        <RenderBlogList data={data.blogList} />
                    </Grid>
                    <Grid className="app-grid-mini-two" item xs={12} lg={3}>
                        <Groups data={data} /> 
                        <Box className="app-space-between-cards" />
                        <Calendar />
                        <Box className="app-space-between-cards" />
                        <FriendsActivity data={data} />
                        <Box className="app-space-between-cards" />
                    </Grid>
                </Grid>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
    }
}
export default connect(mapStateToProps)(NewsFeed)