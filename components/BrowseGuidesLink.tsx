import Link from "next/link";

export function BrowseGuidesLink() {
  return (
    <p className="mt-10 text-center text-body">
      <Link href="/guides/" className="text-accent hover:underline">
        Browse all guides →
      </Link>
    </p>
  );
}
