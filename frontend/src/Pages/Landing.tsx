
import Nav from "./Header";
import { Link } from 'react-router-dom';




const Landing = () => {


  return (
    <section className="">
      <Nav />
        <div className="relative px-6 isolate lg:px-8">
          <div className="absolute inset-x-0 overflow-hidden -top-40 -z-10 transform-gpu blur-3xl sm:-top-80" aria-hidden="true">
            <div className="relative left-[calc(50%-11rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 rotate-[30deg] bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%-30rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>
          <div className="max-w-5xl py-32 mx-auto sm:py-30 lg:py-40">
            <div className="hidden sm:mb-8 sm:flex sm:justify-center">
              <div className="relative px-3 py-1 text-sm leading-6 text-gray-600 rounded-full ring-1 ring-gray-900/10 hover:ring-gray-900/20">
              Prepare for your upcoming  Civil Service exam with our latest review materials. <a href="#" className="font-semibold text-indigo-600"><span className="absolute inset-0" aria-hidden="true"></span>Read more <span aria-hidden="true">&rarr;</span></a>
              </div>
            </div>
            <div className="px-4 text-center sm:px-6 lg:px-8">
              <h1 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl md:text-5xl lg:text-6xl">
                Prepare for the Civil Service Exam with Confidence
              </h1>
              <p className="mt-6 text-base leading-7 text-gray-600 sm:text-lg md:text-xl md:leading-8">
                Access comprehensive review materials, take practice tests, and track your progress.
              </p>
              <div className="flex flex-col items-center justify-center gap-4 mt-10 sm:flex-row sm:gap-x-6">
                <a
                  href="#"
                  className="px-4 py-2 text-sm font-semibold text-white bg-indigo-600 rounded-md shadow-sm sm:text-base hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                >
                  Get started
                </a>
                <Link
                  to="/pricing"
                  className="text-sm font-semibold leading-6 text-gray-900 sm:text-base"
                >
                  Get Materials<span aria-hidden="true">→</span>
                </Link>
              </div>
            </div>
          </div>
          <div className="absolute inset-x-0 top-[calc(100%-13rem)] -z-10 transform-gpu overflow-hidden blur-3xl sm:top-[calc(100%-30rem)]" aria-hidden="true">
            <div className="relative left-[calc(50%+3rem)] aspect-[1155/678] w-[36.125rem] -translate-x-1/2 bg-gradient-to-tr from-[#ff80b5] to-[#9089fc] opacity-30 sm:left-[calc(50%+36rem)] sm:w-[72.1875rem]" style={{ clipPath: 'polygon(74.1% 44.1%, 100% 61.6%, 97.5% 26.9%, 85.5% 0.1%, 80.7% 2%, 72.5% 32.5%, 60.2% 62.4%, 52.4% 68.1%, 47.5% 58.3%, 45.2% 34.5%, 27.5% 76.7%, 0.1% 64.9%, 17.9% 100%, 27.6% 76.8%, 76.1% 97.7%, 74.1% 44.1%)' }}></div>
          </div>
        </div>
      </section>
  );
};

export default Landing;
