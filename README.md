<h1 align="center">📞 KontakKu - Personal Contact Management System </h1>

<p align="center"> 
  <img src="https://img.shields.io/badge/React%20JS-%2361DAFB?style=for-the-badge&logo=react&labelColor=000000" />
  <img src="https://img.shields.io/badge/Vite-%23646CFF?style=for-the-badge&logo=vite&logoColor=FFD62E&labelColor=000000" />
  <img src="https://img.shields.io/badge/Tailwind%20CSS-%2306B6D4?style=for-the-badge&logo=tailwindcss&labelColor=000000" />
  <img src="https://img.shields.io/badge/Shadcn/UI-%23000000?style=for-the-badge&logo=shadcnui&labelColor=000000" />
  <img src="https://img.shields.io/badge/Formik-%232563EB?style=for-the-badge&logo=formik&labelColor=000000" />
  <img src="https://img.shields.io/badge/Zod-%23408AFF?style=for-the-badge&logo=zod&labelColor=000000" />
  <img src="https://img.shields.io/badge/Lucide-%23F56565?style=for-the-badge&logo=lucide&labelColor=000000" />
  <img src="https://img.shields.io/badge/React%20Router-%23CA4245?style=for-the-badge&logo=reactrouter&labelColor=000000" />
  <img src="https://img.shields.io/badge/Zustand-%23000000?style=for-the-badge&labelColor=000000
  " />
</p>

KontakKu adalah aplikasi manajemen kontak pribadi yang dibangun dengan React.js dan teknologi modern. Aplikasi ini memungkinkan pengguna untuk mengelola daftar kontak dengan fitur CRUD lengkap, pencarian, dan filter yang responsif.

## ✨ Features

### 🎯 Core Features

- ✅ **Add Contacts** - Tambah kontak baru dengan validasi form
- ✅ **View Contacts** - Lihat daftar kontak dalam layout grid responsive
- ✅ **Edit Contacts** - Edit informasi kontak yang sudah ada
- ✅ **Delete Contacts** - Hapus kontak dengan konfirmasi dialog
- ✅ **Favorite System** - Tandai kontak favorit dengan toggle

### 🔍 Advanced Features

- ✅ **Live Search** - Pencarian real-time berdasarkan nama, telepon, email
- ✅ **Category Filter** - Filter berdasarkan kategori (Keluarga, Teman, Kerja, Lainnya)
- ✅ **Favorite Filter** - Filter kontak favorit/non-favorit
- ✅ **Responsive Design** - Optimized untuk desktop, tablet, dan mobile
- ✅ **Local Storage** - Data tersimpan secara persist di browser

### 🎨 UI/UX Features

- ✅ **Modern Design** - Clean dan intuitive interface
- ✅ **Form Validation** - Validasi input dengan feedback jelas
- ✅ **Modal Dialogs** - Detail kontak dalam modal popup
- ✅ **Toast Notifications** - Feedback actions dengan sonner toast
- ✅ **Loading States** - Visual feedback selama proses

## 🛠 Tech Stack

### Frontend Framework

- **React.js** - UI Framework
- **Vite** - Build tool dan development server

### UI & Styling

- **TailwindCSS** - Utility-first CSS framework
- **Shadcn/ui** - Pre-built component library
- **Lucide React** - Icons

### State Management & Forms

- **Zustand** - State management
- **Formik** - Form handling
- **Zod** - Schema validation

### Routing & Utilities

- **React Router Dom** - Client-side routing
- **Sonner** - Toast notifications

## 📦 Installation

### Setup Instructions

1. **Clone repository**

   ```bash
   git clone https://github.com/thefarhany/kontakku.git
   cd kontakku
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Start development server**

   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

4. **Build for production**

   ```bash
   npm run build
   # or
   yarn build
   # or
   pnpm build
   ```

5. **Preview production build**
   ```bash
   npm run preview
   # or
   yarn preview
   # or
   pnpm preview
   ```

### Customization

- **Styling**: Edit `index.css` untuk custom design system
- **Validation**: Modify `src/lib/schemas.js` untuk validation rules
- **Storage**: Change storage mechanism di `useContactStore.js`

## 🙏 Acknowledgments

- [React](https://reactjs.org/) - UI Framework
- [TailwindCSS](https://tailwindcss.com/) - CSS Framework
- [Radix UI](https://www.radix-ui.com/) - UI Components
- [Shadcn/ui](https://ui.shadcn.com/) - Component Library
- [Zod](https://zod.dev/) - Schema Validation
