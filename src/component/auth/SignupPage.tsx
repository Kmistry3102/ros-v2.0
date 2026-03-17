'use client'
import { createSendOtpRequest, createSignupRequest } from "@/feature/auth/auth.slice";
import { BasicDetails } from "@/feature/auth/auth.type";
import { useAppDispatch } from "@/hooks/useAppDispatch";
import { useAppSelector } from "@/hooks/useAppSelector";
import { RootState } from "@/store/rootReducer";
import Image from "next/image";
import { useEffect, useState } from "react";
import { useForm, useWatch } from "react-hook-form";
import TextInput from "../ui/form/fields/TextInput";
import { validateEmail, validateNonEmpty } from "@/lib/validationUtils";
import MobileNumberInput from "../ui/form/fields/MobileNumberInput";
import Button from "../ui/Button";
import { ChevronRight } from "lucide-react";
import OtpInput from "./OtpInput";
import { encryptOtpKey } from "@/lib/crypto/otp";


const SignupPage = () => {

    const dispatch = useAppDispatch();
    const { basicError, basicStatus } = useAppSelector((state: RootState) => state.auth);

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
        trigger,
        control,
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



    const onSubmit = (data: BasicDetails) => {
        try {
            const reqBody = {
                ...data,
                countryCodeName: data.countryCodeName || "IN",
                sourceKey: encryptOtpKey(),
            }
            dispatch(createSignupRequest(reqBody))
            // const otpBody = {
            //     ...data,
            //     countryCodeName: data.countryCodeName || "IN",
            //     sourceKey: encryptOtpKey(),
            // }
            // dispatch(createSendOtpRequest(otpBody))
        } catch (error) {
            console.error("Failed to submit : ", error)
        }
    };

    const isOtpScreen = basicStatus === "success";


    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50 px-6">

            <div className="w-full max-w-md">
                {/* CARD */}
                <div className="lg:bg-white lg:border lg:border-gray-200 rounded-lg lg:p-8">

                    {/* LOGO */}
                    <div className="flex justify-center mb-4">
                        <Image src={"/r_logo_small.png"} alt="R Logo" height={10} width={10} className="h-8 w-8 lg:h-10 lg:w-10" />
                    </div>

                    <p className="text-lg text-gray-500 mb-2 text-center">
                        Sign up to continue
                    </p>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">

                        {!isOtpScreen && (
                            <>
                                {/* First Name */}
                                < TextInput
                                    name="firstName"
                                    register={register}
                                    errors={errors}
                                    label="First Name"
                                    validation={{
                                        required: "First Name is required",
                                        validate: validateNonEmpty("First Name"),
                                    }}
                                    trigger={trigger}
                                    watch={watch}
                                />

                                <TextInput
                                    name="lastName"
                                    register={register}
                                    errors={errors}
                                    label="Last Name"
                                    validation={{
                                        required: "Last Name is required",
                                        validate: validateNonEmpty("Last Name"),
                                    }}
                                    trigger={trigger}
                                    watch={watch}
                                />

                                <TextInput
                                    name="email"
                                    type="email"
                                    register={register}
                                    errors={errors}
                                    label="Enter Your Email ID"
                                    validation={{
                                        required: "Email ID is required",
                                        validate: validateEmail,
                                    }}
                                    trigger={trigger}
                                    watch={watch}
                                />

                                <MobileNumberInput
                                    name="phoneNumber"
                                    countryCodeName="countryCode"
                                    countryIsoName="countryCodeName"
                                    register={register}
                                    setValue={setValue}
                                    watch={watch}
                                    errors={errors}
                                    label="Mobile number"
                                />

                                {basicError && (
                                    <p className="text-red-500 text-xs">
                                        {basicError}
                                    </p>
                                )}

                                {/* MAIN BUTTON */}
                                <Button
                                    label={basicStatus === "loading" ? "Submitting" : "Submit"}
                                    type="submit"
                                    variant="filled"
                                    className="w-full"
                                    rightIcon={<ChevronRight />}
                                    isFormButton
                                    hasHref={false}
                                />
                            </>
                        )
                        }

                        {isOtpScreen && (
                            <OtpInput
                                mobileNumber={phoneNumber}
                                countryCode={countryCode}
                                countryCodeName={countryCodeName}
                            />
                        )}


                        {/* Login Link */}
                        <div className="text-center text-sm text-gray-600 pt-2">
                            Already have an account?{" "}
                            <a
                                href="/login"
                                className="font-medium text-black hover:underline"
                            >
                                Login
                            </a>
                        </div>
                    </form>

                </div>
            </div>
        </div>
    )
}

export default SignupPage