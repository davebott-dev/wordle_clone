import { useState } from "react";
import { IconButton, Drawer,Stack,Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerList from "./components/Drawer";
import LightbulbIcon from '@mui/icons-material/Lightbulb';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import SettingsIcon from '@mui/icons-material/Settings';
import "./App.css";

function App() {
  const [grid, setGrid] = useState(Array(30).fill(null));
  const [open, setOpen] = useState(false);
  const keys = [
    "Q",
    "W",
    "E",
    "R",
    "T",
    "Y",
    "U",
    "I",
    "O",
    "P",
    "A",
    "S",
    "D",
    "F",
    "G",
    "H",
    "J",
    "K",
    "L",
    "ENTER",
    "Z",
    "X",
    "C",
    "V",
    "B",
    "N",
    "M",
    "BACK",
  ];

   const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  return (
    <>
      <nav>
        <IconButton onClick = {()=> toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer open={open} onClose={()=> toggleDrawer(false)}>
          <DrawerList toggleDrawer={toggleDrawer} />
        </Drawer>

        <Stack direction = "row" spacing={3}>
          <LightbulbIcon sx={{fontSize: 30}}/>
          <BarChartOutlinedIcon sx={{fontSize: 30}}/>
          <HelpOutlineIcon sx={{fontSize: 30}}/>
          <SettingsIcon sx={{fontSize: 30}}/>
          <Button variant="outlined">Subscribe to Games</Button>
        </Stack>
      </nav>

      <main>
        <div className="gridContainer">
          {grid.map((cell, index) => {
            return (
              <div key={index} className="cell">
                {cell}
              </div>
            );
          })}
        </div>

        <div className="keyboard">
          {keys.map((key, index) => {
            return (
              <div key={index} className={`key n${index}`}>
                {key}
              </div>
            );
          })}
        </div>
      </main>
    </>
  );
}

export default App;
