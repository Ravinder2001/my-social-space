"use client";
import { setUserDetails } from "@/lib/features/UserSlice";
import { signIn, getSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch } from "react-redux";

import ReusableForm from "@/components/ReusableForm/ReusableForm";
import { showToast } from "@/utils/comman/Toast";
import Link from "next/link";
import { PublicProjectRoutes } from "@/utils/constants/ProjectRoutes";
import Constants from "@/utils/constants/Constant";
import Image from "next/image";
import Google from "@/assets/images/google.png";
import Github from "@/assets/images/github.png";

type InitialValuesType = {
  email: string;
  password: string;
  rememberMe: boolean;
};

function LoginBox() {
  const router = useRouter();
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: InitialValuesType = {
    email: "",
    password: "",
    rememberMe: false,
  };

  const fields = [
    { name: "email", label: "Email address", type: "email", placeholder: "Enter your email" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
    {
      name: "rememberMe",
      label: "",
      type: "checkbox",
      customComponent: (
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
            />
            <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">
              Remember me
            </label>
          </div>

          <div className="text-sm">
            <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
              Forgot your password?
            </a>
          </div>
        </div>
      ),
    },
  ];

  const handleSubmit = async (values: InitialValuesType) => {
    try {
      setIsLoading(true);
      const res: any = await signIn(Constants.COMMAN.CREDENTIALS, {
        email: values.email,
        password: values.password,
        redirect: false,
      });

      if (res?.error) {
        showToast.error(res?.code);
        return;
      }

      // Retrieve the session data
      const session = await getSession();
      console.log("Logged in user:", session?.user);

      if (session) {
        dispatch(setUserDetails(session?.user));
        router.push("/");
      }
    } catch (e) {
      console.log(e);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = () => {
    const myPromise = signIn(Constants.PROVIDERS.GOOGLE);
    showToast.promise(myPromise, {
      loading: "Signing in with Google...",
      success: "Successfully signed in with Google",
      error: "Failed to sign in with Google",
    });
  };
  return (
    <div className="relative h-screen bg-gray-50 overflow-hidden">
      <div className="absolute top-20 left-2 w-[500px] h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000"></div>
      <div className="hidden xl:block absolute bottom-10 left-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-10 right-52 w-[500px] h-[500px] bg-[#CAEEF580] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000"></div>
      <div className="flex min-h-full flex-col justify-center py-5 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="mt-2 text-center text-4xl font-bold tracking-tight text-gray-900">My Social Space</h1>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">Sign in to your account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-opacity-40">
            <ReusableForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              fields={fields}
              submitButtonText="Sign in"
              schemaName="userLoginSchema"
              isLoading={isLoading}
            />
            <div className="text-sm mt-2">
              <Link href={PublicProjectRoutes.REGISTER} className="font-medium text-indigo-600 hover:text-indigo-500">
                Register now!
              </Link>
            </div>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="bg-white px-2 text-gray-500">Or continue with</span>
                </div>
              </div>

              <div className="mt-6 gap-8 flex align-center justify-center">
                <div onClick={handleGoogleSignIn} className="cursor-pointer">
                  <Image src={Google} width={30} height={30} alt="" />
                </div>
                <div
                  onClick={() => {
                    signIn(Constants.PROVIDERS.GITHUB);
                  }}
                >
                  <Image src={Github} width={30} height={30} alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LoginBox;
