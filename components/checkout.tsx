"use client"

import { useCallback } from "react"
import { EmbeddedCheckout, EmbeddedCheckoutProvider } from "@stripe/react-stripe-js"
import { loadStripe } from "@stripe/stripe-js"
import { startCheckoutSession } from "@/app/actions/stripe"

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!)

export default function Checkout({
  trainingCenterId,
  trainingCenterName,
  priceInCents,
}: {
  trainingCenterId: string
  trainingCenterName: string
  priceInCents: number
}) {
  const startCheckoutSessionForProduct = useCallback(async () => {
    const secret = await startCheckoutSession(trainingCenterId, trainingCenterName, priceInCents)
    if (!secret) {
      throw new Error("Failed to create checkout session")
    }
    return secret
  }, [trainingCenterId, trainingCenterName, priceInCents])

  return (
    <div id="checkout" className="w-full">
      <EmbeddedCheckoutProvider stripe={stripePromise} options={{ fetchClientSecret: startCheckoutSessionForProduct }}>
        <EmbeddedCheckout />
      </EmbeddedCheckoutProvider>
    </div>
  )
}
