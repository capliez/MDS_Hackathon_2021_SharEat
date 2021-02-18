import { AppImages } from '../../../assets/images';
import { SEARCH_COOK, SEARCH_COOK_RESET, COOK_CURRENT } from '../actions-types';
const INIT_STATE = {
  all: [
    {
      id: 1,
      imagePath: AppImages.repas_1,
      titleTxt: 'Couscous maison',
      subTxt: 'Paris, France',
      dist: 2.0,
      reviews: 4,
      rating: 4.4,
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      price: 4,
      quantity: 9,
      isPay: true,
    },
    {
      id: 2,
      imagePath: AppImages.repas_2,
      titleTxt: 'Tiramisu au chocolat',
      subTxt: 'Paris, France',
      dist: 4.0,
      reviews: 74,
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      rating: 4.5,
      price: 2,
      quantity: 4,
      isPay: true,
    },
    {
      id: 3,
      imagePath: AppImages.repas_3,
      titleTxt: 'Moules frites',
      subTxt: 'Paris, France',
      dist: 3.0,
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      reviews: 62,
      rating: 4.0,
      price: 10,
      quantity: 2,
      isPay: false,
    },
    {
      id: 4,
      imagePath: AppImages.repas_4,
      titleTxt: 'Tacos maison',
      subTxt: 'Louvres(95), France',
      dist: 7.0,
      reviews: 23,
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      rating: 4.4,
      price: 4,
      quantity: 11,
      isPay: false,
    },
    {
      id: 5,
      imagePath: AppImages.repas_5,
      titleTxt: 'Lasagnes maison',
      subTxt: 'Neuilly-sur-marne(93), France',
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      dist: 5.0,
      reviews: 12,
      rating: 4.5,
      price: 6,
      isPay: false,

      quantity: 4,
    },
  ],
  lastpart: [
    {
      id: 6,
      imagePath: AppImages.repas_6,
      titleTxt: 'Gratin de penne',
      subTxt: 'Paris, France',
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      dist: 2.0,
      reviews: 10,
      rating: 3.5,
      price: 3.5,
      quantity: 1,
      isPay: false,
    },
    {
      id: 7,
      imagePath: AppImages.repas_7,
      titleTxt: 'Lasagnes',
      subTxt: 'Paris, France',
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      dist: 4.5,
      reviews: 12,
      rating: 4.8,
      price: 5.99,
      quantity: 6,
      isPay: false,
    },
    {
      id: 8,
      imagePath: AppImages.repas_8,
      titleTxt: 'Loc Lac',
      subTxt: 'Paris, France',
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      dist: 8.0,
      reviews: 12,
      rating: 2.5,
      price: 2.99,
      quantity: 2,
      isPay: true,
    },
    {
      id: 9,
      imagePath: AppImages.repas_9,
      titleTxt: 'Meffe',
      subTxt: 'Paris, France',
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      dist: 1.5,
      reviews: 12,
      rating: 4.2,
      price: 7.99,
      quantity: 4,
      isPay: true,
    },
    {
      id: 10,
      imagePath: AppImages.repas_10,
      titleTxt: 'Paëlla',
      subTxt: 'Paris, France',
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      dist: 2.8,
      reviews: 12,
      rating: 4,
      price: 3,
      quantity: 1,
      isPay: false,
    },
    {
      id: 11,
      imagePath: AppImages.repas_11,
      titleTxt: 'Pâte Carbonara',
      subTxt: 'Paris, France',
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      dist: 1,
      reviews: 12,
      rating: 3.9,
      price: 8,
      quantity: 10,
      isPay: false,
    },
    {
      id: 12,
      imagePath: AppImages.repas_12,
      titleTxt: 'Wrap au Thon',
      subTxt: 'Paris, France',
      description:
        '"Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit..."',
      dist: 1,
      reviews: 12,
      rating: 5,
      price: 6.99,
      quantity: 3,
      isPay: false,
    },
  ],
  old: [],
  current: {},
};
export default (state = INIT_STATE, action) => {
  switch (action.type) {
    case SEARCH_COOK:
      const value = action.payload;
      const oldCooks = state.all;
      const newCooks = state.all.filter((item) =>
        item['titleTxt'].toLowerCase().includes(value.toLowerCase()),
      );
      return { ...state, all: newCooks, old: oldCooks };
    case SEARCH_COOK_RESET:
      return {
        ...state,
        all: state.old,
        old: [],
      };
    case COOK_CURRENT:
      const { item: current, last } = action.payload;
      return {
        ...state,
        current: last
          ? state.lastpart.filter((c) => c.id === current.id)
          : state.all.filter((c) => c.id === current.id),
      };

    default:
      return { ...state };
  }
};
