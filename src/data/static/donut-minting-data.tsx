import DonutNftimg from '@/assets/images/donutwhite2.png';

// import Bitcoin from '@/assets/images/currency/bitcoin.svg';
import Polygon from '@/assets/images/polygon.png';
import Avatar1 from '@/assets/images/avatar/1.png';
import Avatar2 from '@/assets/images/avatar/2.png';
import donutWhite from '@/assets/images/donutwhite2.png';
import Avatar4 from '@/assets/images/avatar/4.png';





export const donutMintingData = {
  donutTitle: 'Donut',
  donutImage: DonutNftimg,
  donutSubTitle: 'Proof Of Less Membership',
  minted_slug: '',
  price: 10,
  description:
    `Not by its color, nor its shape (or at least not yet). But in what it represents; this donut is simply unique. Its owner, as well as the other 158 owners of their ID (Identity Donut) represent the will and the voice of Proof of Less.`,
  creator: { id: 1, logo: Avatar1, name: '@ProofOfLess', slug: '#' },
  collection: { id: 1, logo: donutWhite, name: 'Donut Membership', slug: '#' },
  owner: { id: 1, logo: Avatar4, name: '@MaybYou?', slug: '#' },
  block_chains: [
    { id: 1, logo: Polygon, name: 'Polygon', slug: '#' },
    // { id: 2, logo: Bitcoin, name: 'Bitcoin', slug: '#' },
  ],
  history: [
    {
      id: 1,
      label: 'Donut Minted',
      name: 'Williamson',
      authorSlug: '#',
      created_at: '2022-03-22T17:26:22.000000Z',
      avatar: donutWhite,
      amount: 10,
      transactionUrl: '#',
    },
    {
      id: 2,
      label: 'Donut Minted',
      name: 'Cameron',
      authorSlug: '#',
      created_at: '2022-02-22T17:26:22.000000Z',
      avatar: Avatar2,
      amount: 10,
      transactionUrl: '#',
    },
    {
      id: 3,
      label: 'Donut Minted',
      name: 'ronson',
      authorSlug: '#',
      created_at: '2022-01-22T17:26:22.000000Z',
      avatar: Avatar1,
      amount: 10,
      transactionUrl: '#',
    },
  ],
};
