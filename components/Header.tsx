"use client";

import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-slate-900 px-10 py-8 shadow-md">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-2xl font-bold text-white">Billetterie</h1>
                <nav className="mt-2">
                    <ul className="flex space-x-6">
                        <li>
                            <Link
                                href="/qrcode"
                                className="relative text-white hover:text-blue-400 transition duration-200"
                            >
                                Générer Billet
                                <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 transition-all duration-200 group-hover:scale-x-100" />
                            </Link>
                        </li>
                        <li>
                            <Link
                                href="/validator"
                                className="relative text-white hover:text-blue-400 transition duration-200"
                            >
                                Valider Billet
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