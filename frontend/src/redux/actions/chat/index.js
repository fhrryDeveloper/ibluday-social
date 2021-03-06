import { 
    CHAT_LIST
} from "@constants";
import * as API from "@constants/api";

export const getChatList = params => {
    return dispatch => {
        API.getChatList(params, (data) => {
            dispatch({
                type : CHAT_LIST,
                payload : data
            })
        });
    }
}