import { notFound } from "next/navigation";

/** Unknown paths under /en or /th get the localized 404 inside the site layout. */
export default function MissingPage() {
  notFound();
}
