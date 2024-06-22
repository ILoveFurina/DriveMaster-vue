<template>
  <a-button type="primary" @click="showModal">选择教练</a-button> 当前选中：{{ coach }}
  <a-modal v-model:open="open" title="选择教练" @ok="handleOk" width="50%" >
    <div class="select-coach">
      <a-row >
        <a-col span="22">
          <a-input-search
              placeholder="请输入教练名进行搜索"
              @search="handleSearch"
              style="margin-bottom: 16px"
          />
          <a-table
              :columns="columns"
              :dataSource="coachData"
              :rowSelection="{type: 'radio',selectedRowKeys: coachs, onChange: onSelectChange}"
              :rowKey="record => record.name"
              :pagination="pagination"
          />
        </a-col>
      </a-row>
      <a-alert
          message="提示"
          description="点击单选框选择教练！"
          type="info"
          show-icon
      >
        <template #icon><smile-outlined /></template>
      </a-alert>
    </div>
  </a-modal>
</template>

<script setup>
import {ref, onMounted, computed, reactive} from 'vue';

import { SmileOutlined } from '@ant-design/icons-vue';
import {coachPageQuery} from "@/api/Coach/coachPageQuery.js";
import {message} from "ant-design-vue";
const coachData = ref([]);
const coachs = ref([])

const coach = computed(() => {
  if(coachs.value.length > 0){
    return coachs.value[0];
  }else if(props.coachName!=null){
    return props.coachName;
  }
  return '无'
})

const searchQuery = ref('');
const current = ref(1);
const pageSize = ref(6);
const total = ref(50);

let emits = defineEmits(['targetCoach']);
const carTypeMap = reactive({
  1: '小型汽车手动挡',
  2: '小型汽车自动挡',
  3: '大型汽车',
  4: '特种车辆',
});
const columns = [
  {title: '教练名', dataIndex: 'name'},
  {title: '车牌号', dataIndex: 'carId'},
  {title: '车辆型号', dataIndex: 'carType', customRender: ({ text }) => carTypeMap[text] || '未知证件'},
];

let props = defineProps({

  coachName : {
    type: String,
    default: '无'
  }
});
const pagination = computed(() => ({
  total: total.value,
  current: current.value,
  pageSize: pageSize.value,
  onChange: (page, newPageSize) => {
    current.value = page;
    pageSize.value = newPageSize;
    fetchCoachs();
  },
}));
const open = ref(false);
const showModal = () => {
  open.value = true;
  fetchCoachs();
};
const handleOk = e => {
    console.log(coachs.value);
    if(coachs.value.length === 0){
      message.error('请选择教练！',3);
      return;
    }
    emits('targetCoach', coachs.value[0]); //触发父组件事件 传递教练名字
    open.value = false;
};
const fetchCoachs = async () => {
  try {
    const response = await coachPageQuery({name: searchQuery.value,page: current.value, pageSize: pageSize.value});
    total.value = response.data.total;
    coachData.value = response.data.records;
  } catch (error) {
    console.error('Failed to fetch coachs:', error);
  }
};

const handleSearch = (value) => {
  searchQuery.value = value;
  fetchCoachs();
};

const onSelectChange = selectedRowKeys => {
  console.log('selectedRowKeys changed: ', selectedRowKeys);
  coachs.value = selectedRowKeys;
};
onMounted(() => {
  fetchCoachs();
});
</script>

<style scoped>
.select-coach {
  display: flex;
  flex-direction: column;
}
</style>
