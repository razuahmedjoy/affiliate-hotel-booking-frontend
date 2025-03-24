import { useState } from 'react'

export const usePagination = (initialState = { pageIndex: 0, pageSize: 10 }) => {
    const [pagination, setPagination] = useState(initialState)

    const onPaginationChange = (updater) => {
        setPagination(prev => {
            const newValue = typeof updater === 'function' ? updater(prev) : updater
            return { ...prev, ...newValue }
        })
    }

    return { pagination, onPaginationChange }
}