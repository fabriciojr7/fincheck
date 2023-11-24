import { CrossCircledIcon } from '@radix-ui/react-icons'
import {NumericFormat} from 'react-number-format'
import { cn } from '../../app/utils/cn'

interface InputCurrency{
  error?: string
  value?: string | number
  onChange?(value: string): void
}

export function InputCurrency({error, onChange, value}: InputCurrency){

  return (
    <div>
      <NumericFormat
        thousandSeparator="."
        decimalSeparator=','
        decimalScale={2}
        fixedDecimalScale
        value={value}
        onChange={event => onChange?.(event.target.value)}
        className={cn(
          'w-full text-gray-800 text-[32px] font-bold tracking-[-1px] outline-none',
          error && 'text-red-900'
        )}
      />

      { error && (
        <div className="flex items-center gap-2 mt-2 text-red-900">
          <CrossCircledIcon/>
          <span className="text-xs">{error}</span>
        </div>
      )}
    </div>
  )
}
