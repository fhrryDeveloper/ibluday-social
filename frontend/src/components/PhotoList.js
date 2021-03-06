import CardMedia from '@material-ui/core/CardMedia';

const PhotoList = ({data}) => {
    return(
        data.map((item, index) => {
            return(
                <CardMedia
                    key={index}
                    className="app-profile-photo-media"
                    image={item.url}
                    title={item.title}
                />
            )
        })
    )
}
export default PhotoList;