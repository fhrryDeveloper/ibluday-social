import React from "react";
import Router from "@app/Router";
import "@assets/scss/index.scss";
import 'animate.css/animate.css';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { withSnackbar } from 'notistack';
import { 
    createMuiTheme, 
    responsiveFontSizes,
    ThemeProvider 
} from '@material-ui/core/styles';

let theme = createMuiTheme({
    palette: {
        primary: {
          main: "#8cbc43",
        }
    }
})
theme = responsiveFontSizes(theme);
class App extends React.Component{
    componentDidMount(){
        const alert = (message, variant) => {
            this.props.enqueueSnackbar(message, { variant : variant });
        }
        window.alert = alert;
    }
    render(){
        return(
            <ThemeProvider theme={theme}>
                <Router />
            </ThemeProvider>
        )
    }
}
export default withSnackbar(App);