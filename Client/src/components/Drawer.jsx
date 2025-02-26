import { useState } from "react";
import {
  Box,
  List,
  Divider,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";

function DrawerList({toggleDrawer}) {

  return (
    <Box sx={{ width: 250 }} role="presentation" onClick={()=>toggleDrawer(false)}>
      <List>
        {[
          "The New York Times",
          "Spelling Bee",
          "The Crossword",
          "The Mini",
          "Strands",
          "Connections",
          "More Games",
        ].map((text) => {
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton><ListItemText primary = {text}/></ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <Divider/>
      <List>
        {[
          "The New York Times",
          "The New York Times Cooking",
          "The Crossword",
          "The New York Times Wirecutter",
          "The Athletic"
        ].map((text) => {
          return (
            <ListItem key={text} disablePadding>
              <ListItemButton><ListItemText primary = {text}/></ListItemButton>
              </ListItem>
          );
        })}
      </List>
    </Box>
  );
}

export default DrawerList;
