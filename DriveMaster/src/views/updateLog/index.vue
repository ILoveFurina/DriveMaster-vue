<script setup>
import { ref } from 'vue';

const logs = ref([
  {
    date: '2024/6/20',
    version: 'v1.0.0',
    title: '正式发布',
    details: [
      '完成了学校的实训要求',
      '各数据有着严格的校验',
      '同时有留言板等有意思的模块'
    ]
  },
  {
    date: '2024/6/21',
    version: 'v1.0.1',
    title: '功能更新',
    details: [
      '重构了注册界面，使其更加的人性化',
      '新增了退出登录的按钮',
      '修正了一些词汇',
      '优化了更新日志的界面'
    ]
  },
  {
    date: '2024/6/22',
    version: 'v1.1.0',
    title: '重大更新',
    details: [
      '重做在学员，毕业，账单，训练管理添加记录的方式，现在管理员不必输入学号或者教练名来添加记录，而是直接从面板中分页选取，还能根据学号/教练名查询',
      '五大管理模块现在支持搜索功能',
      '毕业管理新增\'学号\'字段,且一个学号只能对应一条毕业信息',
      '调整了项目介绍在登录界面的位置，并更新了内容',
      '修复了少量bug'
    ]
  }
]);
</script>

<template>
  <div class="log-container">
    <div v-for="log in logs" :key="log.version" class="log-card">
      <h2>{{ log.date }} {{ log.version }} {{ log.title }}</h2>
      <ul>
        <li v-for="detail in log.details" :key="detail">{{ detail }}</li>
      </ul>
    </div>
  </div>
</template>

<style scoped>
.log-container {
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  padding: 20px;
  justify-content: center;
}

.log-card {
  background: #fff;
  border: 1px solid #e8e8e8;
  border-radius: 8px;
  box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 300px;
}

.log-card h2 {
  font-size: 18px;
  margin-bottom: 10px;
}

.log-card ul {
  padding-left: 20px;
}

.log-card ul li {
  list-style: disc;
  margin-bottom: 5px;
}
</style>
