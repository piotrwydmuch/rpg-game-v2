<template>
  <div class="game-container">
    <main>
      <GameWindow />
    </main>
    <section>
      <SideBar />
    </section>
  </div>
</template>


<script lang="ts">
import GameWindow from './components/GameWindow.vue'
import SideBar from './components/SideBar.vue'
import { defineComponent, ref, provide } from 'vue';
import { Player } from '@features/player/playerLogic.ts';

export default defineComponent({
  components: {
    GameWindow,
    SideBar
  },
  setup() {
    const player = ref(new Player(0, 0));

    // Udostępnianie instancji gracza innym komponentom
    provide('player', player);

    return {};
  }
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
