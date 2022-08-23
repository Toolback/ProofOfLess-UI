import Image from '@/components/ui/image';
import { LongArrowRight } from '@/components/icons/long-arrow-right';
import { LongArrowUp } from '@/components/icons/long-arrow-up';
import { VerifiedIcon } from '@/components/icons/verified-icon';
import { GasIcon } from '@/components/icons/gas-icon';
import { QuestionIcon } from '@/components/icons/question-icon';
import { StaticImageData } from 'next/image';
import Button from '../ui/button';

type CardProps = {
  questName: string;
  startPeriod: string;
  endPeriod: string;
  joinedAt: string;
  questEntryCost: string;
  questTotalBalance: number;
  transactionFromAvatar: StaticImageData | string;
};

export default function QuestHandleCard({ item }: { item: CardProps }) {
  const {
    questName,
    startPeriod,
    endPeriod,
    joinedAt,
    questEntryCost,
    questTotalBalance,
    transactionFromAvatar,
  } = item ?? {};
  const bgColor = '#D2D786'
  return (
    <div className="rounded-lg bg-white p-4 text-sm shadow-card dark:bg-light-dark sm:p-5 md:p-6">
      <div className="flex items-center justify-between border-b border-dashed border-gray-200 pb-3.5 dark:border-gray-700 sm:pb-5">
          <div className="truncate -tracking-wider text-gray-900 ltr:ml-2 rtl:mr-2 dark:text-white">
            {questName}Twitter Quest
          </div>
        <div className="truncate text-xs -tracking-wide text-gray-600 ltr:pl-2 rtl:pr-2 dark:text-gray-400 xs:text-sm ">
          {startPeriod}10/08/20222 - {endPeriod}10/09/2022
        </div>
      </div>
      <div className="grid grid-cols-9 gap-x-3 pt-4 md:gap-x-5 md:pt-6">
        <div className="col-span-4 flex flex-col gap-2.5 sm:flex-row sm:gap-x-4 md:flex-col 2xl:flex-row">
          <div className="flex items-center lg:w-1/2">
            <div
              className="relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full md:h-9 md:w-9 xl:h-10 xl:w-10"
              style={{ backgroundColor: bgColor }}
            >
                <Image
                  src={transactionFromAvatar}
                  alt="/"
                  width={40}
                  height={40}
                  className="rounded-full"
                />              
                {/* <div className="absolute top-0 ltr:-right-1.5 rtl:-left-1.5">
                <VerifiedIcon className="h-4 w-4" />
              </div> */}
            </div>
            <div className="flex flex-col truncate ltr:ml-2.5 rtl:mr-2.5 xl:ltr:ml-4 xl:rtl:mr-4">
              <strong className="mb-0.5 font-medium -tracking-wider text-gray-900 dark:text-white">
              Joined
              </strong>
              <span className="text-xs text-gray-400">{joinedAt}10/08/2022</span>
            </div>
          </div>
          <div className="flex items-center lg:w-1/2">
            <div className="h-8 w-8 shrink-0  md:h-9 md:w-9 xl:h-10 xl:w-10">

                {/* <QuestionIcon className="h-5 w-5 lg:h-6 lg:w-6" /> */}
            </div>
            <div className="flex flex-col truncate ltr:ml-2.5 rtl:mr-2.5 xl:ltr:ml-4 xl:rtl:mr-4">
              <span className="mb-0.5 text-xs text-gray-400">Entry Cost</span>
              <strong className="truncate font-medium -tracking-wider text-gray-900 dark:text-white">
                {questEntryCost}10 PUsdc
              </strong>
            </div>
          </div>
        </div>
        <div className="col-span-1 flex items-center text-gray-600 dark:text-gray-400 ltr:sm:pl-3 rtl:sm:pr-3 ltr:md:pl-0 rtl:md:pr-0 ltr:lg:pl-3 rtl:lg:pr-3">
          <LongArrowRight className="h-5 w-5 rtl:rotate-180 md:h-6 md:w-6 lg:h-5 lg:w-5 xl:h-7 xl:w-7" />
        </div>
        <div className="col-span-4  flex flex-col gap-2.5 sm:flex-row sm:gap-x-4 md:flex-col 2xl:flex-row">
          <div className="flex items-center lg:w-1/2">

            <div className="flex flex-col truncate ltr:ml-2.5 rtl:mr-2.5 xl:ltr:ml-4 xl:rtl:mr-4">
              <span className="mb-0.5 text-xs text-gray-400">
                Total Pool
              </span>
              <strong className="font-medium -tracking-wider text-gray-900 dark:text-white">
                {questTotalBalance}1580 PUsdc
              </strong>
            </div>
          </div>
          <div className="flex items-center lg:w-1/2">
          <Button
            size="small"
            shape="rounded"
            fullWidth={true}
            className="uppercase"
          >
            Manage
          </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
