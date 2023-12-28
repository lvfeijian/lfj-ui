import { createApp } from 'vue'
import './style.css'
import App from './App.vue'
import * as ElementPlus from '../packages/index.ts'
// console.log(Button);

console.log(ElementPlus);

const app = createApp(App)
app.use(ElementPlus)
app.mount('#app')




// import { createApp } from 'vue'
// import './style.css'
// import App from './App.vue'
// import ElButton from '../packages/button/index.ts'
// console.log(ElButton);

// // console.log(Button);

// const app = createApp(App)
// app.use(ElButton)
// app.mount('#app')