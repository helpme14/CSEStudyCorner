export interface Course {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
}

export interface Categories {
  id:number;
  title: string;
  total_course:number;
  imageUrl:string;
}


export const courses: Course[] = [
    {
      id: 1,
      title: "Introduction to Civil Service",
      description: "Learn the basics of civil service exams.",
      imageUrl: "https://via.placeholder.com/150", 
    },
    {
      id: 2,
      title: "Advanced Civil Service Strategies",
      description: "Master advanced techniques for higher scores.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 3,
      title: "Practice Makes Perfect",
      description: "Access a wide range of practice questions.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 4,
      title: "Time Management for Exams",
      description: "Learn to manage your time effectively during exams.",
      imageUrl: "https://via.placeholder.com/150",
    },
    {
      id: 5,
      title: "Understanding Civil Service Roles",
      description: "Get insights into different roles in civil service.",
      imageUrl: "https://via.placeholder.com/150",
    },
  ];

  export const categories: Categories[] = [
    {
      id: 1,
      title: "Numerical Ability",
      imageUrl: "https://via.placeholder.com/150", 
      total_course: 18,
    },
    {
      id: 2,
      title: "Analytical Ability",
      imageUrl: "https://via.placeholder.com/150",
      total_course: 5,
    },
    {
      id: 3,
      title: "Verbal Ability",
      imageUrl: "https://via.placeholder.com/150",
      total_course: 8,
    },
    {
      id: 4,
      title: "Time Management for Exams",
      imageUrl: "https://via.placeholder.com/150",
      total_course: 22,
    },
    {
      id: 5,
      title: "General Information",
      imageUrl: "https://via.placeholder.com/150",
      total_course: 9,
    },
  ];
  
  