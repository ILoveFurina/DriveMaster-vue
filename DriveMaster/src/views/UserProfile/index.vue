<template>
  <a-layout>
    <a-layout-content style="margin-left: 50px">
      <a-card class="user-info-card" title="管理员信息">
        <p><strong>昵称:</strong> {{ user }}</p>
        <p><strong>账号:</strong> {{ username }}</p>
        <p><strong>手机号:</strong> {{ phone }}</p>
        <p><strong>注册时间:</strong> {{ createTime }}</p>
      </a-card>
      <a-card class="change-password-card" title="修改密码">
        <a-form :model="form" :rules="rules" ref="formRef">
          <a-form-item label="当前密码" name="currentPassword">
            <a-input type="password" v-model:value="form.currentPassword" />
          </a-form-item>
          <a-form-item label="新密码" name="newPassword">
            <a-input type="password" v-model:value="form.newPassword" />
          </a-form-item>
          <a-form-item label="确认新密码" name="confirmNewPassword">
            <a-input type="password" v-model:value="form.confirmNewPassword" />
          </a-form-item>
          <a-form-item>
            <a-button type="primary" @click="handleSubmit">提交</a-button>
          </a-form-item>
        </a-form>
      </a-card>
      <a-button type="primary" style="width: 200px;margin-top: 10px" danger @click="userLogout"> 退出登录</a-button>
    </a-layout-content>
  </a-layout>

</template>
<script setup>
import {recallPwd} from "@/api/login/recallPwd.js";

const username = localStorage.getItem("user")
const user = localStorage.getItem("username")
const phone = computed(()=>{
  if(localStorage.getItem("phone")==null){
    return "无"
  }
  return localStorage.getItem("phone")
})

const createTime = localStorage.getItem("createTime")
import {ref, reactive, computed} from 'vue';
import {message} from "ant-design-vue";
import {logout} from "@/api/login/logout.js";
import {useRouter} from "vue-router"

const router = useRouter();
const userLogout =async () => {
  const response = await logout();
  if(response.code===200){
    router.push("/login")
    message.success("退出成功",3)
  }

}

const form = reactive({
  currentPassword: '',
  newPassword: '',
  confirmNewPassword: ''
});

const formRef = ref(null);

const rules = {
  currentPassword: [{ required: true, message: '请输入当前密码' },{ pattern: /^[a-zA-Z0-9]{6,16}$/, trigger: 'change', message: '密码只能由6-16位的数字、字母组成' }],
  newPassword: [
    { required: true, trigger: 'change', message: '请输入新密码' },
    { pattern: /^[a-zA-Z0-9]{6,16}$/, trigger: 'change', message: '密码只能由6-16位的数字、字母组成' }
  ],
  confirmNewPassword: [
    { required: true, message: '请确认新密码',trigger: 'change'},
    {
      validatePass2: (rule, value) => value === form.newPassword,
      message: '两次输入的新密码不一致',
      trigger: 'change' }
  ]
};
const validatePass2 = async (_rule, value) => {
  if (value === '') {
    return Promise.reject('请再次输入密码！');
  } else if (value !== form.newPassword) {
    return Promise.reject("两次输入的密码不匹配");
  } else {
    return Promise.resolve();
  }
};
const handleSubmit = async () => {
  try {
    await formRef.value.validate();

    // 处理提交逻辑
    const response = await recallPwd({oldPassword:form.currentPassword,newPassword:form.newPassword, id:localStorage.getItem("id")})
    if (response.code === 200) {
      console.log('密码修改成功:', form);
      message.info('密码修改成功',3)
      formRef.value.resetFields();
    }else{
      message.error(response.msg,3)
    }
  } catch (error){
    console.log('验证失败:', error);
  }
}
</script>
<style scoped>
.personal-center {
  min-height: 100vh;
}

.header {
  color: white;
  font-size: 24px;
  text-align: center;
  padding: 16px;
  background: #001529;
}

.content {
  padding: 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
}

.user-info-card,
.change-password-card {
  width: 100%;
  max-width: 600px;
  margin-bottom: 24px;
}

.footer {
  text-align: center;
  padding: 12px;
  background: #f0f2f5;
}
</style>
