import { Food } from './food';
import { Alcohole } from './alcohole';

export interface Option{
    value: string;

}

export interface FoodOption extends Option{
    type: Food
}

export interface AlcoholeOption extends Option{
    type: Alcohole
}