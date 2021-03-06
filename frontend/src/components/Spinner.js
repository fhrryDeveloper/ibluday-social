import { Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Loader from 'react-loader-spinner'

const useStyles = makeStyles((theme) => ({
    root: {
        width : "100%",
        height : "100%",
        background : "#fff",
        display : "flex",
        position : "fixed",
        top : 0,
        left : 0,
        justifyContent : "center",
        alignItems : "center",
        flexDirection : "column"
    },
    logo: {
        width : 120,
        height : 120
    },
    companyName : {
        textAlign : "center",
        marginTop : theme.spacing(1),
        fontSize : 20,
        fontWeight : 'bold'
    },
    loadingTitle: {
        marginTop : theme.spacing(1),
        textAlign : "center",
    }
}))

const Spinner = () => {
    const classes = useStyles();
    return(
        <div className={classes.root}>
            <img className={classes.logo} src="assets/logo.png" alt="logo"/>
            <Typography className={classes.companyName}>BLUEDAY INC <br/> CORPORATION</Typography>
            <Loader type="Hearts" color="#00BFFF" height={40} width={40} />
        </div>
    )
}
export default Spinner;