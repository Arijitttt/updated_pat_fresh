import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto max-w-2xl px-6 py-24 text-center">
      <h1 className="font-display text-3xl font-medium text-navy">Page not found</h1>
      <p className="mt-3 text-sm text-navy/60">
        The page you're looking for doesn't exist, or the product may have
        been removed from the catalogue.
      </p>
      <Link
        href="/"
        className="mt-6 inline-block rounded-sm bg-navy px-5 py-3 text-sm text-white hover:bg-ember"
      >
        Back to home
      </Link>
    </section>
  );
}
