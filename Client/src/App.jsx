import { useState, useEffect } from "react";
import { IconButton, Drawer, Stack, Button } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import DrawerList from "./components/Drawer";
import LightbulbIcon from "@mui/icons-material/Lightbulb";
import BarChartOutlinedIcon from "@mui/icons-material/BarChartOutlined";
import HelpOutlineIcon from "@mui/icons-material/HelpOutline";
import SettingsIcon from "@mui/icons-material/Settings";
import GitHubIcon from "@mui/icons-material/GitHub";
import "./App.css";

function App() {
  const [grid, setGrid] = useState(Array(30).fill(null)); // 30 cells (6 rows * 5 columns)
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const [n, setN] = useState(0); // Keeps track of the current cell index
  const keys = [
    "Q", "W", "E", "R", "T", "Y", "U", "I", "O", "P",
    "A", "S", "D", "F", "G", "H", "J", "K", "L", "ENTER",
    "Z", "X", "C", "V", "B", "N", "M", "BACK"
  ];

  const apiURL = "https://random-word-api.herokuapp.com/word?length=5";

  useEffect(() => {
    const fetchRandomWord = async () => {
      const response = await fetch(apiURL);
      const data = await response.json();
      setWord(data[0].toUpperCase());
    };
    fetchRandomWord();
  }, []);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const handleKeyClick = (key) => {
    const currentRow = Math.floor(n / 5); // Get current row based on 'n'
    const startOfRow = currentRow * 5; // The starting index of the current row
    const endOfRow = startOfRow + 5; // The ending index of the current row

    if (key === "BACK") {
      // Handle Backspace
      if (n > startOfRow) { // Prevent deleting past the start of the row
        setGrid((prev) => {
          const newGrid = [...prev];
          newGrid[n - 1] = null; // Set the current cell to null
          return newGrid;
        });
        setN(n - 1); // Move the pointer back
      }
      return;
    }

    if (key === "ENTER") {
      console.log(n,endOfRow);
      console.log(currentRow)
      console.log(Math.floor(4/5))
      // Handle Enter key
      if (n === endOfRow) { // Only allow if row is complete
        const guess = grid.slice(startOfRow, endOfRow).join("");
        console.log("Your guess:", guess);

        if (guess === word) {
          alert("🎉 Congratulations! You guessed the word!");
        }
        setN(n); // Prevent further input until the next row
      }
      return;
    }

    // Prevent adding letters if grid is full (30 cells)
    if (n >= 30) {
      return;
    }

    // Handle regular letter input
    if (n < endOfRow) {
      // Only allow typing if the current row is not yet full
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[n] = key; // Update the specific cell
        return newGrid;
      });
      setN(n + 1); // Move the pointer to the next cell
    }
  };

  return (
    <>
      <nav>
        <IconButton onClick={() => toggleDrawer(true)}>
          <MenuIcon />
        </IconButton>
        <Drawer open={open} onClose={() => toggleDrawer(false)}>
          <DrawerList toggleDrawer={toggleDrawer} />
        </Drawer>

        <Stack direction="row" spacing={3}>
          <LightbulbIcon sx={{ fontSize: 30, cursor: "pointer" }} />
          <BarChartOutlinedIcon sx={{ fontSize: 30, cursor: "pointer" }} />
          <HelpOutlineIcon sx={{ fontSize: 30, cursor: "pointer" }} />
          <SettingsIcon sx={{ fontSize: 30, cursor: "pointer" }} />
          <Button variant="outlined">Subscribe to Games</Button>
        </Stack>
      </nav>

      <main>
        <div className="gridContainer">
          {grid.map((cell, index) => (
            <div key={index} className="cell">
              {cell}
            </div>
          ))}
        </div>

        <div className="keyboard">
          {keys.map((key, index) => (
            <div
              key={index}
              className={`key n${index}`}
              onClick={() => handleKeyClick(key)}
            >
              {key}
            </div>
          ))}
        </div>
      </main>

      <footer>
        <div>
          <a href="https://www.nytco.com/">© 2025 The New York Times Company</a>
        </div>
        <div>
          <a href="https://www.nytimes.com/">NYTimes.com</a>
        </div>
        <div>
          <a href="https://www.nytimes.com/sitemap/">Sitemap</a>
        </div>
        <div>
          <a href="https://help.nytimes.com/hc/en-us/articles/10940941449492-The-New-York-Times-Company-Privacy-Policy">
            Privacy Policy
          </a>
        </div>
        <div>
          <a href="https://help.nytimes.com/hc/en-us/articles/115014893428-Terms-of-Service">
            Terms of Service
          </a>
        </div>
        <div>
          <a href="https://help.nytimes.com/hc/en-us/articles/115014893968-Terms-of-Sale">
            Terms of Sale
          </a>
        </div>
        <div>
          <GitHubIcon sx={{ fontSize: 20 }} />
          <a href="https://github.com/davebott-dev/wordle_clone">Made with ❤️ by David Bottenberg</a>
        </div>
      </footer>
    </>
  );
}

export default App;
