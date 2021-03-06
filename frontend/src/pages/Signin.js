import React from 'react';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import config from "@config";
import CardContent from '@material-ui/core/CardContent';
import { GoogleLogin } from 'react-google-login';
import { signInWithGoogle } from '@actions/auth/signin';
import { signInWithJwt } from '@actions/auth/signin';
import { sessionCheck } from '@actions/auth/signin';
import { connect } from "react-redux"
import { history } from "@app/history"

class SignIn extends React.Component{
    state = {
        email : "",
        password : "",
        isLoaded : false
    }
    componentDidMount(){
        this.props.sessionCheck();
        config.loadRecaptcha((result) => {
            if(result)
                this.setState({ isLoaded : true })
            else    
                this.setState({ isLoaded : false })
        });
    }
    handleRecaptcha = (e) => {
        e.preventDefault();
        if(this.state.isLoaded){
            window.grecaptcha.ready(() => {
                window.grecaptcha.execute(config.siteKey, { action: 'submit' }).then(gRecaptchaToken => {
                    this.handleSignIn(gRecaptchaToken);
                });
            });
        } else {
            alert("something went wrong!", "error")
        }
    }
    componentDidUpdate(){
        if(this.props.auth.session.isSession){
            history.push("/news")
        }
    }
    handleSignIn = (gRecaptchaToken) => {
        const user = {
            email : this.state.email,
            password : this.state.password,
            gRecaptchaToken : gRecaptchaToken
        }
        this.props.signInWithJwt(user);
    }
    responseGoogle = (googleUser) => {    
        if(googleUser.error){
            console.log(googleUser.error)
        } else {
            if(googleUser.hasOwnProperty("getBasicProfile")){
                const profile = googleUser.getBasicProfile();
                const user = {
                    username : profile.getName(),
                    avatar : profile.getImageUrl(),
                    email : profile.getEmail(),
                    id : profile.getId(),
                }
                this.props.signInWithGoogle(user);
            } else {
                alert("Something went wrong!", "error")
            }
        }
    }
    render(){
        return (
            <div className="app-root-signin" style={{background : 'url("assets/background/01.jpg")'}}>
                <Container id="app-signin-container" component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className="app-signin-paper">
                        <Avatar className="app-signin-avartar" alt="logo" src="assets/logo.png" />
                        <Typography id="logoTitle" component="h1" variant="h5">
                            BLUEDAY INC CORPORATION
                        </Typography>
                        <form className="app-signin-form" onSubmit={e => this.handleRecaptcha(e)}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                type="email"
                                required
                                fullWidth
                                className="app-signin-input"
                                id="email"
                                label="Email Address"
                                name="email"
                                autoComplete="email"
                                autoFocus
                                onChange={e => this.setState({email : e.target.value})}
                            />
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                className="app-signin-input"
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                onChange={e => this.setState({password : e.target.value})}
                                autoComplete="current-password"
                            />
                            <FormControlLabel
                                control={<Checkbox value="remember" color="primary" />}
                                label="Remember me"
                            />
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                color="primary"
                                className="app-signin-submit"
                            >
                                Sign In
                            </Button>
                            <Grid container justify="center">
                                <Grid item>
                                    Have not an account? 
                                    <Link href="/signup" variant="body2">
                                       Sign Up
                                    </Link>
                                </Grid>
                            </Grid>
                            <Divider className="app-signin-divider" />
                            <Grid className="app-signin-social-container" container>
                                <Grid item>
                                    <GoogleLogin
                                        clientId={config.googleClientId}
                                        onSuccess={(response) => this.responseGoogle(response)}
                                        onFailure={(response) => this.responseGoogle(response)}
                                        render={renderProps  => {
                                            return(
                                                <Card onClick={renderProps.onClick} className="app-signin-social-card">
                                                    <CardContent>
                                                        <img className="app-signin-social-icon" src="assets/social/google.svg" alt="google" />
                                                    </CardContent>
                                                </Card>
                                            )
                                        }}
                                    >
                                    </GoogleLogin>
                                </Grid>
                                <Grid item>
                                    <Card className="app-signin-social-card">
                                        <CardContent>
                                            <img className="app-signin-social-icon" src="assets/social/facebook.svg" alt="facebook" />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card className="app-signin-social-card">
                                        <CardContent>
                                            <img className="app-signin-social-icon" src="assets/social/twitter.svg" alt="twitter" />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card className="app-signin-social-card">
                                        <CardContent>
                                            <img className="app-signin-social-icon" src="assets/social/instagram.svg" alt="instagram" />
                                        </CardContent>
                                    </Card>
                                </Grid>
                            </Grid>
                        </form>
                    </div>
                </Container>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        auth : state.auth,
        config : state.config
    }
}

export default connect(mapStateToProps, {
    signInWithGoogle,
    signInWithJwt, 
    sessionCheck
})(SignIn)