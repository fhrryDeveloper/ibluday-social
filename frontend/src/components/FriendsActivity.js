import React from "react";
import Card from "@material-ui/core/Card";
import CardHeader from "@material-ui/core/CardHeader";
import Avatar from "@material-ui/core/Avatar";
import Typography from "@material-ui/core/Typography";
import IconButton from "@material-ui/core/IconButton";
import MoreVertIcon from '@material-ui/icons/MoreVert';

class FriendsActivity extends React.Component{
    render(){
        return(
            <Card className="app-card-box-shadow app-list-card app-menu">
                <CardHeader
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    subheader={ <>Friends Activity</> }
                />
                {this.props.data.notifications.map((item, index) => {
                    return(
                        <CardHeader
                            key={"friendsActivity" + index}
                            className="app-menu-list"
                            avatar={
                                <Avatar alt={item.title} src={item.avatar} className="app-menu-avatar" />
                            }
                            title={<Typography className="app-menu-notification-title" variant="subtitle2" color="textSecondary">{item.title}</Typography>}
                            subheader={<Typography variant="overline" color="textSecondary">{item.date}</Typography>}
                        />
                    )
                })}
            </Card>
        )
    }
}

export default FriendsActivity;