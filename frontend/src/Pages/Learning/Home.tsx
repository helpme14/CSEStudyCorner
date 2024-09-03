
import { Button } from "@/components/ui/button";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { courses, Course, categories, Categories } from "../courseData.ts"
import girl from '../../assets/girl.png';

import {
    HoverCard,
    HoverCardContent,
    HoverCardTrigger,
  } from "@/components/ui/hover-card"
  
 
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Link } from "react-router-dom";

const Home = () => {
  return (
  
    <div className="w-full flex  h-full">
        <Sidebar />
        <div className="flex flex-col w-full">
             <Navbar />
            <section className="py-0">
                <div className="container sm:py-8 py-0">
                    <div className="w-full bg-[#F0F7FF] mt-20 relative rounded-md p-6 sm:p-10">
                            <div className="sm:w-full md:w-full w-full xl:w-1/2">
                                    <div className="flex flex-col text-left">
                                            <h4 className="font-roboto font-semibold text-xl md:text-4xl sm:text-3xl lg:text-5xl font-sans">
                                            Prepare for Your <br />Civil Service Exams
                                            </h4>
                                            <p className="text-sm md:text-base font-roboto opacity-75 mt-2 md:mt-4">
                                            Use our Civil Service Reviewer to get ready for your exams. Practice with easy-to-follow modules, answer practice questions, and get clear explanations to help you pass the exam.
                                            </p>
                                    </div>
                                    <Button className="bg-blue-500 hover:bg-blue-600 mt-4 rounded-full py-2 px-4 text-sm md:text-base lg:text-lg">
                                    Learn More
                                    </Button>
                            </div>
                            <img src={girl} alt="" className="hidden xl:block w-[32rem] absolute right-0 bottom-0"/>
                        </div>
                    </div>
            </section>

            <section>
                <div className="container mx-auto py-20 sm:py-10">
                    <div className="flex flex-col gap-5">
                        <div className="flex gap-5 overflow-x-auto">
                            <Button className="rounded-full">Home</Button>
                            <Button variant="secondary"  className="rounded-full">My Learnings</Button>
                            <Button variant="secondary" className="rounded-full">Archive</Button>
                            <Button variant="secondary" className="rounded-full">Favorite</Button>
                            <Button variant="secondary" className="rounded-full">Completed</Button>
                        </div>
                        <div className="w-full mt-5">
                            <span className="text-3xl font-semibold">Let's start Learning</span>
                            <Carousel className="w-full mt-5 relative">
                                <CarouselContent className="-ml-1">
                                    {courses.map((course: Course) => (
                                        <CarouselItem key={course.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                            <div className="p-1 relative">
                                                <Card className="h-[8rem] sm:h-full flex">
                                                    {/* Left Side: Image */}
                                                    <div className="w-1/3 h-full">
                                                        <img
                                                            src={course.imageUrl}
                                                            alt={course.title}
                                                            className="object-cover w-full h-full"
                                                        />
                                                    </div>
                                                    {/* Right Side: Course Details */}
                                                    <div className="w-2/3 flex flex-col p-4">
                                                        <h4 className="text-sm md:text-base lg:text-lg font-semibold">
                                                            {course.title}
                                                        </h4>
                                                        <p className="text-xs md:text-sm lg:text-base text-gray-600">
                                                            {course.description}
                                                        </p>
                                                    </div>
                                                </Card>
                                                {/* Heart Icon */}
                                                <div className="absolute top-4 right-4">
                                                    <svg 
                                                        xmlns="http://www.w3.org/2000/svg" 
                                                        fill="none" 
                                                        viewBox="0 0 24 24" 
                                                        strokeWidth="1.5" 
                                                        stroke="currentColor" 
                                                        className="w-6 h-6  text-gray-300 cursor-pointer">
                                                        <path 
                                                            strokeLinecap="round" 
                                                            strokeLinejoin="round" 
                                                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                                        />
                                                    </svg>
                                                </div>
                                            </div>
                                        </CarouselItem>
                                    ))}
                                </CarouselContent>
                                <CarouselPrevious className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 sm:-left-5 md:-left-5 xl:-left-8 lg:-left-6" />
                                <CarouselNext className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 sm:-right-5 md:-right-5 xl:-right-8 lg:-right-6" />
                            </Carousel>

                        </div>
                        <div className="w-full flex flex-col sm:flex-row justify-between bg-gray-800 p-6 mt-5 items-center">
                            <span className="text-white font-semibold text-center sm:text-left">
                                Do you want to study offline? Download our Civil Service Reviewer!
                            </span>
                            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                                <Link to="/pricing">
                                    <Button variant="outline">Download now</Button>
                                </Link>
                                <Button className="bg-none border">Dismiss</Button>
                            </div>
                            </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container mx-auto py-20 sm:py-2">
                    <span className="text-3xl font-semibold">Civil Service Categories</span>
                    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
                    {categories.map((category: Categories) => (
                       <Card key={category.id} className="p-3 relative">
                       <div className="flex gap-5">
                         <img
                           src={category.imageUrl}
                           alt={category.title}
                           className="h-14 object-cover w-14 rounded-md"
                         />
                         <div className="col-span-2 flex flex-col">
                           <h3 className="text-lg font-semibold">{category.title}</h3>
                           <p className="text-sm text-gray-600">{category.total_course} Courses</p>
                         </div>
                       </div>
                       <div className="absolute top-4 right-4">
                            <svg 
                                xmlns="http://www.w3.org/2000/svg" 
                                fill="none" 
                                viewBox="0 0 24 24" 
                                strokeWidth="1.5" 
                                stroke="currentColor" 
                                className="w-6 h-6  text-gray-300 cursor-pointer">
                                <path 
                                    strokeLinecap="round" 
                                    strokeLinejoin="round" 
                                    d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                />
                            </svg>
                        </div>
                     </Card>
                     ))}
                    </div>
                </div>
            </section>

            <section>
            <div className="container mx-auto py-20 sm:py-2">
                <span className="text-3xl font-semibold">Available Courses</span>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 py-8">
                    {courses.map((course: Course) => (
                     <HoverCard>
                        <HoverCardTrigger>
                            <Card key={course.id} className="relative h-80 flex flex-col">
                                <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="h-40 w-full object-cover"
                                />
                                <div className="p-4 flex flex-col flex-grow">
                                <h3 className="text-lg font-semibold mb-2">{course.title}</h3>
                                <p className="text-sm text-gray-600 flex-grow">{course.description}</p>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="1.5" 
                                        stroke="currentColor" 
                                        className="w-6 h-6  text-gray-500 cursor-pointer">
                                        <path 
                                            strokeLinecap="round" 
                                            strokeLinejoin="round" 
                                            d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
                                        />
                                    </svg>
                                </div>
                            </Card>
                        </HoverCardTrigger>
                                <HoverCardContent>
                                This a sample hover to be fix later
                            </HoverCardContent>
                     </HoverCard>
                    ))}
                </div>
                </div>
            </section>

        </div>
    </div>
  )
}

export default Home