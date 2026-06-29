import Header from "@/components/layout/Header";
import BackToTopButton from "@/components/shared/BackToTopButton";

export default function MainLayout({ children }) {
  return (
    <main className="dark min-h-screen bg-background font-mono text-foreground">
      <div className="engineering-grid pointer-events-none fixed inset-0 z-0 opacity-60" />
      <Header />
      <div className="relative z-10">{children}</div>
      <BackToTopButton />
    </main>
  );
}
