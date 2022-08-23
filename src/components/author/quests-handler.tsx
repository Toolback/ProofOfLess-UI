import { transactionHistory } from '@/data/static/author-profile';
import QuestHandleCard from '@/components/author/transaction-history-card';

export default function QuestsHandler() {
  return (
    <div className="block">
      <div className="mb-4 flex md:mb-5 md:justify-end xl:mb-6">

      </div>
      <div className="space-y-4 md:space-y-5 xl:space-y-6">
        {transactionHistory?.map((item) => (
          <QuestHandleCard item={item} key={item?.id} />
        ))}
      </div>
    </div>
  );
}
