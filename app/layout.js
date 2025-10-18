import { Outfit } from "next/font/google";
import "./globals.css";
import { AppContextProvider } from "@/context/AppContext";
import { Toaster } from "react-hot-toast";
import {
  ClerkProvider,
  SignInButton,
  SignUpButton,
  SignedIn,
  SignedOut,
  UserButton,
} from "@clerk/nextjs";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const outfit = Outfit({ subsets: ["latin"], weight: ["300", "400", "500"] });

export const metadata = {
  title: "Ilearnig solutions",
  description: "ePlatform for learning",
};

export default function RootLayout({ children }) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body
          suppressHydrationWarning
          className={`${outfit.className} antialiased text-gray-700`}
        >
          <Toaster />

          <AppContextProvider>
            {/* <Navbar /> */}
            {children}
            {/* <Footer /> */}
          </AppContextProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
