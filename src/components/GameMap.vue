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
      v-for="row in MAP_SIZE"
      :key="`row-${row}`"
      :data-pos-y="row"
      class="game-map-row"
    >
      <div
        v-for="col in MAP_SIZE"
        :key="`col-${col}`"
        :data-pos="`${col - 1},${row - 1},0`"
        :class="{ 'game-map-cell': true }"
        ref="mapRefs"
      ></div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent, Ref, inject, ref, watch, onMounted } from 'vue';
import { Player } from '@features/player';
import { Map, MAP_SIZE } from '@features/map';
// import { Opponent } from '@features/opponent.ts';

export default defineComponent({
  name: 'GameMap',
  setup() {
    const player = inject('player') as Ref<Player>;
    const map = inject('map') as Ref<Map>;
    const mapRefs = ref<HTMLDivElement[]>([]);
    const currentPosition = ref<HTMLDivElement | null>(null);

    function handleKeydownUp() {
      player.value.moveUp();
    }

    function handleKeydownDown() {
      player.value.moveDown();
    }

    function handleKeydownLeft() {
      player.value.moveLeft();
    }

    function handleKeydownRight() {
      player.value.moveRight();
    }

    function updatePos() {
      const newPos = mapRefs.value.find((el) => {
        const posX = Number(el.dataset['pos']?.split(',')[0]);
        const posY = Number(el.dataset['pos']?.split(',')[1]);
        if (typeof posX === 'number' && typeof posY === 'number') {
          return posX === player.value.posX && posY === player.value.posY;
        }
      });

      if (newPos) {
        currentPosition.value = newPos;
      }
    }

    function renderNeutralObjects() {
      const numberOfElements = map.value.numberOfNeutralMapObjects;
      for (let index = 0; index < numberOfElements; index++) {
        mapRefs.value[
          Math.floor(Math.random() * mapRefs.value.length)
        ].classList.add('neutral-object');
      }
    }

    watch(
      () => [player.value.posX, player.value.posY],
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
      renderNeutralObjects();
    });

    return {
      MAP_SIZE,
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
  width: calc(v-bind(MAP_SIZE) * #{$cell-lenght});
  height: calc(v-bind(MAP_SIZE) * #{$cell-lenght});
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
