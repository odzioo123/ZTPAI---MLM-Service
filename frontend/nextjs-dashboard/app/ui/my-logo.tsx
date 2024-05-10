import { BriefcaseIcon } from '@heroicons/react/24/outline';
import { lusitana } from '@/app/ui/fonts';

export default function MyLogo() {
  return (
    <div
      className={`${lusitana.className} flex flex-row items-center leading-none text-white`}
    >
      <BriefcaseIcon className="h-32 w-32 rotate-[deg]" />
      <p className="text-[32px] ml-2">MLM-Service</p>
    </div>
  );
}
