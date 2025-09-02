import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import { contactSchema } from "../lib/schemas";

const generateId = () => Math.random().toString(36).substring(2, 9);

export const useContactStore = create(
  persist(
    (set, get) => ({
      contacts: [],

      addContact: (contactData) => {
        try {
          const validatedData = contactSchema.parse(contactData);
          const newContact = {
            ...validatedData,
            id: generateId(),
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({ contacts: [newContact, ...state.contacts] }));

          return { success: true, contacts: newContact };
        } catch (error) {
          console.error("Validation Error:", error.errors);
          return { success: false, errors: error.errors };
        }
      },

      updateContact: (id, contactData) => {
        try {
          const validatedData = contactSchema.parse(contactData);
          const updatedContact = {
            ...validatedData,
            id,
            updatedAt: new Date().toISOString(),
          };

          set((state) => ({
            contacts: state.contacts.map((contact) =>
              contact.id === id ? updatedContact : contact
            ),
          }));

          return { success: true, contact: updatedContact };
        } catch (error) {
          console.error("Validation error:", error.errors);
          return { success: false, errors: error.errors };
        }
      },

      getContact: (id) => {
        return get().contacts.find((contact) => contact.id === id);
      },

      deleteContact: (id) => {
        set((state) => ({
          contacts: state.contacts.filter((contact) => contact.id !== id),
        }));
      },

      toggleFavorite: (id) => {
        set((state) => ({
          contacts: state.contacts.map((contact) =>
            contact.id === id
              ? { ...contact, isFavorite: !contact.isFavorite }
              : contact
          ),
        }));
      },

      getFilteredContacts: (filters = {}) => {
        const { category = "all", favorite = "all", search = "" } = filters;

        let filteredContacts = get().contacts.filter(
          (contact) => contact !== null && contact !== undefined
        );

        if (category !== "all") {
          filteredContacts = filteredContacts.filter(
            (contact) => contact.category === category
          );
        }

        if (favorite !== "all") {
          filteredContacts = filteredContacts.filter((contact) =>
            favorite === "favorite" ? contact.isFavorite : !contact.isFavorite
          );
        }

        if (search.trim()) {
          const searchTerm = search.toLowerCase().trim();
          filteredContacts = filteredContacts.filter(
            (contact) =>
              `${contact.firstName} ${contact.lastName}`
                .toLowerCase()
                .includes(searchTerm) ||
              contact.phone.toLowerCase().includes(searchTerm) ||
              contact.category.toLowerCase().includes(searchTerm)
          );
        }

        return filteredContacts;
      },

      getContactStats: () => {
        const contacts = get().contacts.filter(
          (contact) => contact !== null && contact !== undefined
        );

        const total = contacts.length;
        const favorites = contacts.filter(
          (contact) => contact.isFavorite
        ).length;

        const categoryStats = {};
        contacts.forEach((contact) => {
          categoryStats[contact.category] =
            (categoryStats[contact.category] || 0) + 1;
        });

        return {
          total,
          favorites,
          categories: categoryStats,
          nonFavorites: total - favorites,
        };
      },
    }),
    {
      name: "my-contact",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
