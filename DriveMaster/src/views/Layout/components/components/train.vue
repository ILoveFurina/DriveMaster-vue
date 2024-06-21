<template>
  <div>
    <!-- 新增学员按钮-->
    <a-button type="primary" @click="showModal">新增学员</a-button>
    <a-modal v-model:open="open" title="新增学员" :confirm-loading="confirmLoading" @ok="handleAddOk">
      <a-form :model="addForm" :rules="rules" ref="addFormRef">
        <a-form-item label="学员编号" name="studentId">
          <a-input v-model:value="addForm.studentId" />
        </a-form-item>
        <a-form-item label="科目类型" name="subjectType">
          <a-select v-model:value="addForm.subjectType">
            <a-select-option v-for="(label, value) in subjectTypeMap" :key="value" :value="value">
              {{ label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="学时" name="period">
          <a-input v-model:value="addForm.period" />
        </a-form-item>
        <a-form-item label="训练日期" name="trainDate">
          <a-space direction="vertical">
            <a-date-picker
                v-model:value="addForm.trainDate"
                value-format="YYYY-MM-DD HH:mm:ss"
                show-time
            />
          </a-space>
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
        <a-form-item label="科目类型" name="subjectType">
          <a-select v-model:value="editForm.subjectType">
            <a-select-option v-for="(label, value) in subjectTypeMap" :key="value" :value="value">
              {{ label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="学时" name="period">
          <a-input v-model:value="editForm.period" />
        </a-form-item>
        <a-form-item label="训练日期" name="trainDate">
          <a-space direction="vertical">
            <a-date-picker
                v-model:value="editForm.trainDate"
                value-format="YYYY-MM-DD HH:mm:ss"
                show-time
            />
          </a-space>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import {ref, onMounted, computed, reactive} from 'vue';
import moment from 'moment';
import {deleteStudent} from "@/api/Student/deleteStudent.js"
import {addTrain} from "@/api/Train/addTrain.js";
import {trainPageQuery} from "@/api/Train/trainPageQuery.js";
import {updateTrain} from "@/api/Train/updateTrain.js";
import {deleteTrain} from "@/api/Train/deleteTrain.js";
import {validationRules} from "@/utils/validationRules.js";

//新增教练相关属性
const addFormRef = ref();
const open = ref(false);
const confirmLoading = ref(false);
const addForm = reactive({});
const editFormRef = ref();
const current = ref(1); // 当前页码
const totalItems = ref(85); // 总条目数
const pageSizeInfo = ref(10); // 每页条目数
const coaches = ref([]); // 教练数据
const dataSource = coaches; // 教练数据
const count = computed(() => dataSource.value.length); // 当前页数据条数

const isModalVisible = ref(false); // 控制弹窗显示状态
const editForm = reactive({}); // 编辑表单数据
const subjectTypeMap = reactive({
  1:'科目一',
  2:'科目二',
  3:'科目三',
  4:'科目四'
});

const columns = [
  {
    title: '学号',
    dataIndex: 'studentId',
  },
  {
    title: '姓名',
    dataIndex: 'studentName',
  },
  {
    title: '科目类型',
    dataIndex: 'subjectType',
    customRender: ({text}) => subjectTypeMap[text] || '未知证件',
  },
  {
    title: '训练日期',
    dataIndex: 'trainDate',
  },
  {
    title: '学时',
    dataIndex: "period"
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: {customRender: 'operation'},
  },
];


const rules = validationRules

const handleAddOk = async () => {
  await addFormRef.value.validate();
  confirmLoading.value = true;
  setTimeout(async () => {
    open.value = false;
    confirmLoading.value = false;
    await addTrain(addForm);
    await fetchTrains({page: current.value, pageSize: pageSizeInfo.value});
  }, 200);
};

const onDelete = async (id) => {
  try {
    await deleteTrain(id);
    await fetchTrains({page: current.value, pageSize: pageSizeInfo.value});
  } catch (error) {
    console.error('Failed to delete coach:', error);
  }
};

const handlePageChange = (page) => {
  fetchTrains({page: current.value, pageSize: pageSizeInfo.value});
};

const fetchTrains = async ({page = 1, pageSize = 10}) => {
  try {
    const response = await trainPageQuery({page, pageSize});
    coaches.value = response.data.records;
    totalItems.value = response.data.total;
    current.value = page;
    pageSizeInfo.value = pageSize;
  } catch (error) {
    console.error('Failed to fetch coaches:', error);
  }
};

const showModal = () => {
  open.value = true;
};

const showEditModal = ({subjectType, period,trainDate, id}) => {
  Object.assign(editForm, {subjectType, period, trainDate,id}); // 初始化编辑表单数据
  isModalVisible.value = true;
};

const handleOk = async () => {
  try {
    console.log(JSON.stringify(editForm))
    await editFormRef.value.validate();
    await updateTrain(editForm); // 更新教练信息
    isModalVisible.value = false;
    await fetchTrains({page: current.value, pageSize: pageSizeInfo.value}); // 重新获取数据
  } catch (error) {
    console.error('Failed to update student:', error);
  }
};

const handleCancel = () => {
  isModalVisible.value = false;
};

onMounted(() => {
  fetchTrains({page: current.value, pageSize: pageSizeInfo.value});
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
