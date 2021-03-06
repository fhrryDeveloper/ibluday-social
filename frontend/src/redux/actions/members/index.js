import { 
    MEMBER_LIST, 
    MEMBER_COUNT,
    FRIEND_LIST,
    ADD_FRIEND,
    ACCEPT_FRIEND,
    FRIEND_REQUEST_LIST
} from "@constants";
import * as API from "@constants/api";

export const getMembers = params => {
    return dispatch => {
        API.getMembers(params, (data) => {
            dispatch({
                type : MEMBER_LIST,
                payload : data
            })
        });
    }
}
export const getMembersCount = () => {
    return dispatch => {
        API.getMembersCount((data) => {
            dispatch({
                type : MEMBER_COUNT,
                payload : data
            })
        });
    }
}
export const addFriend = params => {
    return dispatch => {
        API.addFriend(params, (data) => {
            console.log(data)
            dispatch({
                type : ADD_FRIEND,
                payload : data
            })
        })
    }
}
export const getFriends = params => {
    return dispatch => {
        API.getFriends(params, (data) => {
            dispatch({
                type : FRIEND_LIST,
                payload : data
            })
        })
    }
}
export const getFriendRequests = params => {
    return dispatch => {
        API.getFriendRequests(params, (data) => {
            dispatch({
                type : FRIEND_REQUEST_LIST,
                payload : data
            })
        })
    }
}

export const acceptFriend = id => {
    return dispatch => {
        API.acceptFriend(id, (data) => {
            if(data)
                alert("Accepted successfully", "success")
            dispatch({
                type : ACCEPT_FRIEND,
                payload : data
            })
        })
    }
}