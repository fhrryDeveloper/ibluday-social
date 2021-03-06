import 'date-fns';
import React from 'react';
import clsx from "clsx";
import axios from "axios";
import PropTypes from 'prop-types';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import CssBaseline from '@material-ui/core/CssBaseline';
import TextField from '@material-ui/core/TextField';
import Link from '@material-ui/core/Link';
import Grid from '@material-ui/core/Grid';
import Check from '@material-ui/icons/Check';
import Container from '@material-ui/core/Container';
import Divider from '@material-ui/core/Divider';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import StepConnector from '@material-ui/core/StepConnector';
import CircularProgress from '@material-ui/core/CircularProgress';
import DateFnsUtils from '@date-io/date-fns';
import Autocomplete from '@material-ui/lab/Autocomplete';
import FormControl from '@material-ui/core/FormControl';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import MaskedInput from 'react-text-mask';
import Select from '@material-ui/core/Select';
import OutlinedInput  from "@material-ui/core/OutlinedInput";
import config from "@config";
import { GoogleLogin } from 'react-google-login';
import { sessionCheck } from '@actions/auth/signin';
import { signUpWithJWT } from '@actions/auth/signup';
import { connect } from "react-redux";
import { history } from "@app/history";
import { withStyles } from '@material-ui/core/styles';
import { 
    MuiPickersUtilsProvider, 
    KeyboardDatePicker 
} from '@material-ui/pickers';

function QontoStepIcon(props) {
    const { active, completed } = props;
  
    return (
        <div
            className={clsx("app-signup-stepper-root", {
            "app-signup-stepper-active" : active,
            })}
        >
            {completed ? <Check className="app-signup-stepper-completed" /> : <div className="app-signup-stepper-circle" />}
        </div>
    );
}
  
QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     */
    active: PropTypes.bool,
    /**
     * Mark the step as completed. Is passed to child components.
     */
    completed: PropTypes.bool,
};

const QontoConnector = withStyles({
    alternativeLabel: {
      top: 10,
      left: 'calc(-50% + 16px)',
      right: 'calc(50% + 16px)',
    },
    active: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    completed: {
      '& $line': {
        borderColor: '#784af4',
      },
    },
    line: {
      borderColor: '#eaeaf0',
      borderTopWidth: 3,
      borderRadius: 1,
    },
})(StepConnector);

class SignIn extends React.Component{
    state = {
        email : "",
        password : "",
        username : "",
        country : "",
        gender : "",
        phoneNumber : '',
        phoneMask : "",
        zipCode : "",
        company : "",
        signUpButton : "Finish",
        birthday : new Date(),
        activeStep : 0
    }
    componentDidMount(){
        this.props.sessionCheck();
        config.loadRecaptcha();
    }
    componentDidUpdate(){
        if(this.props.auth.session.isSession){
            history.push("/news")
        }
    }
    handleRecaptcha = (e) => {
        e.preventDefault();
        window.grecaptcha.ready(() => {
            window.grecaptcha.execute(config.siteKey, { action: 'submit' }).then(gRecaptchaToken => {
                this.handleSignUp(gRecaptchaToken);
            });
        });
    }
    responseGoogle = (googleUser) => {
        if(googleUser.error){
            console.log(googleUser.error)
        } else {
            const profile = googleUser.getBasicProfile();
            const user = {
                username : profile.getName(),
                avatar : profile.getImageUrl(),
                email : profile.getEmail(),
                id : profile.getId(),
            }
            this.props.signInWithGoogle(user);
        }
    }

    getSteps = () => {
        return ['Auth', 'Info'];
    }

    phoneNumberInput = (props) => {
        const { inputRef, ...other } = props;
        let mask = [' ', '(', /[1-9]/, /\d/, /\d/, ')', ' ', /\d/, /\d/, /\d/, '-', /\d/, /\d/, /\d/, /\d/];
        let phoneMask = this.state.phoneMask;
        for(var i = phoneMask.length - 1; i >= 0; i --){
            mask.unshift(phoneMask[i])
        }
        return (
            <MaskedInput
                {...other}
                ref={(ref) => {
                    inputRef(ref ? ref.inputElement : null);
                }}
                mask={mask}
                placeholderChar={'\u2000'}
                showMask
            />
        );
    }
    zipCodeInput = (props) => {
        const { inputRef, ...other } = props;
        return (
            <MaskedInput
                {...other}
                ref={(ref) => {
                    inputRef(ref ? ref.inputElement : null);
                }}
                mask={[/\d/, /\d/, /\d/, /\d/, /\d/]}
                placeholderChar={'\u2000'}
                showMask
            />
        );
    }

