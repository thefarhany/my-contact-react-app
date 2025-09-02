import { useEffect } from "react";

export default function usePageTitle(title) {
  useEffect(() => {
    document.title = title ? `MyContact | ${title}` : "MyContact";
  }, [title]);
}
