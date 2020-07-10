<!--
 * @Descripttion: checkbox组件
 * @Author: asyncnode
 * @Date: 2020-05-27 08:45:41
 * @LastEditors: asyncnode
 * @LastEditTime: 2020-06-22 16:51:51
-->
<template>
  <label :class="wrapperClasses">
    <span :class="checkboxClass"></span>
  </label>
</template>

<script>
const prefix = 'hp-checkbox';
export default {
  name: 'HpCheckbox',
  data() {
    return {};
  },
  computed: {
    wrapperClasses() {
      return [`${prefix}`];
    }
  },
  mounted() {},
  methods: {}
};
</script>

<style lang="scss" scoped></style>
