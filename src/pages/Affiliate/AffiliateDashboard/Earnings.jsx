import React from 'react';
import BalanceSection from './BalanceSection';
import TransactionsTable from './TransactionsTable';

const Earnings = () => {
    return (
        <div className="container mx-auto p-4">
            <BalanceSection />
            <TransactionsTable />
        </div>
    );
};

export default Earnings;