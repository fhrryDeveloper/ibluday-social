import { 
    CHAT_LIST
} from "@constants";

const chat = (state = {
    list : []
}, action) => {
    switch (action.type) {
        case CHAT_LIST: {
            return { ...state, list : action.payload }
        }
        default : {
            return state
        }
    }
}

export default chat;