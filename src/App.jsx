import { Button } from "@/components/ui/button.jsx";
import Navbar from "./components/layouts/Navbar";
import { Route, Routes } from "react-router-dom";
import Homepage from "@/pages/Homepage.jsx";
import AddContact from "@/pages/AddContact.jsx";
import EditContact from "@/pages/EditContact.jsx";
import { Toaster } from "sonner";

const App = () => {
  return (
    <div className="px-4 md:px-16">
      <Navbar />
      <Toaster position="bottom-right" theme="dark" duration={3000} />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/add-contact" element={<AddContact />} />
        <Route path="/edit-contact/:id" element={<EditContact />} />
      </Routes>
    </div>
  );
};

export default App;
