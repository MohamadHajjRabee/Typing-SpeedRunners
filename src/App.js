import React from "react";
import Content from "./components/content";
import Navbar from "./components/navbar";
import HowItWorks from "./components/howItWorks";
import Faqs from "./components/faqs";
import Footer from "./components/footer";
import "./App.css";
function App() {
  return (
      <>
          <Navbar />
          <Content />
          <HowItWorks />
          <Faqs />
          <Footer />
      </>)
}

export default App;
