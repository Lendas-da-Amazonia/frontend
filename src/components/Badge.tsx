import { Tooltip } from "@mui/material";

import getContrastColor from "../utilities/getContrastColor";

export const Badge = ({ text, bg }: { text: string; bg: string }) => {
  const color = getContrastColor(bg);

  return (
    <Tooltip title={text.toLocaleUpperCase()}>
      <div
        className={`w-fit max-w-[130px] px-2 text-xs py-1 font-bold rounded-xl text-${color} flex items-center justify-center`}
        style={{ backgroundColor: bg }}
      >
        <p className="truncate">{text.toLocaleUpperCase()}</p>
      </div>
    </Tooltip>
  );
};
