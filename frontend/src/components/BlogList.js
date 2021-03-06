import React from "react";
import clsx from 'clsx';
import Card from '@material-ui/core/Card';
import AvatarGroup from '@material-ui/lab/AvatarGroup';
import FavoriteIcon from '@material-ui/icons/Favorite';
import CardMedia from '@material-ui/core/CardMedia';
import CardHeader from '@material-ui/core/CardHeader';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import MoreVertIcon from '@material-ui/icons/MoreVert';
import ShareIcon from '@material-ui/icons/Share';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const RenderItem = ({item}) => {
    const [expanded, setExpanded] = React.useState(false);
    const handleExpandClick = () => {
        setExpanded(!expanded);
    }
    return(
        <>
            <Card className="app-card-box-shadow">
                <CardHeader
                    avatar={
                        <Avatar alt={item.posterName} src={item.posterPhoto} className="app-avartar">
                            {item.posterName}
                        </Avatar>
                    }
                    action={
                        <IconButton aria-label="settings">
                            <MoreVertIcon />
                        </IconButton>
                    }
                    title={item.posterName}
                    subheader={item.date}
                />
                <CardMedia
                    className="app-inner-media"
                    image={item.cover}
                    title={item.id}
                />
                <CardContent>
                    <Typography variant="h6" gutterBottom>
                        {item.title}
                    </Typography>
                    <Typography variant="body2" color="textSecondary" component="p">
                        {item.content}
                    </Typography>
                </CardContent>
                <CardContent className="app-styles-blog-footer">
                    <div className="app-styles-blog-avatar">
                        <AvatarGroup max={3} className="app-styles-blog-avatar-group">
                            <Avatar alt="Remy Sharp" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Travis Howard" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Cindy Baker" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Cindy Baker" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Cindy Baker" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Cindy Baker" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                        </AvatarGroup>
                        <AvatarGroup max={5} className="app-styles-blog-avatar-group">
                            <Avatar alt="Remy Sharp" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Travis Howard" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Cindy Baker" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Cindy Baker" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Cindy Baker" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                            <Avatar alt="Cindy Baker" src="assets/avatar/default.jpg" className="app-styles-blog-avatar-image" />
                        </AvatarGroup>
                    </div>
                    <div>
                        <Typography className="app-styles-blog-state" variant="overline" color="textSecondary">5 Comments</Typography>
                        <Typography className="app-styles-blog-state" variant="overline" color="textSecondary">2 Shares</Typography>
                    </div>
                </CardContent>
                <CardActions disableSpacing>
                    <IconButton aria-label="add to favorites">
                        <FavoriteIcon />
                    </IconButton>
                    <IconButton aria-label="share">
                        <ShareIcon />
                    </IconButton>
                    <IconButton
                        className={clsx("app-expand ", {
                            "app-expand-open" : expanded,
                        })}
                        onClick={handleExpandClick}
                        aria-expanded={expanded}
                        aria-label="show more"
                    >
                        <ExpandMoreIcon />
                    </IconButton>
                </CardActions>
                <Collapse in={expanded} timeout="auto" unmountOnExit>
                    <CardContent>
                        {item.detail}
                    </CardContent>
                </Collapse>
            </Card>
            <div className="app-space-between-cards" />
        </>
    )
}

const BlogList = ({data}) => {
    return(
        data.map((item, index) => {
            return(
                <RenderItem key={"blog" + index} item={item} />
            )
        })
    )
}
export default BlogList;