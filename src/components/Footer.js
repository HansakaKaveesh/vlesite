// components/Footer.js
const Footer = () => {
    return (
        <footer className="bg-gray-800 text-white py-6"> {/* Using a darker gray */}
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <p className="text-sm">
                    © 2024 VLE Website. All rights reserved.
                </p>
                <p className="mt-2">
                    <a href="/privacy" className="hover:underline">Privacy Policy</a> | 
                    <a href="/terms" className="hover:underline ml-2">Terms of Service</a>
                </p>
            </div>
        </footer>
    );
};

export default Footer;
