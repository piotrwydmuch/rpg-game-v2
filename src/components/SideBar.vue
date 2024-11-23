<template>
  <div class="sidebar">
    <p>score: {{ state.player.score }}</p>
    <p>pos: ({{ state.player.posX }},{{ state.player.posY }})</p>
    <p>direction : {{ state.player.direction }}</p>
    <!-- <button @click="createOpponent">Add opponent</button> -->
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { state } from '@features/store.ts';

export default defineComponent({
  name: 'SideBar',
  setup() {
    function createOpponent() {
      // state.opponent = new Opponent(4, 4);
    }

    return {
      state,
      createOpponent,
    };
  },
});
</script>

<style lang="scss" scoped></style>
