import { 
  SIGNIN_WITH_GOOGLE,
  SIGNIN_WITH_JWT,
  SIGNUP_WITH_JWT,
  SESSION_UPDATE
} from "@constants"

const Auth = (state = {
  session : {}
}, action) => {
    switch (action.type) {
        case SIGNIN_WITH_JWT: {
            return { ...state, session: action.payload }
        }
        case SIGNUP_WITH_JWT: {
            return { ...state, session: action.payload }
        }
        case SIGNIN_WITH_GOOGLE: {
            return { ...state, session: action.payload }
        }
        case SESSION_UPDATE: {
          return { ...state, session: action.payload }
        }
        default: {
          return state
        }
    }
}

export default Auth;