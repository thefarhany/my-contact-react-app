import z from "zod";

export const contactSchema = z.object({
  id: z.string().optional(),
  firstName: z
    .string()
    .min(2, "Nama Depan Minimal 2 Karakter!")
    .max(30, "Nama Depan Terlalu Panjang!!")
    .regex(/^[a-zA-Z\s]+$/, "Nama Depan Hanya Boleh Mengandung Huruf")
    .nonempty("Nama Depan Wajib Diisi!!"),
  lastName: z
    .string()
    .max(50, "Nama Belakang Terlalu Panjang!!")
    .regex(/^[a-zA-Z\s]*$/, "Nama Belakang Hanya Boleh Mengandung Huruf!!")
    .optional()
    .or(z.literal("")),
  instagram: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? `@${val.replace("@", "")}` : "")),
  twitter: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? `@${val.replace("@", "")}` : "")),
  facebook: z
    .string()
    .optional()
    .or(z.literal(""))
    .transform((val) => (val ? `@${val.replace("@", "")}` : "")),
  phone: z
    .string()
    .min(10, "Nomor Telepon Minimal 10 Digit!!")
    .max(15, "Nomor Telepon Terlalu Panjang!!")
    .regex(/^[0-9]+$/, "Format Nomor Telepon Tidak Valid (Hanya Angka)")
    .nonempty("Nomor Telepon Wajib Diisi"),
  category: z.enum(["Teman", "Keluarga", "Kerja", "Lainnya"], {
    required_error: "Pilih Kategori Kontak",
  }),
  avatar: z.string().url("URL Avatar Tidak Valid").optional().or(z.literal("")),
  isFavorite: z.boolean().default(false),
  createdAt: z.string().optional(),
  updatedAt: z.string().optional(),
});

export const initialContactValue = {
  firstName: "",
  lastName: "",
  instagram: "",
  twitter: "",
  facebook: "",
  phone: "",
  category: "Teman",
  avatar: "",
  isFavorite: false,
};
