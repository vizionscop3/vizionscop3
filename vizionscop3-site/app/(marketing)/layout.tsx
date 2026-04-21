import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

export default function MarketingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <Header />
      <main id="main-content" className="w-full min-w-0">
        {children}
      </main>
      <Footer />
    </>
  );
}
