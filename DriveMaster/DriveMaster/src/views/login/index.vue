<template>

  <div class="all">
    <div class="title">
      <h1> 个人记账管理系统 </h1>
    </div>

    <div class="container" >
      <!-- 您的内容 -->

      <a-card id="mainCard" >
        <h3 style="height: 50px;">
          登录
        </h3>
        <a-form
            :model="formState"
            name="normal_login"
            class="login-form"
            @finish="onFinish"
            @finishFailed="onFinishFailed"
            :rules="rules"
        >
          <a-form-item
              label="用户名"
              name="username"
          >
            <a-input v-model:value="formState.username">
              <template #prefix>
                <UserOutlined class="site-form-item-icon" />
              </template>
            </a-input>
          </a-form-item>

          <a-form-item
              label="密码"
              name="password"
          >
            <a-input-password v-model:value="formState.password">
              <template #prefix>
                <LockOutlined class="site-form-item-icon" />
              </template>
            </a-input-password>
          </a-form-item>

          <a-form-item>
            <a-form-item name="remember" no-style>
              <a-checkbox v-model:checked="formState.remember">记住密码</a-checkbox>
            </a-form-item>
            <a class="login-form-forgot" href="">&nbsp; &nbsp; 找回密码</a>
          </a-form-item>

          <a-form-item>
            <a-button :disabled="disabled" type="primary" html-type="submit" class="login-form-button">
              登录
            </a-button>
            &nbsp; &nbsp; &nbsp;
            <a href="">还没有注册？点击这里</a>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
  <author-state/>
</template>
<script setup>
import { reactive, computed } from 'vue';
import {useUserInfoStore} from "@/stores/userInfoStore.js";
import {useRouter} from "vue-router";

let router = useRouter();

let userInfoStore = useUserInfoStore();
const formState = reactive({
  username: '',
  password: '',
  remember: true,
});
const onFinish = values => {
  console.log('Success:', values);
  userInfoStore.setUsername(values.username);
  userInfoStore.setPassword(values.password);
  userInfoStore.setRememberState(values.remember);
  if(login(userInfoStore.getUsername(),userInfoStore.getPassword())){
    router.push("/aside")
  }


};
const onFinishFailed = errorInfo => {
  console.log('Failed:', errorInfo);
};
const disabled = computed(() => {
  return !(formState.username && formState.password);
});

const validateUsername = async (_rule, value) => {
  if(value === '' ){
    return Promise.reject("用户名不能为空");
  }else {
    let reg = /^[a-zA-Z0-9]{5,12}$/
    if(!reg.test(value)){
      return Promise.reject("用户名格式错误");
    }
  }
  return Promise.resolve(value);
}

const validatePassword = async (_rule, value) => {
  if(value === '' ){
    return Promise.reject("密码不能为空");
  }else {
    let reg = /^[a-zA-Z0-9]{6,12}$/
    if(!reg.test(value)){
      return Promise.reject("密码格式错误");
    }

    return Promise.resolve(value);
  }

}

const rules = {
  username: [
    { required: true, validator: validateUsername, trigger: 'blur' },
  ],
  password: [
    { required: true, validator: validatePassword, trigger: 'blur' }
  ]
}

import {
  UserOutlined,
  LockOutlined
} from '@ant-design/icons-vue';
import {login} from "@/api/login/login.js";
import {checkLogin} from "@/api/login/checkLogin.js";
import AuthorState from "./components/authorState.vue";

</script>
<style scoped>

#mainCard{
  width: 400px;
  text-align: center;
  background: rgba(255, 255, 255, 0.66)
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
