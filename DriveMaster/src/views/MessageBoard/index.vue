<template>
  <a-layout style="min-height: 100vh; padding: 24px;">
    <a-card title="留言板" bordered>
      <a-form @submit.prevent="addMessage">
        <a-form-item>
          <a-textarea v-model:value="content" placeholder="请不要发表违法,不礼貌的留言！" />
        </a-form-item>
        <a-form-item>
          <a-button type="primary" @click="addMessage">发布留言</a-button>
        </a-form-item>
      </a-form>
    </a-card>
    <a-list v-if="messages.length" :data-source="messages" style="margin-top: 24px;">
      <template #renderItem="{ item }">
        <a-list-item>
          <a-list-item-meta :title="item.user+'&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;'+item.createTime" :description="item.comment" />
        </a-list-item>
      </template>
    </a-list>
    <a-pagination v-model:current="current" :total="total" show-less-items @change="handlePageChange"/>
  </a-layout>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { message } from 'ant-design-vue';
import { commentPageQuery } from "@/api/Comment/commentPageQuery.js";
import { addMessageAPI } from "@/api/Comment/addMessageAPI.js";
const total = ref(10);
const current = ref(1);
const username = ref('');
const content = ref('');
const messages = ref([]);

// 获取所有留言
const fetchMessages = async () => {
  try {
    const response = await commentPageQuery({ page: current.value, pageSize: 10 });
    messages.value = response.data.records;
    total.value = response.data.total
    console.log(messages.value);
  } catch (error) {
    message.error('获取留言失败');
  }
};
const handlePageChange = async () => {
  await fetchMessages();
}
// 添加新留言
const addMessage = async () => {
  if (!content.value) {
    message.error('内容不能为空');
    return;
  }

  try {
    const commentDTO = { user: localStorage.getItem("user"), comment: content.value };
    const response = await addMessageAPI(commentDTO);
    console.log(response)
    console.log(response.code)
    // 确保后端成功保存数据后，重新获取所有留言
    if (response && response.code === 200) {
      console.log("122222222222222222")
      await fetchMessages();
      // 清空输入框
      username.value = '';
      content.value = '';
    }
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
