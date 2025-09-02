import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button.jsx";
import { Facebook, Instagram, Phone, Twitter, User } from "lucide-react";
import { useContactStore } from "@/store/useContactStore.js";
import { toast } from "sonner";
import { Link, useNavigate } from "react-router-dom";

const ContactModal = ({ contact, children }) => {
  const { deleteContact } = useContactStore();
  const navigate = useNavigate();

  const hasSocialMedia =
    contact.instagram || contact.facebook || contact.twitter;

  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <div className="flex items-center gap-3 mb-4">
            {contact.avatar ? (
              <img
                src={contact.avatar}
                alt={`${contact.firstName} ${contact.lastName}`}
                className="w-12 h-12 rounded-full object-cover"
              />
            ) : (
              <div className="w-12 h-12 bg-indigo-100 rounded-full flex items-center justify-center">
                <span className="text-indigo-600 font-bold text-lg">
                  {contact.firstName.charAt(0)}
                  {contact.lastName?.charAt(0) || ""}
                </span>
              </div>
            )}
            <div>
              <DialogTitle className="text-xl">
                {contact.firstName} {contact.lastName}
              </DialogTitle>
              <DialogDescription>{contact.category}</DialogDescription>
            </div>
          </div>
        </DialogHeader>
        <div className="space-y-4">
          <div className="flex items-center gap-3">
            <Phone className="w-5 h-5 text-gray-500" />
            <div>
              <p className="text-sm text-gray-600">Telepon</p>
              <p className="font-medium">{contact.phone}</p>
            </div>
          </div>

          {hasSocialMedia && (
            <div className="pt-4 border-t border-gray-200">
              <h4 className="font-semibold mb-3">Social Media</h4>
              <div className="flex gap-2 flex-wrap">
                {contact.instagram && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <Instagram className="w-4 h-4" />
                    <span className="text-sm">{contact.instagram}</span>
                  </div>
                )}
                {contact.twitter && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <Twitter className="w-4 h-4" />
                    <span className="text-sm">{contact.twitter}</span>
                  </div>
                )}
                {contact.facebook && (
                  <div className="flex items-center gap-2 px-3 py-2 bg-gray-100 rounded-lg">
                    <Facebook className="w-4 h-4" />
                    <span className="text-sm">{contact.facebook}</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        <div className="flex gap-3 pt-4 border-t border-gray-200">
          <Link to={`/edit-contact/${contact.id}`}>
            <Button variant="outline" className="flex-1">
              Edit
            </Button>
          </Link>
          <Button
            variant="destructive"
            className="flex-1"
            onClick={() => {
              deleteContact(contact.id);
              toast.success("Kontak Berhasil Dihapus");
            }}
          >
            Hapus
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ContactModal;
