<script setup>
import HelloWorld from './components/HelloWorld.vue';
import { ref } from 'vue';
import SimplePianoKeyboard from './components/SimplePianoKeyboard.vue';

const selectedNotes = ref(['A1', 'C1', 'F1']);
</script>

<template>
  <simple-piano-keyboard
    v-model="selectedNotes"
    :keyHeightSize="10"
    :keyWidthSize="10"
    :padding="0"
    :noteNameDisplay="{ type: 'num', target: 'C' }"
    :noteOutputType="'num'"
  />
  {{ selectedNotes }}
  <div @click="selectedNotes = []">clear</div>
</template>

<style scoped>
.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.vue:hover {
  filter: drop-shadow(0 0 2em #42b883aa);
}
</style>
