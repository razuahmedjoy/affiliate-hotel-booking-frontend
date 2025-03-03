export function Footer() {
    return (
        <footer className="bg-gray-900 text-gray-300">
            <div className="container mx-auto px-4 py-8">
                <div className="grid gap-8 md:grid-cols-4">
                    <div>
                        <h3 className="mb-4 text-lg font-semibold">HotelEase</h3>
                        <p className="text-sm">Simplifying hotel management one booking at a time.</p>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase">Product</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Features
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Pricing
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Integrations
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase">Company</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    About
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Blog
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Careers
                                </a>
                            </li>
                        </ul>
                    </div>
                    <div>
                        <h4 className="mb-4 text-sm font-semibold uppercase">Support</h4>
                        <ul className="space-y-2 text-sm">
                            <li>
                                <a href="#" className="hover:text-white">
                                    Help Center
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Contact Us
                                </a>
                            </li>
                            <li>
                                <a href="#" className="hover:text-white">
                                    Privacy Policy
                                </a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="mt-8 border-t border-gray-800 pt-8 text-center text-sm">
                    © {new Date().getFullYear()} HotelEase. All rights reserved.
                </div>
            </div>
        </footer>
    )
}

