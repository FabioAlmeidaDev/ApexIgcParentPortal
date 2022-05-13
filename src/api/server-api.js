import axios from "axios";
import store from '../store';
import router from '../router';


axios.interceptors.response.use(undefined, function (error) {
  if (error) {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        store.dispatch('LogOut')
        return router.push('/login')
    }
  }
})

export default axios.create({
  // baseURL: "http://localhost:3001",
  baseURL: "https://igc-parent-portal-backend.herokuapp.com/",
  headers: {
    // Authorization: 'Bearer JUZpWvW06EaLF1DYq7O8pb4lN4D5nMoo3GpQ3tjODiNa34ZCu_1uyUUtLiQjUPEJ_rD0tSsAsQfQWZTL6Fey0WlrUraSJet5t4m81bLHsC16d7NE6pRHMQtJreuxXXYx'
  },
});