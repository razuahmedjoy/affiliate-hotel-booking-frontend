import useLoaderStore from "@/store/loaderStore"


export const Loader = () => {
    const { isLoading } = useLoaderStore() // Global loading state from Zustand

    if (!isLoading) return null

    return (
        <div className="fixed top-0 left-0 w-full h-full bg-gray-700 opacity-50 flex items-center justify-center z-50">
            <div className="flex justify-center items-center h-screen flex-col text-white">
                <div className="relative inline-flex">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
                <p className="text-center mt-2 text-black">Loading...</p>
            </div>
        </div>
    )
}
