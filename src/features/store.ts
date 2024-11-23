import { Map } from './map.ts';
import { Opponent } from './opponent.ts';
import { Player } from './player.ts';
import { reactive } from 'vue';

export const state = reactive({
  map: new Map(9, 10, 10, 5),
  player: new Player(0, 0),
  opponents: [new Opponent(4, 4)],
});
