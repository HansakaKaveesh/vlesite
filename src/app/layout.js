// src/app/layout.js
"use client"; // Mark this file as a Client Component

import './globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { UserProvider } from '@/context/UserContext'; // Import UserProvider



export default function RootLayout({ children }) {
    return (
        <UserProvider>
            <html lang="en">
                <body>
                    <Navbar />
                    <main className="flex-grow"> {/* Added pt-20 for padding below the header */}
                        {children}
                    </main>
                    <Footer />
                </body>
            </html>
        </UserProvider>
    );
}
