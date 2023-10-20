import { Map } from './map.ts';
import { Opponent } from './opponent.ts';
import { Player } from './player.ts';
import { reactive } from 'vue';

export const state = reactive({
  map: new Map(9, 0, 0, 0),
  player: new Player(0, 0),
  opponent: new Opponent(4, 4),
});
