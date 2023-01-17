// https://qiita.com/teramo3033/items/714211b6a080d8308f1b

// コンポーネントのインポート
import SimplePianoKeyboard from './components/SimplePianoKeyboard.vue'; //(1)Vueのファイル名に変更

// Vue.use() によって実行される install 関数を定義
export function install(Vue) {
  if (install.installed) return;
  install.installed = true;
  Vue.component('SimplePianoKeyboard', SimplePianoKeyboard); //(2)コンポーネント名を変更
}

// Vue.use() のためのモジュール定義を作成
// Create module definition for Vue.use()
const plugin = {
  install,
};

// vue が見つかった場合に自動インストールする (ブラウザで <script> タグを用いた場合等)
let GlobalVue = null;
if (typeof window !== 'undefined') {
  GlobalVue = window.Vue;
} else if (typeof global !== 'undefined') {
  GlobalVue = global.Vue;
}
if (GlobalVue) {
  GlobalVue.use(plugin);
}

// (npm/webpack 等で) モジュールとして利用させるためコンポーネントを export する
export default component;
