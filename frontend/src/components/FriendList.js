import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import PersonAddIcon from '@material-ui/icons/PersonAdd';

const FriendList = ({data}) => {
    return(
        data.map((item, index) => {
            return(
                <CardHeader
                    key={"friend" + index}
                    avatar={
                        <Avatar alt={item.username} src={item.photo} className="app-avartar">
                            R
                        </Avatar>
                    }
                    action={
                        <IconButton className="app-friend-add-icon" aria-label="settings">
                            <PersonAddIcon />
                        </IconButton>
                    }
                    className="app-styles-card-header"
                    title={item.username}
                    subheader={item.date}
                />
            )
        })
    )
}
export default FriendList;