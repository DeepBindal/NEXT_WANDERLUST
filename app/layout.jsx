import "@styles/globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Nav from "@components/Nav";
import { Toaster } from "react-hot-toast";
import Footer from "@components/footer";

export const metadata = {
  title: "Wanderlust",
  description: "Hotel booking",
};
const RootLayout = ({ children }) => {
  return (
    <ClerkProvider>
      <html lang="en">
        <body>
          <Nav />
          <div className="main">
            <div className="gradient" />
          </div>
          <main className="app">{children}</main>
          <Toaster position="top-center" reverseOrder={false} />
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
};

export default RootLayout;
