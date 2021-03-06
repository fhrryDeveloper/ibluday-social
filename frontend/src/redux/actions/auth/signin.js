import { history } from "@app/history"
import axios from "axios"
import config from "@config"
import jwt_decode from "jwt-decode"
import { 
    SIGNIN_WITH_GOOGLE, 
    SIGNIN_WITH_JWT,
    SESSION_UPDATE
} from "@constants"

export const signInWithJwt = user => {
    return dispatch => {
        axios.post(config.HOSTURL + "/api/auth/signin", {
            email: user.email,
            password: user.password,
            gRecaptchaToken : user.gRecaptchaToken
        })
        .then(response => {
            if(response.data.data){
                sessionStorage.setItem("token", response.data.token);
                response.data.data.isSession = true;
                dispatch({
                    type: SIGNIN_WITH_JWT,
                    payload: response.data.data
                })
                config.removeRecaptcha();
                alert(`Welcome ${response.data.data.username}`, 'success')
                history.push("/news");
            } else {
                if(response.data.data === null)
                    window.alert("Incorrect username or password.", "error");
                else 
                    window.alert("Something went wrong!", "error");
            }
        })
        .catch((error) => {
            window.alert(error.toString(), "error");
        })
    }
}

export const signInWithGoogle = user => {
    return dispatch => {
        axios.post(config.HOSTURL + "/api/auth/signinWithGoogle", {
            googleId : user.id,
            email : user.email,
            avatar : user.avatar,
            username : user.username
        }).then(response => {
            if(response.data.data){
                sessionStorage.setItem("token", response.data.token);
                response.data.data.isSession = true;
                dispatch({
                    type: SIGNIN_WITH_GOOGLE,
                    payload: response.data.data
                })
                alert(`Welcome ${response.data.data.username}`, 'success')
                config.removeRecaptcha();
                history.push("/news");
            } else {
                window.alert("Something went wrong", "error");
            }
        }).catch((error) => {
            window.alert(error.toString(), "error");
        })
    }
}

export const sessionCheck = () => {
    return dispatch => {
        var token = sessionStorage.getItem("token");
        const userData = {
            isSession : false,
        }
        if(token){
            try{
                var user = jwt_decode(token);
                console.log(user)
                var axios_config = {
                    method: 'post',
                    url: config.HOSTURL + "/api/auth/sessionCheck",
                    headers: { 
                        'Authorization': 'Bearer ' + token.toString()
                    },
                    data : user.auth_data
                };
                axios(axios_config).then(response => {
                    if(response.data){
                        sessionStorage.setItem("token", response.data.token);
                        var data = response.data.data;
                        data.isSession = true;
                        dispatch({
                            type: SESSION_UPDATE,
                            payload: data
                        })
                    } else {
                        dispatch({
                            type: SESSION_UPDATE,
                            payload: userData
                        })
                    }
                }).catch(e => {
                    dispatch({
                        type: SESSION_UPDATE,
                        payload: userData
                    })
                })
            } catch (e) {
                dispatch({
                    type: SESSION_UPDATE,
                    payload: userData
                })
            }
        } else {
            dispatch({
                type: SESSION_UPDATE,
                payload: userData
            })
        }
    }
}

