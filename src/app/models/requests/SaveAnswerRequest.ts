import { Child } from '../child';
import { Neighbour } from '../neighbour';

export interface SaveAnswerRequest {
  transfer: boolean;
  alcohole: string;
  food: string;
  approved: boolean;

  children: Child[];
  neighbours: Neighbour[];
}
