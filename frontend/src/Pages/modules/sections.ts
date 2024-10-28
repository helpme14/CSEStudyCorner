// sections.ts

// Define an interface for subtopics
interface Subtopic {
    title: string;
    minutes: number;
  }
  
  // Define an interface for sections
  interface Section {
    title: string;
    content: Subtopic[];
  }
  
  // Define the sections array with the correct type
  const sections: Section[] = [
    {
      title: "Section 1: Introduction to General Information",
      content: [
        { title: "Overview of the Civil Service Exam", minutes: 15 },
        { title: "Importance of General Information", minutes: 10 },
        { title: "Key Areas Covered", minutes: 20 },
      ],
    },
    {
      title: "Section 2: History of the Philippines",
      content: [
        { title: "Pre-Colonial Era", minutes: 30 },
        { title: "Spanish Colonization", minutes: 25 },
        { title: "Philippine Revolution", minutes: 35 },
      ],
    },
    {
      title: "Section 3: Geography and Climate",
      content: [
        { title: "Geographical Location", minutes: 10 },
        { title: "Climate Zones", minutes: 12 },
        { title: "Natural Resources", minutes: 8 },
      ],
    },
  ];
  
  export default sections;
  