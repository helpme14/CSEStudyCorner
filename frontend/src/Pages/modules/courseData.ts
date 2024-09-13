import { faker } from '@faker-js/faker';

export interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  rating: number; // Rating out of 5
  numberOfStudents: number;
  duration: string; // Example: "2 hours 30 minutes"
  lessons: number;
}

export interface Categories {
  id: number;
  title: string;
  total_course: number;
  imageUrl: string;
}




export const courses: Course[] = [
  {
      id: 1,
      title: "Introduction to Civil Service",
      description: "Learn the basics of civil service exams.",
      imageUrl: faker.image.imageUrl(640, 480, 'education', true),
      rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)), // Random rating between 3 and 5
      numberOfStudents: faker.datatype.number({ min: 500, max: 2000 }), // Random number of students between 500 and 2000
      duration: `${faker.datatype.number({ min: 1, max: 4 })} hours ${faker.datatype.number({ min: 0, max: 59 })} minutes`,
      lessons: faker.datatype.number({ min: 5, max: 20 }), // Random number of lessons between 5 and 20
  },
  {
      id: 2,
      title: "Advanced Civil Service",
      description: "Master advanced techniques for higher scores.",
      imageUrl: faker.image.imageUrl(640, 480, 'education', true),
      rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
      numberOfStudents: faker.datatype.number({ min: 500, max: 2000 }),
      duration: `${faker.datatype.number({ min: 2, max: 5 })} hours ${faker.datatype.number({ min: 0, max: 59 })} minutes`,
      lessons: faker.datatype.number({ min: 10, max: 30 }),
  },
  {
      id: 3,
      title: "Practice Makes Perfect",
      description: "Access a wide range of practice questions.",
      imageUrl: faker.image.imageUrl(640, 480, 'education', true),
      rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
      numberOfStudents: faker.datatype.number({ min: 500, max: 2000 }),
      duration: `${faker.datatype.number({ min: 1, max: 3 })} hours ${faker.datatype.number({ min: 0, max: 59 })} minutes`,
      lessons: faker.datatype.number({ min: 8, max: 25 }),
  },
  {
      id: 4,
      title: "Time Management for Exams",
      description: "Learn to manage your time effectively during exams.",
      imageUrl: faker.image.imageUrl(640, 480, 'education', true),
      rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
      numberOfStudents: faker.datatype.number({ min: 500, max: 2000 }),
      duration: `${faker.datatype.number({ min: 1, max: 2 })} hours ${faker.datatype.number({ min: 0, max: 59 })} minutes`,
      lessons: faker.datatype.number({ min: 6, max: 15 }),
  },
  {
      id: 5,
      title: "Understanding Civil Service",
      description: "Get insights into different roles in civil service.",
      imageUrl: faker.image.imageUrl(640, 480, 'education', true),
      rating: parseFloat((Math.random() * (5 - 3) + 3).toFixed(1)),
      numberOfStudents: faker.datatype.number({ min: 500, max: 2000 }),
      duration: `${faker.datatype.number({ min: 2, max: 4 })} hours ${faker.datatype.number({ min: 0, max: 59 })} minutes`,
      lessons: faker.datatype.number({ min: 7, max: 18 }),
  },
];

export const categories: Categories[] = [
  {
    id: 1,
    title: "Numerical Ability",
    imageUrl:faker.image.imageUrl(640, 480, 'education', true), // Placeholder image
    total_course: 18,
  },
  {
    id: 2,
    title: "Analytical Ability",
    imageUrl:faker.image.imageUrl(640, 480, 'education', true), // Placeholder image
    total_course: 5,
  },
  {
    id: 3,
    title: "Verbal Ability",
    imageUrl:faker.image.imageUrl(640, 480, 'education', true), // Placeholder image
    total_course: 8,
  },
  {
    id: 4,
    title: "Time Management",
    imageUrl:faker.image.imageUrl(640, 480, 'education', true), // Placeholder image
    total_course: 22,
  },
  {
    id: 5,
    title: "General Information",
    imageUrl: faker.image.imageUrl(640, 480, 'education', true), // Placeholder image
    total_course: 9,
  },
];
