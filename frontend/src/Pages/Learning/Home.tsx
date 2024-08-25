
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";
import girl from "../../assets/girl.png"
import { Button } from "@/components/ui/button";


const Home = () => {
  return (
  
    <div className="w-full flex bg-[#f5f5f5] h-full">
        <Sidebar />
        <div className="flex flex-col w-full">
             <Navbar />
            <section className="py-0">
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
                    <div className="w-full  grid grid-cols-1 sm:grid-cols-2 gap-5 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">

                    </div>
                </div>
            </section>
        </div>
    </div>
  )
}

export default Home