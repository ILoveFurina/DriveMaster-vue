import {defineStore} from "pinia";
import {ref} from "vue";

export const useUserInfoStore = defineStore('userInfo',()=>{
    let username = ref('');
    let password = ref('');
    let remember = ref(true);
    let token = ref('');

    let getUsername = () => {return username.value;}

    let setUsername = (newUsername) => username.value = newUsername;

    let setPassword = (newPassword) => password.value = newPassword;

    let setRememberState = ( newRememberState) => remember.value = newRememberState;

    let getPassword = () => password.value;

    let getRememberState = () => remember.value;

    return {
        getPassword,
        getUsername,
        getRememberState,
        setPassword,
        setUsername,
        setRememberState
    }
})
