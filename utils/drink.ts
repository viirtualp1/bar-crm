export type LocationData = 'Бар' | 'Доставка'

export type DrinkType =
  | 'draft'
  | 'banned'
  | 'butter'
  | 'non-alcoholic'
  | 'filtered'
  | 'light'
  | 'dark'
  | 'boules'
  | 'bottle'

export const locations: LocationData[] = ['Бар', 'Доставка']

export const types: Record<DrinkType, string> = {
  draft: 'Разливное пиво',
  banned: 'Баночное пиво',
  butter: 'Сливочное пиво',
  'non-alcoholic': 'Безалкогольные напитки',
  filtered: 'Фильтрованное',
  light: 'Светлое',
  dark: 'Темное',
  boules: 'Були',
  bottle: 'Бутылочное пиво',
}
