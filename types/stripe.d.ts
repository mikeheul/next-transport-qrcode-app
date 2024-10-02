// declare module '@stripe/react-stripe-js' {
//     import { ElementType } from 'react';
//     import { Stripe, StripeElements, StripeCardElement } from '@stripe/stripe-js';

//     export const Elements: ElementType;
//     export const useStripe: () => Stripe | null;
//     export const useElements: () => StripeElements | null;
//     export const CardElement: ElementType;

//     export interface CardElementOptions {
//         style?: {
//             base?: {
//                 color?: string;
//                 fontSize?: string;
//                 iconColor?: string;
//                 fontFamily?: string;
//                 fontWeight?: string;
//                 fontStyle?: string;
//                 letterSpacing?: string;
//                 lineHeight?: string;
//                 padding?: string;
//             };
//             invalid?: {
//                 color?: string;
//                 iconColor?: string;
//             };
//             complete?: {
//                 color?: string;
//             };
//         };
//         hidePostalCode?: boolean;
//     }
// }