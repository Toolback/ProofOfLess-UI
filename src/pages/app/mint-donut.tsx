import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import DashboardLayout from '@/layouts/_dashboard';
// import NftDetails from '@/components/nft/nft-details';
import DonutDetails from '@/components/nft/donut-details';
import IPLDiamond from '@/lib/PLDiamond';

import polygonLogo from '@/assets/images/polygon.png';
import donutImg from '@/assets/images/donutwhite2.png';
// import DonutMintImg from '@/assets/images/donutwhite.png';



export const getStaticProps: GetStaticProps = async () => {
  let instance = await IPLDiamond();
  let req = await instance.getDonutCycle(1);
  return {
    props: {
      donutImage: donutImg,
      donutPrice: Number(req.cycle_.donutPrice),
      description: `Not by its color, nor its shape (or at least not yet). But in what it represents; this donut is simply unique. Its owner, as well as the other 158 owners of their ID (Identity Donut) represent the will and the voice of Proof of Less.`,
      descriptionConnected: 'You already have your own, little gourmet!',
      cycleMaxSupply: Number(req.cycle_.cycleMaxSupply),
      totalCount: Number(req.cycle_.totalCount),
      startedAt: Number(req.cycle_.startedAt),
      blockchainData: { id: 1, logo: polygonLogo, name: 'Polygon - Mumbai', slug: '#' },

      creatorData: { id: 1, logo: donutImg, name: 'ProofOfLess', slug: '#' },
      collectionData: {
        id: 1,
        logo: donutImg,
        name: 'Donut Membership',
        slug: '#',
      },
      owner: { id: 1, logo: donutImg, name: '@YNotYou?', slug: '#' },
      ownerConnected: {
        id: 1,
        logo: donutImg,
        name: '@YouTheChosenOne',
        slug: '#',
      },
      history: [
        {
          id: 1,
          label: '[WIP] Donut Minted',
          name: 'Williamson',
          authorSlug: '#',
          created_at: '2022-03-22T17:26:22.000000Z',
          avatar: donutImg,
          amount: 10,
          transactionUrl: '#',
        },
        {
          id: 2,
          label: '[WIP] Donut Minted',
          name: 'Cameron',
          authorSlug: '#',
          created_at: '2022-02-22T17:26:22.000000Z',
          avatar: donutImg,
          amount: 10,
          transactionUrl: '#',
        },
      ],
    },
  };
};

const DonutMintingPage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = (props) => {
  // const { data, status } = useQuery(['donutCycle'], () => fectchCycleData());
  // const actualCycleData = data || undefined;


    // console.log('Donut Data fetched :', props);

  return (
    <>
      <NextSeo
        title="Donut Minting Page"
        description="Proof Of Less - Mint Donut Membership"
      />
      <DonutDetails donutData={props} />
    </>
  );
};

DonutMintingPage.getLayout = function getLayout(page) {
  return <DashboardLayout contentClassName="!pb-0">{page}</DashboardLayout>;
};

export default DonutMintingPage;
