
import { Button } from "@/components/ui/button";
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import { courses, Course } from "../courseData.ts"
import girl from '../../assets/girl.png';
 
import { Card } from "@/components/ui/card"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

const Home = () => {
  return (
  
    <div className="w-full flex  h-full">
        <Sidebar />
        <div className="flex flex-col w-full">
             <Navbar />
            <section className="py-0">
                <div className="container sm:py-10">
                    <div className="w-full bg-[#F0F7FF] mt-20 relative rounded-md p-6 sm:p-12">
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
                            <img src={girl} alt="" className="absolute w-[30vw] h-[40vh] -top-[6.3rem] mt-12 right-5 hidden lg:block"/>
                        </div>
                    </div>
                {/* 
                <div className="container mx-auto sm:py-12 py-0">
                    <div className="w-full  bg-gradient-to-r from-white via-blue-200 to-blue-200 mt-20 relative rounded-md p-6">
                        <div className="sm:w-full md:w-full w-full xl:w-1/2">
                            <div className="flex flex-col">
                                <h4 className="font-roboto font-semibold text-4xl">Introducing Civil Service Reviewer</h4>
                            <p className="text-base font-roboto opacity-75 mt-4"> Our Civil Service Reviewer helps you prepare effectively for exams with interactive modules, practice questions, and detailed explanations. It's designed to support your study plan and track your progress.</p>
                            </div>
                            <Button className="bg-blue-600 mt-4">Learn More</Button>
                        </div>
                        <img src={girl} alt="" className="absolute w-[500px] h-[350px] -top-[10.5rem] mt-12 right-5 hidden lg:block"/>
                    </div>
                    <div className="w-full  grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-5">
        
                    </div>
                </div> */}
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
                        <div className="w-full">
                            <span className="text-3xl font-semibold">Let's start Learning</span>
                            <Carousel className="w-full mt-5 relative">
                            <CarouselContent className="-ml-1">
                                {courses.map((course: Course) => (
                                <CarouselItem key={course.id} className="pl-1 md:basis-1/2 lg:basis-1/3">
                                    <div className="p-1">
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
                                        <h4 className=" text-sm md:text-base lg:text-lg font-semibold">
                                            {course.title}
                                        </h4>
                                        <p className="text-xs md:text-sm lg:text-base text-gray-600">
                                            {course.description}
                                        </p>
                                        </div>
                                    </Card>
                                    </div>
                                </CarouselItem>
                                ))}
                            </CarouselContent>
                            <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 sm:-left-10" />
                            <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2 z-10 sm:-right-10" />
                            </Carousel>
                        </div>
                        <div className="w-full flex flex-col sm:flex-row justify-between bg-gray-800 p-6 mt-5 items-center">
                            <span className="text-white font-semibold text-center sm:text-left">
                                Do you want to study offline? Download our Civil Service Reviewer!
                            </span>
                            <div className="flex flex-col sm:flex-row gap-2 mt-4 sm:mt-0">
                                <Button variant="outline">Download now</Button>
                                <Button className="bg-none border">Dismiss</Button>
                            </div>
                            </div>

                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Home