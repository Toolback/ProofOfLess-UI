import { useContext, useEffect, useState } from 'react';
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
import LoadingScreen from '@/layouts/_loading-screen';

// export const getStaticPaths: GetStaticPaths = async () => {
//   let instance = await IPLDiamond();
//   let activeQuest = await instance.getAllActiveQuests();
//   const paths = activeQuest.map((questId: any) => {
//     return {
//       params: { questId: Number(questId).toString() },
//     };
//   });
//   return {
//     paths,
//     fallback: false,
//   };
// };

// export const getStaticProps: GetStaticProps = async (context:any) => {
//   const unitQuestId = context.params.questId
//   const instance = await IPLDiamond();
//   const req = await instance.getQuestData(unitQuestId)
//   let isUserInWaitingList = req.waitingListAddress.includes("")
//   let startPeriod = new Date(Number(req.startPeriod) * 1000).toLocaleDateString("fr-EU")
//   let endPeriod = new Date(Number(req.endPeriod) * 1000).toLocaleDateString("fr-EU")

//   let unitQuest = {
//     questName: req.questName,
//     questSubtitle: req.questSubtitle || null,
//     questDetails: req.questDetails || null,
//     questRules : req.questRules || null,
//     questId: Number(req.questId),
//     questType: req.questType || null,
//     author: req.author,
//     questEntryToken: req.questEntryToken,
//     questEntryCost: Number(req.questEntryCost),
//     lessReward: Number(req.lessReward),
//     fees: Number(req.fees),
//     startPeriod,
//     endPeriod,
//     delayPeriod: Number(req.delayPeriod),
//     questBalance: Number(req.questBalance),
//     waitingListAddress: req.waitingListAddress,
//     participants: req.participants,
//     isInWaitingList: "false",
//     isInParticipantsList: "false",
//     isActive: req.isActive,
//     actionCall : Number(req.questId)
// }

