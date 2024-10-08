import Feature from "@/components/Feature";
import Link from "next/link";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">
      {/* Hero Section */}
      <div className="flex flex-col items-center justify-center text-center py-12 sm:py-36 px-4 sm:px-6 lg:px-8">
        <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-500 to-purple-600">
          Welcome to EasyTransport
        </h1>
        <p className="mt-4 text-base sm:text-lg md:text-xl lg:text-2xl text-gray-300 max-w-2xl">
          The fastest and most convenient way to generate, manage, and validate your transport tickets. Seamless, secure, and at your fingertips.
        </p>
        <div className="flex flex-col sm:flex-row gap-3 mt-8">
          <Link href="/qrcode" className="px-6 py-3 text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600 text-white font-bold rounded-lg shadow-lg transition">
            Generate Ticket
          </Link>
          <Link href="validator" className="px-6 py-3 text-sm sm:text-base md:text-lg lg:text-xl bg-gradient-to-r from-purple-600 to-pink-500 hover:from-purple-700 hover:to-pink-600 text-white font-bold rounded-lg shadow-lg transition">
            Validate Ticket
          </Link>
        </div>
      </div>

      {/* Feature Section */}
      <div className="py-12 sm:py-36 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold text-white">Why EasyTransport ?</h2>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Features */}
            <Feature title="Instant Ticket Generation" content="Create tickets on the go, with real-time validity tracking, all in just a few clicks." color="text-green-500" />
            <Feature title="Fast and Secure Validation" content="Validate tickets in seconds with secure QR code technology, ensuring safety and authenticity." color="text-blue-400" />
            <Feature title="Seamless Experience" content="A user-friendly interface designed for speed and simplicity. Manage your trips effortlessly." color="text-purple-400" />
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-12 sm:py-36 bg-gradient-to-r from-green-600 to-blue-500 text-center p-5">
        <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-white">
          Start your journey with EasyTransport today !
        </h2>
        <p className="mt-4 text-sm sm:text-base md:text-lg lg:text-xl text-gray-200">
          Get your tickets in seconds and travel with ease. Trusted by thousands of commuters.
        </p>
        <div className="mt-8">
          <button className="px-8 py-3 text-sm sm:text-base md:text-lg lg:text-xl bg-white text-green-600 font-bold rounded-lg shadow-lg transition hover:bg-white/90">
            Get Started
          </button>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm sm:text-base md:text-lg text-gray-400">
            © 2024 EasyTransport. All Rights Reserved.
          </p>
          <p className="mt-2 text-xs sm:text-sm md:text-base text-gray-400">
            Fast. Simple. Secure. Your trusted ticketing solution.
          </p>
        </div>
      </footer>
    </div>
  );
}
