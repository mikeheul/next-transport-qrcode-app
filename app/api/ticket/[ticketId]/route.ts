// Import necessary modules
import { db } from '@/lib/db'; // Assuming you have a database module for db operations
import { NextRequest, NextResponse } from 'next/server';

// Define a GET function that handles incoming requests for ticket details
export async function GET(req: NextRequest, { params }: { params: { ticketId: string } }) {

    // Extract ticketId from the request parameters
    const { ticketId } = params;

    try {
        // Fetch ticket details from the database
        const ticket = await db.ticket.findUnique({
            where: {
                id: ticketId
            }
        });

        // If the ticket does not exist, return a 404 error
        if (!ticket) {
            return new NextResponse("Ticket not found", { status: 404 });
        }

        // Return the ticket data as a JSON response
        return NextResponse.json(ticket);

    } catch (error) {
        // Log any errors that occur during the execution
        console.error("[TICKET]", error);

        // Return an internal server error response
        return new NextResponse("Internal Error", { status: 500 });
    }
}
