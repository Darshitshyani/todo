import localFont from "next/font/local";
import Todo from "@/components/todo";

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

export default function Home() {
  return (
    <div className="h-screen bg-gray-300 overflow-hidden">
      <Todo />
    </div>
  );
}
