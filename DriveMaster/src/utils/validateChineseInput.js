export default function validateInput(input,regex) {
    //const regex = /^[a-zA-Z0-9_\u4e00-\u9fa5]+$/;
    if (!regex.test(input)) {
        return false;
    }
    // 计算实际长度，汉字算作2个字符
    let length = 0;
    for (let i = 0; i < input.length; i++) {
        const char = input.charAt(i);
        if (char.match(/[\u4e00-\u9fa5]/)) {
            length += 2; // 汉字算作2个字符
        } else {
            length += 1; // 英文、数字、下划线算作1个字符
        }
    }
    return length >= 5 && length <= 16;
}
