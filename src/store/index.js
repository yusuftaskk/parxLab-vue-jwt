import Vue from 'vue'
import Vuex from 'vuex'
import axios from "axios"
import
router
from "@/router"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    token: "",

  },
  mutations: {

    setToken(state, token) {
      state.token = token
    },
    clearToken(state) {
      state.token = ""
    }
  },
  actions: {
    initAuth({
      commit,
      dispatch
    }) {
      let token = localStorage.getItem("token")
      if (token) {

        let expirationDate = localStorage.getItem("expirationDate")
        let time = new Date().getTime()

        if (time >= +expirationDate) {
          console.log('tokensuresigecmis :>>');
          dispatch("Logout")
        } else { // süre henüz geçmediyse burası calısıyor
          commit("setToken", token)
          let timerSecond = +expirationDate - time // kalan süreyi hesaplıyoruz
          console.log('timerSecond :>> ', timerSecond);
          dispatch("setTimeOutTimer", timerSecond) // set time out a kalan süreyi gönderiyoruz
          router.push("/")
        }


      } else {
        router.push("/login")
        return false
      }
    },
    Login({
      commit,
      dispatch,
      state
    }, authData) {
      return axios
        .post(
          "https://count-book-on-premises-user-service-dev.azurewebsites.net/api/v1/User/Login", {
            username: authData.username,
            password: authData.password,
          }
        )
        .then((login_response) => {
          console.log("loginresponse", login_response);
          commit("setToken", login_response.data.data.access_token) // isteğimiz sonrasında tokenımızı state içindeki token a aktarıyoruz.
          localStorage.setItem("token", login_response.data.data.access_token) // Token'ı Local Storage a atıyoruz ki sayfa yenilendiği zaman kullanıcı login ekranına dönmesin
          // localStorage.setItem('expirationDate', new Date().getTime() + 10000)
          localStorage.setItem('expirationDate', new Date().getTime() + +login_response.data.data.expires_in * 10000) // 5dk sonrasında logout yaptırıyoruz.


          // dispatch("setTimeOutTimer", +login_response.data.data.expires_in * 1000) // bize verilen saniyeyi 1000 ile carpıp saat olarak cevirebiliriz.
          dispatch("setTimeOutTimer", +login_response.data.data.expires_in * 10000) // expires_in tokenın gecerlilik süresi az olduğundan set time out da 10sn kullandım :)
        });
    },
    Logout({
      commit,
    }) {
      commit("clearToken")
      router.push("/login")
      localStorage.removeItem("token"); // çıkış butona bastığı zaman localdeki token i siliyoruz
      localStorage.removeItem("expirationDate") // kullanıcın 5sn sonra login sayfasına yönlendirmesinin kaydını localden siliyoruz.
    },
    // set time out u kullanmamızın sebebi bize verilen token süresinin olması :)
    setTimeOutTimer({
      dispatch
    }, expires_in) {
      setTimeout(() => {
        dispatch("Logout")
      }, expires_in );
    }
  },
  modules: {},
  getters: {
    isAuthenticated(state) {
      return state.token !== ""
    },

  },
})