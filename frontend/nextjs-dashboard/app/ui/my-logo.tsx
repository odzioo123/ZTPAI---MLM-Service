import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function MyLogo() {
  return (
      <div className={`${lusitana.className} flex flex-row items-center leading-none text-white`}>
        <BriefcaseIcon className="h-16 w-16" />
        <p className="text-2xl ml-2">My Company</p>
      </div>
  );
}
