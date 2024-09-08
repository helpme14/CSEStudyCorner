import { Button } from "@/components/ui/button";
import DynamicBackground from "../Bacground";
import Nav from "../Header";
import {
    InputOTP,
    InputOTPGroup,
    InputOTPSlot,
  } from "@/components/ui/input-otp"


const ForgotPassword = () => {
  return (
    <section className='h-full'>
      <Nav />
      <DynamicBackground gradient1="#ff80b5" gradient2="#9089fc" />
     <div className="container flex items-center justify-center">
        <div className="flex flex-col gap-5 w-full max-w-md py-10">
            <div className="flex flex-col mt-10">
                <span className="text-4xl font-bold font-sans">Verify Code</span>
                <span className="mt-2  text-blue-500 hover:underline">Already have an account? Login</span>
            </div>
                <p>Please input the 6 digit code</p>
            <InputOTP maxLength={6}>
                <InputOTPGroup>
                    <InputOTPSlot index={0} className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-b-2 border-gray-300 text-center" />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={1} className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-b-2 border-gray-300 text-center" />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={2} className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-b-2 border-gray-300 text-center" />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={3} className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-b-2 border-gray-300 text-center" />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={4} className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-b-2 border-gray-300 text-center" />
                </InputOTPGroup>
                <InputOTPGroup>
                    <InputOTPSlot index={5} className="h-10 w-10 md:h-12 md:w-12 lg:h-14 lg:w-14 border-b-2 border-gray-300 text-center" />
                </InputOTPGroup>
            </InputOTP>
            <Button className="sm:w-1/4 w-1/2 bg-blue-700">Verify now</Button>
        </div>
     </div>
    </section>
  );
};

export default ForgotPassword;
