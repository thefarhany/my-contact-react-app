import { Plus, X } from "lucide-react";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import ContactCard from "../components/layouts/ContactCard";
import { useContactStore } from "@/store/useContactStore.js";
import { Input } from "@/components/ui/input.jsx";
import { Button } from "@/components/ui/button.jsx";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import usePageTitle from "../hooks/usePageTitle";

const Homepage = () => {
  const { contacts, getFilteredContacts, getContactStats } = useContactStore();
  const [filters, setFilters] = useState({
    search: "",
    category: "all",
    favorite: "all",
  });

  const filteredContacts = getFilteredContacts(filters);
  const stats = getContactStats();

  const updateFilter = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  const clearSearch = () => {
    setFilters((prev) => ({ ...prev, search: "" }));
  };

  const resetFilters = () => {
    setFilters({
      search: "",
      category: "all",
      favorite: "all",
    });
  };

  const hasActiveFilters =
    filters.search || filters.category !== "all" || filters.favorite !== "all";

  usePageTitle("Homepage");

  return (
    <div className="py-8 pb-20">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">Daftar Kontak</h2>
        <Link
          to="/add-contact"
          className="mt-4 flex items-center gap-2 px-4 py-2 bg-green-500 text-white font-semibold text-sm rounded-lg hover:bg-green-600 transition"
        >
          <Plus size={20} /> Tambah Kontak
        </Link>
      </div>

      <div className="mt-6 flex gap-3">
        <Input
          type="text"
          value={filters.search}
          onChange={(e) => updateFilter("search", e.target.value)}
          placeholder="Cari Kontak..."
        />
        {filters.search && (
          <Button
            onClick={clearSearch}
            className=" bg-red-600 hover:bg-red-700"
          >
            Clear <X size={18} />
          </Button>
        )}
      </div>

      <div className="flex items-center flex-wrap md:flex-nowrap gap-3 mt-6">
        <Button
          variant={filters.favorite === "all" ? "default" : "outline"}
          onClick={() => updateFilter("favorite", "all")}
          className="flex-1"
        >
          All Contact
        </Button>
        <Button
          variant={filters.favorite === "favorite" ? "default" : "outline"}
          onClick={() => updateFilter("favorite", "favorite")}
          className="flex-1"
        >
          Favorite Contact
        </Button>
        <Select
          value={filters.category}
          onValueChange={(value) => updateFilter("category", value)}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Kategori Kontak" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Kategori</SelectItem>
            <SelectItem value="Teman">Teman</SelectItem>
            <SelectItem value="Keluarga">Keluarga</SelectItem>
            <SelectItem value="Kerja">Kerja</SelectItem>
            <SelectItem value="Lainnya">Lainnya</SelectItem>
          </SelectContent>
        </Select>

        {hasActiveFilters && (
          <Button
            variant="outline"
            onClick={resetFilters}
            className="flex items-center gap-2"
          >
            <X size={16} />
            Clear All
          </Button>
        )}
      </div>

      <div className="py-6">
        {filteredContacts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 h-[60vh] bg-gray-50 rounded-lg">
            {hasActiveFilters ? (
              <>
                <p className="text-gray-500 text-lg">
                  Tidak ada kontak yang sesuai
                </p>
                <p className="text-gray-400 text-sm mt-2">
                  Coba ubah filter pencarian Anda
                </p>
              </>
            ) : (
              <>
                <p className="text-gray-500 text-lg">Belum ada kontak</p>
                <p className="text-gray-400 text-sm mt-2">
                  Mulai dengan menambahkan kontak pertama Anda
                </p>
              </>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredContacts.map((contact) => (
              <ContactCard key={contact.id} contact={contact} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Homepage;
