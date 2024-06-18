<template>
  <a-layout style="min-height: 100vh; padding: 24px;">
    <a-card title="留言板" bordered>
      <a-form @submit.prevent="addMessage">
        <a-form-item>
          <a-input v-model:value="username" placeholder="用户名" />
        </a-form-item>
        <a-form-item>
          <a-textarea v-model:value="content" placeholder="留言内容" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="addMessage">发布留言</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-list v-if="messages.length" :data-source="messages" style="margin-top: 24px;">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :title="item.username" :description="item.content" />
        </a-list-item>
      </template>
    </a-list>
    <a-pagination v-model:current="current" :total="50" show-less-items />
  </a-layout>

</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { message } from 'ant-design-vue';
import {commentPageQuery} from "@/api/Comment/commentPageQuery.js";
import {useUserInfoStore} from "@/stores/userInfoStore.js";
import {addMessageAPI} from "@/api/Comment/addMessageAPI.js";
const current = ref(1);
const apiUrl = 'http://localhost:3000/api/messages';

const username = ref('');
const content = ref('');
const messages = ref([]);
let userInfoStore = useUserInfoStore();
// 获取所有留言
const fetchMessages = async () => {
  try {
    const response = await commentPageQuery({page: current.value,pageSize: 10});
    messages.value = response.data;
  } catch (error) {
    message.error('获取留言失败');
  }
};

// 添加新留言
const addMessage = async () => {
  if (!username.value || !content.value) {
    message.error('用户名和留言内容不能为空');
    return;
  }

  try {
    const newMessage = { username: username.value, content: content.value };
    let user = localStorage.getItem('username')
    await addMessageAPI({user,newMessage})
    messages.value.push(newMessage);

    // 清空输入框
    username.value = '';
    content.value = '';
  } catch (error) {
    message.error('发布留言失败');
  }
};

// 组件挂载时获取所有留言
onMounted(() => {
  fetchMessages();
});
</script>

<style scoped>
a-layout {
  background: #fff;
}
</style>
