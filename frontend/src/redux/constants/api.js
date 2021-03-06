import axios from "axios";
import config from "@config";

export const getMembers = (params, cb) => {
    const token = sessionStorage.getItem("token");
    const axios_config = {
        method: 'get',
        url: `${config.HOSTURL}/api/members/getMembers?q=${params.q}&start=${params.start}&count=${params.count}&except=${params.email}`,
        headers: { 
          'Authorization': 'Bearer ' + token.toString()
        },
    };
    axios(axios_config).then((response) => {
        if(response.data)
            cb(response.data)
        else 
            cb([])
    })
}

export const getMembersCount = (cb) => {
    const token = sessionStorage.getItem("token");
    const axios_config = {
        method : 'get',
        url : `${config.HOSTURL}/api/members/getMembersCount`,
        headers: { 
            'Authorization': 'Bearer ' + token.toString()
        },
    }
    axios(axios_config).then((response) => {
        if(response.data.count)
            cb(response.data.count)
        else    
            cb(0)
    })
}

export const addFriend = (params, cb) => {
    const token = sessionStorage.getItem("token");
    const axios_config = {
        method : 'post',
        url : `${config.HOSTURL}/api/members/addFriend`,
        headers: { 
            'Authorization': 'Bearer ' + token.toString()
        },
        data : params
    }
    axios(axios_config).then((response) => {
        if(response.data){
            alert("Added successfully", "success")
            cb(response.data);
        }
        else{
            alert("Already Added", "info")
            cb([]);
        }    
    }).catch(e => {
        alert(e.toString(), "error");
        cb([]);
    })
}

export const getFriends = (params, cb) => {
    const token = sessionStorage.getItem("token");
    const axios_config = {
        method : 'post',
        url : `${config.HOSTURL}/api/members/getFriendList`,
        headers: { 
            'Authorization': 'Bearer ' + token.toString()
        },
        data : params
    }
    axios(axios_config).then((response) => {
        if(response.data)
            cb(response.data);
        else
            cb([]); 
    }).catch(e => {
        alert(e.toString(), "error");
        cb([]);
    })
}

export const savePost = (data, cb) => {
    const token = sessionStorage.getItem("token");
    const xhr = new XMLHttpRequest();
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("content", data.content);
    formData.append("coverImage", data.coverImage);
    formData.append("coverImageName", data.coverImageName);
    formData.append("posterEmail", data.posterEmail);
    formData.append("posterId", data.posterId);

    xhr.addEventListener("readystatechange", function() {
        if(this.readyState === 4) {
            if(this.response === "OK")
                cb(true)
            else
                cb(false)
        } 
    });

    var endpoint = "";
    endpoint = `${config.HOSTURL}/api/forum/savePost`;
    xhr.open("POST", endpoint);
    xhr.setRequestHeader("Authorization", "Bearer " + token.toString());
    xhr.send(formData);  
}

export const getAllForums = (cb) => {
    const token = sessionStorage.getItem("token");
    const axios_config = {
        method : 'get',
        url : `${config.HOSTURL}/api/forum/getAllForums`,
        headers: { 
            'Authorization': 'Bearer ' + token.toString()
        },
    }
    axios(axios_config).then((response) => {
        if(response.data)
            cb(response.data)
        else    
            cb([])
    })
}

export const getChatList = (params, cb) => {
    const token = sessionStorage.getItem("token");
    const axios_config = {
        method: 'get',
        url: `${config.HOSTURL}/api/chat/getChatList?senderId=${params.senderId}&receiverId=${params.receiverId}`,
        headers: { 
          'Authorization': 'Bearer ' + token.toString()
        },
    };
    axios(axios_config).then((response) => {
        if(response.data)
            cb(response.data)
        else 
            cb([])
    })
}

export const getFriendRequests = (params, cb) => {
    const token = sessionStorage.getItem("token");
    const axios_config = {
        method: 'get',
        url: `${config.HOSTURL}/api/members/getFriendRequests?userId=${params}`,
        headers: { 
          'Authorization': 'Bearer ' + token.toString()
        },
    };
    axios(axios_config).then((response) => {
        if(response.data)
            cb(response.data)
        else 
            cb([])
    })
}

export const acceptFriend = (id, cb) => {
    const token = sessionStorage.getItem("token");
    const axios_config = {
        method: 'post',
        url: `${config.HOSTURL}/api/members/acceptFriend`,
        headers: { 
          'Authorization': 'Bearer ' + token.toString()
        },
        data : {
            id : id
        }
    }; 
    axios(axios_config).then((response) => {
        if(response.data)
            cb(response.data)
        else
            cb(null)
    })
}