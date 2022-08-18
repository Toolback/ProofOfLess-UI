import cn from 'classnames';
import { ChevronForward } from '@/components/icons/chevron-forward';
import Link from 'next/link';

export default function QuestDetailsButton({
  className,
  questId
}: React.PropsWithChildren<{ className?: string, questId: number}>) {


  return (
    <Link href={`/app/quests/${questId}`} key={'actionCall'}>

      <button
        className={cn(
          'flex h-10 w-full items-center whitespace-nowrap rounded-lg border-2 border-dashed border-gray-500 bg-gray-100 px-6 text-sm uppercase tracking-wider text-gray-900 dark:border-gray-600 dark:bg-gray-800 dark:text-white lg:h-12 3xl:h-13',
          className
        )}
      >
        <span className="flex-grow text-center text-xs lg:text-sm">
          See more
        </span>
        {/* <ChevronForward className="rtl:rotate-180" /> */}
      </button>
    </Link>


  );
}
