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
  const [grid, setGrid] = useState(Array(30).fill(null));
  const [open, setOpen] = useState(false);
  const [word, setWord] = useState("");
  const [n, setN] = useState(0);
  const [isEnterClicked, setIsEnterClicked] = useState(false);
  const [isGameOver, setIsGameOver] = useState(false);
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

  const apiURL = "https://random-word-api.herokuapp.com/word?length=5";

  useEffect(() => {
    const fetchRandomWord = async () => {
      const response = await fetch(apiURL);
      const data = await response.json();
      setWord(data[0].toUpperCase());
    };
    fetchRandomWord();
  }, [isGameOver]);

  const toggleDrawer = (newOpen) => {
    setOpen(newOpen);
  };

  const handleKeyClick = (key) => {
    const currentRow = Math.floor(n / 5);
    const startOfRow = currentRow * 5;
    const endOfRow = startOfRow + 5;
  
    if (key === "BACK") {
      if (n > startOfRow) {
        setGrid((prev) => {
          const newGrid = [...prev];
          newGrid[n - 1] = null;
          return newGrid;
        });
        setN(n - 1);
      } else if (n === startOfRow) {
        setIsEnterClicked(false); 
      }
      return;
    }
  
    if (key === "ENTER") {
      setIsEnterClicked(true);
      if (n === startOfRow) {
        const guess = grid.slice(startOfRow - 5, startOfRow).join("");
        console.log("Your guess:", guess);
        console.log("Target Word:", word);
  
        let guessObject = {};
  
        const guessArray = guess.split("");
        const wordArray = word.split("");
        
        guessArray.forEach((letter, index) => {
            if (wordArray[index] === letter) {
            guessObject[letter] = "green";
            console.log(index+startOfRow-5, "green", letter);
            const cell = document.querySelector(`.cell${index+startOfRow-5}`);
            const keyIndex = keys.indexOf(letter);
            const keyCell = document.querySelector(`.n${keyIndex}`);
            keyCell.classList.remove("keyYellow", "keyGray");
            keyCell.classList.add("keyGreen");
            cell.classList.remove("yellow", "gray");
            cell.classList.add("green");
          } else if (wordArray.includes(letter)) {
            guessObject[letter] = "yellow";
            console.log(index+startOfRow-5, "yellow", letter);
            const cell = document.querySelector(`.cell${index+startOfRow-5}`);
            const keyIndex = keys.indexOf(letter);
            const keyCell = document.querySelector(`.n${keyIndex}`);
            keyCell.classList.remove("keyGray");
            keyCell.classList.add("keyYellow");
            cell.classList.remove("gray");
            cell.classList.add("yellow");
          } else {
            guessObject[letter] = "gray";
            console.log(index+startOfRow-5, "gray", letter);
            const cell = document.querySelector(`.cell${index+startOfRow-5}`);
            const keyIndex = keys.indexOf(letter);
            const keyCell = document.querySelector(`.n${keyIndex}`);
            keyCell.classList.add("keyGray");
            cell.classList.add("gray");
          }
        });
  
        console.log("Guess Object:", guessObject);
  
        setN(startOfRow);
  
        if (guess === word) {
          alert("🎉 Congratulations! You guessed the word!");
          setGrid(Array(30).fill(null));
          const cells = document.querySelectorAll(".cell");
          cells.forEach((cell) => {
            cell.classList.remove("green", "yellow", "gray");
          });
          const keyCells = document.querySelectorAll(".key");
          keyCells.forEach((keyCell) => {
            keyCell.classList.remove("green", "yellow", "gray");
          });
          setN(0);
          setIsGameOver(true);
        } else if (n >= 30) {
          alert("Game Over! The word was: " + word);
          setGrid(Array(30).fill(null));
          const cells = document.querySelectorAll(".cell");
          cells.forEach((cell) => {
            cell.classList.remove("green", "yellow", "gray");
          });
          const keyCells = document.querySelectorAll(".key");
          keyCells.forEach((keyCell) => {
            keyCell.classList.remove("green", "yellow", "gray");
          });
          setN(0);
          setIsGameOver(true);
        }
      }
      return;
    }
  
    if (
      n >= 30 ||
      (n == 5 && !isEnterClicked && key === "BACK") ||
      (n == 10 && !isEnterClicked && key === "BACK") ||
      (n == 15 && !isEnterClicked && key === "BACK") ||
      (n == 20 && !isEnterClicked && key === "BACK") ||
      (n == 25 && !isEnterClicked && key === "BACK") 
    ) {
      return;
    }
  
    if (n < endOfRow) {
      setIsEnterClicked(false);
      setIsGameOver(false);
      setGrid((prev) => {
        const newGrid = [...prev];
        newGrid[n] = key;
        return newGrid;
      });
      setN(n + 1);
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
            <div key={index} className={`cell cell${index}`}>
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
          <a href="https://github.com/davebott-dev/wordle_clone">
            Made with ❤️ by David Bottenberg
          </a>
        </div>
      </footer>
    </>
  );
}

export default App;
