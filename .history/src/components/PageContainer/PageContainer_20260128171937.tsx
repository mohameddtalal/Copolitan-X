export default function PageContainer({ children }: { children: React.ReactNode }) {


    return (
        <div className="min-w-full h-full px-1.5 sm:px-2 md:px-2 lg:px-3 xl:px-4 flex items-center justify-center ">
            <div className="grid grid-cols-4 grid-rows-3 gap-2 sm:gap-3 lg:gap-4 w-full h-full auto-rows-fr relative mb-2">
                {children}
            </div>
        </div>
    )
}