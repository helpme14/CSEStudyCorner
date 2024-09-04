
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
  
    <div className="flex w-full h-full">
        <Sidebar />
        <div className="flex flex-col w-full">
             <Navbar />
            <section className="py-0">
                <div className="container py-0 sm:py-8">
                    <div className="w-full bg-[#F0F7FF] mt-20 relative rounded-md p-6 sm:p-10">
                            <div className="w-full sm:w-full md:w-full xl:w-1/2">
                                    <div className="flex flex-col text-left">
                                            <h4 className="font-sans text-xl font-semibold font-roboto md:text-4xl sm:text-3xl lg:text-5xl">
                                            Prepare for Your <br />Civil Service Exams
                                            </h4>
                                            <p className="mt-2 text-sm opacity-75 md:text-base font-roboto md:mt-4">
                                            Use our Civil Service Reviewer to get ready for your exams. Practice with easy-to-follow modules, answer practice questions, and get clear explanations to help you pass the exam.
                                            </p>
                                    </div>
                                    <Button className="px-4 py-2 mt-4 text-sm bg-blue-500 rounded-full hover:bg-blue-600 md:text-base lg:text-lg">
                                    Learn More
                                    </Button>
                            </div>
                            <img src={girl} alt="" className="hidden xl:block w-[32rem] absolute right-0 bottom-0"/>
                        </div>
                    </div>
            </section>

            <section>
                <div className="container py-20 mx-auto sm:py-10">
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
                            <Carousel className="relative w-full mt-5">
                                <CarouselContent className="-ml-1">
                                    {courses.map((course: Course) => (
                                        <CarouselItem key={course.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                            <div className="relative p-1">
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
                                                    <div className="flex flex-col w-2/3 p-4">
                                                        <h4 className="text-sm font-semibold md:text-base lg:text-lg">
                                                            {course.title}
                                                        </h4>
                                                        <p className="text-xs text-gray-600 md:text-sm lg:text-base">
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
                                                        className="w-6 h-6 text-gray-300 cursor-pointer">
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
                                <CarouselPrevious className="absolute z-10 transform -translate-y-1/2 -left-6 top-1/2 sm:-left-5 md:-left-5 xl:-left-8 lg:-left-6" />
                                <CarouselNext className="absolute z-10 transform -translate-y-1/2 -right-6 top-1/2 sm:-right-5 md:-right-5 xl:-right-8 lg:-right-6" />
                            </Carousel>

                        </div>
                        <div className="flex flex-col items-center justify-between w-full p-6 mt-5 bg-gray-800 sm:flex-row">
                            <span className="font-semibold text-center text-white sm:text-left">
                                Do you want to study offline? Download our Civil Service Reviewer!
                            </span>
                            <div className="flex flex-col gap-2 mt-4 sm:flex-row sm:mt-0">
                                <Link to="/pricing">
                                    <Button variant="outline">Download now</Button>
                                </Link>
                                <Button className="border bg-none">Dismiss</Button>
                            </div>
                            </div>
                    </div>
                </div>
            </section>

            <section>
                <div className="container py-20 mx-auto sm:py-2">
                    <span className="text-3xl font-semibold">Civil Service Categories</span>
                    <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3">
                    {categories.map((category: Categories) => (
                       <Card key={category.id} className="relative p-3">
                       <div className="flex gap-5">
                         <img
                           src={category.imageUrl}
                           alt={category.title}
                           className="object-cover rounded-md h-14 w-14"
                         />
                         <div className="flex flex-col col-span-2">
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
                                className="w-6 h-6 text-gray-300 cursor-pointer">
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
            <div className="container py-20 mx-auto sm:py-2">
                <span className="text-3xl font-semibold">Available Courses</span>
                <div className="grid grid-cols-1 gap-4 py-8 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {courses.map((course: Course) => (
                     <HoverCard>
                        <HoverCardTrigger>
                            <Card key={course.id} className="relative flex flex-col h-80">
                                <img
                                src={course.imageUrl}
                                alt={course.title}
                                className="object-cover w-full h-40"
                                />
                                <div className="flex flex-col flex-grow p-4">
                                <h3 className="mb-2 text-lg font-semibold">{course.title}</h3>
                                <p className="flex-grow text-sm text-gray-600">{course.description}</p>
                                </div>
                                <div className="absolute top-4 right-4">
                                    <svg 
                                        xmlns="http://www.w3.org/2000/svg" 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        strokeWidth="1.5" 
                                        stroke="currentColor" 
                                        className="w-6 h-6 text-gray-500 cursor-pointer">
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