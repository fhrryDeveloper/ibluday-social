import React from "react";
import Clsx from 'clsx';
import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import TabPanel from "@components/TabPanel";
import CardHeader from '@material-ui/core/CardHeader';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import RenderFriendList from "@components/FriendList";

class Friends extends React.Component{
    state = {
        activeTab : 0
    }
    a11yProps = (index) => {
        return {
            id: `full-width-tab-${index}`,
            'aria-controls': `full-width-tabpanel-${index}`,
        };
    }
    handleChange = (event, newTab) => {
        this.setState({activeTab : newTab})
    }
    render(){
        const data = this.props.data;
        return(
            <Card className={Clsx("app-card-box-shadow", "app-styles-friends", "app-list-card")}>
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    subheader={ <>MEMBERS<b className="app-card-badge">{data.friendList.length}</b></> }
                />
                <Tabs
                    value={this.state.activeTab}
                    onChange={this.handleChange}
                    className="app-styles-card-tab-container"
                    indicatorColor="primary"
                    textColor="primary"
                    aria-label="full width tabs example"
                >
                    <Tab label="New" {...this.a11yProps(0)} />
                    <Tab label="Popular" {...this.a11yProps(1)} />
                    <Tab label="Active" {...this.a11yProps(2)} />
                </Tabs>
                <Box className="app-space-between-cards" />
                <TabPanel value={this.state.activeTab} index={0}>
                    <div>
                        <RenderFriendList data={data.friendList} />
                        <div className="app-space-between-cards" />
                    </div>
                </TabPanel>
                <TabPanel value={this.state.activeTab} index={1}>
                </TabPanel>
                <TabPanel value={this.state.activeTab} index={2}>
                </TabPanel>
            </Card>
        )
    }
}

export default Friends;