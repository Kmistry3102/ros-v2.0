"use client"
import { ChevronRight } from "lucide-react";
import Button from "../ui/Button";

export default function AboutSection() {
    return (
        <div className="flex flex-col gap-3 items-start lg:justify-center max-w-md">
            <h1 className="text-2xl lg:text-4xl font-medium text-gray-900">
                The Real Estate Operating System
            </h1>

            <p className="text-lg text-gray-500">
                Unifying the world&apos;s largest industury
            </p>

            <Button
                label="Login"
                hasHref
                href="/login"
                variant="filled"
                rightIcon={<ChevronRight />}
                isFormButton
                className="w-28!"
            />
        </div>
    )
}
