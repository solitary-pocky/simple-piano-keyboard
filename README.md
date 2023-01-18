# simple-piano-keyboard

## What is this?

`simple-piano-keyboard` is literally "simple piano keyboard" component of Vue.js🤣
This package doesn't include mechanism of sound for now. But if you have sound sources and combine with, it's possible to create musical instrument, I think.
This is very simple component but that's reason it have infinity possibility🤩

## Property list

This is the list you can input values like below:

```
<simple-piano-keyboard v-model="selectedNotes" lowestNote="C3" highestNote="C4"></simple-piano-keyboard>
```

(Now on write description)
| Property | Type | Description | Default value |
| :------- | :----------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| v-model | String[]<br/> or <br/>Number[] | Array of note number or international styled note name like `C4`.<br/>The central C on piano is 'C4'. And its one octave higher is 'C5'. Note number of 'C4' is 60. Notes of black key can be express like 'A#2' using #. <br/>The value of this property is interlockly changed with keyboard's selection state. | `[]` |
|lowestNote|String<br/> or <br/>Number|The lowest note of a keyboard.|`'A0'`<br/>(The lowest note of the piano with 88 keys)|
|highestNote|String<br/> or <br/>Number|The highest note of a keyboard.|`'C8'`<br/>(The highest note of the piano with 88 keys)|
|keyHeightSize|Number||`10`|
|keyWidthSize|Number||`10`|
|padding|Number||`8`|
|width|Number||`380`|
|color|Object||`{whiteKey: '#FFFFFF', blackKey: '#222222', selectedWhiteKey: '#B2EBF2', selectedBlackKey: '#B2EBF2', keyBorder: '#212121', frameBorder: '#e0e0e0', noteName: '#212121'}`|
|thickness|Object||`{keyBorder: 1, frameBorder: 2}`|
|noteNameDisplay|Object|The settings of display note names on each key. `type` can be set `'none'`, `'intl'` or `'num'`.`target` can be set note alphabets not included # like `'A'`, `'C'`.|`{type: 'none', target: 'A'}`|
|noteOutputType|String|`'intl'`: International styled note name<br/>`'num'`: Note number|`'intl'`|
|isReadOnly|Boolean||`false`|

## Project setup

### Use npm

```
npm i simple-piano-keyboard
```

### Use CDN

You can try immidiately latest version like below:

```
<script src="https://cdn.jsdelivr.net/npm/simple-piano-keyboard/dist/simple-piano-keyboard.umd.min.js"></script>
```

You can choose a certain version like this:
(x.x.x is description of a version)

```
<script src="https://cdn.jsdelivr.net/npm/simple-piano-keyboard@x.x.x/dist/simple-piano-keyboard.umd.min.js"></script>
```

Note: You need to describe Vue.js's CDN at same.

And describe like below in JS programs:

```
const { createApp } = Vue;

const vueContent = {
  // Your Vue description
};

const app = createApp(vueContent);
app.use(vuetify);
app.use(window['simple-piano-keyboard']);
app.mount('#app');
```
