<template>
  <a-layout style="min-height: 100vh">
    <a-layout style="padding: 24px 0; background: #fff; flex: 1;">
      <a-layout-sider width="200" style="background: #fff;">
        <a-menu
            v-model:selectedKeys="selectedKeys2"
            mode="inline"
            style="height: 100%"
        >
          <a-menu-item key="1" @click="router.push('/info/coach')">
            <span>教练管理</span>
          </a-menu-item>
          <a-menu-item key="2" @click="router.push('/info/student')">
            <span>学员管理</span>
          </a-menu-item>
          <a-menu-item key="3" @click="router.push('/info/graduation')">
            <span>毕业管理</span>
          </a-menu-item>
          <a-menu-item key="4" @click="router.push('/info/bill')">
            <span>费用管理</span>
          </a-menu-item>
          <a-menu-item key="5" @click="router.push('/info/train')">
            <span>训练管理</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout-content
          :style="{
          padding: '0 24px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          height: 'calc(100vh - 48px)', // Adjusted height
          overflow: 'hidden'
        }"
      >
        <div style="flex: 1; overflow: hidden;"> <!-- Changed overflow to hidden -->
          <router-view/>
        </div>
        <div class="page">
          <Page/>
        </div>
      </a-layout-content>
    </a-layout>
  </a-layout>
</template>

<script setup>
import {ref} from 'vue';
import {useRouter} from 'vue-router';
import Page from '@/views/Layout/components/components/page.vue';

const selectedKeys2 = ref(['1']);
const router = useRouter();
</script>

<style scoped>
html, body, #app {
  height: 100%;
  margin: 0;
  padding: 0;
}

.page {
  text-align: center;
  margin-bottom: 24px;
}

.site-layout-background {
  background: #fff;
}
</style>
