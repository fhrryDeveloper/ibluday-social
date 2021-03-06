import { 
    FORUM_LIST
} from "@constants";

const forum = (state = {
    list : []
}, action) => {
    switch (action.type) {
        case FORUM_LIST: {
            return { ...state, list : action.payload }
        }
        default : {
            return state
        }
    }
}

export default forum;