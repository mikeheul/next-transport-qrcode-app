// app/api/stripe/create-payment-intent/route.ts
import { NextRequest, NextResponse } from 'next/server';
import Stripe from 'stripe';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, {
    apiVersion: '2024-09-30.acacia',
});

export async function POST(req: NextRequest) {
    // Parse the request body
    const { hours } = await req.json();

    console.log(hours);

    // Determine the amount based on hours
    let amount = 0;
    switch (hours) {
        case 1:
            amount = 200; // 2 euros in cents
            break;
        case 24:
            amount = 3500; // 35 euros in cents
            break;
        case 48:
            amount = 5000; // 50 euros in cents
            break;
        default:
            return NextResponse.json(
                { message: 'Invalid hours provided' },
                { status: 400 }
            ); // Changed from 'Ticket expired' to 'Invalid hours provided'
    }

    try {
        // Create a payment intent with the determined amount
        const paymentIntent = await stripe.paymentIntents.create({
            amount,
            currency: 'eur',
            automatic_payment_methods: { enabled: true },
        });

        return NextResponse.json(
            { message: "Payment intent created successfully!", clientSecret: paymentIntent.client_secret },
            { status: 200 }
        ); // Adjusted success message
    } catch (error) {
        console.error('Error creating payment intent:', error); // Log the error for debugging
        return NextResponse.json(
            { message: "Internal Server Error" },
            { status: 500 }
        );
    }
}
