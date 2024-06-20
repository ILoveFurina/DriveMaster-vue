<template>
  你的用户名是 :{{ user }}
  <div style="width: 200px;margin-top: 20px">
    <a-button type="primary" @click="logout" danger>退出登录</a-button>
  </div>
</template>


<script setup>
import { ref } from 'vue';
import {useRouter} from "vue-router";
import httpInstance from "@/utils/http.js";
import {message} from "ant-design-vue";

const selectedKeys1 = ref(['2']);
const selectedKeys2 = ref(['1']);
const router = useRouter();
const user = localStorage.getItem("user");

const logout = async () => {

  const response = await httpInstance.get("/admin/user/logout")
  if(response.code === 200){
    router.push("/login")
  }
}

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

