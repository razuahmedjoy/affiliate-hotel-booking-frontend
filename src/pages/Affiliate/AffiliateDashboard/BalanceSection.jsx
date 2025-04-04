import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogClose,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";

const BalanceSection = () => {
    const [balance, setBalance] = useState(null);
    const [open, setOpen] = useState(false);
    const [amount, setAmount] = useState("");
    const [error, setError] = useState(null);
    const [success, setSuccess] = useState(false);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        // Simulate API call
        setTimeout(() => {
            setBalance(4500.75);
        }, 1000);
    }, []);

    const handleWithdraw = () => {
        // You can add your validation or API call here
        if (amount <= 0 || amount > balance) {
            setError("Invalid amount. Please enter a valid withdrawal amount.");
            return;
        }
        // setOpen(false);
        // setAmount("");
        setLoading(true);
        setTimeout(() => {
            setSuccess(true);
            setLoading(false);
        }, 2000);

    };

    const handleWithdrawRequestButton = () => {
        // Simulate API call
        setError(null);
        setOpen(true);
    }

    const handleClose = () => {
        setOpen(false);
        setAmount("");
        setSuccess(false);
        setError(null);
    }


    return (
        <>
            <Card className="p-6 mb-6">
                <div className="flex justify-between items-center">
                    <div>
                        <h2 className="text-lg font-semibold">Current Balance</h2>
                        {balance !== null ? (
                            <div className="text-3xl font-bold">₹{balance.toFixed(2)}</div>
                        ) : (
                            <Skeleton className="h-8 w-40 mt-2" />
                        )}
                    </div>
                    <Button onClick={handleWithdrawRequestButton}>Request Withdrawal</Button>
                </div>
            </Card>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                        <DialogTitle>Withdraw Funds</DialogTitle>
                    </DialogHeader>
                    {/* success is true means withdrawn */}
                    {
                        success ? (
                            <div className="text-green-600 text-sm font-medium">
                                Thank you for submitting withdrawal request! We have received your request for Amount: ₹{amount} and are processing it. You will receive a confirmation email once the withdrawal is completed.
                            </div>
                        ) : (
                            <>
                                <p className="mb-4">Enter the amount you wish to withdraw:</p>
                                <Input
                                    type="number"
                                    value={amount}
                                    onChange={(e) => setAmount(e.target.value)}
                                    placeholder="Enter amount"
                                    className="mb-4"
                                />
                                {error && <p className="text-red-600">{error}</p>}

                            </>
                        )
                    }
                    <DialogFooter>
                        <Button
                            variant="secondary"
                            onClick={handleClose}
                        >
                            {success ? "Close" : "Cancel"}
                        </Button>
                        {
                            !success && (
                                <Button onClick={handleWithdraw}>
                                    {loading ? "Processing..." : "Withdraw"}
                                </Button>

                            )
                        }
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default BalanceSection;
