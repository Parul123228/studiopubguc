export type UCPack = {
  name: string;
  price: number;
};

export const ucPacks: UCPack[] = [
  { name: '60 UC', price: 85 },
  { name: '325 UC', price: 475 },
  { name: '660 UC', price: 850 },
  { name: '1800 UC', price: 2250 },
  { name: '3850 UC', price: 4400 },
  { name: '8100 UC', price: 8717 },
];

export const loginMethods: string[] = [
  'Player ID',
  'Twitter',
  'Facebook',
  'Email/GK',
];
