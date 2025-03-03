import React from 'react';
import { useLocation } from 'react-router';

const PrebookingPaymentSuccess = () => {


    const location = useLocation();


    // Get query parameters from the URL
    const queryParams = new URLSearchParams(location.search);
    const transactionId = queryParams.get('transactionId');
    const affiliateId = queryParams.get('affiliateId');

    console.log('Transaction ID:', transactionId);
    console.log('Affiliate ID:', affiliateId);
    return (
        <div className="flex items-center justify-center min-h-screen bg-blue-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 text-center">
                {/* Success Icon */}
                <div className="flex justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-green-500 animate-pulse" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M16.707 4.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 111.414-1.414L8 11.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Success Message */}
                <h2 className="text-3xl font-semibold text-green-500 mb-4">Payment Successful!</h2>
                <p className="text-gray-600 mb-6">Your payment was processed successfully. Thank you for your purchase!</p>

                {/* Button to go back or continue */}
                {/* <a href="/" className="inline-block px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600 transition duration-300">Go to Dashboard</a> */}
            </div>
        </div>
    );
};

export default PrebookingPaymentSuccess;
