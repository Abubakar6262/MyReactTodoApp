import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "../../Components/Header";
import Footer from "../../Components/Footer";
import Todos from "../Frontend/Todos"
import About from "../Frontend/About";
import Contact from "../Frontend/Contact";
import Home from "../Frontend/Home";
import Nopage from "../Frontend/Nopage";
import SignIn from "../Auth/SignIn";
import SignUp from "../Auth/SignUp";
export default function HandlePath() {
  return (
    <BrowserRouter>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/todos" element={<Todos />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="*" element={<Nopage/>}  />
        </Routes>
      </main>
      <Footer />
    </BrowserRouter>
  );
}
