import { defineConfig } from '@umijs/max';

export default defineConfig({
  antd: {},
  access: {},
  model: {},
  initialState: {},
  request: {
    dataField: ''
  },
  layout: {
    title: 'AI-painter',
    locale: false
  },
  routes: [
    {
      path: '/',
      redirect: '/home',
      icon: 'HomeFilled'
    },
    {
      path: '/login',
      component: './Login',
      hideChildrenInMenu: true,
      hideInMenu: true,
      menuRender: false
    },
    {
      name: '首页',
      path: '/home',
      component: './Home',
      icon: 'HomeOutlined'
    },
    {
      name: '用户管理',
      path: '/user',
      component: '@/pages/User/index',
      icon: 'UserOutlined'
    },
    {
      name: '模型配置',
      path: '/model',
      component: '@/pages/Model/index',
      icon: 'StarOutlined',  
      hideChildrenInMenu: true,
    },
    {
      path: '/model/upload',
      name: '新增模型',
      component: '@/pages/Model/uploadForm',
      hideInBreadcrumb: true,
      hideInMenu: true,
    },
    {
      name: '充值卡管理',
      path: '/membercard',
      component: '@/pages/MemberCard/index',
      icon: 'PayCircleOutlined', 
    }
  ],
  npmClient: 'yarn',
  define: {
    "process.env.TENANT_ID": process.env.TENANT_ID,
    "process.env.APP_ID": process.env.APP_ID,
    "process.env.DEFAULT_HOST": process.env.DEFAULT_HOST,
    "process.env.AUTH_HOST": process.env.AUTH_HOST,
    "process.env.AUTH_CLIENT_BASIC": process.env.AUTH_CLIENT_BASIC,
  }
});

