import axios from 'axios';
import Vue from 'vue';
import VueFlashMessage from 'vue-flash-message';
import 'vue-flash-message/dist/vue-flash-message.min.css';

Vue.use(VueFlashMessage, {
    messageOptions: {
        timeout: 3000,
        pauseOnInteract: true
    }
});

const vm = new Vue();
<<<<<<< HEAD
const baseURL = 'http://localhost:3050/';
=======
const baseURL = 'http://localhost:3050/login';
>>>>>>> a5c30c58be7db3c8a506a31b36a8240aadd01c8e

const handleError = fn => (...params) =>
    fn(...params).catch(error => {
        vm.flash(`${error.response.status}: ${error.response.statusText}`, 'error');
    });