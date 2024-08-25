
import Navbar from "../Navbar";
import Sidebar from "../Sidebar";


const Home = () => {
  return (
  
    <div className="w-full flex bg-[#f5f5f5]">
        <Sidebar />
        <div className="flex flex-col w-full">
             <Navbar />
             <div className="font-roboto text-lg">
      This text is using the Roboto font.
    </div>
        </div>
    </div>
  )
}

export default Home