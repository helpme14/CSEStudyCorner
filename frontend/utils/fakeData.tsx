// src/utils/fakeData.ts

import { faker } from '@faker-js/faker';

// Define the types for the course and instructor
interface Instructor {
  name: string;
  email: string;
  avatar: string;
}

interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  instructor: Instructor;
  category: string;
  createdAt: Date;
}

// Generate a single fake course
export const generateFakeCourse = (): Course => {
  return {
    id: faker.datatype.uuid(),
    title: faker.company.bs(),
    description: faker.lorem.paragraph(),
    imageUrl: faker.image.imageUrl(640, 480, 'education', true),
    instructor: {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      avatar: faker.image.avatar(),
    },
    category: faker.commerce.department(),
    createdAt: faker.date.past(),
  };
};

// Generate an array of fake courses
export const generateFakeCourses = (num: number = 10): Course[] => {
  return Array.from({ length: num }, generateFakeCourse);
};
