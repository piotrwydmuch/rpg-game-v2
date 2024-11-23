<template>
  <div
    tabindex="0"
    class="game-map"
    @keydown="handleKeydown"
    @keyup="handleKeyup"
  >
    <div
      v-for="(row, i) in state.map.map"
      :key="`row-${i}`"
      :data-pos-y="i"
      class="game-map-row"
    >
      <div
        v-for="(col, j) in row"
        :key="`col-${j}`"
        ref="mapRefs"
        :data-pos="`${j},${i},0`"
        class="game-map-cell"
        :class="[col.split(' ')]"
      >
        <div
          v-if="state.player.posX === j && state.player.posY === i"
          class="player"
        ></div>
        <template v-for="(mob, k) in state.opponents" :key="k">
          <div v-if="mob.posX === j && mob.posY === i" class="opponent"></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { onMounted, ref, watch } from 'vue';
import { state } from '@features/store.ts';

const mapRefs = ref<HTMLDivElement[]>([]);
const mapSize = state.map.size;
const keysPressed = ref<string[]>([]);

function handleKeydown(event: KeyboardEvent) {
  keysPressed.value.push(event.key);

  if (keysPressed.value.includes('ArrowUp') && keysPressed.value.includes('ArrowLeft')) {
    state.player.moveUpLeft();
  } else if (keysPressed.value.includes('ArrowUp') && keysPressed.value.includes('ArrowRight')) {
    state.player.moveUpRight();
  } else if (keysPressed.value.includes('ArrowDown') && keysPressed.value.includes('ArrowLeft')) {
    state.player.moveDownLeft();
  } else if (keysPressed.value.includes('ArrowDown') && keysPressed.value.includes('ArrowRight')) {
    state.player.moveDownRight();
  } else if (keysPressed.value.includes('ArrowUp')) {
    state.player.moveUp();
  } else if (keysPressed.value.includes('ArrowLeft')) {
    state.player.moveLeft();
  } else if (keysPressed.value.includes('ArrowDown')) {
    state.player.moveDown();
  } else if (keysPressed.value.includes('ArrowRight')) {
    state.player.moveRight();
  }
}

function handleKeyup(event: KeyboardEvent) {
  keysPressed.value.splice(keysPressed.value.indexOf(event.key), 1); // delete this single move
}

function checkPoints(posY: number, posX: number) {
  if (state.map.map[posY][posX] === 'points') {
    state.player.hasScored(1);
    state.map.map[posY][posX] = '';
  }
}

watch(
  () => [state.player.posX, state.player.posY],
  ([newX, newY]) => {
    state.opponents.forEach((mob) => {
      mob.findShortestPath(newX, newY);
    });
    checkPoints(newY, newX);
  },
);

onMounted(() => {
  state.opponents.forEach((mob) => {
    mob.findShortestPath(state.player.posX, state.player.posY);
    mob.enableWalkingToPlayer();
  });
});
</script>

<style lang="scss" scoped>
$cell-lenght: 80px;

.game-map {
  display: flex;
  flex-direction: column;
  width: calc(v-bind(mapSize) * #{$cell-lenght});
  height: calc(v-bind(mapSize) * #{$cell-lenght});
  border: 1px solid #000;
}

.game-map-row {
  display: flex;
  flex-direction: row;
}

.game-map-cell {
  width: $cell-lenght;
  height: $cell-lenght;
  background-image: url(../assets/ground.png);
  background-size: 132px;
  background-position: left;
}

.player {
  background-color: blue;
  position: relative;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
}

.opponent {
  background-color: red;
  position: relative;
  border-radius: 50%;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 50%;
  height: 50%;
}

.boulder {
  position: relative;
}
.boulder::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
}
.asset-1.boulder::after {
  background-image: url(../assets/Rock1.png);
}
.asset-2.boulder::after {
  background-image: url(../assets/Rock2.png);
}
.asset-3.boulder::after {
  background-image: url(../assets/Rock3.png);
}
.asset-4.boulder::after {
  background-image: url(../assets/Rock4.png);
}

.tree {
  position: relative;
}
.tree::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-size: contain;
}
.asset-1.tree::after {
  background-image: url(../assets/Tree1.png);
}
.asset-2.tree::after {
  background-image: url(../assets/Tree2.png);
}
.asset-3.tree::after {
  background-image: url(../assets/Tree3.png);
}
.asset-4.tree::after {
  // same as asset-3
  background-image: url(../assets/Tree3.png);
}

.points {
  position: relative;
}
.points::after {
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-repeat: no-repeat;
  background-position: center;
  background-image: url(../assets/Gold.png);
}
</style>
