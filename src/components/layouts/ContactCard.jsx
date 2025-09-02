import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardAction,
  CardContent,
  CardFooter,
} from "@/components/ui/card.jsx";
import { Separator } from "@/components/ui/separator.jsx";
import { Facebook, Heart, HeartPlus, Instagram, Twitter } from "lucide-react";
import ContactModal from "./ContactModal";
import { useContactStore } from "@/store/useContactStore";
import { Button } from "@/components/ui/button.jsx";
import { toast } from "sonner";

const ContactCard = ({ contact }) => {
  const { toggleFavorite } = useContactStore();

  const hasSocialMedia =
    contact.instagram || contact.facebook || contact.twitter;

  const handleToggleFavorite = (e) => {
    e.stopPropagation();
    toggleFavorite(contact.id);
    toast.success(
      contact.isFavorite
        ? "Kontak Dihapus Dari Favorite"
        : "Kontak Ditambahkan ke Favorite"
    );
  };

  return (
    <ContactModal contact={contact}>
      <Card>
        <CardHeader>
          <CardTitle className="text-xl">
            {contact.firstName} {contact.lastName}
          </CardTitle>
          <CardDescription>{contact.phone}</CardDescription>
          <CardAction>
            <Button
              onClick={handleToggleFavorite}
              className="p-2 hover:bg-gray-100 rounded-full transition"
            >
              <Heart
                className={
                  contact.isFavorite
                    ? "text-red-500 fill-red-500"
                    : "text-gray-400"
                }
              />
            </Button>
          </CardAction>
        </CardHeader>
        <CardContent>
          <p className="py-2 px-3 text-xs font-medium bg-gray-200 w-fit rounded">
            #{contact.category}
          </p>
        </CardContent>

        {hasSocialMedia && (
          <>
            <Separator />
            <CardFooter className="flex flex-col items-start gap-3">
              <h4 className="text-md font-semibold">Social Media</h4>
              <div className="flex items-center gap-3 flex-wrap">
                {contact.instagram && (
                  <p className="flex items-center gap-2 py-2 px-3 text-xs font-medium bg-gray-200 w-fit rounded">
                    <Instagram size={16} /> {contact.instagram}
                  </p>
                )}
                {contact.twitter && (
                  <p className="flex items-center gap-2 py-2 px-3 text-xs font-medium bg-gray-200 w-fit rounded">
                    <Twitter size={16} /> {contact.twitter}
                  </p>
                )}
                {contact.facebook && (
                  <p className="flex items-center gap-2 py-2 px-3 text-xs font-medium bg-gray-200 w-fit rounded">
                    <Facebook size={16} /> {contact.facebook}
                  </p>
                )}
              </div>
            </CardFooter>
          </>
        )}
      </Card>
    </ContactModal>
  );
};

export default ContactCard;
