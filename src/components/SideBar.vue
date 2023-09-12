
<template>
  <div class="sidebar">
    score: {{ player.score }}
  </div>
</template>

<script lang="ts">
import { defineComponent, inject, Ref} from 'vue';
import { Player } from '../features/player/playerLogic.ts';

export default defineComponent({
  name: 'SideBar',
  setup() {
    const player = inject('player') as Ref<Player>;

    return {
      player
    };
  }
});
</script>

<style lang="scss" scoped>

</style>
