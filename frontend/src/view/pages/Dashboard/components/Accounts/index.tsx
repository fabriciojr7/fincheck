import {Swiper, SwiperSlide} from 'swiper/react'
import 'swiper/css'

import { EyeIcon } from "../../../../components/icons/EyeIcon";
import { AccountCard } from "./AccountCard";
import { SliderNavigation } from "./SliderNavigation";
import { useAccountsControler } from './useAccountsControler';
import { formatCurrency } from '../../../../../app/utils/formatCurrency';
import { cn } from '../../../../../app/utils/cn';
import { Spinner } from '../../../../components/Spinner';
import { PlusIcon } from '@radix-ui/react-icons';

export function Accounts(){
  const {
    sliderState,
    setSliderState,
    windowWidth,
    areValuesVisible,
    toggleValuesVisiblity,
    isLoading,
    accounts,
    openNewAccountModal,
    currentBalance
  } = useAccountsControler()

  return (
    <div className="bg-teal-900 rounded-2xl w-full h-full px-4 py-8 md:p-10 flex flex-col">
      {isLoading && (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner className='w-10 h-10 text-teal-950/50 fill-white'/>
        </div>
      )}

      {!isLoading && (
        <>
          <div>
            <span className="tracking-[-0.5px] text-white block">Saldo total</span>

            <div className="flex items-center gap-2">
              <strong
                className={cn(
                  'text-2xl tracking-[-1px] text-white',
                  !areValuesVisible && 'blur-md'
                )}

              >
                {formatCurrency(currentBalance)}
              </strong>

              <button
                className="w-8 h-8 flex items-center justify-center"
                onClick={toggleValuesVisiblity}
              >
                <EyeIcon open={!areValuesVisible}/>
              </button>
            </div>
          </div>

          <div className="flex-1 flex flex-col justify-end mt-10 md:mt-0">
            {accounts.length === 0 && (
              <>
                <div className="mb-4">
                  <strong className="text-white tracking-[-1px] text-lg font-bold">Minhas contas</strong>
                </div>

                <button
                  className='h-52 border-2 border-dashed border-teal-600 rounded-2xl mt-4
                  flex flex-col items-center justify-center gap-4 text-white'
                  onClick={openNewAccountModal}
                >
                  <div className='w-11 h-11 rounded-full border-2 border-dashed border-white flex items-center justify-center'>
                    <PlusIcon className='w-6 h-6'/>
                  </div>
                  <span className='w-32 text-center tracking-[-0.5px] font-medium block'>Cadastre uma nova conta</span>
                </button>
              </>
            )}

            {accounts.length > 0 && (
              <div>
                <Swiper
                  spaceBetween={16}
                  slidesPerView={windowWidth <= 500 ? 1.2 : 2.1}
                  onSlideChange={swiper => {
                    setSliderState({
                      isBeginning: swiper.isBeginning,
                      isEnd: swiper.isEnd
                    })
                  }}
                >
                  <div className="flex items-center justify-between mb-4" slot='container-start'>
                    <strong className="text-white tracking-[-1px] text-lg font-bold">Minhas contas</strong>

                    <SliderNavigation
                      isBeginning={sliderState.isBeginning}
                      isEnd={sliderState.isEnd}
                    />
                  </div>

                  {accounts.map(account => (
                    <SwiperSlide key={account.id}>
                      <AccountCard
                        data={account}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  )
}
