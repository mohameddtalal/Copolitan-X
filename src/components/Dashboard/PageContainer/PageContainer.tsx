export default function PageContainer({ children }: { children: React.ReactNode }) {


    return (
        <div className="min-w-full  flex items-center justify-center mb-3 p-2">
            <div className="grid grid-cols-4 grid-rows-3 gap-2 sm:gap-2 lg:gap-3 w-full h-full auto-rows-fr relative">
                {children}
            </div>
        </div>
    )
}