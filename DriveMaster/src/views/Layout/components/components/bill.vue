<template>
  <div>
    <!-- 新增账单按钮-->
    <div style="display: flex">
      <a-button type="primary" @click="showModal">新增账单</a-button>
      <a-input-search
          placeholder="根据账单号进行搜索"
          @search="handleBillSearch"
          style="margin-bottom: 16px;margin-left: 20px;width: 200px"
      />
      <a-input-search
          placeholder="根据学号进行搜索"
          @search="handleStudentSearch"
          style="margin-bottom: 16px;margin-left: 20px;width: 200px"
      />
    </div>

    <a-modal v-model:open="open" title="新增账单" :confirm-loading="confirmLoading" @ok="handleAddOk">
      <a-form :model="addForm" :rules="rules" ref="addFormRef">
        <a-form-item label="学员编号" name="studentId">
          <select-student @targetStudent="handleStudentId"/>
        </a-form-item>
        <a-form-item label="费用类型" name="expenseType">
          <a-select v-model:value="addForm.expenseType">
            <a-select-option v-for="(label, value) in expenseTypeMap" :key="value" :value="value">
              {{ label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="套餐金额" name="setmealAmount">
          <a-input v-model:value="addForm.setmealAmount" />
        </a-form-item>
        <a-form-item label="优惠金额" name="discountAmount">
          <a-input v-model:value="addForm.discountAmount" />
        </a-form-item>
        <a-form-item label="实际缴费金额" name="actualPayment">
          <a-input v-model:value="addForm.actualPayment" />
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
        <a-form-item label="费用类型" name="expenseType">
          <a-select v-model:value="editForm.expenseType">
            <a-select-option v-for="(label, value) in expenseTypeMap" :key="value" :value="value">
              {{ label }}
            </a-select-option>
          </a-select>
        </a-form-item>
        <a-form-item label="套餐金额" name="setmealAmount">
          <a-input v-model:value="editForm.setmealAmount" />
        </a-form-item>
        <a-form-item label="优惠金额" name="discountAmount">
          <a-input v-model:value="editForm.discountAmount" />
        </a-form-item>
        <a-form-item label="实际缴费金额" name="actualPayment">
          <a-input v-model:value="editForm.actualPayment" />
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive } from 'vue';
import {message} from "ant-design-vue";
import {billPageQuery} from "@/api/Bill/billPageQuery.js";
import {deleteBill} from "@/api/Bill/deleteBill.js";
import {isStudentExists} from "@/api/Student/isStudentExists.js";
import {addBill} from "@/api/Bill/addBill.js";
import {updateBill} from "@/api/Bill/updateBill.js";
import {validationRules} from "@/utils/validationRules.js";
import SelectStudent from "@/views/Layout/components/components/components/selectStudent.vue";

//新增教练相关属性
const modalText = ref('Content of the modal');
const open = ref(false);
const confirmLoading = ref(false);
const addForm = reactive({});
const addFormRef = ref();
const current = ref(1); // 当前页码
const totalItems = ref(85); // 总条目数
const pageSizeInfo = ref(10); // 每页条目数
const bills = ref([]);
const dataSource = bills;
const count = computed(() => dataSource.value.length); // 当前页数据条数
const editFormRef = ref();
const isModalVisible = ref(false); // 控制弹窗显示状态
const editForm = reactive({}); // 编辑表单数据
const searchBillQuery = ref();
const searchStudentQuery = ref();

const expenseTypeMap = reactive({
  1:'学费',
  2:'补考费',
  3:'课时费',
  4:'考试费',
})
const carTypeMap = reactive({
  1: '小型汽车手动挡证',
  2: '小型汽车自动挡证',
  3: '大型汽车证',
  4: '特种车辆证',
});
const columns = [
  {
    title: '单号',
    dataIndex: 'billId',
  },
  {
    title: '单据日期',
    dataIndex: 'billDate',
  },
  {
    title: '学员编号',
    dataIndex: 'studentId',
  },
  {
    title: '姓名',
    dataIndex: 'name',
  },
  {
    title: '身份证号',
    dataIndex: 'idCard',
  },
  {
    title: '手机号',
    dataIndex: 'phone',
  },
  {
    title: '申请类型',
    dataIndex: 'applyType',
    customRender: ({ text }) => carTypeMap[text] || '未知证件',
  },
  {
    title: '费用类型',
    dataIndex: 'expenseType',
    customRender: ({ text }) => expenseTypeMap[text] || '未知证件',
  },
  {
    title: '套餐金额',
    dataIndex: "setmealAmount"
  },
  {
    title: '优惠金额',
    dataIndex: 'discountAmount',
  },
  {
    title: '实际缴费金额',
    dataIndex: 'actualPayment',
  },
  {
    title: '操作人',
    dataIndex: 'createUsername',
  },
  {
    title: '操作',
    dataIndex: 'operation',
    scopedSlots: { customRender: 'operation' },
  },
];


const rules = validationRules

const handleStudentId = async (selectedStudents) => {
  addForm.studentId = selectedStudents[0];
  await addFormRef.value.validate('studentId');
  console.log(selectedStudents[0]);
}

const showModal = () => {
  open.value = true;
};
const handleBillSearch = (value) => {
  searchBillQuery.value = value;
  fetchBills({
    billNumber:searchBillQuery.value,
    page: current.value,
    pageSize: pageSizeInfo.value });
};
const handleStudentSearch = (value) => {
  searchStudentQuery.value = value;
  fetchBills({
    studentNumber:searchStudentQuery.value,
    billNumber:searchBillQuery.value,
    page: current.value,
    pageSize: pageSizeInfo.value });
};

const handleAddOk = async () => {
  await addFormRef.value.validate();
  confirmLoading.value = true;
  if(await isStudentExists(addForm.studentId)){
    setTimeout(async () => {
      open.value = false;
      confirmLoading.value = false;
      await addBill(addForm);
      await fetchBills({ page: current.value, pageSize: pageSizeInfo.value });
    }, 200);
  }else{
    message.error("该学号不存在,请检查学员列表");
  }
};

const onDelete = async (id) => {
  try {
    await deleteBill(id);
    await fetchBills({ page: current.value, pageSize: pageSizeInfo.value });
  } catch (error) {
    console.error('Failed to delete coach:', error);
  }
};

const handlePageChange = (page) => {
  fetchBills({ page: current.value, pageSize: pageSizeInfo.value });
};

const fetchBills = async ({ billNumber='',studentNumber='', page = 1, pageSize = 10 }) => {
  try {
    const response = await billPageQuery({billNumber, studentNumber,page, pageSize });
    bills.value = response.data.records;
    totalItems.value = response.data.total;
    current.value = page;
    pageSizeInfo.value = pageSize;
  } catch (error) {
    console.error('Failed to fetch bills:', error);
  }
};

const showEditModal = ({expenseType,setmealAmount,discountAmount,actualPayment,id, }) => {
  Object.assign(editForm, { expenseType,setmealAmount,discountAmount,actualPayment,id}); // 初始化编辑表单数据
  isModalVisible.value = true;
};

const handleOk = async () => {
  try {
    console.log(editForm)
    await editFormRef.value.validate();
    await updateBill(editForm); // 更新教练信息
    isModalVisible.value = false;
    await fetchBills({ page: current.value, pageSize: pageSizeInfo.value }); // 重新获取数据
  } catch (error) {
    console.error('Failed to update student:', error);
  }
};

const handleCancel = () => {
  isModalVisible.value = false;
};

onMounted(() => {
  fetchBills({ page: current.value, pageSize: pageSizeInfo.value });
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
