<template>
  <div class="graduation-management">
    <div style="margin-bottom: 10px">
      <a-popover title="请移步！">
        <template #content>
          <p>请去'学员管理'中对学员点击'毕业'</p>
          <p>即可添加到此毕业管理中</p>
        </template>
        <a-button type="primary">新增毕业学员</a-button>
      </a-popover>
    </div>

    <div class="graduation-list">
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
        title="编辑毕业学员"
        @ok="handleOk"
        @cancel="handleCancel"
    >
      <a-form :model="editForm" :rules="rules">
        <a-form-item label="申请类型" name="licenseType">
          <a-select v-model:value="editForm.licenseType">
            <a-select-option v-for="(label, value) in licenseTypeMap" :key="value" :value="value">
              {{ label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="毕业时间" name="graduateTime">
          <a-space direction="vertical">
            <a-date-picker
                v-model:value="editForm.graduateTime"
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
import { ref, onMounted, computed, reactive } from 'vue';
import {addGraduation} from "@/api/Graduation/addGraduation.js";
import {graduationPageQuery} from "@/api/Graduation/graduationPageQuery.js";
import {updateGraduation} from "@/api/Graduation/updateGraduation.js";
import {deleteGraduation} from "@/api/Graduation/deleteGraduation.js";
import moment from "moment";

const current = ref(1); // 当前页码
const totalItems = ref(85); // 总条目数
const pageSizeInfo = ref(10); // 每页条目数
const graduationData = ref([]); // 教练数据
const dataSource = graduationData; // 教练数据
const count = computed(() => dataSource.value.length); // 当前页数据条数

const isModalVisible = ref(false); // 控制弹窗显示状态
const editForm = reactive({}); // 编辑表单数据

const licenseTypeMap = reactive({
  1: '小型汽车手动挡证',
  2: '小型汽车自动挡证',
  3: '大型汽车证',
  4: '特种车辆证',
});

const columns = [
  {
    title: '姓名',
    dataIndex: 'studentName',
  },
  {
    title: '申请类型',
    dataIndex: 'licenseType',
    customRender: ({ text }) => licenseTypeMap[text] || '未知证件',
  },
  {
    title: '毕业时间',
    dataIndex: 'graduateTime',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];


const rules = {
  licenseType: [
    {
      required: true,
      trigger: ['change','blur']
    }
  ],
  graduateTime: [
      {
        required: true,
        trigger: ['change','blur'],
      }
  ]

};

const onDelete = async (id) => {
  try {
    await deleteGraduation(id);
    await fetchGraduationData({ page: current.value, pageSize: pageSizeInfo.value });
  } catch (error) {
    console.error('Failed to delete coach:', error);
  }
};

const handlePageChange = (page) => {
  fetchGraduationData({ page: current.value, pageSize: pageSizeInfo.value });
};

const fetchGraduationData = async ({ page = 1, pageSize = 10 }) => {
  try {
    const response = await graduationPageQuery({ page, pageSize });
    graduationData.value = response.data.records;
    totalItems.value = response.data.total;
    current.value = page;
    pageSizeInfo.value = pageSize;
  } catch (error) {
    console.error('Failed to fetch coaches:', error);
  }
};

const showEditModal = ({ licenseType, graduateTime, id}) => {
  Object.assign(editForm, { licenseType, graduateTime, id}); // 初始化编辑表单数据
  isModalVisible.value = true;
};

const handleOk = async () => {
  try {
    console.log(editForm)
    await updateGraduation(editForm);
    isModalVisible.value = false;
    await fetchGraduationData({ page: current.value, pageSize: pageSizeInfo.value }); // 重新获取数据
  } catch (error) {
    console.error('Failed to update student:', error);
  }
};

const handleCancel = () => {
  isModalVisible.value = false;
};

onMounted(() => {
  fetchGraduationData({ page: current.value, pageSize: pageSizeInfo.value });
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
