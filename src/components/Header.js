'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const Header = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [activeDropdown, setActiveDropdown] = useState(null);
    const [dropdownTimer, setDropdownTimer] = useState(null);
    const router = useRouter();
    const [scrollTopVisible, setScrollTopVisible] = useState(false);
    const [headerStyle, setHeaderStyle] = useState('bg-transparent');

    const toggleMenu = () => {
        setIsOpen((prev) => !prev);
    };

    const handleNavigation = (path) => {
        router.push(path);
        setIsOpen(false);
    };

    const handleScroll = () => {
        if (window.scrollY > 300) {
            setScrollTopVisible(true);
        } else {
            setScrollTopVisible(false);
        }

        if (window.scrollY > 50) {
            setHeaderStyle('bg-gray-900 bg-opacity-80');
        } else {
            setHeaderStyle('bg-transparent');
        }
    };

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);

    const toggleDropdown = (menu) => {
        if (activeDropdown === menu) {
            setActiveDropdown(null);
            clearTimeout(dropdownTimer); // Clear any existing timer
        } else {
            setActiveDropdown(menu);
            clearTimeout(dropdownTimer); // Clear any existing timer
        }
    };

    const handleMouseEnter = (menu) => {
        setActiveDropdown(menu);
        clearTimeout(dropdownTimer); // Clear any existing timer
    };

    const handleMouseLeave = () => {
        // Set a timer to close the dropdown after 2 seconds
        const timer = setTimeout(() => {
            setActiveDropdown(null);
        }, 500);
        setDropdownTimer(timer); // Save the timer ID
    };

    return (
        <header className={`${headerStyle} fixed top-0 left-0 w-full z-50 transition-all duration-300`}>
            <nav className="max-w-full mx-auto px-5 py-4 flex items-center justify-between">
                <div 
                    className="text-2xl font-bold cursor-pointer text-white mr-4"
                    onClick={() => handleNavigation('/')} // Redirect to the main page
                >
                    GenZedu
                </div>

                <div className="hidden md:flex space-x-6 flex-grow">
                    {/* About Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('about')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href="/about">
                            <button className="bg-gray-800 text-white w-20 h-10 px-4 py-2 flex items-center justify-center rounded-lg transition duration-200 hover:bg-gray-700 shadow-lg">
                                About
                            </button>
                        </Link>
                        {activeDropdown === 'about' && (
                            <div className="absolute bg-gray-800 rounded-lg mt-2 shadow-lg">
                                <div className="p-2">
                                    <button onClick={() => handleNavigation('/about/team')} className="block text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                                        Team
                                    </button>
                                    <button onClick={() => handleNavigation('/about/history')} className="block text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                                        History
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Modules Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('modules')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href="/modules">
                            <button className="bg-gray-800 text-white w-20 h-10 px-4 py-2 flex items-center justify-center rounded-lg transition duration-200 hover:bg-gray-700 shadow-lg">
                                Modules
                            </button>
                        </Link>
                        {activeDropdown === 'modules' && (
                            <div className="absolute bg-gray-800 rounded-lg mt-2 shadow-lg">
                                <div className="p-2">
                                    <button onClick={() => handleNavigation('/modules/edexcel')} className="block text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                                        Edexcel
                                    </button>
                                    <button onClick={() => handleNavigation('/modules/cambridge')} className="block text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                                        Cambridge
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Courses Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('courses')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href="/courses">
                            <button className="bg-gray-800 text-white px-4 py-2 w-20 h-10 flex items-center justify-center rounded-lg transition duration-200 hover:bg-gray-700 shadow-lg">
                                Courses
                            </button>
                        </Link>
                        {activeDropdown === 'courses' && (
                            <div className="absolute bg-gray-800 rounded-lg mt-2 shadow-lg">
                                <div className="p-2">
                                    <button onClick={() => handleNavigation('/courses/ict')} className="block text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                                        Programming
                                    </button>
                                    <button onClick={() => handleNavigation('/courses/cs')} className="block text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                                        Design
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Contact Dropdown */}
                    <div 
                        className="relative"
                        onMouseEnter={() => handleMouseEnter('contact')}
                        onMouseLeave={handleMouseLeave}
                    >
                        <Link href="/contact">
                            <button className="bg-gray-800 text-white w-20 h-10 px-4 py-2 flex items-center justify-center rounded-lg transition duration-200 hover:bg-gray-700 shadow-lg">
                                Contact
                            </button>
                        </Link>
                        {activeDropdown === 'contact' && (
                            <div className="absolute bg-gray-800 rounded-lg mt-2 shadow-lg">
                                <div className="p-2">
                                    <button onClick={() => handleNavigation('/contact/support')} className="block text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                                        Support
                                    </button>
                                    <button onClick={() => handleNavigation('/contact/sales')} className="block text-white px-4 py-2 rounded-lg hover:bg-gray-600 transition duration-200">
                                        Sales
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {/* Sign In and Register Buttons */}
                <div className="hidden md:flex space-x-4">
                    <button onClick={() => handleNavigation('/login')} className="bg-blue-600 text-white w-20 h-10 px-4 py-2 flex items-center justify-center rounded-lg transition duration-200 hover:bg-blue-500 shadow-lg">
                        Sign In
                    </button>
                    <button onClick={() => handleNavigation('/register')} className="bg-green-600 text-white w-20 h-10 px-4 py-2 flex items-center justify-center rounded-lg transition duration-200 hover:bg-green-500 shadow-lg">
                        Register
                    </button>
                </div>

                {/* Mobile Menu Button */}
                <div className="md:hidden">
                    <button onClick={toggleMenu} className="text-white focus:outline-none">
                        <svg
                            className="h-6 w-6"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    </button>
                </div>
            </nav>

            {isOpen && (
                <div className="md:hidden bg-gray-800 p-4 rounded-lg shadow-lg">
                    <div className="flex flex-col space-y-4">
                        <button onClick={() => handleNavigation('/about')} className="bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-gray-600 shadow-lg">About</button>
                        <button onClick={() => handleNavigation('/modules')} className="bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-gray-600 shadow-lg">Modules</button>
                        <button onClick={() => handleNavigation('/courses')} className="bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-gray-600 shadow-lg">Courses</button>
                        <button onClick={() => handleNavigation('/contact')} className="bg-gray-700 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-gray-600 shadow-lg">Contact</button>
                        <button onClick={() => handleNavigation('/login')} className="bg-blue-600 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-blue-500 shadow-lg">Sign In</button>
                        <button onClick={() => handleNavigation('/register')} className="bg-green-600 text-white px-4 py-2 rounded-lg transition duration-200 hover:bg-green-500 shadow-lg">Register</button>
                    </div>
                </div>
            )}

            {scrollTopVisible && (
                <button onClick={scrollToTop} className="fixed bottom-5 right-5 bg-gray-800 text-white p-3 rounded-full shadow-lg focus:outline-none">
                    <svg
                        className="h-6 w-6"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M5 15l7-7 7 7"
                        />
                    </svg>
                </button>
            )}
        </header>
    );
};

export default Header;