    getStepContent = step => {
        switch (step) {
            case 0:
                return(
                    <Grid container spacing={0}>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                type="text"
                                required
                                fullWidth
                                className="app-signup-input"
                                id="username"
                                label="User Name"
                                name="username"
                                autoFocus
                                value={this.state.username}
                                onChange={e => this.setState({username : e.target.value})}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                type="email"
                                required
                                fullWidth
                                className="app-signup-input"
                                id="email"
                                label="Email Address"
                                name="email"
                                value={this.state.email}
                                onChange={e => this.handleEmailChange(e)}
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField
                                variant="outlined"
                                margin="normal"
                                required
                                fullWidth
                                className="app-signup-input"
                                name="password"
                                label="Password"
                                type="password"
                                id="password"
                                value={this.state.password}
                                onChange={e => this.setState({password : e.target.value})}
                            />
                        </Grid>
                    </Grid>
                )
            case 1:
                return(
                    <>
                        <Grid container spacing={3} style={{margin : "16px 0px"}} alignItems="center">
                            <Grid item xs={6}>
                                <FormControl fullWidth variant="outlined">
                                    <InputLabel id="demo-simple-select-label">Gender</InputLabel>
                                    <Select
                                        labelId="demo-simple-select-label"
                                        id="demo-simple-select"
                                        value={this.state.gender}
                                        onChange={this.handleGenderChange}
                                    >
                                        <MenuItem value={"Male"}>Male</MenuItem>
                                        <MenuItem value={"Female"}>Female</MenuItem>
                                        <MenuItem value={"Not to say"}>Not to say</MenuItem>
                                    </Select>
                                </FormControl>
                            </Grid>
                            <Grid item xs={6}>
                                <MuiPickersUtilsProvider utils={DateFnsUtils}>
                                    <KeyboardDatePicker
                                        fullWidth
                                        inputVariant="outlined"
                                        id="date-picker-dialog"
                                        label="Birthday"
                                        format="MM/dd/yyyy"
                                        value={this.state.birthday}
                                        onChange={this.handleDateChange}
                                        KeyboardButtonProps={{
                                            'aria-label': 'change date',
                                        }}
                                    />
                                </MuiPickersUtilsProvider>
                            </Grid>
                            <Grid item xs={12}>
                                <Autocomplete
                                    id="user-country"
                                    fullWidth
                                    options={config.countries}
                                    autoHighlight
                                    classes={{
                                        option : "app-signup-country-option"
                                    }}
                                    onChange={this.handleCountryChange}
                                    getOptionLabel={(option) => option.label}
                                    renderOption={(option) => (
                                        <React.Fragment>
                                            <span>{this.countryToFlag(option.code)}</span>
                                            {option.label} ({option.code}) + {option.phone}
                                        </React.Fragment>
                                    )}
                                    renderInput={(params) => (
                                        <TextField
                                            {...params}
                                            label="Country"
                                            variant="outlined"
                                            fullWidth
                                            inputProps={{
                                                ...params.inputProps,
                                            }}
                                        />
                                    )}
                                />
                            </Grid>
                            <Grid item xs={8}>
                                <FormControl fullWidth>
                                    <InputLabel variant="outlined" htmlFor="phone-number">Phone Number</InputLabel>
                                    <OutlinedInput 
                                        value={this.state.phoneNumber}
                                        onChange={this.handlePhoneNumberChange}
                                        name="textmask"
                                        id="phone-number"
                                        label="Phone Number"
                                        inputComponent={this.phoneNumberInput}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={4}>
                                <FormControl fullWidth>
                                    <InputLabel variant="outlined" htmlFor="zip-code">Zip Code</InputLabel>
                                    <OutlinedInput
                                        value={this.state.zipCode}
                                        onChange={this.handleZipCodeChange}
                                        name="textmask"
                                        id="zip-code"
                                        label="Zip Code"
                                        inputComponent={this.zipCodeInput}
                                    />
                                </FormControl>
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    variant="outlined"
                                    fullWidth
                                    className="app-signup-input"
                                    name="company"
                                    label="Company"
                                    type="text"
                                    id="company"
                                    value={this.state.company}
                                    onChange={e => this.setState({company : e.target.value})}
                                />
                            </Grid>
                        </Grid>
                    </>
                )
            case 2:
                return(
                    <></>
                );
            default:
                return(
                    <Button
                        type="submit"
                        fullWidth
                        variant="contained"
                        color="primary"
                        className="app-signup-submit"
                    >
                        Sign In
                    </Button>
                );
        }
    }
    countryToFlag = isoCode => {
        return typeof String.fromCodePoint !== 'undefined'
          ? isoCode
              .toUpperCase()
              .replace(/./g, (char) => String.fromCodePoint(char.charCodeAt(0) + 127397))
          : isoCode;
    }
    handleSignUp = (gRecaptchaToken) => {
        var birthday = this.state.birthday;
        birthday = birthday.getFullYear() + "-" + (birthday.getMonth() + 1) + "-" + birthday.getDate();
        console.log(birthday)
        const user = {
            email : this.state.email,
            password : this.state.password,
            username : this.state.username,
            gender : this.state.gender,
            company : this.state.company,
            country : this.state.country,
            zipCode : this.state.zipCode,
            phone : this.state.phoneNumber,
            birthday : birthday,
            gRecaptchaToken : gRecaptchaToken
        }
        this.setState({ signUpButton : <CircularProgress color="inherit" size={30} /> })
        this.props.signUpWithJWT(user);
    }
    handleSubmit = (e, isCompleted) => {
        e.preventDefault();
        if(isCompleted)
            this.handleRecaptcha(e);
        else{
            axios.post(config.HOSTURL + "/api/auth/emailCheck", {
                email : this.state.email
            }).then(response => {
                console.log(response.data)
                if(response.data){
                    alert("This email is taken.", "error");
                } else {
                    this.handleNext();
                }
            });
        }
    }
    handleEmailChange = e => {
        this.setState({ email : e.target.value })
    }
    handleCountryChange = (event, value) => {
        if(value === null)
            return;
        const phoneNumber = value.phone;
        this.setState({
            country : value.label,
            phoneMask : phoneNumber,
        })
    }
    handleZipCodeChange = (event) => {
        this.setState({ zipCode : event.target.value });
    }
    handlePhoneNumberChange = (event) => {
        this.setState({ phoneNumber : event.target.value });
    };
    handleGenderChange = event => {
        this.setState({ gender :  event.target.value })
    }
    handleDateChange = date => {
        this.setState({ birthday : date })
    }
    handleNext = () => {
        this.setState({ activeStep : this.state.activeStep + 1 })
    };
    
