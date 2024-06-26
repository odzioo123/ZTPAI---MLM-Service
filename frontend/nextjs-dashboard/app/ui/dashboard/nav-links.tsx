'use client';

import {
  UserGroupIcon,
  HomeIcon,
  ClipboardDocumentListIcon,
  Squares2X2Icon,
  PresentationChartBarIcon,
} from '@heroicons/react/24/outline';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import clsx from 'clsx';


const links = [
  // {
  //   name: 'Home',
  //   href: '/dashboard',
  //   icon: HomeIcon
  // },
  {
    name: 'Sales',
    href: '/dashboard/sales',
    icon: ClipboardDocumentListIcon
  },
  {
    name: 'Products',
    href: '/dashboard/products',
    icon: Squares2X2Icon
  },
  {
    name: 'Clients',
    href: '/dashboard/clients',
    icon: UserGroupIcon
  },
  {
    name: 'Statistics',
    href: '/dashboard/statistics',
    icon: PresentationChartBarIcon
  },
];

export default function NavLinks() {
  const pathname = usePathname();
  return (
      <>
        {links.map((link) => {
          const LinkIcon = link.icon;
          return (
              <Link
                  key={link.name}
                  href={link.href}
                  className={clsx(
                      'flex h-[48px] grow items-center justify-center gap-2 rounded-md bg-green-50 p-3 text-sm font-medium hover:bg-green-100 hover:text-green-600 md:flex-none md:justify-start md:p-2 md:px-3',
                      {
                        'bg-green-100 text-green-600': pathname === link.href,
                      },
                  )}
              >
                <LinkIcon className="w-6" />
                <p className="hidden md:block">{link.name}</p>
              </Link>
          );
        })}
      </>
  );
}
