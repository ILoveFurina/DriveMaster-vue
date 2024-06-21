<template>

  <div class="all">
    <div class="title">
      <h1> DriveMaster驾校管理系统 </h1>
    </div>

    <div class="container" >
      <!-- 您的内容 -->

      <a-card id="mainCard" >
        <h3 style="height: 50px;">
          注册
        </h3>
        <a-form
            ref="formRef"
            name="custom-validation"
            :model="formState"
            :rules="rules"
            v-bind="layout"
            @finish="handleFinish"
            @validate="handleValidate"
            @finishFailed="handleFinishFailed"
        >
          <a-form-item has-feedback label="账号" name="username">
            <a-input v-model:value="formState.username"  autocomplete="off" style="margin-left: 30px" placeholder="请输入您的账号"/>
          </a-form-item>
          <a-form-item has-feedback label="密码" name="pass">
            <a-input v-model:value="formState.pass" type="password" autocomplete="off" style="margin-left: 30px" placeholder="请输入您的密码"/>
          </a-form-item>
          <a-form-item has-feedback label="确认密码" name="checkPass">
            <a-input v-model:value="formState.checkPass" type="password" autocomplete="off" style="margin-left: 30px" placeholder="请再次输入您的密码"/>
          </a-form-item>
          <a-form-item has-feedback label="昵称" name="name">
            <a-input v-model:value="formState.name"  autocomplete="off" style="margin-left: 30px" placeholder="请输入您的昵称"/>
          </a-form-item>
          <a-form-item has-feedback label="手机号" name="phone">
            <a-input v-model:value="formState.phone"  autocomplete="off" style="margin-left: 30px" placeholder="请输入您的手机号（非必填)"/>
          </a-form-item>

          <a-form-item :wrapper-col="{ span: 14, offset: 4 }">
            <a-button @click="router.push('/login')" style="float: left" type="primary" :icon="h(LeftOutlined)">返回</a-button>
            <a-button type="primary" html-type="submit">注册</a-button>
            <a-button style="margin-left: 10px" @click="resetForm">重置</a-button>
          </a-form-item>
        </a-form>
      </a-card>
    </div>
  </div>
  <author-state/>
</template>
<script setup>
import {h, reactive, ref} from 'vue';
import authorState from "@/components/authorState.vue";
import {
  CheckOutlined, LeftOutlined,
} from '@ant-design/icons-vue';
import {useRouter} from "vue-router";
import {register} from "@/api/register/register.js";
import {getUser} from "@/api/login/getUser.js";
import {checkUserExists} from "@/api/login/checkUserExists.js";
import {checkUsernameExists} from "@/api/login/checkUsernameExists.js";

const router = useRouter();
const formRef = ref();
const formState = reactive({
  name:'',
  username:'',
  pass: '',
  checkPass: '',
  phone: '',
});
const validateName = async (_rule, value) =>{
  if (value === '') {
    return Promise.reject('请输入用户名！');
  }else if (!validateInput(value)){
    return Promise.reject('用户名只能由5-16位的中文、字母、数字、下划线组成');
  }else{
    const res = await checkUserExists(value);
    if (res.code === 500){
      return Promise.reject('该用户名已被占用');
    }
    return Promise.resolve();
  }
}
const validateUsername = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请输入账号！');
  }else if (!/^[a-zA-Z0-9]{5,16}$/.test(value)){
    return Promise.reject('账号只能由5-16位的数字、字母组成');
  }else{
    const res = await checkUsernameExists(value);
    if (res.code === 500){
      return Promise.reject('该用户名已被占用');
    }
    return Promise.resolve();
  }
}
const validatePass = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请输入密码！');
  }else if (!/^[a-zA-Z0-9]{6,16}$/.test(value)){
    return Promise.reject('密码只能由6-16位的数字、字母组成');
  }else{
    return Promise.resolve();
  }
};
const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请再次输入密码！');
  } else if (value !== formState.pass) {
    return Promise.reject("两次输入的密码不匹配");
  } else {
    return Promise.resolve();
  }
};
const rules = {
  pass: [
    {
      required: true,
      validator: validatePass,
      trigger: 'change',
    },
  ],
  checkPass: [
    {
      required: true,
      validator: validatePass2,
      trigger: 'change',
    },
  ],
  name: [
    {
      required: true,
      validator: validateName,
      trigger: 'change',
    }
  ],
  username: [
    {
      required: true,
      validator: validateUsername,
      trigger: 'change',
    }
  ],
  phone: [
    {
      message: '请输入手机号',
      trigger: 'change',
    },
    {
      pattern: /^1[3456789]\d{9}$/,
      message: '请输入正确的手机号',
      trigger: 'change',
    },
  ],
};
const layout = {
  labelCol: {
    span: 4,
  },
  wrapperCol: {
    span: 14,
  },
};
const LoginDTO = {
  name: '',
  username: '',
  password: '',
  phone: '',
}

const handleFinish = values => {
  console.log(values, formState);
  LoginDTO.name = formState.name;
  LoginDTO.username = formState.username;
  LoginDTO.password = formState.pass;
  LoginDTO.phone = formState.phone;
  register(LoginDTO)
  router.replace("/login");
};
const handleFinishFailed = errors => {
  console.log(errors);
};
const resetForm = () => {
  formRef.value.resetFields();
};
const handleValidate = (...args) => {
  console.log(args);
};

function validateInput(input) {
  const regex = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
  if (!regex.test(input)) {
    return false;
  }
  // 计算实际长度，汉字算作2个字符
  let length = 0;
  for (let i = 0; i < input.length; i++) {
    const char = input.charAt(i);
    if (char.match(/[\u4e00-\u9fa5]/)) {
      length += 2; // 汉字算作2个字符
    } else {
      length += 1; // 英文、数字、下划线算作1个字符
    }
  }
  return length >= 5 && length <= 16;
}



</script>
<style scoped>

#mainCard{
  width: 470px;
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
