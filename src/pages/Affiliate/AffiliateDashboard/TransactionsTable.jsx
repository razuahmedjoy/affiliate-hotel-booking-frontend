import { usePagination } from "@/hooks/usePagination"
import { Card } from '@/components/ui/card'
import { DataTable } from '@/components/ui/data-table'
import { useEffect, useState } from "react"

const mockApiCall = async (page, pageSize) => {
    const data = Array.from({ length: pageSize }).map((_, i) => ({
        id: `${page}-${i}`,
        date: new Date().toISOString(),
        type: i % 2 === 0 ? 'earning' : 'withdrawal',
        amount: Math.random() * 1000,
        status: ['pending', 'completed', 'failed'][Math.floor(Math.random() * 3)],
    }))

    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({
                data,
                total: 100,
            })
        }, 500)
    })
}


const TransactionsTable = () => {
    const { pagination, onPaginationChange } = usePagination()
    const [data, setData] = useState([])
    const [total, setTotal] = useState(0)
    const [isLoading, setIsLoading] = useState(false)

    const fetchTransactions = async ({ page, pageSize }) => {
        setIsLoading(true)
        try {
            // Replace with actual API call
            const response = await mockApiCall(page, pageSize)
            console.log(response);
            setData(response.data)
            setTotal(response.total)
        } finally {
            setIsLoading(false)
        }
    }

    useEffect(() => {
        fetchTransactions({ page: pagination.pageIndex + 1, pageSize: pagination.pageSize })
    }, [pagination])

    const columns = [
        {
            accessorKey: 'date',
            header: 'Date',
            cell: ({ row }) => new Date(row.getValue('date')).toLocaleDateString(),
        },
        {
            accessorKey: 'type',
            header: 'Type',
            cell: ({ row }) => (
                <span className="capitalize">{row.getValue('type')}</span>
            ),
        },
        {
            accessorKey: 'amount',
            header: 'Amount',
            cell: ({ row }) => (
                <span className={row.original.type === 'withdrawal' ? 'text-red-500' : 'text-green-500'}>
                    ${row.getValue('amount').toFixed(2)}
                </span>
            ),
        },
        {
            accessorKey: 'status',
            header: 'Status',
            cell: ({ row }) => (
                <span className="px-2 py-1 rounded-full text-xs bg-blue-100 text-blue-800 capitalize">
                    {row.getValue('status')}
                </span>
            ),
        },
    ]

    console.log(data);

    return (

        <>

            <h2 className="text-lg font-semibold mb-4">Transactions</h2>
            <div className="flex flex-wrap justify-between w-full mb-2">
                <p className="text-sm text-gray-500 mb-4">View your transaction history.</p>
                {/* add date range filter */}
                <div className="flex items-center gap-2">
                    <input type="date" id="startDate" className="border rounded px-2 py-1" />
                    <label htmlFor="endDate" className="text-sm text-gray-500">To</label>
                    <input type="date" id="endDate" className="border rounded px-2 py-1" />
                    <button className="bg-blue-600 b text-white px-4 py-1 rounded">Filter</button>
                </div>

            </div>

            <DataTable
                columns={columns}
                data={data}
                pagination={{
                    ...pagination,
                    pageCount: Math.ceil(total / pagination.pageSize),
                    total,
                }}
                onPaginationChange={onPaginationChange}
                isLoading={isLoading}
            />
        </>

    )
}

export default TransactionsTable