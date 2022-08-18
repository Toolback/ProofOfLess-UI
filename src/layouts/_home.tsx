import { useWindowScroll } from '@/lib/hooks/use-window-scroll';
import Logo from '@/components/ui/logo';
import Button from '@/components/ui/button';
import { FlashIcon } from '@/components/icons/flash';
import { SearchFrom } from '@/components/search/view';
import SearchButton from '@/components/search/button';
import ActiveLink from '@/components/ui/links/active-link';
import { useBreakpoint } from '@/lib/hooks/use-breakpoint';
import { useIsMounted } from '@/lib/hooks/use-is-mounted';
import { useDrawer } from '@/components/drawer-views/context';
import Hamburger from '@/components/ui/hamburger';
import { MenuItems } from '@/layouts/_layout-menu';
import WalletConnect from '@/components/nft/wallet-connect';





interface LayoutProps {}

export default function Layout({
  children,
}: React.PropsWithChildren<LayoutProps>) {
  return (
    <div className="bg-light-100 dark:bg-dark-100 flex min-h-screen flex-col">
      <main className="mb-12 flex flex-grow flex-col pt-16 sm:pt-24">
        {children}
      </main>
    </div>
  );
}
