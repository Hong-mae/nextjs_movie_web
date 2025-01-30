"use client";
import * as React from "react";
import FormControl from "@mui/material/FormControl";
import { useColorScheme } from "@mui/material/styles";
import { ToggleButton, ToggleButtonGroup } from "@mui/material";
import {
  DarkMode,
  LightMode,
  SettingsSystemDaydream,
} from "@mui/icons-material";
import theme from "@/theme";

export default function ModeSwitch() {
  const { mode, setMode } = useColorScheme();

  if (!mode) {
    return null;
  }

  const handleModeChange = (e: React.MouseEvent<HTMLElement>, v: any) => {
    setMode((e.target.value || v) as typeof mode);
  };

  return (
    <FormControl>
      <ToggleButtonGroup
        value={mode}
        exclusive
        onChange={handleModeChange}
        aria-label="Change Mode"
        color="secondary"
      >
        <ToggleButton value="system" aria-label="System Mode">
          <SettingsSystemDaydream data-value="system" />
        </ToggleButton>
        <ToggleButton value="light" aria-label="Light Mode">
          <LightMode data-value="light" />
        </ToggleButton>
        <ToggleButton value="dark" aria-label="Dark Mode">
          <DarkMode data-value="dark" />
        </ToggleButton>
      </ToggleButtonGroup>
    </FormControl>
  );
}

//   <Box
//   sx={{
//     display: "flex",
//     justifyContent: "flex-end",
//     mt: 1,
//     p: 1,
//   }}
// >
//   <FormControl>
//     <InputLabel id="mode-select-label">Theme</InputLabel>
//     <Select
//       labelId="mode-select-label"
//       id="mode-select"
//       value={mode}
//       onChange={(event) => setMode(event.target.value as typeof mode)}
//       label="Theme"
//     >
//       <MenuItem value="system">System</MenuItem>
//       <MenuItem value="light">Light</MenuItem>
//       <MenuItem value="dark">Dark</MenuItem>
//     </Select>
//   </FormControl>
// </Box>;
