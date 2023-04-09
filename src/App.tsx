import React, { useState } from "react";
import Landing from "./Screens/Landing/Landing";
import { Routes, Route } from "react-router-dom";
import CreateNewPassword from "./Screens/CreateNewPW/CreateNewPassword";
import {
  AppShell,
  Navbar,
  Header,
  Aside,
  Footer,
  MantineProvider,
  createStyles,
  NavLink,
  Group,
  Text,
} from "@mantine/core";
import { useColorScheme } from "@mantine/hooks";
import { AiFillLock } from "react-icons/ai";
import "./styles.css";
import NavButton from "./Components/NavButton/NavButton";
import TestPasswords from "./Screens/Read/Passwords";
import "./styles.css";
import Passwords from "./Screens/Read/Passwords";
import Protection from "./Screens/Protection/Protection";

const App = () => {
  return (
    <Protection>
      <MantineProvider theme={{ colorScheme: "dark", fontFamily: "Roboto" }}>
        <AppShell
          navbar={
            <Navbar width={{ base: 200 }}>
              <NavButton to="/" display="Home" />
              <NavButton to="/cnp" display="Create password" />
              <NavButton to="/passwords" display="Show passwords" />
            </Navbar>
          }
          header={
            <Header height={70}>
              <div className="title-box">
                <h1>LockMaster</h1>
                <AiFillLock style={{ marginLeft: "2px" }} size={30} />
              </div>
            </Header>
          }
          styles={(theme) => ({
            main: {
              backgroundColor:
                theme.colorScheme === "dark"
                  ? theme.colors.dark[8]
                  : theme.colors.gray[0],
              color: theme.colorScheme === "dark" ? theme.white : theme.black,
            },
          })}
        >
          <div>
            <Routes>
              <Route path="/" element={<Landing />} />
              <Route path="/cnp" element={<CreateNewPassword />} />
              <Route path="/passwords" element={<Passwords />} />
            </Routes>
          </div>
        </AppShell>
      </MantineProvider>
    </Protection>
  );
};

export default App;
