import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { RefundPolicy } from "@/lib/products"

interface RefundPolicyCardProps {
  policies: RefundPolicy[]
  convenienceFeePercent?: number
}

export function RefundPolicyCard({ policies, convenienceFeePercent = 2 }: RefundPolicyCardProps) {
  const sortedPolicies = [...policies].sort((a, b) => b.days_before_training - a.days_before_training)

  return (
    <Card className="border-blue-200 bg-blue-50">
      <CardHeader>
        <CardTitle className="text-lg">Refund & Cancellation Policy</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {sortedPolicies.map((policy) => (
          <div
            key={policy.id}
            className="flex items-start justify-between p-3 bg-white rounded-lg border border-blue-100"
          >
            <div className="flex-1">
              <p className="font-medium text-sm text-foreground">{policy.description}</p>
              {policy.refund_percentage === 0 ? (
                <Badge variant="destructive" className="mt-2">
                  No Refund
                </Badge>
              ) : (
                <Badge variant="secondary" className="mt-2 bg-green-100 text-green-800">
                  {policy.refund_percentage}% Refund
                </Badge>
              )}
            </div>
          </div>
        ))}

        <div className="pt-4 border-t border-blue-200 mt-4">
          <p className="text-xs text-muted-foreground">
            A {convenienceFeePercent}% convenience fee will be added to your booking
          </p>
        </div>
      </CardContent>
    </Card>
  )
}
