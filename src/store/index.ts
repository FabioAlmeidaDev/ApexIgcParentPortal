import Vuex from 'vuex';
import Vue from 'vue';
import router from '@/router/index';
// @ts-ignore
import axios from '@/api/server-api';
Vue.use(Vuex);

export default new Vuex.Store({
    state: {
        test: "this is test",
        user: {
            email: "",
            password: "",
            token: "",
            myMeetScoresURL: "",
        },
        login: {
            error: false,
            status: false,
            message: ""
        },
    },
    mutations: {
        setUserInfo(state: any, payload) {
            delete payload["password"];
            const keys= Object.keys(payload);
            for (const key of keys) {
                if (key in state.user){
                    state.user[key] = payload[key];
                }
            }
        },
        setEmail(state, payload) {
            state.user.email = payload;
        },
        setPassword(state, payload) {
            state.user.password = payload;
        },
        setToken(state, payload) {
            state.user.token = payload;
        },
        setLogin(state, payload) {
            const {status, message, error} = payload;
            state.login.status = status;
            state.login.message = message;
            state.login.error = error;

        },
        setUser(state: any, payload) {
            delete payload["password"];
            state.user = payload;
        },
    },
    actions: {
        async signin(state, route = ""){
            this.commit("setLogin",{status: false, error: false, message: ""})
            await axios.post("/signin",{email:this.state.user.email, password:this.state.user.password })
            .then((result)=>{
                if(result.data?.data?.token){
                    const token = result.data.data.token;
                    const user = result.data.data.user;
                    this.commit("setToken",token);
                    router.push(`/${route}`);
                    this.commit("setLogin",{status: true, error: false, message: ""});
                    this.commit("setUser", {...user,token});
                    this.commit("setPassword","");
                } else {
                    this.commit("setLogin",{status: false, error: true, message: "We are having some problems logging you in, please check your user name and password and try again."})
                }
            });
        },
        async logout(){
            await axios.get("/signout")
            .then((result)=>{
                const token = result.data.token;
                this.commit("setToken",token);
                router.push("/");
            }).finally(()=>{
                this.commit("setPassword","")
            })
        },
        async reset(state){
            return await axios.post("/forgot",{email:this.state.user.email, baseURL: window.location.host })
            .then((result)=>{
                return result;
            });
        },
        async changePassword(state, t= ""){
            const user= {
                email:this.state.user.email, password: this.state.user.password
            };
            return await axios.post("/update",{user, token: t})
            .then((result)=>{
                return result;
            });
        },
        async updateUser(state, data){
            const { token, user} = data;
            return await axios.post("/update",{user, token})
            .then((result)=>{
                return result;
            });
        },
        async addChild(state, data){
            const { token, user} = data;
            return await axios.post("/addChild",{user, token})
            .then((result)=>{
                console.log(result.data);
                this.commit('setUserInfo', result.data.data);
                return result;
            });
        },

        async deleteChild(state, data){
            const { token, id} = data;
            return await axios.post("/deleteChild",{id, token})
            .then((result)=>{
                console.log(result.data);
                this.commit('setUserInfo', result.data.data);
                return result;
            });
        },

        async saveChild(state, data){
            const { token, child} = data;
            return await axios.post("/saveChild",{child, token})
            .then((result)=>{
                console.log(result.data);
                this.commit('setUserInfo', result.data.data);
                return result;
            });
        },

        async register(state, user){
            return await axios.post("/signup",user)
            .then((result)=>{
                return result;
            });
        },

    },
    getters: {
        getEmail:(state)=>state.user.email,
        getToken:(state)=>state.user.token,
        login:(state)=>state.login,
    },
    modules: {
        user_test: {
            state: {},
            mutations: {},
            actions: {},
            getters: {},
        }
    }
})