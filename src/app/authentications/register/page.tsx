"use client";
import React, { useEffect, useRef, useState } from "react";
import ReusableForm from "@/components/ReusableForm/ReusableForm";
import { getSession, signIn } from "next-auth/react";
import useApiFetch from "@/hooks/useAPIFetch";
import APIRoutes from "@/utils/constants/APIRoutes";
import { showToast } from "@/utils/comman/Toast";
import { useDispatch } from "react-redux";
import { setUserDetails } from "@/lib/features/UserSlice";
import { useRouter } from "next/navigation";
import { Field } from "formik";
import Link from "next/link";
import { PublicProjectRoutes } from "@/utils/constants/ProjectRoutes";

type RegisterValuesType = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  termsAndConditions: boolean;
  gender: string;
};

function RegisterBox() {
  const formValuesRef = useRef<RegisterValuesType | null>(null);
  const dispatch = useDispatch();
  const router = useRouter();

  const { fetchData: RegisterUser, response: registerRes } = useApiFetch("");

  const [isLoading, setIsLoading] = useState(false);

  const initialValues: RegisterValuesType = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    termsAndConditions: false,
    gender: "",
  };

  const fields = [
    { name: "name", label: "Name", type: "text", placeholder: "Enter your name" },
    { name: "email", label: "Email address", type: "email", placeholder: "Enter your email" },
    { name: "password", label: "Password", type: "password", placeholder: "Enter your password" },
    {
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      placeholder: "Re-enter your password",
    },
    {
      name: "gender",
      label: "Gender",
      type: "radio",
      customComponent: (
        <div className="gender-selection">
          <label className="block text-md font-bold text-black-700">Gender</label>
          <div className="flex gap-4">
            <label className="flex items-center">
              <Field type="radio" name="gender" value="M" className="form-radio text-indigo-600" />
              <span className="ml-2 text-gray-700">Male</span>
            </label>
            <label className="flex items-center">
              <Field type="radio" name="gender" value="F" className="form-radio text-indigo-600" />
              <span className="ml-2 text-gray-700">Female</span>
            </label>
            <label className="flex items-center">
              <Field type="radio" name="gender" value="O" className="form-radio text-indigo-600" />
              <span className="ml-2 text-gray-700">Other</span>
            </label>
          </div>
        </div>
      ),
    },
    {
      name: "termsAndConditions",
      label: "",
      type: "checkbox",
      customComponent: (
        <div className="flex items-center">
          <Field type="checkbox" name="termsAndConditions"  className="form-radio text-indigo-600" />
          <label htmlFor="termsAndConditions" className="ml-2 text-sm text-gray-600">
            I accept the{" "}
            <a href="/terms" className="text-indigo-600 hover:underline">
              terms and conditions
            </a>
            .
          </label>
        </div>
      ),
    },
  ];

  const handleSubmit = async (values: RegisterValuesType) => {
    setIsLoading(true);
    formValuesRef.current = values;
    await RegisterUser(APIRoutes.REGISTER, {
      method: "POST",
      data: {
        email: values.email,
        password: values.password,
        full_name: values.name,
        gender: values.gender,
      },
    });
  };

  const handleLogin = async () => {
    const res: any = await signIn("credentials", {
      email: formValuesRef.current?.email,
      password: formValuesRef.current?.password,
      redirect: false,
    });

    if (res?.error) {
      showToast.error(res?.code);
      setIsLoading(false);
      return;
    }

    // Retrieve the session data
    const session = await getSession();
    console.log("Logged in user:", session?.user);

    if (session) {
      dispatch(setUserDetails(session?.user));
      router.push("/");
    }
  };

  useEffect(() => {
    if (registerRes?.success && formValuesRef.current) {
      handleLogin();
    }else{
      setIsLoading(false);
    }
  }, [registerRes]);

  return (
    <div className="relative h-screen bg-gray-50 overflow-auto">
      {/* Decorative Background */}
      <div className="absolute top-20 left-2 w-[500px] h-[500px] bg-[#D1208A80] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob"></div>
      <div className="absolute top-20 right-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-2000"></div>
      <div className="hidden xl:block absolute bottom-10 left-32 w-[500px] h-[500px] bg-[#FFB20080] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000"></div>
      <div className="absolute bottom-10 right-52 w-[500px] h-[500px] bg-[#CAEEF580] rounded-full mix-blend-multiply filter blur-[150px] opacity-70 animate-blob animation-delay-4000"></div>

      {/* Main Content */}
      <div className="flex min-h-full flex-col justify-center py-5 sm:px-6 lg:px-8">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h1 className="mt-2 text-center text-4xl font-bold tracking-tight text-gray-900">My Social Space</h1>
          <h2 className="mt-2 text-center text-2xl font-bold tracking-tight text-gray-900">Create an account</h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md z-10">
          <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10 bg-opacity-40">
            <ReusableForm
              initialValues={initialValues}
              onSubmit={handleSubmit}
              fields={fields}
              submitButtonText="Register"
              schemaName="userRegisterSchema"
              isLoading={isLoading}
            />
            <div className="text-sm mt-2">
              <Link href={PublicProjectRoutes.LOGIN} className="font-medium text-indigo-600 hover:text-indigo-500">
                Login now!
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RegisterBox;
