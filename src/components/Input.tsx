import React from "react";

export interface InputProps extends React.ComponentProps<"input"> {
  label?: string;
  helperText?: string;
  error?: boolean
}

export const Input = (props: InputProps) => {

  return (
    <div
      className={`
	  transition duration-300 w-full
		${props.error ? "text-red-500" : ""}
		`}
    >
      {props.label && (
        <p className="text-slate-200 text-sm mb-1 truncate">{props.label}</p>
      )}

      <div className={"relative rounded-md shadow-sm"}>
        <input
          {...props}
          className={`
					disabled:bg-slate-200 text-black placeholder:text-slate-500 duration-200 disabled:cursor-not-allowed w-full rounded bg-slate-300 h-10 px-3 border
					focus:border-slate-500 text-sm font-semibold outline-none
			
					${
            props.error
              ? "border-red-800 focus:border-red-500 text-red-500"
              : "focus:border-blue-500 border-transparent"
          }
					`}
        />
      </div>

      {props.helperText && (
        <p
          className={`
				text-sm mt-2 mb-0 ${props.error ? "text-red-500" : "text-slate-400"}
			`}
        >
          {props.helperText}
        </p>
      )}
    </div>
  );
};