<template>
  <div class="keyboard-wrapper" :style="keyboardWrapperStyle" v-cloak>
    <div class="keys-wrapper" :style="keysWrapperStyle">
      <div
        v-for="key in keys"
        :key="key.num"
        :style="keyStyle(key)"
        @click="changeSelectionOfKey(key)"
        class="one-key"
      >
        <div class="note-name-spacer"></div>
        <div class="note-name">
          {{ getNoteName(key) }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, computed, toRefs, watch } from 'vue';

const minKeyHeight = 12;
const minKeyWidth = 3;
const noteDic = {
  C: 3,
  'C#': 1.7,
  D: 1.3,
  'D#': 2.3,
  E: 0.7,
  F: 3,
  'F#': 1.35,
  G: 1.65,
  'G#': 1.9,
  A: 1.1,
  'A#': 2.45,
  B: 0.55,
};
const defaultColor = {
  whiteKey: '#FFFFFF',
  blackKey: '#222222',
  selectedWhiteKey: '#4FC3F7',
  selectedBlackKey: '#4FC3F7',
  keyBorder: '#000000',
  frameBorder: '#e0e0e0',
  noteName: '#000000',
};
const defaultThickness = {
  keyBorder: 1,
  frameBorder: 2,
};
const defaultNoteNameDisplay = {
  type: 'intl', // none(default), intl, num
  target: 'A', // A(default), B(# is not allowed), ... or all
};

