import React from "react";

import clsx from 'clsx';
import configure from "@config";
import List from '@material-ui/core/List';
import Link from '@material-ui/core/Link';
import Drawer from '@material-ui/core/Drawer';
import Avatar from '@material-ui/core/Avatar';
import Tooltip from '@material-ui/core/Tooltip';
import Scrollbars from "react-custom-scrollbars";
import EventIcon from '@material-ui/icons/Event';
import ForumIcon from '@material-ui/icons/Forum';
import StyleIcon from '@material-ui/icons/Style';
import ListItem from '@material-ui/core/ListItem';
import Typography from '@material-ui/core/Typography';
import EqualizerIcon from '@material-ui/icons/Equalizer';
import ViewArrayIcon from '@material-ui/icons/ViewArray';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import EmojiEventsIcon from '@material-ui/icons/EmojiEvents';
import EmojiEmotionsIcon from '@material-ui/icons/EmojiEmotions';
import SupervisedUserCircleIcon from '@material-ui/icons/SupervisedUserCircle';

import { connect } from "react-redux";
import { changeActiveDrawer } from '@actions/config';

const MainDrawer = ({config, auth, changeActiveDrawer}) => {
    const isdrawerOpen = config.drawerOpen;
    const activeDrawer = config.activeDrawer;
    const user = auth.session || {};
    const navigators = configure.navigators;
    const handleActiveDrawer = (index, path) => {
        changeActiveDrawer(index, path);
    }
    return(
        <Drawer
            variant="permanent"
            className={clsx("app-drawer", {
                "app-drawer-open": isdrawerOpen,
                "app-drawer-close": !isdrawerOpen,
            })}
            classes={{
                paper: clsx({
                    "app-drawer-open-paper": isdrawerOpen,
                    "app-drawer-close-paper": !isdrawerOpen,
                }),
            }}
        >
            <Scrollbars 
                className="app-drawer-scroll-bar"
                autoHide 
                autoHideTimeout={1000}
                autoHideDuration={200}
                thumbMinSize={0}
                universal
            >
                <div>
                    <div 
                        className={clsx({"app-drawer-profile-cover" : isdrawerOpen})} 
                        style={{ background : "url('" + configure.prefixUrl(user.coverImage, "coverimage") + "'"}}
                    />  
                    <div className={clsx(
                        {
                            "app-drawer-profile-full" : isdrawerOpen,
                            "app-drawer-profile-mini" : !isdrawerOpen
                        })}
                    >
                        <Avatar alt={user.username} src={configure.prefixUrl(user.avatar, "avatar")} />
                        <Typography display="block">
                            {user.username}
                        </Typography>
                        <Link href={"mailto:" + user.email || "blueday@bluedaycorporation.com"} underline="none">{user.email || ""}</Link>
                    </div>
                </div>
                <List className={clsx({"app-drawer-parent" : isdrawerOpen})}>
                    {navigators.map((item, index) => (
                        <Tooltip title={item.title} placement="right" key={item.title}>
                            <ListItem 
                                button 
                                className={clsx("app-drawer-item", 
                                    {"app-drawer-active" : activeDrawer === index})
                                }
                                onClick={() => handleActiveDrawer(index, item.path)}
                            >
                                <ListItemIcon className="app-drawer-item-icon">
                                    {index === 0 ? <ViewArrayIcon /> : ""}
                                    {index === 1 ? <EqualizerIcon /> : ""}
                                    {index === 2 ? <EmojiEmotionsIcon /> : ""}
                                    {index === 3 ? <SupervisedUserCircleIcon /> : ""}
                                    {index === 4 ? <StyleIcon /> : ""}
                                    {index === 5 ? <EmojiEventsIcon /> : ""}
                                    {index === 6 ? <EventIcon /> : ""}
                                    {index === 7 ? <ForumIcon /> : ""}
                                    {index === 8 ? <ForumIcon /> : ""}
                                </ListItemIcon>
                                <ListItemText className="app-drawer-item-icon" primary={item.title} />
                            </ListItem>
                        </Tooltip>
                    ))}
                </List>
            </Scrollbars>
        </Drawer>
    )
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        config : state.config
    }
}
export default connect(mapStateToProps, {
    changeActiveDrawer
})(MainDrawer)