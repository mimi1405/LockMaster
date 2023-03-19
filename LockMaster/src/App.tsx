import React, { useState } from "react";
import Landing from "./Screens/Landing/Landing";
import { Routes, Route, Link } from "react-router-dom";
import { BiMoon } from "react-icons/bi";
import { BiSun } from "react-icons/bi";
import CreateNewPassword from "./Screens/CreateNewPW/CreateNewPassword";
import Passwords from "./Screens/Read/Passwords";
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
import TestPasswords from "./Screens/Read/TestPasswords";

const App = () => {
  const theme = "dark";
  const colorMode = useColorScheme(theme);


  return (
    <MantineProvider theme={{ colorScheme: "dark", fontFamily: "Roboto" }}>
      <AppShell
        padding="md"
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
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/cnp" element={<CreateNewPassword />} />
          <Route path="/passwords" element={<TestPasswords />} />
        </Routes>
      </AppShell>
    </MantineProvider>
  );
};

export default App;
