<template>
  这里是二级路由个人中心
</template>


<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";

const selectedKeys1 = ref(['2']);
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

.page {
  text-align: center;
  margin-bottom: 24px;
}

.site-layout-background {
  background: #fff;
}
</style>

