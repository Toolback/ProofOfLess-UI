import { useContext } from 'react';
import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
import CoinSlider from '@/components/ui/coin-card';
import OverviewChart from '@/components/ui/chats/overview-chart';
// import LiquidityChart from '@/components/ui/chats/liquidity-chart';
// import VolumeChart from '@/components/ui/chats/volume-chart';
import TopPools from '@/components/ui/top-pools';
import TransactionTable from '@/components/transaction/transaction-table';
import TopCurrencyTable from '@/components/top-currency/currency-table';
import { questNewsData } from '@/data/static/questNews-slide-data';
import Avatar from '@/components/ui/avatar';
import TopupButton from '@/components/ui/topup-button';
//images
import DonutImage from '@/assets/images/donutwhite2.png';
//Lib
import { WalletContext } from '@/lib/hooks/use-connect';
import QuestNewsSlider from '@/components/ui/questNews-card';
import MainQuests_Table from '@/components/quests/mainquests-table';
import MintDonutButton from '@/components/ui/mint-donut-button';
import IPLDiamond from '@/lib/PLDiamond';
import QuestDetailsButton from '@/components/ui/go-quest-details';
import TopQuests from '@/components/ui/top-quests';

export const getStaticProps: GetStaticProps = async () => {
  let instance = await IPLDiamond();
  let activeQuests = await instance.getAllActiveQuests();

  let allQuestsData:any = []
  await activeQuests.map(async (questId:any) => {
    let reqQuest = await instance.getQuestData(Number(questId))
    let startPeriod = new Date(Number(reqQuest.startPeriod) * 1000).toLocaleDateString("fr-EU")
    let endPeriod = new Date(Number(reqQuest.endPeriod) * 1000).toLocaleDateString("fr-EU")
    let stableReward = Number(reqQuest.questBalance)
    let lessReward = Number(reqQuest.lessReward)

    let unitQuest = {
        questName: reqQuest.questName,
        questId: Number(reqQuest.questId),
        questType: "Social Media",           // TO CHANGE   
        questDuration: {startPeriod, endPeriod},
        questReward: {stableReward, lessReward},
        participants: reqQuest.participants.length,
        actionCall : Number(reqQuest.questId)
    }
    
    await allQuestsData.push(unitQuest)    
  })
  let req2 = await instance.totalSupply();
  return {
    props: {
      activeQuestData: allQuestsData,
      totalUsers: Number(req2)
    },
    revalidate: 10, // In seconds

  };
};

const DashBoard: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { balance, userDonutId } = useContext(WalletContext);
  let mintMessage: string = `This ID (Identity Donut) is unique. And might be yours ! `;

  return (
    <>
      <NextSeo
        title="Proof Of Less"
        description="Proof Of Less - Web3 Community for a more virtuouse lifestyle"
      />
      <div className="flex flex-wrap">
        <div className="mb-8 w-full sm:mb-0 sm:w-1/2 sm:ltr:pr-6 sm:rtl:pl-6 md:w-[calc(100%-256px)] lg:w-[calc(100%-288px)] 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          <QuestNewsSlider questCards={questNewsData} />
        </div>
        {userDonutId === undefined || userDonutId === 0 ? (
          <div className="w-full sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
            <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
              <Avatar
                image={DonutImage}
                alt="Author"
                className="mx-auto mb-6"
                size="lg"
              />
              <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                {mintMessage}
              </h3>
              <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                {/* {balance} */}
              </div>
              {userDonutId > 1 ? <TopupButton /> : <MintDonutButton />}
            </div>
          </div>
        ) : (
          <div className="w-full sm:w-1/2 md:w-64 lg:w-72 2xl:w-80 3xl:w-[358px]">
            <div className="flex h-full flex-col justify-center rounded-lg bg-white p-6 shadow-card dark:bg-light-dark xl:p-8">
              <Avatar
                image={DonutImage}
                alt="Author"
                className="mx-auto mb-6"
                size="lg"
              />
              <h3 className="mb-2 text-center text-sm uppercase tracking-wider text-gray-500 dark:text-gray-400 3xl:mb-3">
                My Balance
              </h3>
              <div className="mb-7 text-center font-medium tracking-tighter text-gray-900 dark:text-white xl:text-2xl 3xl:mb-8 3xl:text-[32px]">
                {balance}
              </div>
              <TopupButton />
            </div>
          </div>
        )}
      </div>

      <div className="mt-8 flex flex-wrap">
        <div className="w-full lg:w-[calc(100%-288px)] ltr:lg:pr-6 rtl:lg:pl-6 2xl:w-[calc(100%-320px)] 3xl:w-[calc(100%-358px)]">
          <MainQuests_Table activeQuestData={props.activeQuestData}/>
        </div>
        <div className="mt-4 mb-8 grid w-full grid-cols-1 gap-6 xs:mt-2 sm:mb-10 sm:grid-cols-2 lg:order-1 lg:mt-0 lg:mb-0 lg:flex lg:w-72 lg:flex-col 2xl:w-80 3xl:w-[358px]">
          <OverviewChart totalUsers={props.totalUsers}/>
          <TopQuests twitterQuestUsers={props.activeQuestData[0]?.participants} />
        </div>
      </div>
    </>
  );
};

DashBoard.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default DashBoard;
