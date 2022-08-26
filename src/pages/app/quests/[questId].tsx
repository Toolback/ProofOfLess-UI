import { useContext, useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import cn from 'classnames';
import { NextSeo } from 'next-seo';
import Button from '@/components/ui/button';
import CoinInput from '@/components/ui/coin-input';
import TransactionInfo from '@/components/ui/transaction-info';
import { SwapIcon } from '@/components/icons/swap-icon';
import DashboardLayout from '@/layouts/_dashboard';
import Trade from '@/components/ui/trade';
import QuestDetailsFrame from '@/components/ui/questDetailsFrame';
import IPLDiamond from '@/lib/PLDiamond';
import { GetStaticPaths, GetStaticProps, InferGetStaticPropsType } from 'next';
import { WalletContext } from '@/lib/hooks/use-connect';
import { ethers, providers } from 'ethers';

export const getStaticPaths: GetStaticPaths = async() => {
  let instance = await IPLDiamond();
  let activeQuest = await instance.getAllActiveQuests();
  const paths = activeQuest.map((questId:any) => {
    return {
      params:{ questId: (Number(questId)).toString()}
    }
  })
  return {
    paths,
    fallback:false
  }

}

export const getStaticProps: GetStaticProps = async (context:any) => {
  const unitQuestId = context.params.questId
  const instance = await IPLDiamond();
  const req = await instance.getQuestData(unitQuestId)
  let isUserInWaitingList = req.waitingListAddress.includes("")
  let startPeriod = new Date(Number(req.startPeriod) * 1000).toLocaleDateString("fr-EU")
  let endPeriod = new Date(Number(req.endPeriod) * 1000).toLocaleDateString("fr-EU")

  let unitQuest = {
    questName: req.questName,
    questSubtitle: req.questSubtitle || null,
    questDetails: req.questDetails || null,
    questRules : req.questRules || null,
    questId: Number(req.questId),
    questType: req.questType || null,
    author: req.author,
    questEntryToken: req.questEntryToken,
    questEntryCost: Number(req.questEntryCost),
    lessReward: Number(req.lessReward),
    fees: Number(req.fees),
    startPeriod,
    endPeriod,
    delayPeriod: Number(req.delayPeriod),
    questBalance: Number(req.questBalance),
    waitingListAddress: req.waitingListAddress,
    participants: req.participants,
    isInWaitingList: "false",
    isInParticipantsList: "false",
    isActive: req.isActive,
    actionCall : Number(req.questId)
}


  return{
    props:{quest: unitQuest}}
}
const QuestPageDetails: NextPageWithLayout<
InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  const { address } = useContext(WalletContext);
  const [userWaitingListStatus, setUserWaitingListStatus] = useState(false)
  const [userParticipantStatus, setUserParticipantStatus] = useState(false)

  let q = props.quest

  function isSubscribed () {
    const req = q.waitingListAddress.includes(address)
    setUserWaitingListStatus(req);
    // userWaitingListStatus ? (
    //   setUserWaitingListStatus(true)
    // ):(
    //   setUserWaitingListStatus(false)
    // )
    return userWaitingListStatus
  }

  function isParticipant () {
    const req = q.participants.includes(address);
    setUserParticipantStatus(req)
    return userParticipantStatus  
  }

  const handleSubscribe = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(address)
    const instance = await IPLDiamond(signer);
    const req = await instance.subscribeToWaitingList(q.questId)
    await req.wait()
    setUserWaitingListStatus(true);

  }

  const handleUnsubscribe = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum)
    const signer = provider.getSigner(address)
    const instance = await IPLDiamond(signer);
    const req = await instance.unsubscribeFromWaitingList(q.questId, address)
    await req.wait()
    setUserWaitingListStatus(false);

  }

  const renderActionCall = () => {
    if(address === undefined) {
      return(
        <Button
        // onClick={() => handleUnsubscribe()}
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
        >
          CONNECT
        </Button>
      )
    } else if (userWaitingListStatus === true) {
      return (
        <Button
        onClick={() => handleUnsubscribe()}
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
        >
          UNSUBSCRIBE
        </Button>
      )
    } else {
      return (
        <Button
        onClick={() => handleSubscribe()}
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
        >
          SUBSCRIBE
        </Button>
      )
    }
  }

  return (
    <>
      <NextSeo
        title="Farms"
        description="Proof Of Less - Web3 Protocol for a more virtuouse lifestyle"
      />
      <QuestDetailsFrame>
        <div className="mb-5 border-b border-dashed border-gray-400 pb-5 dark:border-gray-500 xs:mb-7 xs:pb-6">
          <h2 className="text-center mb-4 text-3xl text-black dark:text-gray-200">Twitter Quest</h2>
          <span className='flex justify-center text-gray-400'>Focus on value, not quantity ! </span>
          <span className="flex mt-4 text-gray-700 dark:text-gray-400">Details</span>
          <span className="flex mt-2">
            Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week. Tweet less than your 6 month weekly average for 4 consecutive week.
          </span>

          <span className="flex mt-4 text-gray-700 dark:text-gray-400">Rule</span>
          <span className="flex mt-2">
          Tweet less than your 6 month weekly average for 4 consecutive week.          
          </span>

          <span className="flex mt-4 text-gray-700 dark:text-gray-400">Prerequist</span>
          <span className="flex mt-2">
          To automatically participate in the next quest, you need to
          - Supply at least the Entry Cost Amount
          - Subscribe to the quest you want !        
          </span>

        </div>
        <div className="flex flex-col gap-4 xs:gap-[18px] border-b border-dashed border-gray-400 mb-5 pb-5 dark:border-gray-500">
          <TransactionInfo label={'Delay'} value={`${q.startPeriod} - ${q.endPeriod}`}/>
          <TransactionInfo label={'Participants'} value={(q.participants.length).toString()} />
          <TransactionInfo label={'Waiting List'} value={(q.waitingListAddress.length).toString()} />
          <TransactionInfo label={'Quest Gain'} value={q.questBalance.toString()} />
          <TransactionInfo label={'Less Reward'} value={q.lessReward.toString()} />
          <TransactionInfo label={'Protocol Fee'} value={q.fees.toString()} />
          <TransactionInfo label={'Entry Cost'} value={`${q.questEntryCost} PUsdc`} />

        </div>
        <div className='flex justify-around'>
          <div className='flex flex-col text-center gap-2'>
          <span>Subscribed</span>
          <span>{userWaitingListStatus ? ("✅") : ("❌")}</span>
          </div>
          <div className='flex flex-col text-center gap-2'>
          <span>Participe</span>
          <span>{userParticipantStatus ? ("✅") : ("❌")}</span>
          </div>
        </div>
        {renderActionCall()}

      </QuestDetailsFrame>
    </>
  );
};

QuestPageDetails.getLayout = function getLayout(page) {
  return <DashboardLayout>{page}</DashboardLayout>;
};

export default QuestPageDetails;
