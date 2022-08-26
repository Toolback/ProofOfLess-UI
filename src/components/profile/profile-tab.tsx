import ParamTab, { TabPanel } from '@/components/ui/param-tab';
import ListCard from '@/components/ui/list-card';
import TransactionSearchForm from '@/components/author/transaction-search-form';
import TransactionHistory from '@/components/author/quests-handler';
import CollectionCard from '@/components/ui/collection-card';
// static data
import { collections } from '@/data/static/collections';

import donutImg from '@/assets/images/donutwhite2.png';
import Avatar from '../ui/avatar';
import StatsProfil from '../ui/stats-profil';
import Button from '../ui/button';
import QuestsHandler from '@/components/author/quests-handler';

import Wallet from '@/assets/images/portfolio/wallet.svg';
import Nft from '@/assets/images/portfolio/nft.svg';
import Deposit from '@/assets/images/portfolio/deposit.svg';
import Claimable from '@/assets/images/portfolio/claimable.svg';
import { useContext, useEffect, useState } from 'react';
import PLUsdc from '@/lib/PLUsdc';
import { WalletContext } from '@/lib/hooks/use-connect';
import { ethers } from 'ethers';
import IPLDiamond from '@/lib/PLDiamond';
import Link from 'next/link';
import DisplayUserFunds from '@/pages/display-funds';

interface DonutDetailsProps {
  data : any
}
export default function ProfileTab({data}: DonutDetailsProps) {
  const { address, userDonutId } = useContext(WalletContext);
  const [userPUsdcBal, setUserPUsdcBal] = useState("N/A")
  const [userLockedFund, setUserLockedFund] = useState("N/A")
  const [userLessBal, setUserLessBal] = useState("N/A")
  const [userNextPayment, setUserNextPayment] = useState("N/A")
  const [userTwitterData, setUserTwitterData] = useState("N/A")

  let fundsData =  {
    userPUsdcBal,
    userLockedFund,
    userLessBal,
    userNextPayment,
    userStakedAmount : data.stakedAmount,
    userTwitterData
  }

  const donutLevel = Number(data.level)
  
  const donutRank = Number(data.rank)
  useEffect(() => {
    const fetchData = async () => {
      const PUsdc = await PLUsdc();
      const req1 = await PUsdc.balanceOf(address)
      setUserPUsdcBal(ethers.utils.formatEther(`${Number(req1)}`))
      const PLd = await IPLDiamond()
      const req2 = await PLd.getUserLockedFundsByQuest(1, address, PUsdc.address) // for twitter quest
      setUserLockedFund(ethers.utils.formatEther(`${Number(req2)}`))
      const req3 = await PLd.balanceOfBatch([address], [0]) // balanceOf Item bug ? Or just me ?
      setUserLessBal(Number(req3).toString())
      const req4 = await PLd.isUserInWaitingList(1, address)
      req4 ? setUserNextPayment("-10") : setUserNextPayment("0")
      const req5 = await PLd.getUserQuestData(1, address)
      setUserTwitterData(req5)

      return userPUsdcBal 
    }
    if(address) {
      fetchData()
      .then(e => console.log("res wallet data fetched ?", e))  
    }
  }, [data || address])
  const authorWallets = [
    {
      id: 1,
      name: 'WALLET',
      logo: Wallet,
      balance: `${userPUsdcBal} PUsdc`,
    },
    {
      id: 2,
      name: 'LOCKED',
      logo: Nft,
      balance: `${userLockedFund} PUsdc`,
    },
    {
      id: 3,
      name: 'REWARD',
      logo: Claimable,
      balance: `${userLessBal} Less`,
    },
    {
      id: 4,
      name: 'NEXT PAYMENT',
      logo: Deposit,
      balance: `${userNextPayment} Less`,
    },
  ];
  return (
    <ParamTab
      tabMenu={[
        {
          title: 'Statistics',
          path: 'statistics',
        },
        {
          title: 'Collection',
          path: 'collection',
        },
        {
          title: 'Quests',
          path: 'quests',
        },
      ]}
    >
      <TabPanel className="focus:outline-none">
        <div className="mb-8 flex items-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark md:col-span-1 md:h-[678px] lg:col-span-5 lg:h-[644px] xl:col-span-3 xl:row-start-1 xl:row-end-2 xl:h-auto 2xl:col-span-3 2xl:h-full 2xl:p-6 3xl:col-span-3 3xl:p-8">
          <div className="w-full">
            <div className="mb-2 h-full">
              <Avatar
                image={donutImg}
                alt="Author"
                className="mx-auto mb-10"
                size="lg"
              />
              <div className="flex justify-center gap-20">
                <div className="flex flex-col">
                  <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                    Level
                  </h3>
                  <div className="mb-2 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                    {donutLevel}
                  </div>
                </div>
                <div className="flex flex-col">
                  <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                    Rank
                  </h3>
                  <div className="mb-2 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                    {donutRank}
                  </div>
                </div>
              </div>

              {/* <TopupButton className="md:h-12 " /> */}
            </div>
            <span className="-mx-6 block border-t border-dashed border-t-gray-200 dark:border-t-gray-700 3xl:-mx-8" />
            <StatsProfil className="mt-6" data={data} />
          </div>
        </div>

        <DisplayUserFunds data={fundsData}/>

        {/* <div className="space-y-8 md:space-y-10 xl:space-y-12">
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
            {authorWallets.map((wallet) => (
              <ListCard item={wallet} key={wallet?.id} variant="medium" />
            ))}
          </div>
          <Link
          href="/app/manage-funds">
          <Button
            size="large"
            shape="rounded"
            fullWidth={true}
            className="mt-6 uppercase xs:mt-8 xs:tracking-widest xl:px-2 2xl:px-9"
            >
            Manage
          </Button>
            </Link> */}

            
          {/* <div className="block">
            <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
              Protocols
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-1 lg:grid-cols-2">
              {authorProtocols?.map((protocol) => (
                <ListCard item={protocol} key={protocol?.id} variant="large" />
              ))}
            </div>
          </div> */}

          {/* <div className="block">
            <h3 className="text-heading-style mb-3 uppercase text-gray-900 dark:text-white">
              Networks
            </h3>
            <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-2 2xl:grid-cols-3 3xl:grid-cols-4">
              {authorNetworks?.map((network) => (
                <ListCard item={network} key={network?.id} variant="medium" />
              ))}
            </div>
          </div> */}
        {/* </div> */}
      </TabPanel>

      {/* Collection page */}
      <TabPanel className="focus:outline-none">
        <div className="grid gap-4 xs:grid-cols-2 md:grid-cols-1 lg:grid-cols-2 lg:gap-5 xl:gap-6 3xl:grid-cols-3 4xl:grid-cols-4">
          {collections?.map((collection) => (
            <CollectionCard item={collection} key={collection?.id} />
          ))}
        </div>
      </TabPanel>

      {/* Quests page */}
      <TabPanel className="focus:outline-none">
        <div className="space-y-8 xl:space-y-9">
          {/* <TransactionSearchForm /> */}
          <QuestsHandler />
        </div>
      </TabPanel>
    </ParamTab>
  );
}
