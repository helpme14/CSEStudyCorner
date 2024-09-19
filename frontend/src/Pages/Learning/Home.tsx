import { Button } from "@/components/ui/button";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { courses, Course, categories, Categories } from "../modules/courseData.ts";
import { GoClock, GoFileDirectory } from "react-icons/go";
import girl from '../../assets/girl.png';
import Rating from '@mui/material/Rating';

import { Card } from "@/components/ui/card";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
} from "@/components/ui/carousel";
import Footer from "../Footer.tsx";
import { Link } from "react-router-dom";
import { useEffect, useState } from 'react';
import AOS from 'aos';
import 'aos/dist/aos.css';





const Home = () => {
    const [isSidebarFocused, setIsSidebarFocused] = useState(false);

    useEffect(() => {
        AOS.init({
          duration: 1000,
          offset: 200,     
            mirror: true,   
            once: false, 
        });
        AOS.refresh();      
      }, []);

      
    return (
        <div className="w-full flex h-full text-foreground">
            <Sidebar  setIsSidebarFocused={setIsSidebarFocused} />
            <div className={`flex flex-col flex-grow lg:w-[calc(100%-4.5rem)] w-full md:w-full ${isSidebarFocused ? 'z-0' : 'z-10'}`}>
                <Navbar />
                <section className="py-0 -z-10">
                    <div className="container sm:py-8 py-0">
                        <div className="w-full bg-[#F0F7FF] dark:bg-[#07305D] sm:mt-20 mt-10 relative rounded-md p-6 sm:p-10 ">
                        <div className="sm:w-full md:w-full w-full xl:w-1/2 ">
                            <div className="flex flex-col text-left">
                            <h4 className="font-roboto font-semibold text-xl md:text-4xl sm:text-3xl lg:text-5xl font-sans text-gray-900 dark:text-gray-100">
                                Prepare for Your <br />Civil Service Exams
                            </h4>
                            <p className="text-sm md:text-base font-roboto opacity-75 mt-2 md:mt-4 text-gray-800 dark:text-gray-300">
                                Use our Civil Service Reviewer to get ready for your exams. Practice with easy-to-follow modules, answer practice questions, and get clear explanations to help you pass the exam.
                            </p>
                            </div>
                            <Button className="bg-blue-500 hover:bg-blue-600 dark:bg-gray-50  dark:hover:bg-gray-200 mt-4 rounded-full py-2 px-4 text-sm md:text-base lg:text-lg xl:text-sm font-semibold">
                            Learn More
                            </Button>
                        </div>
                        <img src={girl} alt="Illustration of a girl" className="hidden xl:block w-[32rem] absolute right-0 bottom-0" />
                        </div>
                    </div>
                    </section>

                <section className="-z-10">
                    <div className="container mx-auto py-10">
                        <div className="flex flex-col gap-5">
                            <div className="flex gap-5 overflow-x-auto">
                                <Button className="rounded-full">Home</Button>
                                <Button variant="secondary" className="rounded-full">My Learnings</Button>
                                <Button variant="secondary" className="rounded-full">Archive</Button>
                                <Button variant="secondary" className="rounded-full">Favorite</Button>
                                <Button variant="secondary" className="rounded-full">Completed</Button>
                            </div>
                            <div className="w-full mt-5">
                                <span className="text-xl font-semibold xl:text-3xl sm:text-base md:text-xl lg:text-2xl">Let's start Learning</span>
                                <Carousel className="w-full mt-5 relative " data-aos="fade-up" data-aos-duration="1000">
                                    <CarouselContent className="-ml-1">
                                        {courses.map((course: Course) => (
                                            <CarouselItem key={course.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                                <div className="p-1 relative">
                                                    <Card className="h-[8rem] sm:h-full flex dark:bg-[#1F2937]">
                                                        <div
                                                            className="w-[9rem] bg-cover bg-center bg-no-repeat"
                                                            style={{ backgroundImage: `url(${course.imageUrl})` }}
                                                        >
                                                        </div>
                                                        <div className="w-2/3 flex flex-col p-4">
                                                            <h4 className="text-sm md:text-base lg:text-lg font-semibold md:truncate">
                                                                {course.title}
                                                            </h4>
                                                            <p className="text-xs md:text-sm sm:text-xs lg:text-base xl:text-sm text-gray-500 truncate-multiline">
                                                                {course.description}
                                                            </p>
                                                        </div>
                                                    </Card>
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
                        </div>
                    </div>
                </section>

                <section className="-z-10">
                    <div className="container mx-auto py-4 sm:py-2">
                        <span className="text-xl font-semibold xl:text-3xl sm:text-base md:text-xl lg:text-2xl">Civil Service Categories</span>
                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-4 py-8">
                            {categories.map((category: Categories) => (
                                <Card key={category.id} className="p-3 relative dark:bg-[#1F2937]" data-aos="fade-up" data-aos-duration="1500"  data-aos-anchor-placement="top-bottom">
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

                <section className="-z-10">
                    <div className="container mx-auto">
                        <div className="w-full flex flex-col sm:flex-row justify-between bg-gray-800 p-6 mt-5 items-center dark:bg-[#1F2937]">
                                    <span className="text-white font-semibold text-center sm:text-left">
                                        Do you want to study offline? Download our Civil Service Reviewer!
                                    </span>
                                    <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                                        <Link to="/pricing">
                                            <Button variant="outline" className="dark:bg-white dark:text-gray-800">Download now</Button>
                                        </Link>
                                        <Button className="bg-none border dark:bg-gray-800 dark:text-white">Dismiss</Button>
                                    </div>
                        </div>
                    </div>
                </section>

                <section className="-z-10">
                    <div className="container mx-auto py-10 sm:pt-10">
                           <div className="flex flex-col gap-2">
                            <span className="text-xl font-semibold xl:text-3xl sm:text-base md:text-xl lg:text-2xl">What to learn next</span>                     
                            <span className="text-lg font-semibold xl:text-2xl sm:text-sm md:text-lg lg:text-xl">Because you viewed "<span className="text-gray-500">General Information 101</span>"</span>
                            </div>
                        <Carousel className="w-full mt-5 relative">
                            <CarouselContent className="flex">
                                {courses.map((course: Course) => (
                                    <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/4">
                                                <Card className="relative h-75 flex flex-col dark:bg-[#1F2937]" data-aos="fade-up" data-aos-duration="1000"  data-aos-anchor-placement="top-bottom" >
                                                    <img
                                                        src={course.imageUrl}
                                                        alt={course.title}
                                                        className="h-40 w-full object-cover"
                                                    />
                                                    <div className="p-4 flex flex-col gap-1">
                                                        <h3 className="text-lg font-semibold">{course.title}</h3>
                                                        <p className="text-sm text-gray-600 flex-grow truncate">
                                                            {course.description}
                                                        </p>
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-sm">{course.rating}</span>
                                                            <Rating name="read-only" value={course.rating} className="!text-base" readOnly />
                                                            <span className="text-sm opacity-75">({course.numberOfStudents})</span>
                                                        </div>
                                                        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600">
                                                            <div className="flex items-center gap-1">
                                                                <GoClock className="text-gray-500 iconLesson" />
                                                                <span>{course.duration}</span> {/* Example: "2 hours 30 minutes" */}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <GoFileDirectory className="text-gray-500 iconLesson" />
                                                                <span className=" text-sm">{course.lessons} lessons</span>
                                                            </div>
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

                                                    <span
                                                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full absolute top-4 left-4"
                                                        >
                                                            Math
                                                        </span>
                                                        
                                                </Card>
                                        
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 sm:-left-5 md:-left-5 xl:-left-8 lg:-left-6" />
                            <CarouselNext className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 sm:-right-5 md:-right-5 xl:-right-8 lg:-right-6" />
                        </Carousel>
                    </div>
                </section>

                <section className="-z-10">
                    <div className="container mx-auto py-10 sm:pt-10">
                        <span className="text-xl font-semibold xl:text-3xl sm:text-base md:text-xl lg:text-2xl">Recommended for you</span>
                        <Carousel className="w-full mt-5 relative">
                            <CarouselContent className="flex">
                                {courses.map((course: Course) => (
                                    <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/4">
                                                <Card className="relative h-75 flex flex-col dark:bg-[#1F2937]" data-aos="fade-up" data-aos-duration="1500"  data-aos-anchor-placement="top-bottom">
                                                    <img
                                                        src={course.imageUrl}
                                                        alt={course.title}
                                                        className="h-40 w-full object-cover"
                                                    />
                                                    <div className="p-4 flex flex-col gap-1">
                                                        <h3 className="text-lg font-semibold">{course.title}</h3>
                                                        <p className="text-sm text-gray-600 flex-grow truncate">
                                                            {course.description}
                                                        </p>
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-sm">{course.rating}</span>
                                                            <Rating name="read-only" value={course.rating} className="!text-base" readOnly />
                                                            <span className="text-sm opacity-75">({course.numberOfStudents})</span>
                                                        </div>
                                                        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600">
                                                            <div className="flex items-center gap-1">
                                                                <GoClock className="text-gray-500 iconLesson" />
                                                                <span>{course.duration}</span> {/* Example: "2 hours 30 minutes" */}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <GoFileDirectory className="text-gray-500 iconLesson" />
                                                                <span>{course.lessons} lessons</span>
                                                            </div>
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

                                                    <span
                                                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full absolute top-4 left-4"
                                                        >
                                                            Math
                                                        </span>
                                                        
                                                </Card>
                                        
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 sm:-left-5 md:-left-5 xl:-left-8 lg:-left-6" />
                            <CarouselNext className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 sm:-right-5 md:-right-5 xl:-right-8 lg:-right-6" />
                        </Carousel>
                    </div>
                </section>

                <section  className="-z-10">
                    <div className="container mx-auto py-10 sm:pt-10">
                        <span className="text-xl font-semibold xl:text-3xl sm:text-base md:text-xl lg:text-2xl">Learners are viewing</span>
                        <Carousel className="w-full mt-5 relative">
                            <CarouselContent className="flex">
                                {courses.map((course: Course) => (
                                    <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/4">
                                                <Card className="relative h-75 flex flex-col dark:bg-[#1F2937] cursor-pointer" data-aos="fade-up" data-aos-duration="1500"  data-aos-anchor-placement="top-bottom">
                                                    <img
                                                        src={course.imageUrl}
                                                        alt={course.title}
                                                        className="h-40 w-full object-cover"
                                                    />
                                                    <div className="p-4 flex flex-col gap-1">
                                                        <h3 className="text-lg font-semibold">{course.title}</h3>
                                                        <p className="text-sm text-gray-600 flex-grow truncate">
                                                            {course.description}
                                                        </p>
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-sm">{course.rating}</span>
                                                            <Rating name="read-only" value={course.rating} className="!text-base" readOnly />
                                                            <span className="text-sm opacity-75">({course.numberOfStudents})</span>
                                                        </div>
                                                        <div className="mt-2 flex flex-col sm:flex-row items-start sm:items-center gap-4 text-sm text-gray-600">
                                                            <div className="flex items-center gap-1">
                                                                <GoClock className="text-gray-500 iconLesson" />
                                                                <span>{course.duration}</span> {/* Example: "2 hours 30 minutes" */}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <GoFileDirectory className="text-gray-500 iconLesson" />
                                                                <span>{course.lessons} lessons</span>
                                                            </div>
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

                                                    <span
                                                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full absolute top-4 left-4"
                                                        >
                                                            Math
                                                        </span>
                                                        
                                                </Card>
                                        
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 sm:-left-5 md:-left-5 xl:-left-8 lg:-left-6" />
                            <CarouselNext className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 sm:-right-5 md:-right-5 xl:-right-8 lg:-right-6" />
                        </Carousel>
                    </div>
                </section>

                <section  className="-z-10">
                    <div className="container mx-auto py-10 sm:pt-10">
                        <span className="text-xl font-semibold xl:text-3xl sm:text-base md:text-xl lg:text-2xl">Top lessons right now</span>
                        <Carousel className="w-full mt-5 relative">
                            <CarouselContent className="flex">
                                {courses.map((course: Course) => (
                                    <CarouselItem key={course.id} className="md:basis-1/2 lg:basis-1/4">
                                                <Card className="relative h-75 flex flex-col dark:bg-[#1F2937]" data-aos="fade-up" data-aos-duration="1500"  data-aos-anchor-placement="top-bottom">
                                                    <img
                                                        src={course.imageUrl}
                                                        alt={course.title}
                                                        className="h-40 w-full object-cover"
                                                    />
                                                    <div className="p-4 flex flex-col gap-1">
                                                        <h3 className="text-lg font-semibold">{course.title}</h3>
                                                        <p className="text-sm text-gray-600 flex-grow truncate">
                                                            {course.description}
                                                        </p>
                                                        <div className="flex gap-2 items-center">
                                                            <span className="text-sm">{course.rating}</span>
                                                            <Rating name="read-only" value={course.rating} className="!text-base" readOnly />
                                                            <span className="text-sm opacity-75">({course.numberOfStudents})</span>
                                                        </div>
                                                        <div className="mt-2 flex flex-col sm:flex-row  items-start sm:items-center gap-4 text-sm text-gray-600">
                                                            <div className="flex items-center gap-1">
                                                                <GoClock className="text-gray-500 iconLesson" />
                                                                <span>{course.duration}</span> {/* Example: "2 hours 30 minutes" */}
                                                            </div>
                                                            <div className="flex items-center gap-1">
                                                                <GoFileDirectory className="text-gray-500 iconLesson" />
                                                                <span>{course.lessons} lessons</span>
                                                            </div>
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

                                                    <span
                                                            className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded-full absolute top-4 left-4"
                                                        >
                                                            Math
                                                        </span>
                                                        
                                                </Card>
                                        
                                    </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute -left-6 top-1/2 transform -translate-y-1/2 z-10 sm:-left-5 md:-left-5 xl:-left-8 lg:-left-6" />
                            <CarouselNext className="absolute -right-6 top-1/2 transform -translate-y-1/2 z-10 sm:-right-5 md:-right-5 xl:-right-8 lg:-right-6" />
                        </Carousel>
                    </div>
                </section>

                <Footer />
            </div>
        </div>
    );
};

export default Home;
