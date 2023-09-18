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
import { defineComponent } from 'vue';

export default defineComponent({
  components: {
    GameMap,
    SideBar,
  },
  setup() {
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
