import { downloadPDF } from '@/services/Affiliate/affiliateDashboard';
import useAuthStore from '@/store/authStore';
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import YolastPDFTemplate, { AffiliateQRPDF } from '@/components/Affiliate/AffiliateQRTemplate';
// Example data for the dashboard
const dashboardData = {
    affiliatesRegistered: 20,
    totalEarnings: 5000, // in INR
    stats: {
        totalClicks: 1500,
        totalConversions: 100,
        conversionRate: '6.67%',
    },
    paymentLink: 'https://razorpay.com/paymentlink/yourlink', // example payment link
    qrCodeUrl: 'https://api.qrserver.com/v1/create-qr-code/?data=Affiliate%20ID%3A%20614109d6-011e-486f-bd20-18459a4bb724&size=200x200', // Replace with actual QR code URL
};

const Dashboard = () => {
    const { user } = useAuthStore(); // Get the user object from the auth store
    const [copySuccess, setCopySuccess] = useState('');
    const inputRef = React.useRef(null); // Create a ref for the input field

    // Function to copy the payment link to clipboard
    const handleCopyLink = () => {
        navigator.clipboard.writeText(inputRef.current.value).then(
            () => setCopySuccess('Payment link copied to clipboard!'),
            () => setCopySuccess('Failed to copy payment link.')
        );
    };

    const handleDownloadQR = async () => {
        // Download the QR code
        await downloadPDF();
    }
    console.log(user);
    return (
        <div className="container mx-auto p-4">
            <h2 className="text-3xl font-semibold text-center">Agent Dashboard</h2>

            <div className="grid grid-cols md:grid-cols-2 gap-5">

                <div>
                    <div className="grid grid-cols-1 gap-8">
                        {/* Affiliates Registered */}
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                            <p className="text-2xl md:text-4xl font-semibold">{dashboardData.affiliatesRegistered}</p>
                            <h3 className="text-md text-gray-600 font-medium mb-2">Total Bookings This Month</h3>
                        </div>

                        {/* Total Earnings */}
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                            <p className="text-2xl md:text-4xl font-semibold">₹{dashboardData.totalEarnings}</p>
                            <h3 className="text-md text-gray-600 font-medium mb-2">Total Earnings</h3>

                        </div>

                        {/* Stats */}
                        <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                            <h3 className="text-xl font-medium mb-2">Stats</h3>
                            <ul className="space-y-2">
                                <li>Total Leads: {dashboardData.stats.totalClicks}</li>
                                <li>Total Conversions: {dashboardData.stats.totalConversions}</li>
                                <li>Conversion Rate: {dashboardData.stats.conversionRate}</li>
                            </ul>
                        </div>
                        <div className="w-full p-6 rounded-lg shadow-md flex flex-col flex-wrap items-center">
                            <h3 className="text-xl font-medium mb-4">Agent Referral Link</h3>
                            <div className="">
                                <input
                                    type="text"
                                    ref={inputRef}
                                    value={`${import.meta.env.VITE_FRONTEND_URL}/customer/${user?.affiliate?.uniqueCode}`}
                                    readOnly
                                    className="w-fit p-2 border border-gray-300 rounded-md"
                                />

                            </div>
                            <button
                                onClick={handleCopyLink}
                                className="bg-teal-600 text-white p-2 rounded-md cursor-pointer mt-2"
                            >
                                Copy Link
                            </button>
                            {copySuccess && <p className="text-green-600 mt-2">{copySuccess}</p>}
                        </div>
                    </div>
                </div>

                {/* QR Code Section */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center mt-5 md:mt-0">
                    <h3 className="text-md font-medium mb-4">Agent QR Code</h3>
                    {/* <img src={user?.affiliate?.qrCodeUrl} alt="QR Code" className="w-48 h-48 mb-4" /> */}
                    <YolastPDFTemplate user={user} />

                    <div className="flex gap-4">
                        <PDFDownloadLink
                            className="bg-green-600 text-white px-6 py-2 rounded-none mt-4 cursor-pointer"
                            document={<AffiliateQRPDF user={user} />}
                            fileName="yolast-offer.pdf"
                        >
                            {({ loading }) => (loading ? 'Loading...' : 'Download Your QR')}
                        </PDFDownloadLink>

                    </div>


                    {/* <YolastPDFTemplate user={user} /> */}
                </div>

            </div>

            {/* Referral Payment Link */}

        </div>
    );
};

export default Dashboard;
