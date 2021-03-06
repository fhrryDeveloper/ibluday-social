import { UPDATE_PROFILE_COVER_IMAGE } from "@constants";

const profile = (state = {
    coverImageUploadState : {}
}, action) => {
    switch (action.type) {
        case UPDATE_PROFILE_COVER_IMAGE: {
            return { ...state, coverImageUploadState : action.payload }
        }
        default: {
            return state
        }
    }
}

export default profile
