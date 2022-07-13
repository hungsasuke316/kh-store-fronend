import React from "react";

class CheckLoginService{
    check() {
        const token = window.localStorage.getItem("accessToken")
        if(token){
            return true
        }
        else{
            return false
        }

    }
}
export default new CheckLoginService()