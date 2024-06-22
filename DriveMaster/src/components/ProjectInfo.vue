<template>

  <div class="all" style="font-family: 'PINGFANG QIAN XI',serif">
    <div class="container" >
      <!-- 您的内容 -->

      <a-card id="mainCard" >
        <p>本项目采用前后端分离架构Vue+SpringBoot , 是当前市场上最主流的实现方案</p>
        <div class="icon-vue">
          <svg xmlns="http://www.w3.org/2000/svg" width="9.28em" height="8em" viewBox="0 0 256 221"><path fill="#41B883" d="M204.8 0H256L128 220.8L0 0h97.92L128 51.2L157.44 0z"/><path fill="#41B883" d="m0 0l128 220.8L256 0h-51.2L128 132.48L50.56 0z"/><path fill="#35495E" d="M50.56 0L128 133.12L204.8 0h-47.36L128 51.2L97.92 0z"/></svg>
        </div>
        <PlusOutlined style="font-size: 64px;vertical-align: top"/>
        <div class="icon-spring">
          <svg xmlns="http://www.w3.org/2000/svg" width="9em" height="8.5em" viewBox="0 0 256 256"><path fill="#6DB33F" d="M38.944 35.879c50.58-48.999 131.454-47.682 180.453 3.161c5.532-7.376 10.274-15.542 13.699-23.972c16.07 48.999 25.817 90.095 22.128 121.97c-1.844 26.87-12.381 52.687-29.768 73.235c-45.31 53.741-125.922 60.59-179.663 15.28l-1.028-.915l-.055-.036a12.24 12.24 0 0 1-.498-.367c-.49-.381-.935-.796-1.336-1.24l-.144-.164l-1.68-1.493c-1.64-1.405-3.279-2.81-4.733-4.4l-.536-.606c-49-50.58-47.419-131.454 3.16-180.453M57.91 207.376c-4.742-3.688-11.591-3.162-15.28 1.58c-3.242 4.17-3.226 9.969.049 13.815l.052.06l2.033 1.807l.2.136c4.604 3.028 10.8 2.402 14.333-1.878l.194-.241c3.688-4.742 2.898-11.591-1.58-15.28M231.78 28.239c-13.173 27.661-45.84 48.736-74.027 55.322c-26.607 6.322-49.79 1.054-74.289 10.537c-55.848 21.339-54.794 87.724-24.236 102.74l1.844 1.054s22.074-4.389 43.902-10.185l1.87-.5c8.718-2.35 17.295-4.91 24.302-7.492c36.354-13.435 76.397-46.628 89.568-85.09c-6.849 40.042-41.359 78.767-75.87 96.418c-18.44 9.483-32.665 11.59-62.96 22.128c-3.688 1.317-6.586 2.635-6.586 2.635l1.108-.15l.736-.095l.733-.092c6.69-.83 12.702-1.244 12.702-1.244c42.94-2.108 110.38 12.118 141.729-29.768c32.139-42.677 14.225-111.697-.527-156.218"/><path fill="#FFF" d="M57.911 207.376c4.479 3.688 5.269 10.537 1.58 15.279c-3.687 4.742-10.537 5.269-15.279 1.58c-4.741-3.688-5.268-10.537-1.58-15.279c3.688-4.742 10.537-5.268 15.28-1.58M231.78 28.239c14.752 44.521 32.666 113.541.527 156.218c-31.35 41.886-98.789 27.66-141.729 29.768c0 0-6.012.415-12.702 1.244l-.733.092c-.612.078-1.228.16-1.844.245c0 0 2.898-1.318 6.586-2.635c30.295-10.537 44.52-12.645 62.96-22.128c34.511-17.65 69.021-56.376 75.87-96.418c-13.171 38.462-53.214 71.655-89.568 85.09c-25.026 9.22-70.074 18.177-70.074 18.177l-1.844-1.054c-30.558-15.016-31.612-81.401 24.236-102.74c24.5-9.483 47.682-4.215 74.29-10.537c28.187-6.586 60.853-27.66 74.025-55.322"/></svg>
        </div>
        <a-button @click="RouteReturn" type="primary" :icon="h(LeftOutlined)" class="absolute-bottom">返回</a-button>

        <div style="margin-top: 60px; ">
          <p>前端技术栈：Html, JavaScript, CSS, Vue3, Axios, Pinia, Vue-Router, Ant-Design-Vue,Nginx</p>
          <p>后端技术栈：Java, SpringMVC, Spring, Mybatis-plus, SpringBoot, Sa-Token,Mysql, Maven</p>
          <p>工具使用: IDEA, WebStorm, Nginx, git, Apifox, Navicat...</p>

        </div>
      </a-card>
    </div>
  </div>
  <author-state/>
</template>
<script setup>
import authorState from "@/components/authorState.vue";
import {
  SearchOutlined,
  LeftOutlined,
  PlusOutlined
} from "@ant-design/icons-vue";
import {useRouter} from "vue-router"
import {h} from "vue";

let router = useRouter();
function RouteReturn() {
  router.push("/login");
}

</script>
<style scoped>

#mainCard{
  position: absolute;
  top: 25%;
  width: 600px;
  text-align: center;
  background: rgba(255, 255, 255, 0.66);
  height: 400px;
}

.title {
  text-align: center;
  font-size: 32px;
  margin-top: 32px;
  font-family: PINGFANG QIAN XI,serif;
}
.icon-spring{
  position: absolute;
  right: 120px;
  top: 70px;
}
.icon-vue{
  position: absolute;
  margin-left: 90px;
}
.absolute-bottom {
  position: absolute; /* 绝对定位 */
  bottom: 5px;          /* 底部对齐 */
  left: 5px;            /* 左边对齐 */
}
.all {
  background: #77A1D3;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E684AE, #79CBCA, #77A1D3);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E684AE, #79CBCA, #77A1D3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}

#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  width: 100%;
}
.container {
  display: flex;
  justify-content: center; /* 水平居中 */
  align-items: center; /* 垂直居中 */
  height: 65vh; /* 容器高度为视口高度 */

}

@font-face {
  font-family: PINGFANG QIAN XI;
  src: url('@/assets/font/PINGFANG QIAN XI.ttf');
}

</style>
