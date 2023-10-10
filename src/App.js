import React, { Component } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import "./App.css";
import LoginForm from "./components/Login/LoginForm";
import "bootstrap/dist/css/bootstrap.min.css";
import { storageData } from "./components/Login/LoginForm";

const textFromStorage = localStorage.getItem("user-info");
console.log(textFromStorage);

class App extends Component {
  render() {
    return (
      <Routes>
        <Route path="/" element={<LoginForm />}></Route>
        <Route path="/home" element={<HomePage />}></Route>
      </Routes>
    );
  }
}

export default App;
