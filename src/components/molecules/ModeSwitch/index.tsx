"use client";

import FormControl from "@mui/material/FormControl";
import { useColorScheme } from "@mui/material/styles";
import {
  FormLabel,
  ToggleButton,
  ToggleButtonGroup,
  ToggleButtonProps,
} from "@mui/material";
import { Computer, DarkMode, LightMode } from "@mui/icons-material";

const CustomToggleBtn = (props: ToggleButtonProps) => {
  return (
    <ToggleButton
      {...props}
      sx={{
        color: "white",
        border: "1px solid rgba(255,255,255,0.12)",
        "&:hover": {
          textDecoration: "none",
          bgcolor: "rgba(255 255 255 / 0.08)",
        },
        "&.Mui-selected": {
          color: "white",
          bgcolor: "rgba(255 255 255 / 0.16)",
          "&:hover": {
            bgcolor: "rgba(255 255 255 / 0.24)",
          },
        },
        p: 0.5,
      }}
    >
      {props.children}
    </ToggleButton>
  );
};

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const handleModeChange = (e: React.MouseEvent<HTMLElement>, v: string) => {
    if (v !== null) setMode(v as typeof mode);
  };

  return (
    <FormControl>
      <FormLabel
        id="mode-change-gorup-label"
        sx={{ color: "rgba(255,255,255,0.7)" }}
      >
        Mode
      </FormLabel>
      <ToggleButtonGroup
        value={mode}
        exclusive
        aria-label="Change Mode"
        onChange={handleModeChange}
      >
        <CustomToggleBtn value="system" aria-label="System Mode">
          <Computer data-value="system" sx={{ mr: 1 }} />
          system
        </CustomToggleBtn>
        <CustomToggleBtn value="light" aria-label="Light Mode">
          <LightMode data-value="light" sx={{ mr: 1 }} />
          Light
        </CustomToggleBtn>
        <CustomToggleBtn value="dark" aria-label="Dark Mode">
          <DarkMode data-value="dark" sx={{ mr: 1 }} />
          Dark
        </CustomToggleBtn>
      </ToggleButtonGroup>
    </FormControl>
  );
}
