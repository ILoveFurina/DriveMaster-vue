<template>
  <div>
    <!-- 新增学员按钮-->
    <a-button type="primary" @click="showModal">新增学员</a-button>
    <a-modal v-model:open="open" title="新增学员" :confirm-loading="confirmLoading" @ok="handleAddOk" >
      <a-form :model="addForm" :rules="rules" ref="addFormRef">
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="身份证" name="idCard">
          <a-input v-model:value="addForm.idCard" />
        </a-form-item>
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="addForm.phone" />
        </a-form-item>
        <a-form-item label="地址" name="address">
          <a-input v-model:value="addForm.address" />
        </a-form-item>
        <a-form-item label="教练名" name="coachName" @blur="checkCoach">
          <a-input v-model:value="addForm.coachName" />
        </a-form-item>
        <a-form-item label="申请类型" name="applyType">
          <a-select v-model:value="addForm.applyType">
            <a-select-option v-for="(label, value) in carTypeMap" :key="value" :value="value">
              {{ label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>

  <div class="coach-management">
    <div class="coach-list">
      <a-table bordered :data-source="dataSource" :columns="columns">
        <template #bodyCell="{ column, text, record }">
          <template v-if="column.dataIndex === 'operation'">
            <a-space>
              <a @click="showEditModal(record)">编辑</a>
              <a-popconfirm
                  title="Sure to delete?"
                  @confirm="onDelete(record.id)"
              >
                <a>删除</a>
              </a-popconfirm>
            </a-space>
            <a @click="markGraduated(record.id)">&nbsp;毕业</a>
          </template>
        </template>
      </a-table>
      <div class="page">
        <a-pagination
            v-model:current="current"
            v-model:pageSize="pageSizeInfo"
            :total="totalItems"
            :show-total="(total, range) => `第${current}页 共${count}条，总计有 ${total} 条记录`"
            @change="handlePageChange"
        />
      </div>
    </div>
    <a-modal
        v-model:visible="isModalVisible"
        title="Edit Coach"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <a-form :model="editForm" :rules="rules" ref="editFormRef">
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="editForm.name" />
        </a-form-item>
        <a-form-item label="身份证" name="idCard">
          <a-input v-model:value="editForm.idCard" />
        </a-form-item>
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="editForm.phone" />
        </a-form-item>
        <a-form-item label="地址" name="address">
          <a-input v-model:value="editForm.address" />
        </a-form-item>
        <a-form-item label="申请类型" name="applyType">
          <a-select v-model:value="editForm.applyType">
            <a-select-option v-for="(label, value) in carTypeMap" :key="value" :value="value">
              {{ label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="教练名" name="coachName">
          <a-input v-model:value="editForm.coachName" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';

import { addStudent } from "@/api/Student/addStudent.js";
import {deleteStudent} from "@/api/Student/deleteStudent.js"
import { updateStudent} from "@/api/Student/updateStudent.js"
import { studentPageQuery } from "@/api/Student/studentPageQuery.js"
import {getCoachByName} from "@/api/Coach/getCoachByName.js";
import {message} from "ant-design-vue";
import {addGraduation} from "@/api/Graduation/addGraduation.js";
import {validationRules} from "@/utils/validationRules.js";

const open = ref(false);
const confirmLoading = ref(false);
const addForm = reactive({});
const addFormRef = ref();
const editFormRef = ref();
const current = ref(1); // 当前页码
const totalItems = ref(85); // 总条目数
const pageSizeInfo = ref(10); // 每页条目数
const coaches = ref([]);
const dataSource = coaches;
const count = computed(() => dataSource.value.length); // 当前页数据条数

const isModalVisible = ref(false); // 控制弹窗显示状态
const editForm = reactive({}); // 编辑表单数据

const carTypeMap = reactive({
  1: '小型汽车手动挡证',
  2: '小型汽车自动挡证',
  3: '大型汽车证',
  4: '特种车辆证',
});
const columns = [
  {
    title: '学号',
    dataIndex: 'studentId',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '身份证',
    dataIndex: 'idCard',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '地址',
    dataIndex: 'address',
  },
  {
    title: '申请类型',
    dataIndex: 'applyType',
    customRender: ({ text }) => carTypeMap[text] || '未知证件',
  },
  {
    title: '报名时间',
    dataIndex: 'createTime',
  },
  {
    title: '所属教练',
    dataIndex: "coachName"
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];

const rules = validationRules;

const markGraduated = async (id) => {
  const response = await addGraduation(id)
  if(response.code === 200){
    message.success("将该学生标记为已毕业！请去毕业管理进行查看");
  }
}
const showModal = () => {
  open.value = true;
};

const handleAddOk = async () => {
  await addFormRef.value.validate();
  confirmLoading.value = true;
  setTimeout(async () => {
    open.value = false;
    confirmLoading.value = false;
    await addStudent(addForm);
    await fetchStudents({ page: current.value, pageSize: pageSizeInfo.value });
  }, 200);
};

const onDelete = async (id) => {
  try {
    await deleteStudent(id);
    await fetchStudents({ page: current.value, pageSize: pageSizeInfo.value });
  } catch (error) {
    console.error('Failed to delete coach:', error);
  }
};

const handlePageChange = (page) => {
  fetchStudents({ page: current.value, pageSize: pageSizeInfo.value });
};

const fetchStudents = async ({ page = 1, pageSize = 10 }) => {
  try {
    const response = await studentPageQuery({ page, pageSize });
    coaches.value = response.data.records;
    totalItems.value = response.data.total;
    current.value = page;
    pageSizeInfo.value = pageSize;
  } catch (error) {
    console.error('Failed to fetch coaches:', error);
  }
};

const showEditModal = ({ id, name, phone, idCard, carId, carType, address, coachName, applyType}) => {
  Object.assign(editForm, { id, name, phone, idCard, carId, carType, address, coachName, applyType}); // 初始化编辑表单数据
  isModalVisible.value = true;
};

const handleOk = async () => {
  try {
    console.log(editForm)
    await editFormRef.value.validate();
    await updateStudent(editForm); // 更新教练信息
    isModalVisible.value = false;
    await fetchStudents({ page: current.value, pageSize: pageSizeInfo.value }); // 重新获取数据
  } catch (error) {
    console.error('Failed to update student:', error);
  }
};

const handleCancel = () => {
  isModalVisible.value = false;
};

onMounted(() => {
  fetchStudents({ page: current.value, pageSize: pageSizeInfo.value });
});
</script>

<style lang="less" scoped>
.coach-management {
  padding: 20px;
}

.coach-list ul {
  list-style-type: none;
  padding: 0;
}

.coach-list li {
  padding: 10px;
  border-bottom: 1px solid #eee;
}

.editable-cell {
  position: relative;
  .editable-cell-input-wrapper,
  .editable-cell-text-wrapper {
    padding-right: 24px;
  }

  .editable-cell-text-wrapper {
    padding: 5px 24px 5px 5px;
  }

  .editable-cell-icon,
  .editable-cell-icon-check {
    position: absolute;
    right: 0;
    width: 20px;
    cursor: pointer;
  }

  .editable-cell-icon {
    margin-top: 4px;
    display: none;
  }

  .editable-cell-icon-check {
    line-height: 28px;
  }

  .editable-cell-icon:hover,
  .editable-cell-icon-check:hover {
    color: #108ee9;
  }

  .editable-add-btn {
    margin-bottom: 8px;
  }
}
.editable-cell:hover .editable-cell-icon {
  display: inline-block;
}

.page {
  padding: 24px;
  text-align: center;
  z-index: 1000;
}
</style>
