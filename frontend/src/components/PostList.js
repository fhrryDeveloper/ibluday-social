import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import Typography from "@material-ui/core/Typography";

const FriendList = ({data}) => {
    return(
        data.map((item, index) => {
            return(
                <CardHeader
                    key={"post" + index}
                    avatar={
                        <Avatar alt={item.title} src={item.cover} className="app-avartar" />
                    }
                    title={<a className="app-post-link" href={item.link} alt={item.title} >{item.title}</a>}
                    subheader={<Typography variant="overline" color="textSecondary">{item.date}</Typography>}
                />
            )
        })
    )
}
export default FriendList;