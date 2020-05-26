<!--
 * @Descripttion: 文档
 * @Author: asyncnode
 * @Date: 2020-05-13 10:37:47
 * @LastEditors: asyncnode
 * @LastEditTime: 2020-05-25 09:46:04
-->
<template>
  <div id="app">
    <hpRadioEx></hpRadioEx>
    <hpBreadcrumbEx></hpBreadcrumbEx>
  </div>
</template>
<script>
import hpRadioEx from '../examples/components/radio';
import hpBreadcrumbEx from '@examples/components/breadcrumb';
export default {
  name: 'App',
  components: {
    hpRadioEx,
    hpBreadcrumbEx
  }
};
</script>