//   return{
//     props:{quest: unitQuest}}
// }
const QuestPageDetails: NextPageWithLayout = () => {
  const { address } = useContext(WalletContext);
  const [isLoading, setLoading] = useState(false);
  const [userWaitingListStatus, setUserWaitingListStatus] = useState(false);
  const [userParticipantStatus, setUserParticipantStatus] = useState(false);
  let Q = {
    questName: "N/A",
    questSubtitle: "N/A",
    questDetails: "N/A",
    questRules: "N/A",
    questId: null,
    questType: "N/A",
    author: "N/A",
    questEntryToken: "N/A",
    questEntryCost: "N/A",
    lessReward: "N/A",
    fees: "N/A",
    startPeriod: null,
    endPeriod: null,
    delayPeriod: null,
    questBalance: "N/A",
    waitingListAddress: [],
    waitingListAddressLength: "N/A",
    participants: [],
    participantsLength: "N/A",
    isInWaitingList: 'false',
    isInParticipantsList: 'false',
    isActive: false,
    actionCall: null,
  };
  const [qData, setQData] = useState<any>({Q});
  const [reload, setReload] = useState(false);

  // let q = props.quest
  // console.log('test context', context);
  useEffect(() => {
    const fetchData = async () => {
      console.log("U.E RUNNING")
      // const unitQuestId = context.params.questId;
      const instance = await IPLDiamond();
      const req = await instance.getQuestData(1);


      // let isUserInWaitingList = req.waitingListAddress.includes('');
      let startPeriod = new Date(
        Number(req.startPeriod) * 1000
      ).toLocaleDateString('fr-EU');
      let endPeriod = new Date(Number(req.endPeriod) * 1000).toLocaleDateString(
        'fr-EU'
      );

      let unitQuest = {
        questName: req.questName,
        questSubtitle: req.questSubtitle || null,
        questDetails: req.questDetails || null,
        questRules: req.questRules || null,
        questId: Number(req.questId),
        questType: req.questType || null,
        author: req.author,
        questEntryToken: req.questEntryToken,
        questEntryCost: Number(req.questEntryCost).toString(),
        lessReward: Number(req.lessReward).toString(),
        fees: Number(req.fees).toString(),
        startPeriod,
        endPeriod,
        delayPeriod: Number(req.delayPeriod),
        questBalance: Number(req.questBalance).toString(),
        waitingListAddress: req.waitingListAddress,
        waitingListAddressLength: (req.waitingListAddress.length).toString(),
        participants: req.participants,
        participantsLength: (req.participants.length).toString(),
        isInWaitingList: 'false',
        isInParticipantsList: 'false',
        isActive: req.isActive,
        actionCall: Number(req.questId),
      };

      setQData(unitQuest);
      // const req2 = await instance.isUserInWaitingList(1, address);
      // console.log("REQ 2", req2)
      return {
        props: { quest: unitQuest },
      };
    };
    const fetchUserStatus = async () => {
      const instance = await IPLDiamond();
      if(address) {
        console.log("ARRIVED HERE", address)
        const req = await instance.isUserInWaitingList(1, address);
        // req.wait()
        const req2 = await instance.isUserInQuest(1, address);
        // req2.wait();
        console.log("Sub Satuts",address, req)
        setUserWaitingListStatus(req);
        setUserParticipantStatus(req2);
      }
    }
    // setLoading(true)
    fetchData().then(async (e) => {
      await fetchUserStatus();
    });
    // setLoading(false)
  }, [address, reload]);

  const handleSubscribe = async () => {
    setLoading(true)
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(address);
    const instance = await IPLDiamond(signer);
    const req = await instance.subscribeToWaitingList(qData.questId);
    await req.wait().then(() => {
      setReload(!reload)
      setLoading(false)
    });
    
  };

  const handleUnsubscribe = async () => {
    setLoading(true)
    const arr = qData.waitingListAddress;
    const idx = arr.indexOf(address);
    console.log('test IDX', idx, arr);
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner(address);
    const instance = await IPLDiamond(signer);
    const req = await instance.unsubscribeFromWaitingList(
      qData.questId,
      address,
      idx
    );
    await req.wait().then(() => {
      setReload(!reload)
      setLoading(false)
    })
  };

  const renderActionCall = () => {
    if (address === undefined) {
      return (
        <Button
          // onClick={() => handleUnsubscribe()}
          size="large"
          shape="rounded"
          fullWidth={true}
          className="mt-6 uppercase xs:mt-8 xs:tracking-widest"
        >
          CONNECT
        </Button>
      );
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
      );
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
      );
    }
  };

  return (
    <>
      <NextSeo
        title="Farms"
        description="Proof Of Less - Web3 Protocol for a more virtuouse lifestyle"
      />
      <QuestDetailsFrame>
        {isLoading && <LoadingScreen/>}
        <div className="mb-5 border-b border-dashed border-gray-400 pb-5 dark:border-gray-500 xs:mb-7 xs:pb-6">
          <h2 className="mb-4 text-center text-3xl text-black dark:text-gray-200">
            Twitter Quest
          </h2>
          <span className="flex justify-center text-gray-400">
            Focus on value, not quantity !{' '}
          </span>
          <span className="mt-4 flex text-gray-700 dark:text-gray-400">
            Details
          </span>
          <span className="mt-2 flex">
            Tweet less than your 6 month weekly average for 4 consecutive week.
            Tweet less than your 6 month weekly average for 4 consecutive week.
            Tweet less than your 6 month weekly average for 4 consecutive week.
            Tweet less than your 6 month weekly average for 4 consecutive week.
            Tweet less than your 6 month weekly average for 4 consecutive week.
            Tweet less than your 6 month weekly average for 4 consecutive week.
          </span>

          <span className="mt-4 flex text-gray-700 dark:text-gray-400">
            Rule
          </span>
          <span className="mt-2 flex">
            Tweet less than your 6 month weekly average for 4 consecutive week.
          </span>

          <span className="mt-4 flex text-gray-700 dark:text-gray-400">
            Prerequist
          </span>
          <span className="mt-2 flex">
            To automatically participate in the next quest, you need to - Supply
            at least the Entry Cost Amount - Subscribe to the quest you want !
          </span>
        </div>
        <div className="mb-5 flex flex-col gap-4 border-b border-dashed border-gray-400 pb-5 dark:border-gray-500 xs:gap-[18px]">
          <TransactionInfo
            label={'Delay'}
            value={`${qData.startPeriod} - ${qData.endPeriod}`}
          />
          <TransactionInfo
            label={'Participants'}
            value={qData.participantsLength}
          />
          <TransactionInfo
            label={'Waiting List'}
            value={qData.waitingListAddressLength}
          />
          <TransactionInfo
            label={'Quest Gain'}
            value={qData.questBalance}
          />
          <TransactionInfo
            label={'Less Reward'}
            value={qData.lessReward}
          />
          <TransactionInfo label={'Protocol Fee'} value={qData.fees} />
          <TransactionInfo
            label={'Entry Cost'}
            value={`${qData.questEntryCost} PUsdc`}
          />
        </div>
        <div className="flex justify-around">
          <div className="flex flex-col gap-2 text-center">
            <span>Subscribed</span>
            <span>{userWaitingListStatus ? '✅' : '❌'}</span>
          </div>
          <div className="flex flex-col gap-2 text-center">
            <span>Participe</span>
            <span>{userParticipantStatus ? '✅' : '❌'}</span>
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
