import { useContext, useState } from 'react';

import cn from 'classnames';
import { StaticImageData } from 'next/image';
import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import Image from '@/components/ui/image';
import FeaturedCard from '@/components/nft/featured-card';
import ListCard from '@/components/ui/list-card';
import AnchorLink from '@/components/ui/links/anchor-link';
import Button from '@/components/ui/button';

import { useModal } from '@/components/modal-views/context';
import Avatar from '@/components/ui/avatar';

import { WalletContext } from '@/lib/hooks/use-connect';
import PLUsdc from '@/lib/PLUsdc';
import IPLDiamond from '@/lib/PLDiamond';
import { ethers } from 'ethers';
import Web3Modal from 'web3modal';
import Link from 'next/link';
import LoadingScreen from '@/layouts/_loading-screen';


interface DonutFooterProps {
  className?: string;
  address: string;
  userStatus: string;
  donutPrice: number;
  totalCount: number;
  cycleMaxSupply: number;
}
const web3Modal =
  typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });

function DonutFooter({
  className = 'md:hidden',
  address,
  userStatus,
  donutPrice,
  totalCount,
  cycleMaxSupply,
}: DonutFooterProps) {
  const { openModal } = useModal();
  const {setUserStatus } = useContext(WalletContext);
  const [isLoading, setLoading] = useState(false);

  const handleMintDonut = async (address: String) => {
    setLoading(true)
    const connection = web3Modal && (await web3Modal.connect());
    const provider = new ethers.providers.Web3Provider(connection);
    let signer = await provider.getSigner();

    // let req = await IMainToken.transfer("0x8b4D1a27183Ed1cD848AC7D345B0322575eD2B74", 1);
    // let provider = new ethers.providers.Web3Provider(address);
    let ID = await IPLDiamond(signer);
    let IT = await PLUsdc(signer);
    // let req1_5 = await IT.approve(
    //   '0x8b4D1a27183Ed1cD848AC7D345B0322575eD2B74',
    //   ethers.utils.parseEther("10")
    // );
    let req2 = await ID.mintDonut(address, 1); //address to sent / cycleId
    req2.wait().then(() => {
      setUserStatus("isMember")
      setLoading(false)
    })
    

  };

  const handleMintFreePUsdc = async () => {
    const connection = web3Modal && (await web3Modal.connect());
    const provider = new ethers.providers.Web3Provider(connection);
    let signer = await provider.getSigner();

    let IT = await PLUsdc(signer);
    let req = await IT.mint(address, ethers.utils.parseEther("100"))
    req.wait()
    console.log("Mint Succeed !", req)
  }

  const renderMintDonutButton = (userStatus: String, address: String) => {
    switch (userStatus) {
      case 'isMember':
        return (
        <Link href="/app/profile">
          <Button shape="rounded">Go To Profile</Button>
          </Link>
          );
      case 'isVisitor':
        return (
          <Button onClick={() => handleMintDonut(address)} shape="rounded">
            Mint Now !
          </Button>
        );
      default:
        return (
          <Button
            onClick={() => openModal('WALLET_CONNECT_VIEW')}
            shape="rounded"
          >
            Connect !
          </Button>
        );
    }
  };

  return (
    <div
      className={cn(
        'sticky bottom-0 z-10 bg-body dark:bg-dark md:-mx-2',
        className
      )}
    >
      {isLoading && <LoadingScreen/>}
      <div className="-mx-4 border-t-2 border-gray-900 px-4 pt-4 pb-5 dark:border-gray-700 sm:-mx-6 sm:px-6 md:mx-2 md:px-0 md:pt-5 lg:pt-6 lg:pb-7">
        <div className="flex gap-4 pb-3.5 md:pb-4 xl:gap-5">
          <div className="block w-1/2 shrink-0 md:w-2/5">
            <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
              Price
            </h3>
            <div className="text-lg font-medium -tracking-wider md:text-xl xl:text-2xl">
              {donutPrice || '10'} PUsdc
            </div>
          </div>
          <div className="block w-1/2 shrink-0 md:w-3/5">
            <h3 className="mb-1 truncate text-13px font-medium uppercase tracking-wider text-gray-900 dark:text-white sm:mb-1.5 sm:text-sm">
              Total Supply
            </h3>
            <span className="">
              {' '}
              {totalCount || '0'} / {cycleMaxSupply || 'X'}
            </span>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-3">
          {renderMintDonutButton(userStatus, address)}
          <Button
            shape="rounded"
            variant="solid"
            color="gray"
            className="dark:bg-gray-800"
            onClick={() => openModal('SHARE_VIEW')}
          >
            SHARE
          </Button>
          <Button
            shape="rounded"
            variant="solid"
            color="gray"
            className="dark:bg-gray-800"
            onClick={() => handleMintFreePUsdc()}
          >
            GET FREE PUSDC
          </Button>
          <Link href="https://mumbaifaucet.com/">
          <Button
            shape="rounded"
            variant="solid"
            color="gray"
            className="dark:bg-gray-800"
          >
            GET FREE TMATIC
          </Button>

          </Link>
        </div>
      </div>
    </div>
  );
}
type History = {
  id: number;
  label: string;
  name: string;
  authorSlug: string;
  created_at: string;
  avatar: StaticImageData;
  amount: number;
  transactionUrl: string;
};

type Avatar = {
  id: string | number;
  name: string;
  slug: string;
  logo: StaticImageData;
};
type DonutDetailsProps = {
  donutImage: StaticImageData;
  donutPrice: number;
  description: string;
  descriptionConnected: string;
  cycleMaxSupply: number;
  totalCount: number;
  startedAt: number;
  blockchainData: Avatar;
  creatorData: Avatar;
  collectionData: Avatar;
  owner: Avatar;
  ownerConnected: Avatar;
  history: History[];
};

