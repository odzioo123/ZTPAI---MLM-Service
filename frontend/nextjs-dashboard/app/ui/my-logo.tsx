import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function MyLogo() {
    return (
        <div className={`${lusitana.className} flex flex-row items-center justify-center leading-none text-gray-100 w-full`}>
            <div className="flex items-center justify-center">
                <BriefcaseIcon className="h-20 w-20 mt-1 text-gray-100 md:h-24 md:-24" />
                <p className="text-3xl ml-1 mr-1 mt-1 hidden md:block">MLM - Service</p>
                <p className="text-3xl ml-1 mr-1 mt-1 md:hidden">MLM</p>
                <p className="text-3xl ml-1 mt-1 md:hidden">Service</p>
            </div>
        </div>
    );
}