    handleBack = () => {
        this.setState({ activeStep : this.state.activeStep - 1 })
    };
    
    handleReset = () => {
        this.setState({ activeStep : 0 })
    };
    render(){
        const steps = this.getSteps();
        return (
            <div className="app-root-signup" style={{background : 'url("assets/background/01.jpg")'}}>
                <Container id="app-signup-container" component="main" maxWidth="sm">
                    <CssBaseline />
                    <div className="app-signup-paper">
                        <Avatar className="app-signup-avartar" alt="logo" src="assets/logo.png" />
                        {/* <Typography id="logoTitle" component="h1" variant="h5">
                            BLUEDAY INC CORPORATION
                        </Typography> */}
                        <form className="app-signup-form" onSubmit={e => this.handleSubmit(e, this.state.activeStep === steps.length - 1)}>
                            <Stepper alternativeLabel activeStep={this.state.activeStep} connector={<QontoConnector />}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={QontoStepIcon}>{label}</StepLabel>
                                    </Step>
                                ))}
                            </Stepper>
                            <>
                                {this.getStepContent(this.state.activeStep)}
                                    <div className="app-signup-stepper-button-container">
                                        <Button disabled={this.state.activeStep === 0} className="app-signup-stepper-button" onClick={this.handleBack}>
                                            Back
                                        </Button>
                                        <Button
                                            variant="contained"
                                            color="primary"
                                            className="app-signup-stepper-button"
                                            type="submit"
                                        >
                                            {this.state.activeStep === steps.length - 1 ? this.state.signUpButton : 'Next'}
                                        </Button>
                                    </div>
                            </>
                            <Grid container justify="center">
                                <Grid item>
                                    Already have an account?
                                    <Link href="/signin" variant="body2">
                                       Sign In
                                    </Link>
                                </Grid>
                            </Grid>
                            <Divider className="app-signup-divider" />
                            <Grid className="app-signup-social-container" container>
                                <Grid item>
                                    <GoogleLogin
                                        clientId={config.googleClientId}
                                        onSuccess={this.responseGoogle}
                                        onFailure={this.responseGoogle}
                                        render={renderProps  => {
                                            return(
                                                <Card onClick={renderProps.onClick} className="app-signup-social-card">
                                                    <CardContent>
                                                        <img className="app-signup-social-icon" src="assets/social/google.svg" alt="google" />
                                                    </CardContent>
                                                </Card>
                                            )
                                        }}
                                    >
                                    </GoogleLogin>
                                </Grid>
                                <Grid item>
                                    <Card className="app-signup-social-card">
                                        <CardContent>
                                            <img className="app-signup-social-icon" src="assets/social/facebook.svg" alt="facebook" />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card className="app-signup-social-card">
                                        <CardContent>
                                            <img className="app-signup-social-icon" src="assets/social/twitter.svg" alt="twitter" />
                                        </CardContent>
                                    </Card>
                                </Grid>
                                <Grid item>
                                    <Card className="app-signup-social-card">
                                        <CardContent>
                                            <img className="app-signup-social-icon" src="assets/social/instagram.svg" alt="instagram" />
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
    sessionCheck,
    signUpWithJWT
})(SignIn)