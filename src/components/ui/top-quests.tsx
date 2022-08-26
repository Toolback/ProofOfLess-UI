import { TopPoolsData } from '@/data/static/token-data';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import { CoinList } from '@/components/ui/currency-swap-icons';

interface TopPoolsProps {
  twitterQuestUsers: number | string;
}

export default function TopQuests({ twitterQuestUsers }: TopPoolsProps) {
  return (
    <div className="rounded-lg bg-white p-6 shadow-card dark:bg-light-dark sm:p-8">
      <h3 className="mb-6 text-base font-medium uppercase">Top Quests</h3>
      <div className="mb-5 flex items-center justify-between text-sm text-gray-500 dark:text-gray-400">
        <span className="col-span-2">Quest</span>
        <span>Users</span>
      </div>

          <div
            className="mb-5 flex items-center gap-10 justify-between text-sm text-gray-900 last:mb-0 dark:text-white"
          >
            <div className="col-span-2 flex items-center gap-2">
              {/* <CurrencySwapIcons from={from} to={to} /> */}
              <span>TWITTER QUEST</span>
            </div>
              <span>{twitterQuestUsers} / *</span>
          </div>

      {/* {TopPoolsData.slice(0, limit ?? -1).map((pool, index) => {
        let from = pool.from as CoinList;
        let to = pool.to as CoinList;
        return (
          <div
            className="mb-5 flex items-center justify-between text-sm text-gray-900 last:mb-0 dark:text-white"
            key={index}
          >
            <div className="col-span-2 flex items-center gap-2">
              <CurrencySwapIcons from={from} to={to} />
            </div>
            <span>{pool.volume}</span>
          </div>
        );
      })} */}
    </div>
  );
}
