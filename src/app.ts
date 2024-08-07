
import { createApp } from 'vue';
import pinia from '@/store';
import './app.scss';

const App = createApp({
  onLaunch () {
    console.log('App onShow.')
  },
  // 入口组件不需要实现 render 方法，即使实现了也会被 taro 所覆盖
  render(h) {
    return h('div', this.$slots.default)
  }
}).use(pinia);

export default App;
