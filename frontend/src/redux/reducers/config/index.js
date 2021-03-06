import { 
    CONFIG_CHANGE_DRAWER_STATE,
    CONFIG_CHANGE_ACTIVE_DRAWER
} from "@constants";
import Configure from "@config";

const config = (state = Configure.defaultSettings, action) => {
    switch (action.type) {
        case CONFIG_CHANGE_DRAWER_STATE: {
            return { ...state, drawerOpen: action.payload }
        }
        case CONFIG_CHANGE_ACTIVE_DRAWER: {
            return { ...state, activeDrawer: action.payload }
        }
        default: {
            return state
        }
    }
}

export default config
