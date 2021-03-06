import { 
    SAVE_POST,
    FORUM_LIST
} from "@constants";
import * as API from "@constants/api";

export const savePost = data => {
    return dispatch => {
        API.savePost(data, (response) => {
            dispatch({
                type : SAVE_POST,
                payload : response.data
            })
        })
    }
}

export const getAllForums = () => {
    return dispatch => {
        API.getAllForums((response) => {
            dispatch({
                type : FORUM_LIST,
                payload : response
            })
        })
    }
}