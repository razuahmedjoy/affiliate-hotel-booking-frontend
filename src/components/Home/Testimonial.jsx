import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

const testimonials = [
    {
        quote:
            "HotelEase has revolutionized our booking process. It's user-friendly and has significantly reduced our administrative workload.",
        author: "Sarah Johnson",
        role: "Hotel Manager",
        avatar: "/placeholder.svg?height=40&width=40",
    },
    {
        quote:
            "The real-time availability feature has helped us maximize our occupancy rates. Highly recommended for any hotel looking to streamline their operations.",
        author: "Michael Chen",
        role: "Boutique Hotel Owner",
        avatar: "/placeholder.svg?height=40&width=40",
    },
]

export function Testimonials() {
    return (
        <section id="testimonials" className="bg-white py-20">
            <div className="container mx-auto px-4">
                <h2 className="mb-12 text-center text-3xl font-bold text-gray-900">What Our Customers Say</h2>
                <div className="grid gap-8 md:grid-cols-2">
                    {testimonials.map((testimonial, index) => (
                        <Card key={index}>
                            <CardContent className="pt-6">
                                <p className="mb-4 text-gray-600">"{testimonial.quote}"</p>
                            </CardContent>
                            <CardFooter>
                                <Avatar className="h-10 w-10">
                                    <AvatarImage src={testimonial.avatar} alt={testimonial.author} />
                                    <AvatarFallback>{testimonial.author[0]}</AvatarFallback>
                                </Avatar>
                                <div className="ml-4">
                                    <p className="text-sm font-semibold">{testimonial.author}</p>
                                    <p className="text-sm text-gray-600">{testimonial.role}</p>
                                </div>
                            </CardFooter>
                        </Card>
                    ))}
                </div>
            </div>
        </section>
    )
}

