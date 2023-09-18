import { Map } from './map.ts';
import { Player } from './player.ts';
import { reactive } from 'vue';

export const state = reactive({
  map: new Map(9, 3),
  player: new Player(0, 0),
});
