/* tslint:disable */
import { Player } from './player';
export interface Table {
  id: string;
  tableFull?: boolean;
  status?: 'OPEN' | 'RUNNING' | 'PAUSED' | 'FINISHED';
  maxNumberOfPlayers?: number;
  name: string;
  players: Array<Player>;
}