export default {
  name: 'SimplePianoKeyboard',
  props: {
    modelValue: { default: [] },
    lowestNote: { default: 'A0' },
    highestNote: { default: 'C8' },
    keyHeightSize: { default: 10 },
    keyWidthSize: { default: 10 },
    padding: { default: 8 },
    width: { default: 380 },
    color: {
      default: defaultColor,
    },
    thickness: {
      default: defaultThickness,
    },
    noteNameDisplay: {
      default: defaultNoteNameDisplay,
    },
    noteOutputType: { default: 'intl' },
    isReadOnly: { default: false },
  },
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    const {
      modelValue,
      lowestNote,
      highestNote,
      keyHeightSize,
      keyWidthSize,
      padding,
      width,
      color,
      thickness,
      noteNameDisplay,
      noteOutputType,
      isReadOnly,
    } = toRefs(props);
    watch(modelValue, (newModelValue, oldModelValue) => {
      if (
        newModelValue.length !== oldModelValue.length ||
        newModelValue.some(
          (newOneModelValue, index) => newOneModelValue !== oldModelValue[index]
        )
      ) {
        keys.value = createKeys();
      }
    });

    // 最低音のノートナンバー
    const lowestNoteNum = computed(() => {
      if (lowestNote.value || lowestNote.value === 0) {
        return isNaN(lowestNote.value)
          ? convertToNoteNum(lowestNote.value)
          : lowestNote.value;
      } else {
        // デフォルト値：ピアノの最低音（A1）
        return 33;
      }
    });
    // 最高音のノートナンバー
    const highestNoteNum = computed(() => {
      // デフォルト値：ピアノの最高音（C8）
      let result = 108;
      if (highestNote.value || highestNote.value === 0) {
        result = isNaN(highestNote.value)
          ? convertToNoteNum(highestNote.value)
          : highestNote.value;
      }
      // 開始音高よりも低かったら、開始音高に設定する
      if (result < lowestNoteNum.value) {
        result = lowestNoteNum.value;
      }
      return result;
    });

    const whiteKeySize = computed(() => {
      return {
        height: minKeyHeight * keyHeightSize.value,
        width: minKeyWidth * keyWidthSize.value,
      };
    });
    const blackKeySize = computed(() => {
      return {
        height: whiteKeySize.value.height * 0.65,
        width: whiteKeySize.value.width * 0.7,
      };
    });

    // propとして与えられていない値をデフォルト値で補ったもの
    const colorSetting = computed(() =>
      typeof color.value === 'object'
        ? Object.assign(defaultColor, color.value)
        : defaultColor
    );
    const thicknessSetting = computed(() =>
      typeof thickness.value === 'object'
        ? Object.assign(defaultThickness, thickness.value)
        : defaultThickness
    );
    const noteNameDisplaySetting = computed(() =>
      typeof noteNameDisplay.value === 'object'
        ? Object.assign(defaultNoteNameDisplay, noteNameDisplay.value)
        : defaultNoteNameDisplay
    );

    // 選択済のノートナンバー
    const selectedNoteNums = computed(() => {
      if (modelValue.value && modelValue.value.length > 0) {
        return modelValue.value.map((oneVal) =>
          isNaN(oneVal) ? convertToNoteNum(oneVal) : oneVal
        );
      } else {
        return [];
      }
    });

    /**
     * 鍵盤用の辞書を作成
     * @returns キー：ノートナンバー、値：押下されているか（Boolean）の辞書
     */
    const createKeys = () => {
      const tmpKeys = [];
      let left = 0;
      // 最低音の分
      tmpKeys.push({
        left,
        isBlackKey: isBlackKey(lowestNoteNum.value),
        selected: selectedNoteNums.value.includes(lowestNoteNum.value)
          ? true
          : false,
        num: lowestNoteNum.value,
        intl: convertToIntlStyle(lowestNoteNum.value),
      });
      // 残り最高音までの分
      for (
        let noteNum = lowestNoteNum.value + 1;
        noteNum < highestNoteNum.value + 1;
        noteNum++
      ) {
        left += keyWidthSize.value * noteDic[getNoteNameFromNoteNum(noteNum)];
        tmpKeys.push({
          left,
          isBlackKey: isBlackKey(noteNum),
          selected: selectedNoteNums.value.includes(noteNum) ? true : false,
          num: lowestNoteNum.value,
          intl: convertToIntlStyle(noteNum),
          char: getNoteNameFromNoteNum(noteNum),
        });
      }
      return tmpKeys;
    };

    const keys = ref(createKeys());
    watch(
      keys,
      (newKeys) => {
        emit(
          'update:modelValue',
          newKeys
            .filter((newKey) => newKey.selected)
            .map((newKey) =>
              noteOutputType.value === 'intl' ? newKey.intl : newKey.num
            )
        );
      },
      { deep: true }
    );
    watch([lowestNote, highestNote], () => {
      keys.value = createKeys();
    });

    // 白鍵の数
    const numOfWhiteKey = computed(
      () => keys.value.filter((key) => !key.isBlackKey).length
    );
    // 音名
    const getNoteName = (key) => {
      const { type, target } = noteNameDisplaySetting.value;
      if (type === 'none') {
        return '';
      } else {
        if (key.char === target || target === 'all') {
          return type === 'intl' ? key.intl : key.num;
        } else {
          return '';
        }
      }
    };
    /**
     * キーの選択状態を切り替える
     * @param {Number} noteNum ノートナンバー
     */
    const changeSelectionOfKey = (key) => {
      if (!isReadOnly.value) {
        key.selected = !key.selected;
      }
    };

    /**
     * 1つのキーのスタイルを返す
     * @param {Object} keyInfo 1つのキーの情報
     * @returns スタイルの記述
     */
    const keyStyle = (key) => {
      const { left, isBlackKey, selected } = key;
      const { blackKey, whiteKey, keyBorder } = colorSetting.value;

      const keySize = isBlackKey ? blackKeySize.value : whiteKeySize.value;
      const keyColor = isBlackKey ? blackKey : whiteKey;
      const selectedKeyColor = isBlackKey
        ? colorSetting.value.selectedBlackKey
        : colorSetting.value.selectedWhiteKey;
      const keyBorderThickness = thicknessSetting.value.keyBorder;

      return `height: ${keySize.height}px; width: ${
        keySize.width
      }px; left: ${left}px; border: solid ${keyBorderThickness}px ${keyBorder}; border-radius: ${
        keyBorderThickness * 3
      }px; background-color: ${
        selected ? selectedKeyColor : keyColor
      }; z-index: ${isBlackKey ? 2 : 1}`;
    };

    // キーラッパーのスタイル
    const keysWrapperStyle = computed(() => {
      const keyBorderThickness = thicknessSetting.value.keyBorder;
      return `height: ${
        whiteKeySize.value.height + keyBorderThickness * 2
      }px; width: ${
        whiteKeySize.value.width * numOfWhiteKey.value + keyBorderThickness * 2
      }px; border-radius: ${
        keyBorderThickness * 3
      }px; border: solid ${keyBorderThickness}px ${
        colorSetting.value.keyBorder
      }`;
    });

    // キーボードラッパーのスタイル
    const keyboardWrapperStyle = computed(() => {
      const { frameBorder } = thicknessSetting.value;
      return `width: ${width.value - frameBorder}px; padding: ${
        padding.value
      }px; border: solid ${frameBorder}px ${frameBorder}; font-size: ${
        keyHeightSize.value * 1.4
      }px; color: ${colorSetting.value.noteName};`;
    });

    return {
      keys,
      getNoteName,
      changeSelectionOfKey,
      keyStyle,
      keysWrapperStyle,
      keyboardWrapperStyle,
    };
  },
};

