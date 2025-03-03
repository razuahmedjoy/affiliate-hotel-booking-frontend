import { Button } from "@/components/ui/button"
import { Link } from "react-router"

export function Hero() {
    return (
        <section id="hero" className="bg-white py-20">
            <div className="container mx-auto px-4 text-center">
                <h1 className="mb-4 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl md:text-6xl">
                    Simplify Your Hotel Bookings
                </h1>
                <p className="mx-auto mb-8 max-w-2xl text-xl text-gray-500">
                    Streamline your hotel management process with our intuitive booking software. Save time, increase efficiency,
                    and delight your guests.
                </p>
                <div className="flex justify-center space-x-4">
                    <Button size="lg" asChild>
                        <Link to="/auth/affiliate/register">Start Affiliate Today</Link> 
                    </Button>
                    <Button size="lg" variant="outline" asChild>
                        <Link to="#">Watch Demo</Link>
                    </Button>
                </div>
            </div>
        </section>
    )
}

