import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export default function GuidesLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <Header />
      <main className="flex-1 px-4 py-16">
        <div className="mx-auto max-w-reading">{children}</div>
      </main>
      <Footer />
    </>
  );
}
