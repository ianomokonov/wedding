import { Link } from './link';
import { Child } from './child';
import { Neighbour } from './neighbour';

export interface Guest{
    id?:number;
    name:string;
    surname:string;
    secondname?:string;
    transfer: boolean;
    linkId?:number;
    alcohole: string;
    food: string;
    approved: boolean;

    link: Link;
    children: Child[];
    neighbours: Neighbour[];
}