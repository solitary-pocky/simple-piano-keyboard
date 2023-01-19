// コンポーネントのインポート
import SimplePianoKeyboard from './components/SimplePianoKeyboard.vue'; //(1)Vueのファイル名に変更

// Vue.use() によって実行される install 関数を定義
export default {
  install: (app, options) => {
    app.component('SimplePianoKeyboard', SimplePianoKeyboard); //(2)コンポーネント名を変更
  },
};
