<template>
  <div
    tabindex="0"
    class="game-map"
    @keydown.up="handleKeydownUp"
    @keydown.down="handleKeydownDown"
    @keydown.left="handleKeydownLeft"
    @keydown.right="handleKeydownRight"
  >
    <div
      v-for="(row, i) in state.map.mapArray"
      :key="`row-${i}`"
      :data-pos-y="i"
      class="game-map-row"
    >
      <div
        v-for="(col, j) in row"
        :key="`col-${j}`"
        :data-pos="`${j},${i},0`"
        class="game-map-cell"
        :class="[col.split(' ')]"
        ref="mapRefs"
      >
        <div
          v-if="state.player.posX === j && state.player.posY === i"
          class="player"
        ></div>
        <template v-for="mob in state.opponents">
          <div
            v-if="mob.posX === j && mob.posY === i"
            class="opponent"
          ></div>
        </template>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, onMounted, ref, watch } from 'vue';
import { state } from '@features/store.ts';

export default defineComponent({
  name: 'GameMap',
  setup() {
    const mapRefs = ref<HTMLDivElement[]>([]);
    const mapSize = state.map.size;

    function handleKeydownUp() {
      state.player.moveUp();
    }

    function handleKeydownDown() {
      state.player.moveDown();
    }

    function handleKeydownLeft() {
      state.player.moveLeft();
    }

    function handleKeydownRight() {
      state.player.moveRight();
    }

    function checkPoints(posY: number, posX: number) {
      if (state.map.mapArray[posY][posX] === 'points') {
        state.player.hasScored(1);
        state.map.mapArray[posY][posX] = '';
      }
    }

    watch(
      () => [state.player.posX, state.player.posY],
      ([newX, newY]) => {
        state.opponents.forEach((mob) => {
          mob.findShortestPath(newX, newY)
        })
        checkPoints(newY, newX);
      },
    );

    onMounted(() => {
      state.opponents.forEach((mob) => {
        mob.findShortestPath(state.player.posX, state.player.posY) 
        mob.enableWalkingToPlayer()
      })
    });

    return {
      state,
      mapRefs,
      mapSize,
      handleKeydownUp,
      handleKeydownDown,
      handleKeydownLeft,
      handleKeydownRight,
    };
  },
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
