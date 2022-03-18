let savedVue;

class Store {
  constructor(options) {
    this._mutations = options.mutations;

    this._actions = options.actions;

    this._wrappedGetters = options.getters;

    this.getters = {};

    const computed = {};

    // 遍历_wrappedGetters
    Object.keys(this._wrappedGetters).forEach((key) => {
      const fn = this._wrappedGetters[key];

      computed[key] = () => {
        return fn(this.state);
      };

      // 为getters定义defineProperty
      Object.defineProperty(this.getters, key, {
        get: () => {
          return this._vm[key];
        },
      });
    });

    this._vm = new savedVue({
      data: {
        $$state: options.state,
      },
      computed,
    });

    // 作用域问题处理
    const store = this;
    const { commit, action } = store;

    this.commit = function boundCommit(type, payload) {
      return commit.call(store, type, payload);
    };

    this.action = function boundAction(type, payload) {
      return action.call(store, type, payload);
    };
  }

  get state() {
    return this._vm._data.$$state;
  }

  commit(type, payload) {
    const fn = this._mutations[type];

    if (fn) {
      fn(this.state, payload);
    }
  }

  dispatch(type, payload) {
    const fn = this._actions[type];

    if (fn) {
      return fn(this, payload);
    }
  }
}

function install(Vue) {
  // 存储Vue构造函数
  savedVue = Vue;

  // vue原型挂载$store
  Vue.mixin({
    beforeCreate() {
      if (this.$options.store) {
        Vue.prototype.$store = this.$options.store;
      }
    },
  });
}

export default {
  Store,
  install,
};
