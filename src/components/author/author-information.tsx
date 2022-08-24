import Button from '@/components/ui/button';
import AnchorLink from '@/components/ui/links/anchor-link';
import { InfoIcon } from '@/components/icons/info-icon';
import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import IPLDiamond from '@/lib/PLDiamond';
import { useContext, useEffect, useState } from 'react';
import { useToggle } from 'react-use';
import Input from '../ui/forms/input';
import { WalletContext } from '@/lib/hooks/use-connect';
import { Plus } from '../icons/plus';

interface AuthorInformationProps {
  data: any;
  className?: string;
}
export default function AuthorInformation({
  className = 'md:hidden',
  data,
}: AuthorInformationProps) {
  const defaultUserData = {
    tokenId: 0,
    userName: 'N/A',
    userBio: 'N/A',
    claimTime: '/',
  };
  const { address, userDonutId } = useContext(WalletContext);

  const [userData, setUserData] = useState(defaultUserData);
  const [isNewUserBio, ToggleUserBio] = useToggle(false);
  const [newUserBio, setNewUserBio] = useState('New Bio');

  const web3Modal =
    typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });

  useEffect(() => {
    setUserData(data);
  }, [data]);

  async function handleUpdateBio() {
    const connection = web3Modal && (await web3Modal.connect());
    const provider = new ethers.providers.Web3Provider(connection);
    let signer = await provider.getSigner();
    let instance = await IPLDiamond(signer);
    await instance.setDonutBio(userDonutId, newUserBio);
    ToggleUserBio();
  }

  return (
    <div className={`${className}`}>
      {/* Bio */}
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        {isNewUserBio ? (
          <div className="flex">
            <Input onChange={(e) => setNewUserBio(e.target.value)} placeholder={newUserBio} />
            <div className="ml-4 flex-col items-center justify-center">
              <Button
                onClick={() => handleUpdateBio()}
                color="white"
                className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7"
              >
                Send
              </Button>
              <Button
                onClick={() => ToggleUserBio()}
                color="white"
                className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7"
              >
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <>
            <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
              Bio
            </div>


            <div className="text-sm leading-6 tracking-tighter text-gray-600 dark:text-gray-400">
              {userData.userBio}
            </div>
            <button
              onClick={() => ToggleUserBio()}
              className="right-0 flex h-5 w-5 shrink-0  items-center justify-center rounded-full bg-gray-900 text-white lg:h-6 lg:w-6"
            >
              <Plus className="h-auto w-2.5 lg:w-auto" />
            </button>
          </>
        )}
      </div>

      {/* Social */}
      {/* <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Social
        </div>
        {data?.socials?.map((social: any) => (
          <AnchorLink
            href={social?.link}
            className="mb-2 flex items-center gap-x-2 text-sm tracking-tight text-gray-600 transition last:mb-0 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            key={social?.id}
          >
            {social?.icon}
            {social?.title}
          </AnchorLink>
        ))}
      </div> */}

      {/* Links */}
      {/* <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Links
        </div>
        {data?.links?.map((item: any) => (
          <AnchorLink
            href={item?.link}
            className="mb-2 flex items-center text-sm tracking-tight text-gray-600 transition last:mb-0 hover:text-gray-900 hover:underline dark:text-gray-400 dark:hover:text-white"
            key={item?.id}
          >
            {item?.link}
          </AnchorLink>
        ))}
      </div> */}

      {/* Join date */}
      <div className="border-y border-dashed border-gray-200 py-5 dark:border-gray-700 xl:py-6">
        <div className="text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Donut Minted : {userData.claimTime}
        </div>
      </div>
      {/* Report button */}
      {/* <Button
        color="gray"
        className="mt-5 h-8 font-normal text-gray-600 hover:text-gray-900 dark:bg-gray-600 dark:text-gray-200 dark:hover:text-white md:h-9 md:px-4 lg:mt-6"
      >
        <span className="flex items-center gap-2">
          <InfoIcon className="h-3 w-3" /> report
        </span>
      </Button> */}
    </div>
  );
}
