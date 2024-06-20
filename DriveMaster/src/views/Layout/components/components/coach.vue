<template>
  <div>
    <a-button type="primary" @click="showModal">新增教练</a-button>
    <a-modal v-model:open="open" title="新增教练" :confirm-loading="confirmLoading" @ok="handleAddOk">
      <a-form :model="addForm" :rules="rules" ref="addFormRef">  <!-- ref-->
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="addForm.name" />
        </a-form-item>
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="addForm.phone" />
        </a-form-item>
        <a-form-item label="身份证" name="idCard">
          <a-input v-model:value="addForm.idCard" />
        </a-form-item>
        <a-form-item label="教练车牌" name="carId">
          <a-input v-model:value="addForm.carId" />
        </a-form-item>
        <a-form-item label="车辆型号" name="carType">
          <a-select v-model:value="addForm.carType">
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
              <a-popconfirm title="Sure to delete?" @confirm="onDelete(record.id)">
                <a>删除</a>
              </a-popconfirm>
            </a-space>
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
    <a-modal v-model:visible="isModalVisible" title="编辑教练" @ok="handleOk" @cancel="handleCancel">
      <a-form :model="editForm" :rules="rules" ref="editFormRef">
        <a-form-item label="姓名" name="name">
          <a-input v-model:value="editForm.name" />
        </a-form-item>
        <a-form-item label="手机号" name="phone">
          <a-input v-model:value="editForm.phone" />
        </a-form-item>
        <a-form-item label="身份证" name="idCard">
          <a-input v-model:value="editForm.idCard" />
        </a-form-item>
        <a-form-item label="教练车牌" name="carId">
          <a-input v-model:value="editForm.carId" />
        </a-form-item>
        <a-form-item label="车辆型号" name="carType">
          <a-select v-model:value="editForm.carType">
            <a-select-option v-for="(label, value) in carTypeMap" :key="value" :value="value">
              {{ label }}
            </a-select-option>
          </a-select>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import { coachPageQuery } from "@/api/Coach/coachPageQuery.js";
import { deleteCoach } from "@/api/Coach/deleteCoach.js";
import { updateCoach } from "@/api/Coach/updateCoach.js";
import { addCoach } from "@/api/Coach/addCoach.js";
import {validationRules} from "@/utils/validationRules.js"; // 假设存在更新教练信息的 API

// 教练相关属性
const open = ref(false);
const confirmLoading = ref(false);
const addForm = reactive({});
const addFormRef = ref(null); // 教练表单的引用

const current = ref(1); // 当前页码
const totalItems = ref(85); // 总条目数
const pageSizeInfo = ref(10); // 每页条目数
const coaches = ref([]); // 教练数据
const dataSource = coaches; // 教练数据
const count = computed(() => dataSource.value.length); // 当前页数据条数

const isModalVisible = ref(false); // 控制弹窗显示状态
const editForm = reactive({}); // 编辑表单数据
const editFormRef = ref(null); // 编辑教练表单的引用

const carTypeMap = reactive({
  1: '小型汽车手动挡',
  2: '小型汽车自动挡',
  3: '大型汽车',
  4: '特种车辆',
});

const columns = [
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '身份证',
    dataIndex: 'idCard',
  },
  {
    title: '教练车牌',
    dataIndex: 'carId',
  },
  {
    title: '车辆型号',
    dataIndex: 'carType',
    customRender: ({ text }) => carTypeMap[text] || '未知型号',
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];
const rules = validationRules; // 统一存放了校验规则

const showModal = () => {
  open.value = true;
};

const handleAddOk = async () => {
  try {
    await addFormRef.value.validate(); // 触发表单验证
    confirmLoading.value = true;
    await addCoach(addForm);
    open.value = false;
    confirmLoading.value = false;
    await fetchCoaches({page: current.value, pageSize: pageSizeInfo.value});
  } catch (error) {
    confirmLoading.value = false;
    console.error('Failed to add coach:', error);
  }
};

const onDelete = async (id) => {
  try {
    await deleteCoach(id);
    await fetchCoaches({page: current.value, pageSize: pageSizeInfo.value});
  } catch (error) {
    console.error('Failed to delete coach:', error);
  }
};

const handlePageChange = (page) => {
  fetchCoaches({ page: current.value, pageSize: pageSizeInfo.value });
};

const fetchCoaches = async ({ page = 1, pageSize = 10 }) => {
  try {
    const response = await coachPageQuery({ page, pageSize });
    coaches.value = response.data.records;
    totalItems.value = response.data.total;
    current.value = page;
    pageSizeInfo.value = pageSize;
  } catch (error) {
    console.error('Failed to fetch coaches:', error);
  }
};

const showEditModal = ({ id, name, phone, idCard, carId, carType}) => {
  Object.assign(editForm, { id, name, phone, idCard, carId, carType}); // 初始化编辑表单数据
  isModalVisible.value = true;
};

const handleOk = async () => {
  try {
    console.log(editForm)
    await updateCoach(editForm); // 更新教练信息
    isModalVisible.value = false;
    fetchCoaches({ page: current.value, pageSize: pageSizeInfo.value }); // 重新获取数据
  } catch (error) {
    console.error('Failed to update coach:', error);
  }
};

const handleCancel = () => {
  isModalVisible.value = false;
};

onMounted(() => {
  fetchCoaches({ page: current.value, pageSize: pageSizeInfo.value });
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
