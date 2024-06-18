<template>
  <a-layout style="min-height: 100vh">
    <a-layout-header class="header">
      <div class="logo" />
      <a-menu
          v-model:selectedKeys="selectedKeys1"
          theme="dark"
          mode="horizontal"
          :style="{ lineHeight: '64px' }"
      >
        <a-menu-item key="1" @click="router.push('/')">信息管理</a-menu-item>
        <a-menu-item key="2" @click="router.push('/userProfile')">个人中心</a-menu-item>
        <a-menu-item key="3" @click="router.push('/messageBoard')">留言板</a-menu-item>
      </a-menu>
    </a-layout-header>
    <a-layout-content style="padding: 0 50px; display: flex; flex-direction: column; flex: 1;">
      <a-breadcrumb style="margin: 16px 0">
        <a-breadcrumb-item>在记录添加与更新中，请输入正确的格式，不然可能会导致错误</a-breadcrumb-item>
      </a-breadcrumb>
      <a-layout style="padding: 24px 0; background: #fff; flex: 1;">
        <router-view/>
      </a-layout>
    </a-layout-content>
    <a-layout-footer style="text-align: center">
      Ant Design ©2018 Created by Ant UED
    </a-layout-footer>
  </a-layout>
</template>

<script setup>
import { ref } from 'vue';
import { useRouter } from 'vue-router';

const selectedKeys1 = ref(['1']);
const selectedKeys2 = ref(['1']);
const router = useRouter();
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

#components-layout-demo-top-side .logo {
  float: left;
  width: 120px;
  height: 31px;
  margin: 16px 24px 16px 0;
  background: rgba(255, 255, 255, 0.3);
}

.ant-row-rtl #components-layout-demo-top-side .logo {
  float: right;
  margin: 16px 0 16px 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
