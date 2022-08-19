import type { GetStaticProps, InferGetStaticPropsType } from 'next';
import { NextSeo } from 'next-seo';
import type { NextPageWithLayout } from '@/types';
import HomeLayout from '@/layouts/_home';
import Image from '@/components/ui/image';

// import CoinSlider from '@/components/ui/coin-card';
// import OverviewChart from '@/components/ui/chats/overview-chart';
// import LiquidityChart from '@/components/ui/chats/liquidity-chart';
// import VolumeChart from '@/components/ui/chats/volume-chart';
// import TopPools from '@/components/ui/top-pools';
// import TransactionTable from '@/components/transaction/transaction-table';
// import TopCurrencyTable from '@/components/top-currency/currency-table';
// import { coinSlideData } from '@/data/static/coin-slide-data';
// import Avatar from '@/components/ui/avatar';
// import TopupButton from '@/components/ui/topup-button';
//images
import HeroHand from '@/assets/images/FootLeef.png';

export const getStaticProps: GetStaticProps = async () => {
  return {
    props: {},
  };
};

const HomePage: NextPageWithLayout<
  InferGetStaticPropsType<typeof getStaticProps>
> = () => {
  return (
    <>
      <NextSeo
        title="Proof Of Less"
        description="Proof Of Less - Web3 community for a more virtuouse lifestyle"
      />
      {/* <div className="flex flex-wrap">
        <h1>Proof Of Less</h1>
        <button>Go to App</button>
      </div> */}
      <section className="min-h-full bg-white dark:bg-gray-900">
        <div className="mx-auto grid max-w-screen-xl px-4 py-8 lg:grid-cols-12 lg:gap-8 lg:py-16 xl:gap-0">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="mb-4 max-w-2xl text-4xl font-extrabold leading-none tracking-tight dark:text-white md:text-5xl xl:text-6xl">
              Proof Of Less
            </h1>
            <p className="mb-6 max-w-2xl font-light text-gray-500 dark:text-gray-400 md:text-lg lg:mb-8 lg:text-xl">
              Less is more. Earn rewards for doing less : TWEET
            </p>
            <a
              href="/app/dashboard"
              className="bg-primary-700 hover:bg-primary-800 focus:ring-primary-300 dark:focus:ring-primary-900 mr-3 inline-flex items-center justify-center rounded-lg px-5 py-3 text-center text-base font-medium text-black dark:text-white focus:ring-4"
            >
              Go to App
              <svg
                className="ml-2 -mr-1 h-5 w-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </a>
            <a
              href="#"
              className="inline-flex items-center justify-center rounded-lg border border-gray-300 px-5 py-3 text-center text-base font-medium text-gray-900 hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:border-gray-700 dark:text-white dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Go to Docs
            </a>
          </div>
          <div className="hidden lg:col-span-5 lg:mt-0 lg:flex">
            {/* <img src={HeroHand} alt="mockup"/> */}
            <Image src={HeroHand} alt="#" width="" height="" className="" />
          </div>
        </div>
      </section>

      {/* FIRST MOCKUP TRYYYY */}
      <div className="mt-20 flex h-full flex-col items-center justify-center gap-20 ">
        {/* <div className="max-w-7xl divide-y divide-gray-200 overflow-hidden rounded-lg bg-gray-200 shadow sm:grid sm:grid-cols-2 sm:gap-px sm:divide-y-0">
          <div className="group relative rounded-tl-lg rounded-tr-lg bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:rounded-tr-none">
            <div>
              <span className="inline-flex rounded-lg bg-teal-50 p-3 text-teal-700 ring-4 ring-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href="#" className="focus:outline-none">

                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Request time off
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>

          <div className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:rounded-tr-lg">
            <div>
              <span className="inline-flex rounded-lg bg-purple-50 p-3 text-purple-700 ring-4 ring-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                  />
                </svg>
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Benefits
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>

          <div className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
            <div>
              <span className="inline-flex rounded-lg bg-sky-50 p-3 text-sky-700 ring-4 ring-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"
                  />
                </svg>
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Schedule a one-on-one
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>

          <div className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500">
            <div>
              <span className="inline-flex rounded-lg bg-yellow-50 p-3 text-yellow-700 ring-4 ring-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z"
                  />
                </svg>
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Payroll
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>

          <div className="group relative bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:rounded-bl-lg">
            <div>
              <span className="inline-flex rounded-lg bg-rose-50 p-3 text-rose-700 ring-4 ring-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M16 15v-1a4 4 0 00-4-4H8m0 0l3 3m-3-3l3-3m9 14V5a2 2 0 00-2-2H6a2 2 0 00-2 2v16l4-2 4 2 4-2 4 2z"
                  />
                </svg>
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Submit an expense
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>

          <div className="group relative rounded-bl-lg rounded-br-lg bg-white p-6 focus-within:ring-2 focus-within:ring-inset focus-within:ring-indigo-500 sm:rounded-bl-none">
            <div>
              <span className="inline-flex rounded-lg bg-indigo-50 p-3 text-indigo-700 ring-4 ring-white">
                <svg
                  className="h-6 w-6"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  strokeWidth="2"
                  stroke="currentColor"
                  aria-hidden="true"
                >
                  <path d="M12 14l9-5-9-5-9 5 9 5z" />
                  <path d="M12 14l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14z" />
                  <path
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    d="M12 14l9-5-9-5-9 5 9 5zm0 0l6.16-3.422a12.083 12.083 0 01.665 6.479A11.952 11.952 0 0012 20.055a11.952 11.952 0 00-6.824-2.998 12.078 12.078 0 01.665-6.479L12 14zm-4 6v-7.5l4-2.222"
                  />
                </svg>
              </span>
            </div>
            <div className="mt-8">
              <h3 className="text-lg font-medium">
                <a href="#" className="focus:outline-none">
                  <span className="absolute inset-0" aria-hidden="true"></span>
                  Training
                </a>
              </h3>
              <p className="mt-2 text-sm text-gray-500">
                Doloribus dolores nostrum quia qui natus officia quod et
                dolorem. Sit repellendus qui ut at blanditiis et quo et
                molestiae.
              </p>
            </div>
            <span
              className="pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400"
              aria-hidden="true"
            >
              <svg
                className="h-6 w-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z" />
              </svg>
            </span>
          </div>
        </div> */}

        {/* NEXT TRY MOCKUP*/}

        {/* <div className="flow-root max-w-md	">
          <ul role="list" className="-mb-8">
            <li>
              <div className="relative pb-8">
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <img
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                      src="https://images.unsplash.com/photo-1520785643438-5bf77931f493?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                      alt=""
                    />

                    <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-gray-900">
                          Eduardo Benz
                        </a>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Commented 6d ago
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Tincidunt nunc ipsum tempor purus vitae id. Morbi in
                        vestibulum nec varius. Et diam cursus quis sed purus
                        nam.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="relative pb-8">
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
                <div className="relative flex items-start space-x-3">
                  <div>
                    <div className="relative px-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-6-3a2 2 0 11-4 0 2 2 0 014 0zm-2 4a5 5 0 00-4.546 2.916A5.986 5.986 0 0010 16a5.986 5.986 0 004.546-2.084A5 5 0 0010 11z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 py-1.5">
                    <div className="text-sm text-gray-500">
                      <a href="#" className="font-medium text-gray-900">
                        Hilary Mahy
                      </a>
                      assigned
                      <a href="#" className="font-medium text-gray-900">
                        Kristin Watson
                      </a>
                      <span className="whitespace-nowrap">2d ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="relative pb-8">
                <span
                  className="absolute top-5 left-5 -ml-px h-full w-0.5 bg-gray-200"
                  aria-hidden="true"
                ></span>
                <div className="relative flex items-start space-x-3">
                  <div>
                    <div className="relative px-1">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100 ring-8 ring-white">
                        <svg
                          className="h-5 w-5 text-gray-500"
                          xmlns="http://www.w3.org/2000/svg"
                          viewBox="0 0 20 20"
                          fill="currentColor"
                          aria-hidden="true"
                        >
                          <path
                            fill-rule="evenodd"
                            d="M17.707 9.293a1 1 0 010 1.414l-7 7a1 1 0 01-1.414 0l-7-7A.997.997 0 012 10V5a3 3 0 013-3h5c.256 0 .512.098.707.293l7 7zM5 6a1 1 0 100-2 1 1 0 000 2z"
                            clip-rule="evenodd"
                          />
                        </svg>
                      </div>
                    </div>
                  </div>
                  <div className="min-w-0 flex-1 py-0">
                    <div className="text-sm leading-8 text-gray-500">
                      <span className="mr-0.5">
                        <a href="#" className="font-medium text-gray-900">
                          Hilary Mahy
                        </a>
                        added tags
                      </span>
                      <span className="mr-0.5">
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                        >
                          <span className="absolute flex flex-shrink-0 items-center justify-center">
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-rose-500"
                              aria-hidden="true"
                            ></span>
                          </span>
                          <span className="ml-3.5 font-medium text-gray-900">
                            Bug
                          </span>
                        </a>
                        <a
                          href="#"
                          className="relative inline-flex items-center rounded-full border border-gray-300 px-3 py-0.5 text-sm"
                        >
                          <span className="absolute flex flex-shrink-0 items-center justify-center">
                            <span
                              className="h-1.5 w-1.5 rounded-full bg-indigo-500"
                              aria-hidden="true"
                            ></span>
                          </span>
                          <span className="ml-3.5 font-medium text-gray-900">
                            Accessibility
                          </span>
                        </a>
                      </span>
                      <span className="whitespace-nowrap">6h ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </li>

            <li>
              <div className="relative pb-8">
                <div className="relative flex items-start space-x-3">
                  <div className="relative">
                    <img
                      className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-400 ring-8 ring-white"
                      src="https://images.unsplash.com/photo-1531427186611-ecfd6d936c79?ixlib=rb-=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=8&w=256&h=256&q=80"
                      alt=""
                    />

                    <span className="absolute -bottom-0.5 -right-1 rounded-tl bg-white px-0.5 py-px">
                      <svg
                        className="h-5 w-5 text-gray-400"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fill-rule="evenodd"
                          d="M18 5v8a2 2 0 01-2 2h-5l-5 4v-4H4a2 2 0 01-2-2V5a2 2 0 012-2h12a2 2 0 012 2zM7 8H5v2h2V8zm2 0h2v2H9V8zm6 0h-2v2h2V8z"
                          clip-rule="evenodd"
                        />
                      </svg>
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <div>
                      <div className="text-sm">
                        <a href="#" className="font-medium text-gray-900">
                          Jason Meyers
                        </a>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Commented 2h ago
                      </p>
                    </div>
                    <div className="mt-2 text-sm text-gray-700">
                      <p>
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                        Tincidunt nunc ipsum tempor purus vitae id. Morbi in
                        vestibulum nec varius. Et diam cursus quis sed purus
                        nam. Scelerisque amet elit non sit ut tincidunt
                        condimentum. Nisl ultrices eu venenatis diam.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div> */}
      </div> 
    </>
  );
};

HomePage.getLayout = function getLayout(page) {
  return <HomeLayout>{page}</HomeLayout>;
};

export default HomePage;
