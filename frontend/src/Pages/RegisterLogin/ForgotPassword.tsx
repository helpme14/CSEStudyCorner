import { Button } from "@/components/ui/button";
import DynamicBackground from "../Bacground";
import Nav from "../Header";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

const ForgotPassword = () => {
  return (
    <section className="relative min-h-screen bg-white dark:bg-gray-900">
      <Nav />
      <DynamicBackground gradient1="#ff80b5" gradient2="#9089fc" />

      {/* Main content area */}
      <div className="flex flex-col items-center justify-center px-4 pt-16 mt-6 sm:pt-20 sm:mt-10 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-sans text-2xl font-bold sm:text-3xl dark:text-white">
            Verify Code
          </span>
          <div className="mt-2">
            <span className="text-blue-500 hover:underline dark:text-blue-400">
              Already have an account? Login
            </span>
          </div>
        </div>
        <p className="mb-4 text-sm text-center dark:text-white">
          Please input the 6 digit code
        </p>
        <InputOTP maxLength={6}>
          <div className="flex flex-wrap items-center justify-center max-w-full gap-2 mx-auto sm:gap-3">
            {[...Array(6)].map((_, index) => (
              <InputOTPGroup key={index}>
                <InputOTPSlot
                  index={index}
                  className="w-10 h-10 text-center border-b-2 border-gray-300 sm:w-12 sm:h-12 dark:border-gray-600 focus:border-blue-500"
                />
              </InputOTPGroup>
            ))}
          </div>
        </InputOTP>
        <Button className="w-3/4 py-3 mt-4 text-sm text-white transition-colors duration-200 bg-blue-700 sm:w-1/2 lg:w-1/4 xl:w-1/6 hover:bg-blue-800">
          Verify now
        </Button>
      </div>
    </section>
  );
};

export default ForgotPassword;
