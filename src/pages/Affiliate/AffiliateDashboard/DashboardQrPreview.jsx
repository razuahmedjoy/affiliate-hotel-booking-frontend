import YolastPDFTemplate from '@/components/Affiliate/AffiliateQRTemplate';
import useAuthStore from '@/store/authStore';
import React from 'react';

const DashboardQrPreview = () => {

    const { user } = useAuthStore(); // Get the user object from the auth store

    return (
        <YolastPDFTemplate user={user} />
    );
};

export default DashboardQrPreview;