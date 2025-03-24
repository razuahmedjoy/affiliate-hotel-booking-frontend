import { useEffect, useState } from "react"
import { Button } from '@/components/ui/button'
import { Card } from '@/components/ui/card'
import { Skeleton } from '@/components/ui/skeleton'
const BalanceSection = () => {
    const [balance, setBalance] = useState(null)

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setBalance(4500.75)
        }, 1000)
    }, [])

    return (
        <Card className="p-6 mb-6">
            <div className="flex justify-between items-center">
                <div>
                    <h2 className="text-lg font-semibold">Current Balance</h2>
                    {balance !== null ? (
                        <div className="text-3xl font-bold">${balance.toFixed(2)}</div>
                    ) : (
                        <Skeleton className="h-8 w-40 mt-2" />
                    )}
                </div>
                <Button>Request Withdrawal</Button>
            </div>
        </Card>
    )
}


export default BalanceSection