export default function DonutDetails({
  donutData,
}: {
  donutData: DonutDetailsProps;
}) {
  const {
    donutImage,
    donutPrice,
    description,
    descriptionConnected,
    cycleMaxSupply,
    totalCount,
    startedAt,
    blockchainData,
    creatorData,
    collectionData,
    history,
    owner,
    ownerConnected,
  } = donutData;
  const { address, userStatus } = useContext(WalletContext);

  return (
    <div className="flex flex-grow">
      <div className="mx-auto flex w-full flex-grow flex-col transition-all xl:max-w-[1360px] 4xl:max-w-[1760px]">
        <div className="relative mb-5 flex flex-grow items-center justify-center md:pb-7 md:pt-4 ltr:md:left-0 ltr:md:pl-6 rtl:md:right-0 rtl:md:pr-6 lg:fixed lg:mb-0 lg:h-[calc(100%-96px)] lg:w-[calc(100%-492px)] ltr:lg:pl-8 rtl:lg:pr-8 xl:w-[calc(100%-550px)] ltr:xl:pr-12 ltr:xl:pl-[340px] rtl:xl:pl-12 rtl:xl:pr-[340px] ltr:2xl:pl-96 rtl:2xl:pr-96 3xl:w-[calc(100%-632px)] ltr:4xl:pl-0 rtl:4xl:pr-0">
          <div className="flex h-full max-h-full w-full items-center justify-center lg:max-w-[768px]">
            <div className="relative aspect-square max-h-full overflow-hidden rounded-lg">
              <Image
                src={donutImage}
                alt="Proof Of Less Donut Membership"
                className="h-full bg-white dark:bg-dark "
              />
            </div>
          </div>
        </div>

        <div className="relative flex w-full flex-grow flex-col justify-between ltr:md:ml-auto ltr:md:pl-8 rtl:md:mr-auto rtl:md:pr-8 lg:min-h-[calc(100vh-96px)] lg:w-[460px] ltr:lg:pl-12 rtl:lg:pr-12 xl:w-[592px] ltr:xl:pl-20 rtl:xl:pr-20">
          <div className="block">
            <div className="block">
              <div className="flex justify-between">
                <h2 className="text-xl font-medium leading-[1.45em] -tracking-wider text-gray-900 dark:text-white md:text-2xl xl:text-3xl">
                  Donut
                </h2>
                {/* <div className="mt-1.5 shrink-0 ltr:ml-3 rtl:mr-3 xl:mt-2">
                  <NftDropDown />
                </div> */}
              </div>
              <div
                // href={minted_slug}
                className="mt-1.5 inline-flex items-center text-sm -tracking-wider text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white xl:mt-2.5"
              >
                Proof Of Less Membership
              </div>
              <div className="mt-4 flex flex-wrap gap-6 pt-0.5 lg:-mx-6 lg:mt-6 lg:gap-0">
                <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 lg:px-6 lg:ltr:border-r lg:rtl:border-l">
                  <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                    Created By
                  </h3>
                  <AnchorLink href="#" className="inline-flex">
                    <ListCard
                      item={creatorData}
                      className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    />
                  </AnchorLink>
                </div>
                <div className="shrink-0 lg:px-6">
                  <h3 className="text-heading-style mb-2.5 uppercase text-gray-900 dark:text-white">
                    Collection
                  </h3>
                  <AnchorLink href="#" className="inline-flex">
                    <ListCard
                      item={collectionData}
                      className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                    />
                  </AnchorLink>
                </div>
              </div>
            </div>
            <div className="mt-5 flex flex-col pb-5 xl:mt-9">
              <ParamTab
                tabMenu={[
                  {
                    title: 'Details',
                    path: 'details',
                  },
                  {
                    title: 'History',
                    path: 'history',
                  },
                ]}
              >
                <TabPanel className="focus:outline-none">
                  <div className="space-y-6">
                    <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Description
                      </h3>
                      <div className="text-sm leading-6 -tracking-wider text-gray-600 dark:text-gray-400">
                        {userStatus === 'isMember'
                          ? descriptionConnected
                          : description}
                      </div>
                    </div>
                    <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Owner
                      </h3>
                      <AnchorLink href="#" className="inline-block" key={1}>
                        <ListCard
                          item={
                            userStatus === 'isMember' ? ownerConnected : owner
                          }
                          className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                        />
                      </AnchorLink>
                    </div>
                    <div className="block">
                      <h3 className="text-heading-style mb-2 uppercase text-gray-900 dark:text-white">
                        Block Chain
                      </h3>
                      <div className="flex flex-col gap-2">
                        <AnchorLink href="#" className="inline-flex" key={1}>
                          <ListCard
                            item={blockchainData}
                            className="rounded-full p-2 text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                          />
                        </AnchorLink>
                      </div>
                    </div>
                  </div>
                </TabPanel>
                <TabPanel className="focus:outline-none">
                  <div className="flex flex-col-reverse">
                    {history.map((item) => (
                      <FeaturedCard
                        item={item}
                        key={item?.id}
                        className="mb-3 first:mb-0"
                      />
                    ))}
                  </div>
                </TabPanel>
              </ParamTab>
            </div>
          </div>
          <DonutFooter
            className="hidden md:block"
            address={address}
            userStatus={userStatus}
            donutPrice={donutPrice}
            totalCount={totalCount}
            cycleMaxSupply={cycleMaxSupply}
          />
        </div>
        <DonutFooter
          address={address}
          userStatus={userStatus}
          donutPrice={donutPrice}
          totalCount={totalCount}
          cycleMaxSupply={cycleMaxSupply}
        />
      </div>
    </div>
  );
}
