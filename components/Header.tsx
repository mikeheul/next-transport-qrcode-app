"use client";

import Link from 'next/link';
import { QrCode, CheckCircle } from 'lucide-react'; // Import the necessary icons

const Header = () => {
    return (
        <header className="bg-slate-900 px-10 py-8 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Tickets</h1>
                <nav>
                    <ul className="flex items-center justify-center space-x-6">
                        <li>
                            <Link
                                href="/qrcode"
                                className="relative text-white hover:text-blue-400 transition duration-200 flex items-center"
                            >
                                <QrCode className="w-8 h-8 mr-2" /> {/* QR Code Icon */}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 transition-all duration-200 group-hover:scale-x-100" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/validator"
                                className="relative text-white hover:text-blue-400 transition duration-200 flex items-center"
                            >
                                <CheckCircle className="w-8 h-8 mr-2" /> {/* Check Circle Icon */}
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 transition-all duration-200 group-hover:scale-x-100" />
                            </Link>
                        </li>
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;