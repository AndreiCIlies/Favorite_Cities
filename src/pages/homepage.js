import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import Link from "next/link";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export default function HomePage() {
  return (
    <div>
      <MenuRoot>
        <MenuTrigger>
          Menu
        </MenuTrigger>
          <MenuContent>
            <Link href="/search">
              <MenuItem value="Search">Search</MenuItem>
            </Link>
            <Link href="/favorites">
              <MenuItem value="Favorites">Favorites</MenuItem>
            </Link>
          </MenuContent>
      </MenuRoot>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
      </div>
    </div>
  );
}