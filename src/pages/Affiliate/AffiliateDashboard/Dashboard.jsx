import { downloadPDF } from '@/services/Affiliate/affiliateDashboard';
import useAuthStore from '@/store/authStore';
import React, { useState } from 'react';
import { PDFDownloadLink } from '@react-pdf/renderer';
import YolastPDFTemplate, { AffiliateQRPDF } from '@/components/Affiliate/AffiliateQRTemplate';
import { Link } from 'react-router';
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

    // Function to copy the payment link to clipboard
    const handleCopyLink = () => {
        navigator.clipboard.writeText(dashboardData.paymentLink).then(
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
        <div className="p-8 space-y-8 ">
            <h2 className="text-3xl font-semibold text-center">Affiliate Dashboard</h2>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Affiliates Registered */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-xl font-medium mb-2">Affiliates Registered</h3>
                    <p className="text-3xl font-semibold">{dashboardData.affiliatesRegistered}</p>
                </div>

                {/* Total Earnings */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-xl font-medium mb-2">Total Earnings</h3>
                    <p className="text-3xl font-semibold">₹{dashboardData.totalEarnings}</p>
                </div>

                {/* Stats */}
                <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center justify-center">
                    <h3 className="text-xl font-medium mb-2">Stats</h3>
                    <ul className="space-y-2">
                        <li>Total Clicks: {dashboardData.stats.totalClicks}</li>
                        <li>Total Conversions: {dashboardData.stats.totalConversions}</li>
                        <li>Conversion Rate: {dashboardData.stats.conversionRate}</li>
                    </ul>
                </div>
            </div>

            {/* QR Code Section */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <h3 className="text-xl font-medium mb-4">Your Referral Payment QR Code</h3>
                <img src={user.qrCodeUrl} alt="QR Code" className="w-48 h-48 mb-4" />

        
                <div className="flex gap-4">
                    <PDFDownloadLink
                        className="bg-blue-600 text-white px-6 py-2 rounded-md mt-4 cursor-pointer"
                        document={<AffiliateQRPDF user={user} />}
                        fileName="yolast-offer.pdf"
                    >
                        {({ loading }) => (loading ? 'Loading...' : 'Download')}
                    </PDFDownloadLink>

                    <Link
                        className="bg-teal-600 text-white px-6 py-2 rounded-md mt-4 cursor-pointer"

                        to='qr-preview'
                    >
                        Preview
                    </Link>
                </div>


                {/* <YolastPDFTemplate user={user} /> */}
            </div>

            {/* Referral Payment Link */}
            <div className="bg-white p-6 rounded-lg shadow-md flex flex-col items-center">
                <h3 className="text-xl font-medium mb-4">Referral Payment Link</h3>
                <div className="flex items-center space-x-4">
                    <input
                        type="text"
                        value={`${import.meta.env.VITE_FRONTEND_URL}/customer/${user.uniqueCode}`}
                        readOnly
                        className="w-96 p-2 border border-gray-300 rounded-md"
                    />
                    <button
                        onClick={handleCopyLink}
                        className="bg-teal-600 text-white p-2 rounded-md cursor-pointer"
                    >
                        Copy Link
                    </button>
                </div>
                {copySuccess && <p className="text-green-600 mt-2">{copySuccess}</p>}
            </div>
        </div>
    );
};

export default Dashboard;
