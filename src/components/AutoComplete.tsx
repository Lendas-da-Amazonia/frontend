import React, { useState } from "react";

import { Combobox, Transition } from "@headlessui/react";

import { HiChevronDown } from "react-icons/hi";

export interface IOption {
  value: any;
  label: string;
  props?: any;
}

export interface AutoCompleteProps {
  value: IOption;
  options: IOption[];
  setValue?: (value: IOption) => void;
  renderItem?: (item: IOption["props"]) => React.ReactNode;
  className?: string;
  label?: string;
  placeholder?: string;
  size?: "small" | "medium" | "large";
}

export const AutoComplete = ({
  label,
  value,
  options,
  setValue,
  placeholder,
  renderItem,
}: AutoCompleteProps) => {
  const [query, setQuery] = useState("");

  const [isOpen, setIsOpen] = useState(false);

  const handleFocus = () => {
    setIsOpen(true);
  };

  const handleBlur = () => {
    setIsOpen(false);
    setQuery("");
  };

  const ops = options.filter((op) =>
    op.label.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Combobox
      as="div"
      value={value}
      onChange={(value) => {
        setQuery("");
        setValue && setValue(value);
      }}
      className="w-full"
    >
      {({ open }) => (
        <>
          {label && <p className="text-slate-200 text-sm">{label}</p>}
          <div className="relative mt-1">
            <Combobox.Input
              id="input-combobox"
              className={`
						w-full rounded bg-slate-800 h-10 pl-3 pr-10 border border-transparent
						focus:border-blue-700 text-sm outline-none`}
              onChange={(event) => setQuery(event.target.value)}
              displayValue={(v: IOption) => v.label}
              onBlur={handleBlur}
              onClick={handleFocus}
              placeholder={placeholder}
            />
            <Combobox.Button className="group absolute bg-transparent w-fit inset-y-0 border-none right-0 flex justify-center items-center rounded-r-md px-2 outline-none">
              <div className="h-6 w-6 flex justify-center items-center text-blue-700 group-hover:bg-slate-600 rounded-full duration-300">
                <HiChevronDown size={35} />
              </div>
            </Combobox.Button>

            <Transition
              show={open || isOpen}
              enter="transition duration-100 ease-out"
              enterFrom="transform scale-95 opacity-0"
              enterTo="transform scale-100 opacity-100"
              leave="transition duration-75 ease-out"
              leaveFrom="transform scale-100 opacity-100"
              leaveTo="transform scale-95 opacity-0"
              className="relative z-50"
            >
              <Combobox.Options
                className={`absolute rounded px-0 mt-1 list-none max-h-60 w-full overflow-y-auto overflow-x-hidden bg-slate-800 py-1 border border-slate-700 shadow-lg shadow-slate-950
						 focus:outline-none text-sm`}
              >
                {ops.length > 0 ? (
                  ops.map((op) => (
                    <Combobox.Option
                      key={op.value}
                      value={op}
                      className={`relative px-3 cursor-pointer select-none py-2 duration-300
				${op.value === value.value ? "bg-blue-700 text-white" : "hover:bg-slate-600"}
				`}
                    >
                      {!renderItem && <p className="my-0">{op.label}</p>}
                      {renderItem && renderItem(op.props)}
                    </Combobox.Option>
                  ))
                ) : (
                  <Combobox.Option
                    value={""}
                    className={`relative px-3 text-center py-2 duration-300`}
                    onClick={(e) => e.preventDefault()}
                  >
                    Nenhum item
                  </Combobox.Option>
                )}
              </Combobox.Options>
            </Transition>
          </div>
        </>
      )}
    </Combobox>
  );
};
