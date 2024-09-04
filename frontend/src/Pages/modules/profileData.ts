import { faker } from '@faker-js/faker';

export interface SingleProfile {
    id: number;
    profileImg: string;
    name: string;
}

export const singleProfile: SingleProfile = {
    id: 1,
    profileImg:'',
    name: faker.name.fullName(),
};
