<template>

  <div class="all">
    <div class="title">
      <h1> DriveMaster驾校管理系统 </h1>
    </div>

    <div class="container" >
      <!-- 您的内容 -->

      <a-card id="mainCard" >
        <div style="font-size: 20px"> 请联系管理员 ! 微信:Yan534087995</div>
          <a-button @click="RouteReturn" type="primary" :icon="h(LeftOutlined)" style="float: left; margin-top: 20px;">返回</a-button>
      </a-card>
    </div>
  </div>
  <author-state/>
</template>
<script setup>
import authorState from "@/components/authorState.vue";
import {
  SearchOutlined,
  LeftOutlined
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
  width: 400px;
  text-align: center;
  background: rgba(255, 255, 255, 0.66);
  height: 150px;
}

.title {
  text-align: center;
  font-size: 32px;
  margin-top: 32px;
  font-family: PINGFANG QIAN XI,serif;
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
  font-family: PINGFANG ZHUN;
  src: url('@/assets/font/PINGFANG ZHUN.ttf');
}
@font-face {
  font-family: PINGFANG QIAN XI;
  src: url('@/assets/font/PINGFANG QIAN XI.ttf');
}
@font-face {
  font-family: PINGFANG JI XI;
  src: url('@/assets/font/PINGFANG JI XI.ttf');
}
@font-face {
  font-family: PINGFANG XI;
  src: url('@/assets/font/PINGFANG XI.ttf');
}
</style>
