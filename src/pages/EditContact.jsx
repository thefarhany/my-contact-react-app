import React, { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useContactStore } from "@/store/useContactStore.js";
import { toast } from "sonner";
import { contactSchema, initialContactValue } from "../lib/schemas";
import { useFormik } from "formik";
import { ChevronLeft, Facebook, Instagram, Save, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator.jsx";
import { Label } from "@/components/ui/label.jsx";
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

const EditContact = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getContact, updateContact } = useContactStore();

  const contact = getContact(id);

  useEffect(() => {
    if (!contact) {
      navigate("/", {
        state: {
          message: "Kontak Tidak Ditemukan",
          type: "error",
        },
      });
      toast.error("Kontak Tidak Ditemukan");
    }
  }, [contact, navigate]);

  const validate = (values) => {
    try {
      contactSchema.parse(values);
      return {};
    } catch (error) {
      const errors = {};

      if (error.issues) {
        error.issues.forEach((issue) => {
          const path = issue.path[0];
          errors[path] = issue.message;
        });
      }

      return errors;
    }
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: contact || initialContactValue,
    validate,
    validateOnBlur: true,
    validateOnChange: false,
    onSubmit: (values, { setSubmitting }) => {
      const result = updateContact(id, values);

      if (result.success) {
        navigate("/", {
          state: { message: "Kontak Berhasil Diperbarui" },
        });
        toast.success("Kontak Berhasil Diperbarui");
      } else {
        console.error("Update Error:", result.errors);
        if (result.errors) {
          formik.setErrors(result.errors);
          toast.error("Validasi Gagal. Periksa form Anda.");
        } else {
          toast.error("Terjadi Kesalahan Saat Memperbarui Kontak");
        }
      }
      setSubmitting(false);
    },
  });

  usePageTitle("Edit Contact");

  return (
    <div className="py-6">
      <div className="flex flex-col gap-6">
        <h4
          onClick={() => navigate(-1)}
          className="flex items-center justify-center gap-2 px-2 pr-4 py-2 bg-gray-200 w-fit rounded-md text-sm font-semibold text-gray-600 cursor-pointer"
        >
          <ChevronLeft /> Kembali
        </h4>
        <h2 className="text-2xl font-bold">Edit Kontak</h2>
      </div>

      <Separator className="my-3" />

      <form onSubmit={formik.handleSubmit}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-3">
            <Label htmlFor="firstName" className="text-gray-700 font-medium">
              Nama Depan
            </Label>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
              className={
                formik.touched.firstName && formik.errors.firstName
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }
              placeholder="Masukkan Nama Depan"
            />
            {formik.touched.firstName && formik.errors.firstName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.firstName}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="lastName" className="text-gray-700 font-medium">
              Nama Belakang
            </Label>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
              className={
                formik.touched.lastName && formik.errors.lastName
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }
              placeholder="Masukkan Nama Belakang"
            />
            {formik.touched.lastName && formik.errors.lastName && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.lastName}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6">
          <div className="space-y-3">
            <Label htmlFor="phone" className="text-gray-700 font-medium">
              Nomor Telepon
            </Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.phone}
              className={
                formik.touched.phone && formik.errors.phone
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }
              placeholder="Masukan Nomor Telepon"
            />
            {formik.touched.phone && formik.errors.phone && (
              <p className="text-red-500 text-sm mt-1">{formik.errors.phone}</p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="avatar" className="text-gray-700 font-medium">
              Photo Profile
              <span className="text-gray-400 font-normal">(Opsional)</span>
            </Label>
            <Input
              id="avatar"
              name="avatar"
              type="url"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.avatar}
              className={
                formik.touched.avatar && formik.errors.avatar
                  ? "border-red-500 focus:ring-red-500"
                  : ""
              }
              placeholder="Masukkan URL Photo"
            />
            {formik.touched.avatar && formik.errors.avatar && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.avatar}
              </p>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
          <div className="space-y-3">
            <Label htmlFor="instagram" className="text-gray-700 font-medium">
              Instagram
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Instagram className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="instagram"
                name="instagram"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.instagram}
                className={`pl-10 ${
                  formik.touched.instagram && formik.errors.instagram
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
                placeholder="username (tanpa @)"
              />
            </div>
            {formik.touched.instagram && formik.errors.instagram && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.instagram}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="facebook" className="text-gray-700 font-medium">
              Facebook
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Facebook className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="facebook"
                name="facebook"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.facebook}
                className={`pl-10 ${
                  formik.touched.facebook && formik.errors.facebook
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
                placeholder="username (tanpa @)"
              />
            </div>
            {formik.touched.facebook && formik.errors.facebook && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.facebook}
              </p>
            )}
          </div>
          <div className="space-y-3">
            <Label htmlFor="twitter" className="text-gray-700 font-medium">
              Twitter
            </Label>
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Twitter className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                id="twitter"
                name="twitter"
                type="text"
                onChange={formik.handleChange}
                onBlur={formik.handleBlur}
                value={formik.values.twitter}
                className={`pl-10 ${
                  formik.touched.twitter && formik.errors.twitter
                    ? "border-red-500 focus:ring-red-500"
                    : ""
                }`}
                placeholder="username (tanpa @)"
              />
            </div>
            {formik.touched.twitter && formik.errors.twitter && (
              <p className="text-red-500 text-sm mt-1">
                {formik.errors.twitter}
              </p>
            )}
          </div>
        </div>

        <div className="space-y-3 mt-6">
          <Label htmlFor="category" className="text-gray-700 font-medium">
            Kategori
          </Label>
          <Select
            value={formik.values.category}
            onValueChange={(value) => formik.setFieldValue("category", value)}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Pilih Kategori" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Teman">Teman</SelectItem>
              <SelectItem value="Keluarga">Keluarga</SelectItem>
              <SelectItem value="Kerja">Kerja</SelectItem>
              <SelectItem value="Lainnya">Lainnya</SelectItem>
            </SelectContent>
          </Select>
          {formik.touched.category && formik.errors.category && (
            <p className="text-red-500 text-sm mt-1">
              {formik.errors.category}
            </p>
          )}
        </div>

        <div className="space-y-3 mt-6">
          <Button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className="w-full sm:w-auto float-end"
          >
            <Save className="mr-2" />
            {formik.isSubmitting ? "Menyimpan..." : "Perbarui Kontak"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditContact;
