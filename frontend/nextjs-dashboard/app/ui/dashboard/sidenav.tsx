'use client'

import Link from 'next/link';
import NavLinks from '@/app/ui/dashboard/nav-links';
import MyLogo from '@/app/ui/my-logo';
import { PowerIcon } from '@heroicons/react/24/outline';
import { useRouter } from 'next/navigation'

export default function SideNav() {
    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token');
        router.push('/pages/auth/login');
    };

    return (
        <div className="flex h-full flex-col px-3 py-4 md:px-2 bg-white md:bg-transparent">
            <Link
                className="mb-2 flex h-20 items-center justify-center rounded-md bg-green-500 p-4 md:h-40 md:justify-start"
                href="/"
            >
                <div className="w-32 text-white md:w-full ">
                    <MyLogo />
                </div>
            </Link>
            <div className="flex grow flex-row justify-between space-x-2 md:flex-col md:space-x-0 md:space-y-2">
                <NavLinks />
                <div className="hidden h-auto w-full grow rounded-md bg-gray-50 md:block"></div>
                <form>
                    <button
                        onClick={handleLogout}
                        className="flex h-[48px] w-full grow items-center justify-center gap-2 rounded-md bg-green-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md: md:flex-none md:justify-start md:p-2 md:px-3 md:bg-gray-50">

                        <PowerIcon className="w-6" />
                        <div className="hidden md:block">Sign Out</div>
                    </button>
                </form>
            </div>
        </div>
    );
}