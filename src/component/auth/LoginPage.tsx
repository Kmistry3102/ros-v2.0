"use client"

import { createSendEmailOtpRequest, createSendOtpRequest } from "@/feature/auth/auth.slice";
import { BasicDetails } from "@/feature/auth/auth.type";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store/rootReducer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import MobileNumberInput from "../ui/form/fields/MobileNumberInput";
import TextInput from "../ui/form/fields/TextInput";
import { validateEmail } from "@/lib/validationUtils";
import Button from "../ui/Button";
import { ChevronRight } from "lucide-react";
import OtpInput from "./OtpInput";
import Link from "next/link";
import { encryptOtpKey } from "@/lib/crypto/otp";

const LoginPage = () => {
  const [loginViaEmail, setLoginViaEmail] = useState(false);

  const dispatch = useAppDispatch();
  const { SendOtpStatus, sendOtpError, SendEmailOtpStatus } = useAppSelector((state: RootState) => state.auth);

  const methods = useForm<BasicDetails>({
    defaultValues: {
      countryCode: "+91",
      countryCodeName: "IN",
    },
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    control,
    trigger,
  } = methods;

  const phoneNumber = useWatch({
    control,
    name: "phoneNumber",
  });

  const countryCode = useWatch({
    control,
    name: "countryCode",
  });


  const countryCodeName = useWatch({
    control,
    name: "countryCodeName",
  });

  const email = useWatch({
    control,
    name: "email",
  });

  const onSubmit = (data: any) => {
    if (loginViaEmail) {
      const reqBody = {
        email: data.email,
        sourceKey: encryptOtpKey(),
      }
      dispatch(createSendEmailOtpRequest(reqBody));
    } else {

      const reqBody = {
        ...data,
        countryCodeName: data.countryCodeName || "IN",
        sourceKey: encryptOtpKey(),
      }
      dispatch(createSendOtpRequest(reqBody));
    }
  };

  const isOtpScreen = SendOtpStatus === "success" || SendEmailOtpStatus === "success";

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

      <div className="w-full max-w-md">
        {/* CARD */}
        <div className="lg:bg-white lg:border lg:border-gray-200 rounded-lg lg:p-8">

          {/* LOGO */}
          <div className="flex justify-center mb-4">
            <Image src={"/r_logo_small.png"} alt="R Logo" height={10} width={10} className="h-8 w-8 lg:h-10 lg:w-10" />
          </div>

          {!isOtpScreen && (
            <p className="text-lg text-gray-500 mb-4 lg:mb-6 text-center">
              Sign in to continue
            </p>
          )}

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

            {!isOtpScreen && (
              <>
                {!loginViaEmail && (
                  <MobileNumberInput
                    name="phoneNumber"
                    countryCodeName="countryCode"
                    countryIsoName="countryCodeName"
                    register={register}
                    setValue={setValue}
                    watch={watch}
                    errors={errors}
                    label="Mobile Number"
                  />
                )}

                {loginViaEmail && (
                  <TextInput
                    name="email"
                    type="email"
                    register={register}
                    errors={errors}
                    label="Email Address"
                    validation={{
                      required: "Email ID is required",
                      validate: validateEmail,
                    }}
                    trigger={trigger}
                    watch={watch}
                  />
                )}

                {sendOtpError && (
                  <p className="text-red-500 text-sm">{sendOtpError}</p>
                )}

                <Button
                  label="Send OTP"
                  type="submit"
                  variant="filled"
                  className="w-full"
                  rightIcon={<ChevronRight />}
                  isFormButton
                  hasHref={false}
                />

                <button
                  type="button"
                  onClick={() => setLoginViaEmail(!loginViaEmail)}
                  className="text-sm text-gray-600 hover:text-black w-full text-center"
                >
                  {loginViaEmail
                    ? "Login with Mobile Number"
                    : "Login with Email"}
                </button>
              </>
            )}

            {isOtpScreen && (
              <OtpInput
                mobileNumber={phoneNumber}
                countryCode={countryCode}
                countryCodeName={countryCodeName}
                email={email}
              />
            )}

            <div className="text-center text-sm text-gray-500 pt-2">
              Don&apos;t have an account?{" "}
              <Link
                href="/signup"
                className="text-black font-medium hover:underline"
              >
                Sign up
              </Link>
            </div>

          </form>

        </div>

      </div>

    </div>
  );
};

export default LoginPage;