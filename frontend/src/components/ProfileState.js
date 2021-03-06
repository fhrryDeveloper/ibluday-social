import React from "react";
import Box from '@material-ui/core/Box';
import Clsx from "clsx";
import Grid from "@material-ui/core/Grid"; 
import Card from "@material-ui/core/Card"; 
import CircularProgress from '@material-ui/core/CircularProgress';
import Typography from '@material-ui/core/Typography';
import Divider from "@material-ui/core/Divider";
import Avatar from "@material-ui/core/Avatar";

class ProfileState extends React.Component{
    render(){
        return(
            <Card className={Clsx("app-card-box-shadow", "app-list-card")}>
                <Box className="app-styles-progress-box">
                    <CircularProgress 
                        variant="determinate" 
                        size={160}
                        value={60} 
                        className="app-styles-progress-bar"
                    />
                    <Typography className="app-styles-progress-value" variant="h4">60%</Typography>
                </Box>
                <Box className="app-news-profile-state-container">
                    <Typography variant="h6">Profile Completion</Typography>
                    <Typography variant="body2" color="textSecondary">{this.props.user.username}</Typography>
                    <Box className="app-space-between-cards" />
                    <Typography 
                        align="center" 
                        variant="body2"
                        className="content"
                    >
                        Complete your profile by filling profile info fields, completing quests & unlocking badges
                    </Typography>
                </Box>
                <Box className="app-space-between-cards" />
                <Box className="app-space-between-cards" />
                <Box className="app-news-profile-state-list">
                    <Grid container justify="center" align="center">
                        <Grid item md={"auto"}>
                            <Typography className="count" align="center" variant="h6">
                                10/22
                            </Typography>
                            <Typography className="type" align="center" variant="subtitle2">
                                Trophy
                            </Typography>
                            <Typography color="textSecondary" align="center" variant="caption">
                                ARCHIVED
                            </Typography>
                            <Box className="app-space-between-cards" />
                            <Avatar className="image" alt="Remy Sharp" src="assets/newsfeed/trophy.png" />
                        </Grid>
                        <Grid item xs={3} sm={3} md={3} className="divider">
                            <Box><Divider orientation="vertical" /></Box>
                        </Grid>
                        <Grid item md={"auto"}>
                            <Typography className="count" align="center" variant="h6">
                                10/22
                            </Typography>
                            <Typography className="type" align="center" variant="subtitle2">
                                Badges
                            </Typography>
                            <Typography align="center" color="textSecondary" variant="caption">
                                UNLOKED
                            </Typography>
                            <Box className="app-space-between-cards" />
                            <Avatar className="image" alt="Remy Sharp" src="assets/newsfeed/badge.png" />
                        </Grid>
                    </Grid>
                </Box>
                <Box className="app-space-between-cards" />
                <Box className="app-space-between-cards" />
                <Box className="app-space-between-cards" />
            </Card>
        )
    }
}

export default ProfileState;