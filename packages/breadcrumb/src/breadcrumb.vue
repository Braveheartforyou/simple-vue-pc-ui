<template>
  <div class="breadcrumb">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'HpBreadcrumb',
  props: {
    separator: {
      type: String,
      default: '/'
    },
    separatorClass: {
      type: String,
      default: ''
    }
  },
  provide () {
    return {
      breadcrumbEl: this
    }
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
</style>