/**
 * ノートナンバーから国際式表記を得る
 * @param {Number} noteNum ノートナンバー
 * @returns 国際式表記
 */
function convertToIntlStyle(noteNum) {
  const { char, num } = convertToIntlStyleSeparately(noteNum);
  return char + num;
}

/**
 * ノートナンバーから国際式表記を得る（文字部分と数字部分別々）
 * @param {Number} noteNum ノートナンバー
 * @returns 国際式表記（文字部分と数字部分別々）
 */
function convertToIntlStyleSeparately(noteNum) {
  // 12で割った答えと余りを算出
  const divideResult = Math.floor(noteNum / 12);
  const remain = noteNum % 12;
  // 数字部分
  const num = remain < 9 ? divideResult - 1 : divideResult;

  return { char: Object.keys(noteDic)[remain], num };
}

/**
 * 国際式表記からノートナンバーを得る
 * @param {String} charAndNum 国際式表記（例：C4）
 * @returns ノートナンバー
 */
function convertToNoteNum(charAndNum) {
  // 文字部分と数字部分に分ける
  const char = charAndNum.includes('#')
    ? charAndNum.slice(0, 2)
    : charAndNum.slice(0, 1);
  const num = charAndNum.includes('#')
    ? Number(charAndNum.slice(2))
    : Number(charAndNum.slice(1));
  // 音名から算出した数字
  const numFromChar = Object.keys(noteDic).indexOf(char);
  return (numFromChar < 9 ? num + 1 : num) * 12 + numFromChar;
}

/**
 * 黒鍵かどうか
 * @param {Number} noteNum ノートナンバー
 * @returns 黒鍵の場合true
 */
function isBlackKey(noteNum) {
  const remain = noteNum % 12;
  const blackRemains = [1, 3, 6, 8, 10];
  return blackRemains.some((blackRemain) => blackRemain === remain);
}

/**
 * ノートナンバーから音名を得る
 * @param {Number} noteNum ノートナンバー
 * @returns 国際式表記（文字部分と数字部分別々）
 */
function getNoteNameFromNoteNum(noteNum) {
  const { char } = convertToIntlStyleSeparately(noteNum);
  return char;
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
[v-cloak] {
  display: none;
}
.one-key {
  display: inline-block;
  position: absolute;
  cursor: pointer;
  overflow: hidden;
}
.keys-wrapper {
  position: relative;
  background-color: #e0e0e0;
}
.keyboard-wrapper {
  position: relative;
  border-radius: 8px;
  overflow: scroll;
}
.note-name-spacer {
  height: 76%;
}
.note-name {
  text-align: center;
  font: Meiryo, sans-serif;
}
</style>
