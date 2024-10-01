"use client";

import Link from 'next/link';

const Header = () => {
    return (
        <header className="bg-blue-600 p-4 text-white">
            <h1 className="text-xl font-bold">Application de Billetterie</h1>
            <nav className="mt-2">
                <Link href="/qrcode" className="text-white hover:underline mr-4">Générer Billet</Link>
                <Link href="/validator" className="text-white hover:underline">Valider Billet</Link>
            </nav>
        </header>
    );
};

export default Header;