import React from "react";

export interface IButton extends React.ComponentProps<"button"> {
  variant?: keyof typeof variantsButton;
  loading?: boolean;
  disabled?: boolean;
  size?: "small" | "medium" | "large";
}

const variantsButton = {
  white:
    "bg-white hover:bg-blue-200 active:bg-white text-blue-700 cursor-pointer",
  slate:
    "bg-slate-500 hover:bg-slate-400 active:bg-slate-500 active:border-2 active:border-blue-200 text-white cursor-pointer",
  disabled: "bg-slate-800 text-slate-500 cursor-not-allowed",
};

export const Button = ({
  variant = "slate",
  loading,
  disabled,
  ...props
}: IButton) => {
  const isJustifyStart = props?.className?.includes("justify-start");

  return (
    <button
      {...props}
      disabled={disabled || loading}
      className={`
			${disabled ? variantsButton["disabled"] : variantsButton[variant]} 
	  		outline-none transition duration-300 border border-transparent
			rounded relative border-none font-semibold flex items-center 
			${isJustifyStart ? "justify-start" : "justify-center"} 
	  		gap-2 h-10 text-sm w-full px-6 ${props?.className || ""}
			`}
    >
      <svg
        className={`
          animate-spin -ml-1 h-4 w-4
          ${loading && !disabled ? "flex" : "hidden"}
        `}
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          className="opacity-25"
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
        ></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      {props.children}
    </button>
  );
};
