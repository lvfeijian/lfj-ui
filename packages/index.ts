import Button from '../packages/button/index.js'
const components = [
  Button
]
const install = function(app, opt = {}){
  components.forEach(component => {
    app.component(component.name, component);
  });

}
/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}
export default{
  Button,
  install
}