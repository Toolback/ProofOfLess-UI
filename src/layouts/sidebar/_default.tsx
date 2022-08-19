import { useContext } from 'react';
import cn from 'classnames';

// components
import AuthorCard from '@/components/ui/author-card';
import Logo from '@/components/ui/logo';
import { MenuItem } from '@/components/ui/collapsible-menu';
import Scrollbar from '@/components/ui/scrollbar';
import Button from '@/components/ui/button';
import routes from '@/config/routes';
import { useDrawer } from '@/components/drawer-views/context';
import { HomeIcon } from '@/components/icons/home';
import { FarmIcon } from '@/components/icons/farm';
import { PoolIcon } from '@/components/icons/pool';
import { ProfileIcon } from '@/components/icons/profile';
import { DiskIcon } from '@/components/icons/disk';
import { ExchangeIcon } from '@/components/icons/exchange';
import { VoteIcon } from '@/components/icons/vote-icon';
import { Close } from '@/components/icons/close';
import { PlusCircle } from '@/components/icons/plus-circle';
import { CompassIcon } from '@/components/icons/compass';
import { InfoCircle } from '@/components/icons/info-circle';

//images
import AuthorImage from '@/assets/images/donutwhite2.png';

// lib
import { WalletContext } from '@/lib/hooks/use-connect';

export const menuItems = [
  {
    name: 'Quests',
    icon: <HomeIcon />,
    href: routes.dashboard,
  },
  {
    name: 'Content',
    icon: <PoolIcon />,
    href: routes.dashboard,
  },
  {
    name: 'Profile',
    icon: <ProfileIcon />,
    href: routes.profile,
  },
  {
    name: 'Vote',
    icon: <VoteIcon />,
    href: routes.vote,
    dropdownItems: [
      {
        name: 'Explore',
        href: routes.vote,
      },
      {
        name: 'Vote with pools',
        href: routes.proposals,
      },
      {
        name: 'Create proposal',
        href: routes.createProposal,
      },
    ],
  },
];

type SidebarProps = {
  className?: string;
};

export default function Sidebar({ className }: SidebarProps) {
  const { closeDrawer } = useDrawer();

  const { userDonutId } = useContext(WalletContext);

  return (
    <aside
      className={cn(
        'top-0 z-40 h-full w-full max-w-full border-dashed border-gray-200 bg-body ltr:left-0 ltr:border-r rtl:right-0 rtl:border-l dark:border-gray-700 dark:bg-dark xs:w-80 xl:fixed  xl:w-72 2xl:w-80',
        className
      )}
    >
      <div className="relative flex h-24 items-center justify-between overflow-hidden px-6 py-4 2xl:px-8">
        <Logo />
        <div className="md:hidden">
          <Button
            title="Close"
            color="white"
            shape="circle"
            variant="transparent"
            size="small"
            onClick={closeDrawer}
          >
            <Close className="h-auto w-2.5" />
          </Button>
        </div>
      </div>

      <Scrollbar style={{ height: 'calc(100% - 96px)' }}>
        <div className="px-6 pb-5 2xl:px-8">
          {userDonutId === undefined ? (
            <AuthorCard
              image={AuthorImage}
              name='Connect To Retrieve'
              role=''
              // name={userStatus ? ("Member"):("Visitor")}
              // role={userStatus ? ("Member"):("Join us !")}
            />
          ) : (
            <AuthorCard
              image={AuthorImage}
              name={userDonutId === 0 ? 'Visitor' : 'Member'}
              role={userDonutId === 0 ? 'Join us !' : 'Member'}
              // name={userStatus ? ("Member"):("Visitor")}
              // role={userStatus ? ("Member"):("Join us !")}
            />
          )}

          <div className="mt-12">
            {menuItems.map((item, index) => (
              <MenuItem
                key={index}
                name={item.name}
                href={item.href}
                icon={item.icon}
                dropdownItems={item.dropdownItems}
              />
            ))}
          </div>
        </div>
      </Scrollbar>
    </aside>
  );
}
