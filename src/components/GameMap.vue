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
      v-for="row in state.map.size"
      :key="`row-${row}`"
      :data-pos-y="row"
      class="game-map-row"
    >
      <div
        v-for="col in state.map.size"
        :key="`col-${col}`"
        :data-pos="`${col - 1},${row - 1},0`"
        :class="{ 'game-map-cell': true }"
        ref="mapRefs"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, watch, onMounted } from 'vue';
import { state } from '@features/store.ts';
// import { Opponent } from '@features/opponent.ts';

export default defineComponent({
  name: 'GameMap',
  setup() {
    const mapRefs = ref<HTMLDivElement[]>([]);
    const currentPosition = ref<HTMLDivElement | null>(null);

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

    function updatePos() {
      const newPos = mapRefs.value.find((el) => {
        const posX = Number(el.dataset['pos']?.split(',')[0]);
        const posY = Number(el.dataset['pos']?.split(',')[1]);
        if (typeof posX === 'number' && typeof posY === 'number') {
          return posX === state.player.posX && posY === state.player.posY;
        }
      });

      if (newPos) {
        currentPosition.value = newPos;
      }
    }

    // function renderNeutralObjects() {
    //   const numberOfElements = map.value.numberOfNeutralMapObjects;
    //   for (let index = 0; index < numberOfElements; index++) {
    //     mapRefs.value[
    //       Math.floor(Math.random() * mapRefs.value.length)
    //     ].classList.add('neutral-object');
    //   }
    // }

    watch(
      () => [state.player.posX, state.player.posY],
      () => {
        updatePos();
      },
    );

    watch(
      () => currentPosition.value,
      (nweVal, oldVal) => {
        oldVal?.classList.remove('player');
        nweVal?.classList.add('player');
      },
    );

    onMounted(() => {
      updatePos();
      // renderNeutralObjects();
    });

    return {
      state,
      mapRefs,
      updatePos,
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
  width: calc(v-bind(9) * #{$cell-lenght});
  height: calc(v-bind(9) * #{$cell-lenght});
  // width: calc(v-bind(state.map.size) * #{$cell-lenght});
  // height: calc(v-bind(state.map.size) * #{$cell-lenght});
  border: 1px solid #000;
}

.game-map-row {
  display: flex;
  flex-direction: row;
}

.game-map-cell {
  width: $cell-lenght;
  height: $cell-lenght;
  background-color: #0d7e65;
}

.player {
  background-color: blue;
}

.opponent {
  background-color: red;
}

.neutral-object {
  background-color: #dedede;
}
</style>
