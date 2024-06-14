<!-- FooterInfo.vue -->
<template>
  <div class="footer-info">
    郑州轻工业大学 闫其武 独立开发 基于Vue3+SpringBoot3
  </div>
</template>

<script>
export default {
  name: 'FooterInfo',
}
</script>

<style scoped>
.footer-info {
  position: fixed;
  bottom: 0;
  width: 100%;
  text-align: center;
  padding: 10px 0;
  box-shadow: 0 -2px 5px rgba(0, 0, 0, 0.1);
  background: #77A1D3;  /* fallback for old browsers */
  background: -webkit-linear-gradient(to right, #E684AE, #79CBCA, #77A1D3);  /* Chrome 10-25, Safari 5.1-6 */
  background: linear-gradient(to right, #E684AE, #79CBCA, #77A1D3); /* W3C, IE 10+/ Edge, Firefox 16+, Chrome 26+, Opera 12+, Safari 7+ */

}
</style>
