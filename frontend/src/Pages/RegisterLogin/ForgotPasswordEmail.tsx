import { Button } from "@/components/ui/button";
import DynamicBackground from "../Bacground";
import Nav from "../Header";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";

const ForgotPasswordEmail = () => {
  return (
    <section className="h-full">
        <Nav />
        <DynamicBackground gradient1="#ff80b5" gradient2="#9089fc" />
        <div className="container flex justify-center  px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col gap-5 w-full max-w-md py-10">
            <div className="flex flex-col justify-start items-start mt-10 gap-2">
            <img className="h-10 mb-2 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                <span className="text-2xl sm:text-4xl font-bold font-sans">
                Forgot Your Password
                </span>
                <p className="text-sm sm:text-base text-gray-500">
                You will receive an email with a 6 digit code to create a new password.
                </p>
                <span className=" text-blue-500 hover:underline cursor-pointer">
                Already have an account? Login
                </span>
            </div>
            <div className="flex flex-col gap-3 w-full">
                <Label htmlFor="email" className="font-medium">
                Email
                </Label>
                <Input type="email" id="email" placeholder="Email" />
            </div>
            <Button className="w-full flex self-start sm:w-1/2 bg-blue-700">
                Send reset password code
            </Button>
            </div>
        </div>
    </section>
  );
};

export default ForgotPasswordEmail;
