import { history } from "@app/history";
import axios from "axios";
import config from "@config";
import { SIGNUP_WITH_JWT } from "@constants";

export const signUpWithJWT = user => {
    return dispatch => {
        axios.post(config.HOSTURL + "/api/auth/signup", {
            ...user
        })
        .then(response => {
            if(response.data.data){
                sessionStorage.setItem("token", response.data.token);
                response.data.data.isSession = true;
                dispatch({
                    type: SIGNUP_WITH_JWT,
                    payload: response.data.data
                })
                config.removeRecaptcha();
                history.push("/");
            }
        })
        .catch((error) => {
            console.log(error.status)
        })
    }
}