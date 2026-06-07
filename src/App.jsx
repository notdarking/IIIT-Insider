import Navbar from "./Components/Navbar";
import Home from "../src/Pages/Home";
import College from "../src/Pages/College";
import Compare from "../src/Pages/Compare";
import User_table from "../src/Pages/User_table";
import Register from "../src/Pages/Register";
import About from "../src/Pages/About";
import Contact from "../src/Pages/Contact";
import Support from "../src/Pages/Support";
import Privacy from "../src/Pages/Privacy";
import { Route, Routes } from "react-router-dom";
import QuickLink from "./Components/QuickLink";

const App = () => {
  return (
    <div className="bg-black min-h-screen text-white flex flex-col">
      <header>
        <Navbar />

        <main className="grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/college" element={<College />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/userTable" element={<User_table />} />
            <Route path="/register" element={<Register />} />
            <Route path="/about" element={<About />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/support" element={<Support />} />
            <Route path="/privacy" element={<Privacy />} />
          </Routes>
        </main>
      </header>

      <footer className="mt-auto">
        <QuickLink />
      </footer>
    </div>
  );
};

export default App;
