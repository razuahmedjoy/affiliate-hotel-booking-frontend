import React from 'react';

const PrebookingPaymentDeclined = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-red-50">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full sm:w-96 text-center">
                {/* Error Icon */}
                <div className="flex justify-center mb-6">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 text-red-500 animate-bounce" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm0-14a6 6 0 110 12 6 6 0 010-12zm-1 7V7h2v4h-2zm0 2h2v2h-2z" clipRule="evenodd" />
                    </svg>
                </div>

                {/* Error Message */}
                <h2 className="text-3xl font-semibold text-red-700 mb-4">Payment Declined</h2>
                <p className="text-gray-600 mb-6">Unfortunately, your payment could not be processed at this time. Please try again later.</p>

                {/* Retry Button */}
                <a href="/retry-payment" className="inline-block px-6 py-2 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition duration-300">Try Again</a>

                {/* Optionally, you can also give a link to contact support */}
                <div className="mt-4">
                    <p className="text-gray-500">If the issue persists, please <a href="/contact-support" className="text-red-500 font-semibold">contact support</a>.</p>
                </div>
            </div>
        </div>
    );
};

export default PrebookingPaymentDeclined;
