<template>
  <div class="sidebar">
    <p>score: {{ state.player.score }}</p>
    <p>pos: ({{ state.player.posX }},{{ state.player.posY }})</p>
    <p>direction : {{ state.player.direction }}</p>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { state } from '@features/store.ts';

export default defineComponent({
  name: 'SideBar',
  setup() {
    return {
      state,
    };
  },
});
</script>

<style lang="scss" scoped></style>
