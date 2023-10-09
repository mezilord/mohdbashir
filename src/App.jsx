import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom"; // Change import to include Routes

import {
  About,
  Contact,
  Experience,
  Feedbacks,
  Hero,
  Navbar,
  Tech,
  Works,
  StarsCanvas,
} from "./components";
import ContentGeneratorPage from "./contentGenerator/ContentGeneratorPage";

const App = () => {
  return (
    <BrowserRouter>
          <Routes> {/* Change from Switch to Routes */}
          <Route path="/contentGenerator" element={<ContentGeneratorPage />} />
          {/* Define other routes if needed */}
        </Routes>
      <div className="relative z-0 bg-primary">
        <div className="bg-hero-pattern bg-cover bg-no-repeat bg-center">
          <Navbar />
          <Hero />
        </div>

        <About />
        <Experience />
        <Tech />
        <Works />
        <Feedbacks />
        <div className="relative z-0">
          <Contact />
          <StarsCanvas />
        </div>
      </div>

    </BrowserRouter>
  );
};


export default App;
