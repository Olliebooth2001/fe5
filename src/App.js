import React from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import Analytics from "./components/Analytics";
import Information from "./components/Information";
import Footer from "./components/Footer";
import ScrollButton from "./components/ScrollButton";
import Disclaimer from "./components/Disclaimer";

function App() {
  return (
    <div>
      
 <Navbar></Navbar>
 <Hero></Hero>
 <Information></Information>
 <Disclaimer></Disclaimer>

 <Analytics></Analytics>
 <ScrollButton></ScrollButton>
 <Footer></Footer>
    </div>
  );
}

export default App;
