import CardHeader from '@material-ui/core/CardHeader';
import Avatar from '@material-ui/core/Avatar';
import IconButton from '@material-ui/core/IconButton';
import GroupAddIcon from '@material-ui/icons/GroupAdd';

const GroupsList = ({data}) => {
    return(
        data.map((item, index) => {
            return(
                <CardHeader
                    key={"friend" + index}
                    avatar={
                        <Avatar alt={item.groupName} src={item.photo} className="app-avartar" />
                    }
                    action={
                        <IconButton className="app-friend-add-icon" aria-label="settings">
                            <GroupAddIcon />
                        </IconButton>
                    }
                    title={item.groupName}
                    subheader={item.date}
                    className="app-styles-card-header"
                />
            )
        })
    )
}
export default GroupsList;