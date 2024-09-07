import DynamicBackground from "../Bacground"
import Nav from "../Header"


const Pricing = () => {
  return (
    <section className="h-full">
        <Nav />
        <DynamicBackground gradient1="#ff80b5" gradient2="#9089fc" />
        <div className="bg-white dark:bg-gray-900">
        <div className="container sm:py-20 py-8 mx-auto">
            <div className="xl:items-center xl:-mx-8 xl:flex">
            <div className="flex flex-col items-center xl:items-start xl:mx-8">
                <h1 className="text-2xl font-medium text-gray-800 capitalize lg:text-3xl dark:text-white">
                    Get Our Study Materials
                </h1>

                <div className="mt-4">
                <span className="inline-block w-40 h-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-3 h-1 mx-1 bg-blue-500 rounded-full"></span>
                <span className="inline-block w-1 h-1 bg-blue-500 rounded-full"></span>
                </div>

                <p className="mt-4 font-medium text-gray-500 dark:text-gray-300">
                You can get All Access by selecting your plan!
                </p>

                <a
                href="#"
                className="flex items-center mt-4 -mx-1 text-sm text-gray-700 capitalize dark:text-blue-400 hover:underline hover:text-blue-600 dark:hover:text-blue-500"
                >
                <span className="mx-1">read more</span>
                <svg
                    className="w-4 h-4 mx-1 rtl:-scale-x-100"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                    fillRule="evenodd"
                    d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                    />
                </svg>
                </a>
            </div>

            <div className="flex-1 xl:mx-8">
                <div className="mt-8 space-y-8 md:-mx-4 md:flex md:items-center md:justify-center md:space-y-0 xl:mt-0">
                <div className="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700">
                    <div className="p-6">
                    <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-white">
                    Professional - Civil Service Materials
                    </h1>

                    <p className="mt-4 text-gray-500 dark:text-gray-300">
                    Get complete Civil Service materials with our Professional plan. Updated every year to keep you on track with the latest information.
                    </p>

                    <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-gray-300">
                    ₱149.00 <span className="text-base font-medium">/Lifetime</span>
                    </h2>

                    <p className="mt-1 text-gray-500 dark:text-gray-300">Yearly payment</p>

                    <button className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Start Now
                    </button>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    <div className="p-6">
                    <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                        What’s included:
                    </h1>

                    <div className="mt-8 space-y-4">
                        {[
                        'All Civil Service study materials',
                        'Access to practice exams and study guides',
                        'App access for on-the-go study',
                        'Yearly Updated Materials',
                        'Mobile app',
                        'Unlimited users',
                        ].map((item, index) => (
                        <div className="flex items-center" key={index}>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                            </svg>

                            <span className="mx-4 text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>

                <div className="max-w-sm mx-auto border rounded-lg md:mx-4 dark:border-gray-700">
                    <div className="p-6">
                    <h1 className="text-xl font-medium text-gray-700 capitalize lg:text-2xl dark:text-white">
                    Sub-Professional - Civil Service Materials
                    </h1>

                    <p className="mt-4 text-gray-500 dark:text-gray-300">
                    Civil Service materials with our Sub-Pro plan. Includes essential study guides and practice tests. Yearly updates included.
                    </p>

                    <h2 className="mt-4 text-2xl font-semibold text-gray-700 sm:text-3xl dark:text-gray-300">
                    ₱99.00 <span className="text-base font-medium">/life time</span>
                    </h2>

                    <p className="mt-1 text-gray-500 dark:text-gray-300">One time payment</p>

                    <button className="w-full px-4 py-2 mt-6 tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-600 rounded-md hover:bg-blue-500 focus:outline-none focus:bg-blue-500 focus:ring focus:ring-blue-300 focus:ring-opacity-80">
                        Start Now
                    </button>
                    </div>

                    <hr className="border-gray-200 dark:border-gray-700" />

                    <div className="p-6">
                    <h1 className="text-lg font-medium text-gray-700 capitalize lg:text-xl dark:text-white">
                        What’s included:
                    </h1>

                    <div className="mt-8 space-y-4">
                        {[
                          'All Civil Service study materials',
                          'Access to practice exams and study guides',
                          'App access for on-the-go study',
                          'Yearly Updated Materials',
                          'Mobile app',
                          'Unlimited users',
                        ].map((item, index) => (
                        <div className="flex items-center" key={index}>
                            <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="w-5 h-5 text-blue-500"
                            viewBox="0 0 20 20"
                            fill="currentColor"
                            >
                            <path
                                fillRule="evenodd"
                                d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                                clipRule="evenodd"
                            />
                            </svg>

                            <span className="mx-4 text-gray-700 dark:text-gray-300">{item}</span>
                        </div>
                        ))}
                    </div>
                    </div>
                </div>
                </div>
            </div>
            </div>
        </div>
        </div>
    </section>
  )
}

export default Pricing