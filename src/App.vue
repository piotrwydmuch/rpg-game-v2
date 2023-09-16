<template>
  <div class="game-container">
    <main>
      <GameMap />
    </main>
    <section>
      <SideBar />
    </section>
  </div>
</template>

<script lang="ts">
import GameMap from './components/GameMap.vue';
import SideBar from './components/SideBar.vue';
import { defineComponent, ref, provide } from 'vue';
import { Player } from '@features/player.ts';
import { Map } from '@features/map.ts';

export default defineComponent({
  components: {
    GameMap,
    SideBar,
  },
  setup() {
    const player = ref(new Player(0, 0));
    const map = ref(new Map(3));

    // Udostępnianie instancji gracza innym komponentom
    provide('player', player);
    provide('map', map);

    return {};
  },
});
</script>

<style scoped>
.game-container {
  width: 100vw;
  height: 100vh;
  display: flex;
}
main {
  display: flex;
  justify-content: center;
}
</style>