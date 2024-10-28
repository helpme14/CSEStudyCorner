import { faker } from '@faker-js/faker';

export interface Search {
  id: number;
  title: string;

}




export const searches: Search[] = [
  {
      id: 1,
      title: faker.lorem.words(2),
  },
  {
    id:2,
    title: faker.lorem.words(2),
},
{
    id:3,
    title: faker.lorem.words(2),
},
{
    id:4,
    title: faker.lorem.words(2),
},

];

