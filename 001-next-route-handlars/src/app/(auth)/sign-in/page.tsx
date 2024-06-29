"use client";
import {
  SignInUser,
  SignInUserValidateSchema,
} from "@/validation/formValidation";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, useState } from "react";

function Page() {
  const router = useRouter();

  const defaultValue: SignInUser = { password: "", email: "" };
  const [userInfo, setUserInfo] = useState<SignInUser>(defaultValue);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setUserInfo((prev) => {
      return {
        ...prev,
        [name]: value,
      };
    });
  };

  const handleFormSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const zodResponse = SignInUserValidateSchema.safeParse(userInfo);
    if (zodResponse.success) {
      const result = await fetch("http://localhost:3000/api/users/sign-in", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      if (!result.ok) {
        throw new Error("Network response was not ok");
      }

      const data = await result.json();
      console.log(data);

      router.push("/");
      setUserInfo(defaultValue);
    } else {
      console.log("frontEnd-validation:", zodResponse.error);
    }
  };
  return (
    <div className="flex justify-center items-center w-full h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="bg-slate-100 p-10 rounded-lg max-w-[500px] w-[50%]"
      >
        <div className="flex flex-col gap-y-2 mb-5">
          <label htmlFor="name" className="text-md">
            Password
          </label>
          <input
            className="px-3 py-2"
            placeholder="enter your name here"
            name="password"
            type="password"
            onChange={(e) => handleInputChange(e)}
            value={userInfo.password}
          />
        </div>
        <div className="flex flex-col gap-y-2 mb-5">
          <label htmlFor="name" className="text-md">
            Email
          </label>
          <input
            className="px-3 py-2"
            placeholder="enter your name here"
            type="email"
            name="email"
            onChange={(e) => handleInputChange(e)}
            value={userInfo.email}
          />
        </div>

        <button
          type="submit"
          className="py-2 px-8 bg-blue-500 rounded-full text-white text-2xl"
        >
          Login
        </button>
      </form>
    </div>
  );
}

export default Page;
