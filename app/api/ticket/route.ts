import { db } from "@/lib/db";
import { generateQRCode } from "@/lib/qrcode";
import { NextRequest, NextResponse } from "next/server";
import crypto from 'crypto'

const SECRET_KEY = process.env.SECRET_KEY || "b9f3150f283cdff4725b8b9e3c65b4bb935ac153b9f2b4415b02f5c1aa76261f"

export async function POST(req: NextRequest) {

    const { validUntil } = await req.json();
    
    try {
        
        const ticketData = {
            validUntil: new Date(validUntil).toISOString(),
        };

        // Générer une signature HMAC pour rendre le QR code infalsifiable
        const signature = crypto.createHmac('sha256', SECRET_KEY)
            .update(JSON.stringify(ticketData))
            .digest('hex');

        // Ajouter la signature aux données du billet
        const qrCodeData = { ...ticketData, signature };

        const qrCode = await generateQRCode(JSON.stringify(qrCodeData));

        const ticket = await db.ticket.create({
            data: {
                qrCode,
                validUntil: ticketData.validUntil,
            },
        });

        return NextResponse.json(ticket, { status: 200 });

    } catch (error) {
        console.error("[CREATE_TICKET]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function GET() {
    
    try {

        const tickets = await db.ticket.findMany({
            orderBy: {
                validUntil: 'asc'
            }
        });

        return NextResponse.json(tickets, { status: 200 });

    } catch (error) {
        console.error("[GET_TICKET]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}

export async function DELETE(req: NextRequest) {

    const { searchParams } = new URL(req.url);
    const ticketId = searchParams.get('ticketId');
    
    if (!ticketId) {
        return NextResponse.json({ message: "Ticket ID is required" }, { status: 400 });
    }

    try {

        const deletedTicket = await db.ticket.delete({
            where: {
                id: ticketId,
            },
        });

        // If no meal plan is found or deleted, return an error response
        if (!deletedTicket) {
            return NextResponse.json({ message: "Ticket not found" }, { status: 404 });
        }

        return NextResponse.json({ message: "Ticket deleted successfully!" }, { status: 200 });

    } catch (error) {
        console.error("[DELETE_TICKET]", error);
        return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
    }
}