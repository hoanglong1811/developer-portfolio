import { profile } from "@/constants/profile";

export default function Footer() {
  return (
    <footer className="border-t border-border px-5 py-8 text-center text-xs uppercase leading-6 tracking-[0.16em] text-muted-foreground sm:px-8 sm:text-sm">
      <p>
        {profile.name} / {profile.role}
      </p>
    </footer>
  );
}
