import { useContext, useEffect, useState } from 'react';

import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import Image from '@/components/ui/image';
import { Copy } from '@/components/icons/copy';
import { Check } from '@/components/icons/check';
import AuthorInformation from '@/components/author/author-information';
import ProfileTab from '@/components/profile/profile-tab';
import Avatar from '@/components/ui/avatar';
// static data
import DonutImage from '@/assets/images/donutwhite2.png';
import POLHandPlant from '@/assets/images/POLHandPlant.jpg';
import { WalletContext } from '@/lib/hooks/use-connect';

import Web3Modal from 'web3modal';
import { ethers } from 'ethers';
import IPLDiamond from '@/lib/PLDiamond';
import { Plus } from '@/components/icons/plus';
import Input from '@/components/ui/forms/input';
import { useToggle } from 'react-use';

export const getStaticProps: GetStaticProps = async () => {
  let instance = await IPLDiamond();
  let reqQuestData = await instance.getQuestData(1);
  let reqTotalUser = await instance.totalSupply();

  return {
    props: {
      // req1: reqQuestData,
      // req2: reqTotalUser
    },
  };
};

const AuthorProfilePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  let [copyButtonStatus, setCopyButtonStatus] = useState(false);
  let [_, copyToClipboard] = useCopyToClipboard();
  const { address, userDonutId } = useContext(WalletContext);
  const [numberQuestJoined, setNumberQuestJoined] = useState(0);
  const [changeNameActive, setChangeNameActive] = useToggle(false);

  const [newUserName, setNewUserName] = useState('New Username');
  const defaultUserData = {
    tokenId: 0,
    userName: 'N/A',
    userBio: 'N/A',
  };
  const [userData, setUserData] = useState(defaultUserData);

  const web3Modal =
    typeof window !== 'undefined' && new Web3Modal({ cacheProvider: true });
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      const instance = await IPLDiamond();
      const data = await instance.getDonutInfos(userDonutId);
      const isInTwitterQuest = await instance.isUserInWaitingList(1, address);
      if (isInTwitterQuest) {
        setNumberQuestJoined(+1);
      }
      setUserData(data);
    };
    if (userDonutId > 0) {
      fetchData().catch(console.error);
    }
  }, [userDonutId]);

  const handleCopyToClipboard = () => {
    copyToClipboard(address);
    setCopyButtonStatus(true);
    setTimeout(() => {
      setCopyButtonStatus(copyButtonStatus);
    }, 2500);
  };

  const handleChangeUserName = async () => {
    console.log('TEST CHANGE USERNAME INPUTS', userDonutId, newUserName);
    const connection = web3Modal && (await web3Modal.connect());
    const provider = new ethers.providers.Web3Provider(connection);
    let signer = await provider.getSigner();
    let instance = await IPLDiamond(signer);
    await instance.setDonutName(userDonutId, newUserName);
    setChangeNameActive();
  };
  return (
    <>
      <NextSeo
        title="Profile"
        description="Criptic - React Next Web3 NFT Crypto Dashboard Template"
      />
      {/* Profile Cover Image */}
      <div className="relative h-36 w-full overflow-hidden rounded-lg sm:h-44 md:h-64 xl:h-80 2xl:h-96 3xl:h-[448px]">
        <Image
          src={POLHandPlant}
          placeholder="blur"
          layout="fill"
          objectFit="cover"
          alt="Cover Image"
        />
      </div>

      {/* Profile Container */}
      <div className="mx-auto flex w-full shrink-0 flex-col md:px-4 xl:px-6 3xl:max-w-[1700px] 3xl:px-12">
        {/* Profile Image */}
        <Avatar
          size="xl"
          image={DonutImage}
          alt="Author"
          className="z-10 mx-auto -mt-12 dark:border-gray-500 sm:-mt-14 md:mx-0 md:-mt-16 xl:mx-0 3xl:-mt-20"
        />
        {/* Profile Info */}
        <div className="flex w-full flex-col pt-4 md:flex-row md:pt-10 lg:flex-row xl:pt-12">
          <div className="shrink-0 border-dashed border-gray-200 dark:border-gray-700 md:w-72 ltr:md:border-r md:ltr:pr-7 rtl:md:border-l md:rtl:pl-7 lg:ltr:pr-10 lg:rtl:pl-10 xl:ltr:pr-14 xl:rtl:pl-14 2xl:w-80 3xl:w-96 3xl:ltr:pr-16 3xl:rtl:pl-16">
            <div className="text-center ltr:md:text-left rtl:md:text-right">
              {/* Name */}
              {/* <div className='flex justify-between'> */}
              {changeNameActive ? (
                <div className="flex">
                  <Input
                    onChange={(e) => setNewUserName(e.target.value)}
                    placeholder={newUserName}
                  />
                  <div className="ml-4 flex-col items-center justify-center">
                    <Button
                      onClick={() => handleChangeUserName()}
                      color="white"
                      className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7"
                    >
                      Send
                    </Button>
                    <Button
                      onClick={() => setChangeNameActive()}
                      color="white"
                      className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7"
                    >
                      Cancel
                    </Button>
                  </div>
                </div>
              ) : (
                <div className="flex items-center justify-center lg:justify-between">
                  <h2 className="text-xl font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl">
                    {userData.userName}
                  </h2>
                  <button
                    onClick={() => setChangeNameActive()}
                    className="right-0 flex h-5 w-5 shrink-0  items-center justify-center rounded-full bg-gray-900 text-white lg:h-6 lg:w-6"
                  >
                    <Plus className="h-auto w-2.5 lg:w-auto" />
                  </button>
                </div>
              )}

              {/* </div> */}

              {/* Username */}
              <div className="mt-1 text-sm font-medium tracking-tighter text-gray-600 dark:text-gray-400 xl:mt-3">
                @{userDonutId > 0 ? 'Member' : 'Visitor'}
              </div>

              {/* User ID and Address */}
              <div className="mt-5 inline-flex h-9 items-center rounded-full bg-white shadow-card dark:bg-light-dark xl:mt-6">
                <div className="inline-flex h-full shrink-0 grow-0 items-center rounded-full bg-gray-900 px-4 text-xs text-white sm:text-sm">
                  #{userDonutId != undefined ? userDonutId : ''}
                </div>
                <div className="text w-28 grow-0 truncate text-ellipsis bg-center text-xs text-gray-500 ltr:pl-4 rtl:pr-4 dark:text-gray-300 sm:w-32 sm:text-sm">
                  {address != undefined ? address : 'Not Connected'}
                </div>
                <div
                  className="flex cursor-pointer items-center px-4 text-gray-500 transition hover:text-gray-900 dark:text-gray-300 dark:hover:text-white"
                  title="Copy Address"
                  onClick={handleCopyToClipboard}
                >
                  {copyButtonStatus ? (
                    <Check className="h-auto w-3.5 text-green-500" />
                  ) : (
                    <Copy className="h-auto w-3.5" />
                  )}
                </div>
              </div>
            </div>

            {/* Level & rank / exp - staking */}
            <div className="mt-10 flex flex-wrap items-center justify-center gap-6 border-y border-dashed border-gray-200 py-5 text-center dark:border-gray-700 md:justify-start ltr:md:text-left rtl:md:text-right xl:mt-12 xl:gap-8 xl:py-6">
              <div>
                <div className="mb-1.5 text-sm tracking-tighter text-gray-600 dark:text-gray-400">
                  Joined Quest(s)
                </div>
                <div className="text-lg font-medium tracking-tighter text-gray-900 dark:text-white">
                  {numberQuestJoined}
                </div>
              </div>
              {/* <ActiveLink href={routes.quests}>
                <Button
                  color="white"
                  className="shadow-card dark:bg-light-dark md:h-10 md:px-5 xl:h-12 xl:px-7"
                >
                  More
                </Button>
              </ActiveLink> */}
            </div>

            {/* Followed by */}

            {/* <div className="border-y border-dashed border-gray-200 py-5 text-center dark:border-gray-700 ltr:md:text-left rtl:md:text-right xl:py-6">
              <div className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
                Friends List
              </div>
              <div className="flex justify-center md:justify-start"> */}

            {/* Followers list */}

            {/* {authorData?.followed_by?.map((item) => (
                  <AnchorLink
                    key={item?.id}
                    href="/"
                    className="-ml-2 first:ml-0"
                  >
                    <Avatar
                      size="sm"
                      image={item?.avatar?.thumbnail}
                      alt="Author"
                      height={28}
                      width={28}
                      className="dark:border-gray-500"
                    />
                  </AnchorLink>
                ))}
              </div>

              <div className="mt-4">
                <AnchorLink
                  href="/"
                  className="text-sm tracking-tighter text-gray-600 transition hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                >
                  View All
                </AnchorLink>
              </div>
            </div>
 */}
            <AuthorInformation className="hidden md:block" data={userData} />
          </div>

          <div className="grow pt-6 pb-9 md:-mt-2.5 md:pt-1.5 md:pb-0 md:ltr:pl-7 md:rtl:pr-7 lg:ltr:pl-10 lg:rtl:pr-10 xl:ltr:pl-14 xl:rtl:pr-14 3xl:ltr:pl-16 3xl:rtl:pr-16">
            <ProfileTab data={userData}/>
          </div>
          <AuthorInformation data={userData} />
        </div>
      </div>
    </>
  );
};

AuthorProfilePage.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default AuthorProfilePage;
