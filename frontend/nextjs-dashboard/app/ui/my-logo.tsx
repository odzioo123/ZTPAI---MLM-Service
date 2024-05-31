import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function MyLogo() {
  return (
      <div className={`${lusitana.className} flex flex-row items-center leading-none text-gray-100`}>
        <BriefcaseIcon className="h-24 w-24 mt-1 text-gray-100" />
        <p className="text-3xl ml-4 mt-1">MLM - Service</p>
      </div>
  );
}
