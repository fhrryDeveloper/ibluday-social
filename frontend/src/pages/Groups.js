import React from "react";
import clsx from "clsx";
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
        activeTab : 0,
        perPage : 20,
        itemCount : Config.fakeDB.membersList.length,
        activeGrid : 0
    }
    handleChange = (event, newValue) => {
        this.setState({ activeTab : newValue })
    };
    handleChangePerPage = value => {
        this.setState({ perPage : value })
    }
    handleChangePagination = (e, value) => {
        const currentIndexStart = this.state.perPage * (value - 1);
        const currentIndexEnd = this.state.perPage * value;
        console.log(currentIndexEnd, currentIndexStart)
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
                            value={this.state.activeTab}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"
                            centered
                            className="app-styles-card-header-tabs"
                        >
                            <Tab label="Active" />
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
                                    this.setState({ activeGrid : 1 })
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
                        this.state.data.membersList.map((item, index) => {
                            return(
                                <Grid key={"member" + index} item xs={12} sm={6} md={4} lg={3}>
                                    <Card className="app-card-box-shadow app-list-card app-card-no-padding">
                                        <CardMedia
                                            image={item.cover}
                                            className="app-members-card-media"
                                        />
                                        <div className="app-style-card-member-info">
                                            <Avatar 
                                                className="app-styles-card-avatar" 
                                                src={item.avatar}
                                                alt="avatar" 
                                            />
                                            <Typography variant="subtitle1">{item.name}</Typography>
                                            <Link href={"mailto:" + item.email} underline="none">{item.email}</Link>
                                            <div className="app-space-between-cards" />
                                            <Typography variant="body2" align="center" color="textSecondary">
                                                {item.content}
                                            </Typography>
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
                                                startIcon={<ContactsIcon />}
                                            >
                                                Add
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
                            <MenuItem value={20}>20</MenuItem>
                            <MenuItem value={30}>30</MenuItem>
                            <MenuItem value={50}>50</MenuItem>
                        </Select>
                    </div>
                    <Pagination onChange={(e, value) => this.handleChangePagination(e, value)} count={parseInt(this.state.itemCount / this.state.perPage)} />
                </div>
                <div className="app-space-between-cards" />
                <div className="app-space-between-cards" />
            </>
        )
    }
}

export default Members;