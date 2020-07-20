---
name: 'Vue cli构建多入口项目'
title: Vue cli构建多入口项目
year: 4 May 2020
id: 'vue-cli-page'
description: |
  使用vue-cli快速搭建多入口项目.
---



- 使用vue/cli生成一个vue项目

```JavaScript
npm install -g @vue/cli @vue/cli
or
yarn global add @vue/cli

// 创建my-app项目
vue create my-app

```

- 创建多页面入口文件

src/views中创建多页面文件夹

```

views
│   README.md
└───student
│   │   main.js
│   │   App.js
|   └───views
        | index.vue
|
└───teacher
│   │   main.js
│   │   App.js
|   └───views
        | index.vue
```

public中创建html文件

```
public
│   student.html
│   teacher.html
└───static
```

- 修改路由文件

router中创建student.js和teacher.js，并分别在各自的多入口```main.js```中引入

```JavaScript
import Vue from 'vue';
import VueRouter from 'vue-router';
import Index from '../views/teacher/views/index.vue';


Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Index,
  },
  // {
  //   path: '/about',
  //   name: 'About',
  //   // route level code-splitting
  //   // this generates a separate chunk (about.[hash].js) for this route
  //   // which is lazy-loaded when the route is visited.
  //   component: () => import(/* webpackChunkName: "about" */ '../views/About.vue'),
  // },
];

const router = new VueRouter({
  mode: 'history',
  base: `${process.env.BASE_URL}teacher/`,
  routes,
});

export default router;

```

teacher下的```main.js```

```JavaScript

import Vue from 'vue';
import App from './App.vue';
import '../../registerServiceWorker';
import router from '../../router/teacher';
import store from '../../store';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');

```

- 配置vue.config.js

项目根目录创建vue.config.js
写入多入口配置

```JavaScript
module.exports = {
  pages: {
    index: {
      // page 的入口
      entry: 'src/views/student/main.js',
      // 模板来源
      template: 'public/student.html',
      // 在 dist/index.html 的输出
      filename: 'student.html',
      // 当使用 title 选项时，
      // template 中的 title 标签需要是 <title><%= htmlWebpackPlugin.options.title %></title>
      title: 'student',
      // 在这个页面中包含的块，默认情况下会包含
      // 提取出来的通用 chunk 和 vendor chunk。
      chunks: ['chunk-vendors', 'chunk-common', 'index'],
    },
    // 当使用只有入口的字符串格式时，
    // 模板会被推导为 `public/subpage.html`
    // 并且如果找不到的话，就回退到 `public/index.html`。
    // 输出文件名会被推导为 `subpage.html`。
    teacher: 'src/views/teacher/main.js',
  },
  devServer: {
    historyApiFallback: {
      rewrites: [
        { from: /\/student/, to: '/student.html' },
        { from: /\/teacher/, to: '/teacher.html' },
      ],
    },
  },
};

```

- 启动项目

运行```npm run serve```启动项目

访问```http://localhost:8080/teacher```即可看到相应内容
