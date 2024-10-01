# Ticketing System

## Overview

This project is a **QR code-based ticketing system** built using **Next.js** and **React**. The system allows users to generate transport tickets with a QR code that includes a validation signature to prevent tampering. Users can also validate these tickets using a QR code scanner and verify their authenticity. The application features two main pages:

1. **Ticket Generator Page**: Users can generate a ticket with a specified validity date and time. A QR code is created and displayed for the ticket.
2. **Ticket Validator Page**: Users can scan a QR code using their device’s camera to verify the authenticity of the ticket.

## Features

- **QR Code Generation**: Generates a secure QR code for tickets using `crypto` and HMAC signatures.
- **QR Code Validation**: Scans QR codes and checks if the ticket is valid and unmodified.
- **Mobile Camera Support**: Uses the device’s camera to scan QR codes (with support for front and rear cameras).
- **Lucide Icons**: Provides visual feedback (green check for valid tickets and red cross for invalid tickets).
- **Dynamic QR Scanner Import**: Improves performance by only loading the QR scanner on the client-side.
  
## Tech Stack

- **Frontend**: React (Next.js), TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes
- **Database**: Prisma ORM (MongoDB)
- **QR Code Library**: `qrcode` for generating QR codes
- **Icons**: `lucide-react` for UI feedback
- **Styling**: Tailwind CSS


This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
