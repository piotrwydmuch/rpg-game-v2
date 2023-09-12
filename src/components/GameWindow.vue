
<template>
  <div class="game-window" @keydown="handleKeydown" tabindex="0">
    <div v-for="row in 9" :key="`row-${row}`" class="game-window-row">
      <div 
        v-for="col in 9" 
        :key="`col-${col}`"
        :class="{'game-window-cell': true, 'player': isPlayerAt(col - 1, row - 1)}"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { Player } from '../features/player/playerLogic.ts';

export default defineComponent({
  name: 'GameWindow',
  setup() {
    const player = ref(new Player(0, 0));

    function handleKeydown(event: KeyboardEvent) {
      switch (event.key) {
        case 'ArrowUp':
          player.value.moveUp();
          break;
        case 'ArrowDown':
          player.value.moveDown();
          break;
        case 'ArrowLeft':
          player.value.moveLeft();
          break;
        case 'ArrowRight':
          player.value.moveRight();
          break;
      }
    }

    function isPlayerAt(x: number, y: number): boolean {
      return player.value.x === x && player.value.y === y;
    }

    return {
      handleKeydown,
      isPlayerAt
    };
  }
});
</script>

<style lang="scss" scoped>
$cell-lenght: 100px;

.game-window {
  display: flex;
  flex-direction: column;
  width: calc(9 * #{$cell-lenght}); 
  height: calc(9 * #{$cell-lenght});
  border: 1px solid #000;
}

.game-window-row {
  display: flex;
  flex-direction: row;
}

.game-window-cell {
  width: $cell-lenght;
  height: $cell-lenght;
  background-color: #0d7e65;
}

.player {
  background-color: blue;
}
</style>
