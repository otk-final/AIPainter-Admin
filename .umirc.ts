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
      path: '/model/addAndEdit',
      name: '新增模型',
      component: '@/pages/Model/addAndEdit',
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
  npmClient: 'yarn'
});

