<template>
  <div class="breadcrumb">
    <slot></slot>
  </div>
</template>
<script>
export default {
  name: 'Breadcrumb',
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
      breadcrumb: this
    }
  },
  mounted () {},
}
</script>
<style lang="scss" scoped>
</style>