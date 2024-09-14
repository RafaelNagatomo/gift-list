import "./globals.css";
import { Poppins } from "next/font/google";
import Header from "../components/Header";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "500", "600", "700", "800", "900"] });

export const metadata = {
  title: "FSW Trips",
  description: "Sistema de Reserva de Viagens TOP!",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={poppins.className}>
        <div className="flex flex-col h-screen">
          <div className="h-[85px]">
            <Header />
          </div>

          <div className="flex-1">{children}</div>
        </div>
      </body>
    </html>
  );
}