import ElButton from './button.vue'
ElButton.install = (app)=>{
  app.component(ElButton.name,ElButton)
}
export default ElButton