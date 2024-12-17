// src/app/layout.server.js

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export const metadata = {
    title: 'Registration Form',
    description: 'A registration page with Tailwind styling',
};

export default function RootLayout({ children }) {
    return (
        <html lang="en">
            <body>
                <Navbar />
                <main className="flex-grow pt-20">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    );
}
