import { 
    CONFIG_CHANGE_DRAWER_STATE,
    CONFIG_CHANGE_ACTIVE_DRAWER
} from "@constants"
import config from "@config";
import { history } from "@app/history"

export const changeDrawerState = value => {
    return dispatch => {
        dispatch({
            type: CONFIG_CHANGE_DRAWER_STATE,
            payload: value
        })
    }
}
export const changeActiveDrawer = (index, path) => {
    return dispatch => {
        if(path)
            history.push("/" + path)
        if(typeof(index) == "number"){
            dispatch({
                type: CONFIG_CHANGE_ACTIVE_DRAWER,
                payload: index
            })
        }
        else {
            var realIndex = 0;
            for(var i = 0; i < config.navigators.length; i++){
                if(index === config.navigators[i].path)
                    realIndex = i;
            }
            dispatch({
                type: CONFIG_CHANGE_ACTIVE_DRAWER,
                payload: realIndex
            })
        }
    }
}