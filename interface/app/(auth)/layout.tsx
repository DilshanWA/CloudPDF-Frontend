
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";


const geist = Geist({ subsets: ["latin"], variable: "--font-geist" });
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono" });

export const metadata: Metadata = {
  title: `CloudPDF - Convert Your Files to PDF Online`,
  description: "Convert your files to PDF quickly and easily with CloudPDF. Secure, fast, and reliable online PDF conversion.", 
};

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-screen h-screen fixed top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
        <div className="flex h-screen flex-col md:flex-row w-full">
            <div className="relative flex-1 h-screen bg-gray-300">
                <div className="absolute bottom-30 left-10 text-black">
                    <h2 className="text-4xl font-bold mb-2">Welcome to CloudPDF</h2>
                    <p className="text-lg">Your trusted online PDF conversion tool</p>
                </div>  
            </div>
            <div className="flex-2 h-screen flex items-center justify-center px-4 py-3">
                {children}
            </div>

        </div>
    </div>


  );
}
