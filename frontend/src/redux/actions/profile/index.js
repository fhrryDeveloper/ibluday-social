import { UPDATE_PROFILE_COVER_IMAGE } from "@constants";
import jwt_decode from "jwt-decode";
import config from '@config';

export const changeProfileImage = (image, type) => {
    return dispatch => {
        var token = sessionStorage.getItem("token");
        var user = jwt_decode(token).auth_data;
        var xhr = new XMLHttpRequest();
        const requestData = new FormData();
        requestData.append("image", image);
        requestData.append("id", user._id);
        xhr.addEventListener("readystatechange", function() {
            if(this.readyState === 4) {
                var data = JSON.parse(this.response)
                dispatch({
                    type: UPDATE_PROFILE_COVER_IMAGE,
                    payload: data
                })
            } 
        });
        var endpoint = "";
        switch(type){
            case "coverimage" :
                endpoint = config.HOSTURL + "/api/upload/changeProfileCoverImage";
                break;
            case "avatar" :
                endpoint = config.HOSTURL + "/api/upload/changeUserAvatar";
                break;
            default : 
                endpoint = ""
        }
        xhr.open("POST", endpoint);
        xhr.setRequestHeader("Authorization", "Bearer " + token.toString());
        xhr.send(requestData);  
    }
}
