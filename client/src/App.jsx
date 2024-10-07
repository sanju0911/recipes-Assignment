import { Outlet } from "react-router-dom";
import NavBar from "./components/NavBar";
import { Footer } from "./components/Footer";
import { useState } from "react";
import "./app.css";
function App() {
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className="flex flex-col min-h-screen bg-gray-50">
      <NavBar onSearch={handleSearch} />
      <main className="flex-grow flex items-center justify-center p-4 bg-gradient-to-r from-green-100 to-blue-100">
        <Outlet context={{ searchQuery }} />
      </main>
      <Footer />
    </div>
  );
}

export default App;
