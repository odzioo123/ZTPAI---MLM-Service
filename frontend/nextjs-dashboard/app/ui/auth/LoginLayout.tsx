import React, { ReactNode } from "react";

export default function LoginLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
                {children}
            </div>
        </div>
    );
};

