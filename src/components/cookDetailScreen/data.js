import React from 'react';
import { AppImages } from '../../../assets/images';
import {
  Ingredient1,
  Ingredient2,
  Ingredient3,
  Ingredient4,
  Ingredient5,
  Ingredient6,
  Ingredient7,
} from '../../../assets/images/ingredients/';
export const getIngredients = [
  {
    id: 1,
    image: <Ingredient1 />,
    color: '#8CE16E',
  },
  {
    id: 2,
    image: <Ingredient2 />,
    color: '#FCE9CC',
  },
  {
    id: 3,
    image: <Ingredient3 />,
    color: '#AE2B10',
  },
  {
    id: 4,
    image: <Ingredient4 />,
    color: '#EEEFEE',
  },
  {
    id: 5,
    image: <Ingredient5 />,
    color: '#EEEFEE',
  },
  {
    id: 6,
    image: <Ingredient6 />,
    color: '#795548',
  },
  {
    id: 7,
    image: <Ingredient7 />,
    color: '#FD351C',
  },
];

export const comments = [
  {
    id: 1,
    message: 'Très bon ! à refaire',
    name: 'Alice Delarue',
    profil: AppImages.user2,
  },
  {
    id: 2,
    message: 'A côté de chez moi, rien à rajouter',
    name: 'Henry Borne',
    profil: AppImages.user1,
  },
  {
    id: 3,
    message: 'Merci à Nadine pour ce bon plât :)',
    name: 'Salomé Ronde',
    profil: AppImages.user3,
  },
  {
    id: 4,
    message: 'Merci pour ce bon repas',
    name: 'Christine Lafaim',
    profil: AppImages.user4,
  },
];
