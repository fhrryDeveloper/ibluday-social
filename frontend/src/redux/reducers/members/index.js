import { 
    MEMBER_LIST,
    MEMBER_COUNT,
    FRIEND_LIST,
    ADD_FRIEND,
    FRIEND_REQUEST_LIST
} from "@constants";

const members = (state = {
    count : {},
    list : [],
    friends : [],
    friendRequestsList : []
}, action) => {
    switch (action.type) {
        case MEMBER_LIST: {
            return { ...state, list : action.payload }
        }
        case MEMBER_COUNT: {
            return { ...state, count : action.payload }
        }
        case ADD_FRIEND: {
            return { ...state }
        }
        case FRIEND_LIST: {
            return { ...state, friends : action.payload}
        }
        case FRIEND_REQUEST_LIST: {
            return { ...state, friendRequestsList : action.payload}
        }
        default: {
            return state
        }
    }
}

export default members
