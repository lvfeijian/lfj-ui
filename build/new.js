// 当程序即将退出时候触发，可以执行一些清除操作
process.on("exit", (code) => {
  console.log();
});
// console.log(process.argv,process.cwd());
if (!process.argv[2]) {
  console.error("[组件名]必填");
  process.exit(1);
}
const path = require("path");
const fileSave = require("file-save");

const componentName = process.argv[2];
const Files = [
  {
    filename: `../packages/${componentName}/index.ts`,
    template: `import ${componentName} from "./src/${componentName}.vue";
    ${componentName}.install = (app:any) => {
      // 通过app.component()注册一个全局组件
      app.component(${componentName}.name, ${componentName});
    };
    export default ${componentName};`
  },
  {
    filename: `../packages/${componentName}/src/${componentName}.vue`,
    template: `<template>
    <div>

    </div>
    </template>

    <script setup lang="ts">
    import { ref, reactive } from 'vue'
    defineOptions({
      name: "LvButton"
    });
    </script>

    <style scoped lang="scss">

    </style>`
  }
];

Files.map((file) => {
  fileSave(path.resolve(__dirname, file.filename)).write(file.template);
});
console.log("DONE!");
