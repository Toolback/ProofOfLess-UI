import { useState } from 'react';
import type { NextPageWithLayout } from '@/types';
import { motion, AnimatePresence } from 'framer-motion';
import { NextSeo } from 'next-seo';
import DashboardLayout from '@/layouts/_dashboard';
import Button from '@/components/ui/button';
import TransactionInfo from '@/components/ui/transaction-info';
import { ChevronDown } from '@/components/icons/chevron-down';
import Alert from '@/components/ui/alert';
import CurrencySwapIcons from '@/components/ui/currency-swap-icons';
import Input from '@/components/ui/forms/input';

export default function DisplayUserFunds() {
  let [isAvailableExpand, setIsAvailableExpand] = useState(false);
  let [isLockedExpand, setIsLockedExpand] = useState(false);
  let [isEarningExpand, setIsEarningExpand] = useState(false);
  return (
    <>
      <Alert>
        <h4 className="mb-3 text-sm font-medium uppercase tracking-wider text-gray-900 dark:text-white">
          Your Choices, Your Voice
        </h4>
        <p className="m-0 text-sm leading-relaxed tracking-tighter text-gray-600 dark:text-gray-400">
          Manage your assets to shape your donuts, as well as your ideas within
          the protocol! Dispense your Less Tokens earned with merit to gain Rank, buy
          items, or who knows what else? The future can sometimes take shape
          around a DAO vote ...
        </p>
      </Alert>

      <div className="mt-6 rounded-lg bg-white p-4 shadow-card dark:bg-light-dark sm:p-6">
        <div className="rounded-lg border border-solid border-gray-200 bg-body dark:border-gray-700 dark:bg-dark">
          <div
            className="flex h-16 w-full cursor-pointer items-center justify-between p-3"
            onClick={() => setIsAvailableExpand(!isAvailableExpand)}
          >
            <CurrencySwapIcons from="LESS" to="PUSDC" />

            <span className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              Available Funds
              <ChevronDown
                className={`transition-all ltr:ml-1.5 rtl:mr-1.5 ${
                  isAvailableExpand ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </span>
          </div>
          {/* <AnimatePresence initial={false}> */}
          {isAvailableExpand && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="border-t border-dashed border-gray-200 p-4 dark:border-gray-700 sm:p-6">
                <div className="flex flex-col gap-3 xs:gap-[18px]">
                  
                <TransactionInfo label="LESS:" value="0.14689574 LESS" />
                <Input
                  placeholder="Less To Stake"
                  type="number"
                  // inputMode="decimal"
                />
                <Button
                  size="large"
                  shape="rounded"
                  fullWidth={true}
                  color="gray"
                  className="mt-6 uppercase dark:bg-gray-800"
                >
                  Stake
                </Button>


                  <TransactionInfo label="NEXT QUEST COSTS:" value="22.51" />
                  <TransactionInfo label="PUSDC:" value="0.01940272 PUSDC" />
                  <Input
                    placeholder="Less To Stake"
                    type="number"
                    inputMode="decimal"
                  />
                  <Button
                    size="large"
                    shape="rounded"
                    fullWidth={true}
                    color="gray"
                    className="mt-6 uppercase dark:bg-gray-800"
                  >
                    Stake
                  </Button>
                </div>
              </div>
            </motion.div>
          )}
          {/* </AnimatePresence> */}
        </div>

        <div className="rounded-lg border border-solid border-gray-200 bg-body dark:border-gray-700 dark:bg-dark">
          <div
            className="flex h-16 w-full cursor-pointer items-center justify-between p-3"
            onClick={() => setIsLockedExpand(!isLockedExpand)}
          >
            <CurrencySwapIcons from="PUSDC" />

            <span className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              Locked Funds
              <ChevronDown
                className={`transition-all ltr:ml-1.5 rtl:mr-1.5 ${
                  isLockedExpand ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </span>
          </div>
          {/* <AnimatePresence initial={false}> */}
          {isLockedExpand && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="border-t border-dashed border-gray-200 p-4 dark:border-gray-700 sm:p-6">
                <div className="flex flex-col gap-3 xs:gap-[18px]">
                  <TransactionInfo
                    label="YOUR TOTAL LOCKED TOKENS:"
                    value="22.51 PUSDC"
                  />
                  <TransactionInfo
                    label="TWITTER QUEST POOLED PUSDC:"
                    value="22.51"
                  />
                  <TransactionInfo
                    label="STAKED LESS:"
                    value="0.14689574"
                  />
                  {/* <TransactionInfo label="YOUR POOL SHARE:" value="0.06%" /> */}
                </div>
              </div>
            </motion.div>
          )}
          {/* </AnimatePresence> */}
        </div>

        <div className="rounded-lg border border-solid border-gray-200 bg-body dark:border-gray-700 dark:bg-dark">
          <div
            className="flex h-16 w-full cursor-pointer items-center justify-between p-3"
            onClick={() => setIsEarningExpand(!isEarningExpand)}
          >
            <CurrencySwapIcons from="LESS" to="PUSDC" />

            <span className="flex items-center text-sm text-gray-500 dark:text-gray-300">
              Earnings
              <ChevronDown
                className={`transition-all ltr:ml-1.5 rtl:mr-1.5 ${
                  isEarningExpand ? 'rotate-180' : 'rotate-0'
                }`}
              />
            </span>
          </div>
          {/* <AnimatePresence initial={false}> */}
          {isEarningExpand && (
            <motion.div
              key="content"
              initial="collapsed"
              animate="open"
              exit="collapsed"
              variants={{
                open: { opacity: 1, height: 'auto' },
                collapsed: { opacity: 0, height: 0 },
              }}
              transition={{ duration: 0.4, ease: 'easeInOut' }}
            >
              <div className="border-t border-dashed border-gray-200 p-4 dark:border-gray-700 sm:p-6">
                <div className="flex flex-col gap-3 xs:gap-[18px]">
                  <TransactionInfo
                    label="YOUR TOTAL TOKEN DEPOSITED:"
                    value="22.51 PUSDC"
                  />
                  <TransactionInfo label="PUSDC GAIN:" value="58.01940272" />
                  <TransactionInfo label="LESS GAIN:" value="10" />
                </div>
              </div>
            </motion.div>
          )}
          {/* </AnimatePresence> */}
        </div>
      </div>
    </>
  );
}
