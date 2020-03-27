<template>
  <span
    class="breadcrumb-item"
  >
    <span
      ref="link"
      :class="['breadcrumb-inner', to ? 'is-link': '']"
    >
      <slot />
    </span>
    <i
      v-if="separatorClass"
      class="breadcrumb-separator"
      :class="separatorClass"
    />
    <span
      v-else
      class="breadcrumb-separator"
      role="presentation"
    >
      {{ separator }}
    </span>
  </span>
</template>
<script>
export default {
  name: 'BreadcrumbItem',
  props: {
    // 跳转路径
    to: [String, Object],
    // 是否使用repalce替换push跳转
    replace: Boolean
  },
  data: function () {
    return {
      // TODO: 接受父组件传入的 分隔符
      separator: '',
      // TODO: 接受父组件传入的 分隔符 class
      separatorClass: ''
    }
  },
  // TODO: 通过inject接受父组件注入的对象
  inject: ['breadcrumbEl'],
  mounted () {
    this.separator = this.breadcrumbEl.separator
    this.separatorClass = this.breadcrumbEl.separatorClass
    // 获取当前Link实例
    let linkEl = this.$refs.link
    linkEl.setAttribute('role', 'link')
    linkEl.addEventListener('click', event => {
      //
      let { to, replace, $router } = this
      // 判断是否传入to 是否存在$router不存在直接返回
      if (!to || !$router) {
        return false
      }
      // 根据replace的值，调用push or replace
      replace ? $router.replace(to) : $router.push(to)
    })
    console.log('this.breadcrumbEl: ', this.breadcrumbEl)
  }
}
</script>
<style lang="scss" scoped>
.breadcrumb {
  @at-root #{&}-item {
    float: left;
  }

  @at-root #{&}-separator {
    margin: 0 9px;
    font-weight: 700;
    color: #c0c4cc;
  }
  @at-root #{&}-inner {
    &.is-link:hover, & a:hover {
      color: #409eff;
      cursor: pointer;
    }
  }
  & .breadcrumb-item:last-child {
    .breadcrumb-separator {
      display: none;
    }
  }
}
</style>