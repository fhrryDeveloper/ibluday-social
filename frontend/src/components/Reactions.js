import React from "react";
import Clsx from 'clsx';
import Grid from '@material-ui/core/Grid';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import IconButton from '@material-ui/core/IconButton';
import Typography from "@material-ui/core/Typography";

class Reactions extends React.Component{
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
                    subheader="Reactions"
                />
                <CardContent className="app-news-reactions">
                    <Grid container>
                        {data.reactions.map((item, index) => {
                            return(
                                <Grid item key={index} xs={6} className="app-news-reactions-grid">
                                    <img className="app-news-reactions-image" src={item.icon} alt={item.title} />
                                    <Typography variant="h6" className="app-news-reactions-count">{item.count}</Typography>
                                    <Typography color="textSecondary" variant="caption" className="app-news-reactions-title">{item.title}</Typography>
                                </Grid>
                            )
                        })}
                    </Grid>
                </CardContent>
            </Card>
        )
    }
}

export default Reactions;