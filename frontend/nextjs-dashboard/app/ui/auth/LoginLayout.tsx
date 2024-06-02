import React, { ReactNode } from "react";
import { HomeIcon } from "@heroicons/react/24/outline";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center h-screen bg-cover bg-center" style={{ backgroundImage: "url('/back1.png')" }}>
            <div className="bg-gray-100 shadow-md rounded flex max-w-4xl p-6 space-x-6">
                <div className="hidden md:block w-1/2 p-6 bg-green-500 rounded flex flex-col items-center justify-center">
                    <HomeIcon className="w-12 h-12 text-white" />
                    <h1 className="text-white text-2xl font-bold mt-4">MLM - Service</h1>
                </div>
                <div className="w-full md:w-1/2">
                    {children}
                </div>
            </div>
        </div>
    );
}