import Image from '@/components/ui/image';
import { ArrowUp } from '@/components/icons/arrow-up';
import { Scrollbar, A11y } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import { StaticImageData } from 'next/image';

type QuestNewsProps = {
  id: string;
  title: string;
  subTitle: string;
  logo: StaticImageData;
  description: string;
  subDescription: string;
  action: string;
  isActionCall: boolean;
  color?: string;
};

export function QuestNewCard({
  title,
  subTitle,
  logo,
  description,
  subDescription,
  action,
  isActionCall,
  color = '#FDEDD4',
}: QuestNewsProps) {
  return (
    <div
      className="relative rounded-lg p-6 xl:p-8"
      style={{ backgroundColor: color }}
    >
      <h4 className="mb-2 text-sm font-medium uppercase tracking-wider text-gray-900">
        {title}
      </h4>
      <span className="mb-8 tracking-wider text-gray-600"> {subTitle}</span>
      <div className="relative h-20 lg:h-24 xl:h-28 3xl:h-36">
        <Image
          src={logo}
          alt={title}
          layout="fill"
          objectFit="contain"
          objectPosition="center"
        />
      </div>
      <div className="mt-8 mb-2 text-sm font-medium tracking-wider text-gray-900 lg:text-lg 2xl:text-xl 3xl:text-2xl">
        {description}
      </div>
        <span className="tracking-wider text-gray-600">{subDescription}</span>
      <div className="flex items-center justify-center mt-3 text-xs font-medium 2xl:text-sm">
        <span
          className={`flex items-center  ${
            isActionCall ? 'text-black' : ''
          }`}
        >
          <button
            className={`ltr:mr-2 rtl:ml-2 ${
              !isActionCall ? 'hidden' : ''
            }`}
          >
          {action}
          </button>
        </span>
      </div>
    </div>
  );
}

interface QuestNewsSliderProps {
  questCards: QuestNewsProps[];
}

export default function QuestNewsSlider({ questCards }: QuestNewsSliderProps) {
  const sliderBreakPoints = {
    768: {
      slidesPerView: 3,
      spaceBetween: 20,
    },
    1080: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1280: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    1700: {
      slidesPerView: 3,
      spaceBetween: 24,
    },
    2200: {
      slidesPerView: 4,
      spaceBetween: 24,
    },
  };

  return (
    <div>
      <Swiper
        modules={[Scrollbar, A11y]}
        spaceBetween={24}
        slidesPerView={1}
        scrollbar={{ draggable: true }}
        breakpoints={sliderBreakPoints}
        observer={true}
        dir="ltr"
      >
        {questCards.map((card) => (
          <SwiperSlide key={card.id}>
            <QuestNewCard
              id={card.id}
              title={card.title}
              subTitle={card.subTitle}
              logo={card.logo}
              description={card.description}
              subDescription={card.subDescription}
              action={card.action}
              isActionCall={card.isActionCall}
              color={card.color}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
