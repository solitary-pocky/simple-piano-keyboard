<template>
  <simple-piano-keyboard
    v-model="selectedNotes"
    :keyHeightSize="10"
    :keyWidthSize="10"
    :padding="0"
    :noteNameDisplay="{ type: 'intl', target: 'C' }"
  />
  {{ selectedNotes }}
  <div @click="selectedNotes = []">clear</div>
</template>

<script>
import { ref } from 'vue';
import SimplePianoKeyboard from './components/SimplePianoKeyboard.vue';

export default {
  name: 'App',
  components: {
    SimplePianoKeyboard,
  },
  setup() {
    const selectedNotes = ref(['A1', 'C1', 'F1']);
    return { selectedNotes };
  },
};
</script>

<style lang="scss"></style>
