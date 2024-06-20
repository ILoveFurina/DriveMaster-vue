export const validationRules = {
    name: [
        {
            required: true,
            pattern: /^[\u4e00-\u9fa5a-zA-Z]{2,12}$/,
            message: '请输入正确的姓名,只允许汉字和字母,2-12个字符',
            trigger: ['blur', 'change'],
        },
    ],
    phone: [
        {
            required: true,
            pattern: /^1[3456789]\d{9}$/,
            message: '请输入正确的手机号',
            trigger: ['blur', 'change'],
        },
    ],
    idCard: [
        {
            required: true,
            pattern: /^[0-9a-zA-Z]{18}$/,
            message: '请输入正确的身份证号码',
            trigger: ['blur', 'change'],
        },
    ],
    carType: [
        {
            required: true,
            message: '请输入车辆型号',
            trigger: ['blur', 'change']
        },
    ],
    carId: [
        {
            required: true,
            pattern: /^[\u4e00-\u9fa5][A-Z][0-9]{5}$/,
            message: '请输入正确的教练车牌号,示例: 豫G52175',
            trigger: ['blur', 'change'],
        },
    ],
    studentId: [
        {
            required: true  ,
            pattern: /^XY\d{6}$/,
            message: '请输入正确的学号,学号为XY+6位数字,例如XY000001',
            trigger: ['blur', 'change'],
        },
    ],
    coachName: [
        {
            required: true,
            pattern: /^[\u4e00-\u9fa5a-zA-Z]{2,12}$/,
            message: '请输入正确的教练名,只允许汉字和字母,2-12个字符',
            trigger: ['blur', 'change'],
        },
    ],
    address: [
        {
            required: true,
            message: '地址不得包含非法字符，不得超过100个字符',
            pattern: /^[\u4e00-\u9fa5a-zA-Z0-9]{1,100}$/,
            trigger: ['blur', 'change'],
        },
    ],
    applyType: [
        {
            required: true,
            message: '请输入申请类型',
            trigger: ['blur', 'change'],
        }
    ],
    trainDate: [
        {
            required: true,
            message: '请选择训练日期',
            trigger: ['blur', 'change'],
        },
    ],
    expenseType:[
        {
            required: true,
            message: '请输入费用类型',
            trigger: ['blur', 'change'],
        }
    ],
    setmealAmount: [
        {
            required: true,
            message: '请输入套餐金额',
            trigger: ['blur', 'change'],
        },
        {
            pattern: /^\d+(\.\d{1,2})?$/,
            message: '请输入有效的金额格式（最多两位小数）',
            trigger: ['blur', 'change'],
        },
    ],
    actualPayment: [
        {
            required: true,
            message: '请输入实际缴费金额',
            trigger: ['blur', 'change'],
        },
        {
            pattern: /^\d+(\.\d{1,2})?$/,
            message: '请输入有效的金额格式（最多两位小数）',
            trigger: ['blur', 'change'],
        },
    ],
    discountAmount: [
        {
            required: true,
            message: '请输入优惠金额',
            trigger: ['blur', 'change'],
        },
        {
            pattern: /^\d+(\.\d{1,2})?$/,
            message: '请输入有效的金额格式（最多两位小数）',
            trigger: ['blur', 'change'],
        },
    ],
    period: [
        {
            required: true,
            message: '请输入学时',
            trigger: ['blur', 'change'],
        },
        {
            message: '学时的范围为1-999',
            pattern: /^[1-9]{1,3}$/,
            trigger: ['blur', 'change'],
        },
    ],
    subjectType:[
        {
            required: true,
            message: '请选择科目类型',
            trigger: ['blur', 'change'],
        }
    ]
};
