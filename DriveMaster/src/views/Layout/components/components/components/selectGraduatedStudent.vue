<template>
  <a-button type="primary" @click="showModal">新增毕业学员</a-button>
  <a-modal v-model:open="open" title="选择学员" @ok="handleOk" width="50%" >
    <div class="select-student">
      <a-row >
        <a-col span="22">
          <a-input-search
              placeholder="请输入学员编号进行搜索"
              @search="handleSearch"
              style="margin-bottom: 16px"
          />
          <a-table
              :columns="columns"
              :dataSource="studentsData"
              :rowSelection="{type: 'radio',selectedRowKeys: students, onChange: onSelectChange}"
              :rowKey="record => record.id"
              :pagination="pagination"
          />
        </a-col>
      </a-row>
      <a-alert
          message="提示"
          description="点击单选框选择学员！"
          type="info"
          show-icon
      >
        <template #icon><smile-outlined /></template>
      </a-alert>
    </div>
  </a-modal>
</template>

<script setup>
import {ref, onMounted, computed} from 'vue';
import {studentPageQuery} from "@/api/Student/studentPageQuery.js";
import { SmileOutlined } from '@ant-design/icons-vue';
import {addGraduation} from "@/api/Graduation/addGraduation.js";
import {message} from "ant-design-vue";
const studentsData = ref([]);
const students = ref([])
const searchQuery2 = ref('');
const searchQuery = ref('');
const current = ref(1);
const pageSize = ref(6);
const total = ref(50);
let emits = defineEmits(['fresh']);

const columns = [
  {title: '学员编号', dataIndex: 'studentId', key: 'studentId'},
  {title: '学员名称', dataIndex: 'name', key: 'name'},
];
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
  onChange: (page, newPageSize) => {
    current.value = page;
    pageSize.value = newPageSize;
    fetchStudents();
  },
}));
const open = ref(false);
const showModal = () => {
  open.value = true;
  fetchStudents();
};
const handleOk = async e => {
  if (students.value.length === 0) {
    message.error("请选择学员！", 1)
    return
  }
  await addGraduation(students.value[0])
  emits('fresh')
  open.value = false;
};
const fetchStudents = async () => {
  try {
    const response = await studentPageQuery({studentId: searchQuery.value,page: current.value, pageSize: pageSize.value});
    total.value = response.data.total;
    studentsData.value = response.data.records;
  } catch (error) {
    console.error('Failed to fetch students:', error);
  }
};

const handleSearch = (value) => {
  searchQuery.value = value;
  fetchStudents();
};

const onSelectChange = selectedRowKeys => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  students.value = selectedRowKeys;
  console.log(students.value);
};
onMounted(() => {
  fetchStudents();
});
</script>

<style scoped>
.select-student {
  display: flex;
  flex-direction: column;
}
</style>
