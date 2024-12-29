import localFont from "next/font/local";
import styles from "@/styles/Home.module.css";
import {
  MenuContent,
  MenuItem,
  MenuRoot,
  MenuTrigger,
} from "@/components/ui/menu";
import { Box, Text } from "@chakra-ui/react"
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
    <Box
      backgroundImage="url('/images/2.jpg')"
      backgroundSize="cover"
      minH="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      textAlign="center"
    >
      <MenuRoot>
        <MenuTrigger>
          <Text
            fontSize="3xl"
            fontWeight="bold"
            color="white"
            backgroundColor="black"
            fontFamily="georgia"
            width="8cm"
          >
            - Menu -
          </Text>
        </MenuTrigger>
          <MenuContent
            style={{
              width: "8cm"
            }}
          >
            <Link href="/search">
              <MenuItem value="Search">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="black"
                  fontFamily="georgia"
                  textAlign="center"
                  width="100%"
                  marginTop="2"
                  marginBottom="2"
                >
                  Search
                </Text>
              </MenuItem>
            </Link>
            <Link href="/favorites">
              <MenuItem value="Favorites">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="black"
                  fontFamily="georgia"
                  textAlign="center"
                  width="100%"
                  marginBottom="2"
                >
                  Favorites
                </Text>
              </MenuItem>
            </Link>
            <Link href="/randomCities">
              <MenuItem value="Random Cities">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="black"
                  fontFamily="georgia"
                  textAlign="center"
                  width="100%"
                  marginBottom="2"
                >
                  Random Cities
                </Text>
              </MenuItem>
            </Link>
            <Link href="/yourLocation">
              <MenuItem value="Your Location">
                <Text
                  fontSize="2xl"
                  fontWeight="bold"
                  color="black"
                  fontFamily="georgia"
                  textAlign="center"
                  width="100%"
                  marginBottom="2"
                >
                  Your Location
                </Text>
              </MenuItem>
            </Link>
          </MenuContent>
      </MenuRoot>
      <div
        className={`${styles.page} ${geistSans.variable} ${geistMono.variable}`}
      >
      </div>
    </Box>
  );
}