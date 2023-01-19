# simple-piano-keyboard

## What is this?

`simple-piano-keyboard` is literally "simple piano keyboard" component of Vue.js🤣<br/>This package doesn't include mechanism of sound for now. But if you have sound sources and combine with, it's possible to create musical instrument, I think.<br/>This is very simple component but that's reason it has infinity possibility🤩

## Property list

This is the list you can input values like below:

```
<simple-piano-keyboard v-model="selectedNotes" lowestNote="C3" highestNote="C4"></simple-piano-keyboard>
```

(Now on write description... Prease wait full version.)
| Property | Type | Description | Default value |
| :------- | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| v-model | String[]<br/> or <br/>Number[] | Array of MIDI note number or international styled note name like 'C4'.<br/>For example, the central C on piano is 'C4'. And its one octave higher is 'C5'. MIDI note number of 'C4' is 60. Notes of black key can be expressed like 'A#2' by using #. <br/>The value of this property is interlockly changed with keyboard's selection state. | `[]` |
|lowestNote|String<br/> or <br/>Number|The lowest note of a keyboard.|`'A0'`<br/>(The lowest note of the piano with 88 keys)|
|highestNote|String<br/> or <br/>Number|The highest note of a keyboard.|`'C8'`<br/>(The highest note of the piano with 88 keys)|
|keyHeightSize|Number|The height size number of each keys of keyboard. If you input 1, the white key's height is set 12px.|`10`|
|keyWidthSize|Number|The width size number of each keys of keyboard. If you input 1, the white key's width is set 3px.|`10`|
|padding|Number|The padding of the frame of keyboard. |`8`|
|width|Number|The width of the frame of keyboard. Overflew areas are displayed by scrolling.|`380`|
|color|Object|Define colors.|`{whiteKey: '#FFFFFF', blackKey: '#222222', selectedWhiteKey: '#B2EBF2', selectedBlackKey: '#B2EBF2', keyBorder: '#212121', frameBorder: '#e0e0e0', noteName: '#212121'}`|
|thickness|Object|Define thickness of some borders.|`{keyBorder: 1, frameBorder: 2}`|
|noteNameDisplay|Object|The settings of display note names on each key. `type` can be set `'none'`, `'intl'` or `'num'`. <br/>`target` can be set note alphabets not included # like `'A'`, `'C'`.|`{type: 'none', target: 'A'}`|
|noteOutputType|String|`'intl'`: International styled note name<br/>`'num'`: Note number|`'intl'`|
|isReadOnly|Boolean|If you set `true`, clicking keys is be disabled.|`false`|

## Project setup

### Use npm

Install:

```
npm i simple-piano-keyboard
```

Add component and css to Vue:

```
import { createApp } from 'vue';
import SimplePianoKeyboard from 'simple-piano-keyboard';  // add this
import '../node_modules/simple-piano-keyboard/dist/style.css';  // add this
import App from './App.vue';

const app = createApp(App)
app.use(SimplePianoKeyboard)  // add this
app.mount('#app');
```

### Use CDN

Latest version:

```
<script src="https://cdn.jsdelivr.net/npm/simple-piano-keyboard/dist/simple-piano-keyboard.umd.min.js"></script>
```

\* Note: You need to describe Vue.js's CDN at same.

And describe like below in JS programs:

```
const { createApp } = Vue;

const vueContent = {
  // Your Vue description
};

const app = createApp(vueContent);
app.use(window['simple-piano-keyboard']);
app.mount('#app');
```
