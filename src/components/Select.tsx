import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";
import { HiChevronDown } from "react-icons/hi";

export interface IOption {
  value: any;
  label: string;
  hidden?: boolean;
}

export interface SelectProps {
  value: IOption;
  options: IOption[];
  setValue?: (value: string) => void;
  className?: string;
  label?: string;
  disabled?: boolean;
}

export const Select = ({
  value,
  setValue,
  label,
  options,
  disabled,
  ...props
}: SelectProps) => (
  <Listbox
    disabled={disabled}
    value={value}
    onChange={(e) => setValue && setValue(e.value)}
  >
    {({ open }: { open: boolean }) => (
      <>
        {label && <p className="text-slate-200 text-sm mb-1">{label}</p>}

        <div className="relative">
          <Listbox.Button
            className={`
				${disabled && "disabled:bg-transparent disabled:border-transparent"}
				bg-slate-800 flex items-center justify-between relative w-full border border-transparent
				rounded px-3 cursor-pointer outline-none duration-200
				hover:border-blue-700 text-slate-200 text-sm h-10 ${props.className || ""}
							`}
          >
            <span className="block truncate">
              {options.find((op) => op.value === value.value)?.label || ""}
            </span>
            {!disabled && (
              <div className="h-6 w-6 flex justify-center items-center text-blue-700 hover:bg-slate-600 rounded-full duration-300">
                <HiChevronDown size={35} />
              </div>
            )}
          </Listbox.Button>

          <Transition
            show={open}
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options
              className={`
                absolute z-50 mt-1 pl-0 list-none bg-slate-800
                rounded w-full
                max-h-60 py-1 ring-1
                ring-black ring-opacity-5 overflow-auto outline-none
              `}
            >
              {options.map((op) => (
                <Listbox.Option
                  key={op.value}
                  className={`
                     ${
                       op.value === value.value
                         ? "text-white bg-blue-700"
                         : "text-slate-300 hover:bg-slate-600"
                     }
                     ${op.hidden && "hidden"}
                      cursor-pointer select-none relative px-3 h-10
                      flex items-center transition-all duration-200 truncate
                    `}
                  value={op}
                >
                  {op.label}
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        </div>
      </>
    )}
  </Listbox>
);
