<template>
  <div class="sidebar">
    <p>score: {{ player.score }}</p>
    <p>pos: ({{ player.posX }},{{ player.posY }})</p>
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref } from 'vue';
import { Player } from '@features/player.ts';

export default defineComponent({
  name: 'SideBar',
  setup() {
    const player = inject('player') as Ref<Player>;

    return {
      player,
    };
  },
});
</script>

<style lang="scss" scoped></style>
