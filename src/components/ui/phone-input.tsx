'use client';

import { CheckIcon, ChevronsUpDown } from 'lucide-react';
import * as React from 'react';
import * as RPNInput from 'react-phone-number-input';
import { getCountryCallingCode, parsePhoneNumber } from 'react-phone-number-input';
import flags from 'react-phone-number-input/flags';

import { Button } from '@/components/ui/button';
import { Command, CommandGroup, CommandInput, CommandList } from '@/components/ui/command';
import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils/utils';

type PhoneInputProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void;
    onCountryChange?: (country: RPNInput.Country) => void;
    onNationalNumberChange?: (nationalNumber: string) => void;
  };

const PhoneInput: React.ForwardRefExoticComponent<PhoneInputProps> = React.forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  PhoneInputProps
>(({ className, onChange, onCountryChange, onNationalNumberChange, value, ...props }, ref) => {
  const [currentCountry, setCurrentCountry] = React.useState<RPNInput.Country | undefined>(
    props.defaultCountry,
  );

  // Function to clean phone number but preserve all zeros
  const cleanPhoneNumber = (
    phoneNumber: RPNInput.Value,
    country: RPNInput.Country | undefined,
  ): RPNInput.Value => {
    if (!phoneNumber || !country) return phoneNumber;

    try {
      const parsed = parsePhoneNumber(phoneNumber, country);
      if (parsed && parsed.isValid()) {
        // Get the national number (without country code)
        const nationalNumber = parsed.nationalNumber;
        console.log('nationalNumber', nationalNumber);
        console.log('phoneNumber', phoneNumber);

        // Keep all zeros in national number - don't remove any
        const cleanedNationalNumber = nationalNumber;
        console.log('cleanedNationalNumber', cleanedNationalNumber);
        // Reconstruct the phone number with country code
        const countryCode = parsed.countryCallingCode;
        return `+${countryCode}${cleanedNationalNumber}` as RPNInput.Value;
      }
    } catch (error) {
      // If parsing fails, return original value
      console.warn('Phone number parsing failed:', error);
    }

    return phoneNumber;
  };

  const handleValueChange = (newValue: RPNInput.Value) => {
    if (newValue && currentCountry) {
      const cleanedValue = cleanPhoneNumber(newValue, currentCountry);
      onChange?.(cleanedValue);

      // Extract and send only the national number (without country code)
      try {
        const parsed = parsePhoneNumber(cleanedValue, currentCountry);
        if (parsed && parsed.isValid()) {
          const nationalNumber = parsed.nationalNumber;
          // Keep all zeros in national number - don't remove any
          const cleanedNationalNumber = nationalNumber;
          onNationalNumberChange?.(cleanedNationalNumber);
          console.log('cleanedNationalNumber', cleanedNationalNumber);
          console.log('cleanedValue', cleanedValue);
        }
      } catch (error) {
        console.warn('Failed to extract national number:', error);
      }
    } else {
      onChange?.(newValue || ('' as RPNInput.Value));
      onNationalNumberChange?.('');
      console.log('cleanedNationalNumber', '');
    }
  };

  const handleCountryChange = (country: RPNInput.Country) => {
    setCurrentCountry(country);
    onCountryChange?.(country);
  };

  return (
    <RPNInput.default
      ref={ref}
      className={cn('flex', className)}
      flagComponent={FlagComponent}
      countrySelectComponent={props => (
        <CountrySelect {...props} onCountryChange={handleCountryChange} />
      )}
      inputComponent={InputComponent}
      smartCaret={false}
      value={value || undefined}
      /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={handleValueChange}
      {...props}
    />
  );
});
PhoneInput.displayName = 'PhoneInput';

const InputComponent = React.forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(
  ({ className, ...props }, ref) => (
    <Input className={cn('rounded-e-md border-gray-300 h-12 rounded-s-none w-full', className)} {...props} ref={ref} />
  ),
);
InputComponent.displayName = 'InputComponent';

type CountryEntry = { label: string; value: RPNInput.Country | undefined };

type CountrySelectProps = {
  disabled?: boolean;
  value: RPNInput.Country;
  options: CountryEntry[];
  onChange: (country: RPNInput.Country) => void;
  onCountryChange?: (country: RPNInput.Country) => void;
};

const CountrySelect = ({
  disabled,
  value: selectedCountry,
  options: countryList,
  onChange,
  onCountryChange,
}: CountrySelectProps) => {
  const scrollAreaRef = React.useRef<HTMLDivElement>(null);
  const [searchValue, setSearchValue] = React.useState('');
  const [isOpen, setIsOpen] = React.useState(false);

  return (
    <Popover
      open={isOpen}
      modal
      onOpenChange={open => {
        setIsOpen(open);
        if (open) {
          setSearchValue('');
        }
      }}
    >
      <PopoverTrigger asChild>
        <Button
          type='button'
          variant='outline'
          className='flex gap-1 rounded-e-none rounded-s-md border-r-0 h-12 px-3 focus:z-10 hover:bg-accent w-f'
          disabled={disabled}
          onClick={() => {
            console.log('Country button clicked');
            setIsOpen(!isOpen);
          }}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <ChevronsUpDown
            className={cn('-mr-2 size-4 opacity-50', disabled ? 'hidden' : 'opacity-100')}
          />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[300px] p-0' align='start' side='bottom'>
        <Command shouldFilter={false}>
          <CommandInput
            value={searchValue}
            onValueChange={value => {
              setSearchValue(value);
              setTimeout(() => {
                if (scrollAreaRef.current) {
                  const viewportElement = scrollAreaRef.current.querySelector(
                    '[data-radix-scroll-area-viewport]',
                  );
                  if (viewportElement) {
                    viewportElement.scrollTop = 0;
                  }
                }
              }, 0);
            }}
            placeholder='Search country...'
          />
          <CommandList>
            <ScrollArea ref={scrollAreaRef} className='h-72'>
              <CommandGroup>
                {countryList
                  .filter(({ label }) => label.toLowerCase().includes(searchValue.toLowerCase()))
                  .map(({ value, label }) =>
                    value ? (
                      <CountrySelectOption
                        key={value}
                        country={value}
                        countryName={label}
                        selectedCountry={selectedCountry}
                        onChange={country => {
                          onChange(country);
                          onCountryChange?.(country);
                        }}
                        onSelectComplete={() => setIsOpen(false)}
                      />
                    ) : null,
                  )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country;
  onChange: (country: RPNInput.Country) => void;
  onSelectComplete: () => void;
}

const CountrySelectOption = ({
  country,
  countryName,
  selectedCountry,
  onChange,
  onSelectComplete,
}: CountrySelectOptionProps) => {
  const handleSelect = () => {
    console.log('Country selected:', country, countryName);
    onChange(country);
    onSelectComplete();
  };

  return (
    <div
      className='flex items-center gap-2 px-2 py-1.5 text-sm cursor-pointer hover:bg-accent hover:text-accent-foreground rounded-sm'
      onClick={handleSelect}
    >
      <FlagComponent country={country} countryName={countryName} />
      <span className='flex-1 text-sm'>{countryName}</span>
      <span className='text-sm text-foreground/50'>{`+${getCountryCallingCode(country)}`}</span>
      <CheckIcon
        className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`}
      />
    </div>
  );
};

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country];

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-sm bg-foreground/20 [&_svg:not([class*='size-'])]:size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  );
};

export { PhoneInput };
