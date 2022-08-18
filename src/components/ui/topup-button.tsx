import cn from 'classnames';
import { Plus } from '@/components/icons/plus';
import { ChevronForward } from '@/components/icons/chevron-forward';

import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import PLUsdc from '@/lib/PLUsdc';
import { useContext } from 'react';
import { WalletContext } from '@/lib/hooks/use-connect';

export default function TopupButton({
  className,
}: React.PropsWithChildren<{ className?: string}>) {
  const web3Modal =
  typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });
  const { address } = useContext(WalletContext);

  const handleMintFreePUsdc = async () => {
    const connection = web3Modal && (await web3Modal.connect());
    const provider = new ethers.providers.Web3Provider(connection);
    let signer = await provider.getSigner();

    let IT = await PLUsdc(signer);
    let req = await IT.mint(address, ethers.utils.parseEther("100"))
    console.log("Mint Succeed !", req)

  }
  return (

      <button
      onClick={() =>handleMintFreePUsdc()} 
        className={cn(
          'flex h-10 w-full items-center whitespace-nowrap rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-6 text-sm uppercase tracking-wider text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:h-12 3xl:h-13',
          className
        )}
      >
        <span className="mr-3.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-gray-900 text-white lg:h-6 lg:w-6">
          <Plus className="h-auto w-2.5 lg:w-auto" />
        </span>
        <span className="mr-3.5 flex-grow text-justify text-xs lg:text-sm">
          Top Up Balance
        </span>
        <ChevronForward className="rtl:rotate-180" />
      </button>


  );
}
