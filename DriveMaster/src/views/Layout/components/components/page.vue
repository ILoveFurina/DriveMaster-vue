<template>
  <a-pagination
      v-model:current="current"
      v-model:pageSize="pageSize"
      :total="totalItems"
      :show-total="(total, range) => `${range[0]}-${range[1]} of ${total} items`"
      @change="handlePageChange"
  />
</template>

<script setup>
import { ref } from 'vue';

const current = ref(1);
const pageSize = ref(10);
const totalItems = ref(85); // 总条目数

const handlePageChange = (page) => {
  console.log(`Current page: ${page}`);
  // 这里可以添加分页逻辑，例如请求新的数据
};
</script>

<style scoped>
.page {
  padding: 24px;
  text-align: center;
}
</style>
