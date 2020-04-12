import { FoodOption, AlcoholeOption } from 'src/app/models/option';
import { Food } from 'src/app/models/food';
import { Alcohole } from 'src/app/models/alcohole';

export const foodOptions: FoodOption[] = [
    {
      type: Food.None,
      value: 'Нет предпочтений',
    },
    {
      type: Food.Meat,
      value: 'Не ем мясо',
    },
    {
      type: Food.Fish,
      value: 'Не ем рыбу',
    },
    {
      type: Food.Other,
      value: 'Другое',
    },
  ];
  export const alcoholeOptions: AlcoholeOption[] = [
    {
      type: Alcohole.RedWine,
      value: 'Красное вино',
    },
    {
      type: Alcohole.WhiteWine,
      value: 'Белое вино',
    },
    {
      type: Alcohole.Champagne,
      value: 'Шампанское',
    },
    {
      type: Alcohole.Whiskey,
      value: 'Виски',
    },
    {
      type: Alcohole.Cognac,
      value: 'Коньяк',
    },
    {
      type: Alcohole.Vodka,
      value: 'Водка',
    },
    {
      type: Alcohole.NoneAlcohole,
      value: 'Не буду пить алкоголь',
    },
  ];