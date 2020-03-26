<template>
  <span class="breadcrumb-item">
    <span v-bind:class="['breadcrumb-inner']">
      <slot></slot>
    </span>
    <span class="breadcrumb-separator">
      {{separator}}
    </span>
  </span>
</template>
<script>
export default {
  name: 'BreadcrumbItem',
  props: {
    // 跳转路径
    to: {},
    // 是否使用repalce替换push跳转
    replace: Boolean
  },
  data: {
    separator: '',
    separatorClass: ''
  },
  inject: ['breadcrumbEl'],
  mounted () {
    this.separator = this.breadcrumbEl.separator
    this.separatorClass = this.breadcrumbEl.separatorClass
    console.log('this.breadcrumbEl: ', this.breadcrumbEl);
  },
}
</script>
<style lang="scss" scoped>
</style>