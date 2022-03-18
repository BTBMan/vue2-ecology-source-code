let savedVue;

class Router {
  constructor(options) {
    this.$options = options;

    // vue隐藏api定义响应式数据
    const initial = window.location.hash.slice(1) || '/';
    savedVue.util.defineReactive(this, 'current', initial);

    window.addEventListener('hashchange', this.onHashChange.bind(this));
    window.addEventListener('load', this.onHashChange.bind(this));

    // 缓存路由关系
    this.routeMap = {};
    this.$options.routes.forEach((route) => {
      this.routeMap[route.path] = route;
    });
  }
  onHashChange() {
    // 赋值给current
    this.current = window.location.hash.slice(1);
  }
}

Router.install = (Vue) => {
  // 保存vue构造函数
  savedVue = Vue;

  // 全局mixin挂载$router
  Vue.mixin({
    beforeCreate() {
      // 跟组件挂载之前执行 判断是否有router选项
      if (this.$options.router) {
        // 挂载到vue的原型上
        Vue.prototype.$router = this.$options.router;
      }
    },
  });

  // 注册两个router相关的组件 router-view router-link
  Vue.component('RouterView', {
    render() {
      const current = this.$router.current;
      const CurrentComponent = this.$router.routeMap[current]?.component || null;

      return <CurrentComponent />;
    },
  });

  Vue.component('RouterLink', {
    props: {
      to: String,
      required: true,
    },
    render() {
      return <a href={`#${this.to}`}>{this.$slots.default}</a>;
    },
  });
};

export default Router;
