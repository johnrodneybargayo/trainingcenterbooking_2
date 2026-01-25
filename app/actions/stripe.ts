"use server"

import { stripe } from "@/lib/stripe"

export async function startCheckoutSession(trainingCenterId: string, trainingCenterName: string, priceInCents: number) {
  const session = await stripe.checkout.sessions.create({
    ui_mode: "embedded",
    redirect_on_completion: "never",
    line_items: [
      {
        price_data: {
          currency: "usd",
          product_data: {
            name: trainingCenterName,
            description: `Training Center Course - ${trainingCenterName}`,
          },
          unit_amount: priceInCents,
        },
        quantity: 1,
      },
    ],
    mode: "payment",
  })

  return session.client_secret
}
