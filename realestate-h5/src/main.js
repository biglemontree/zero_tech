import { createApp } from 'vue'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import store from './store'
import './styles/base.css'

import {Form, Field, Toast, Button,Uploader} from 'vant';
// import 'vant/lib/button/style';

const app = createApp(App)
app.use(Form);
app.use(Field);
app.use(Toast);
app.use(Button);
app.use(Uploader);

app.use(router).use(store).mount('#app')
