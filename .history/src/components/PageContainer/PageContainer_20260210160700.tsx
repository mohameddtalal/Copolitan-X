export default function PageContainer({ children }: { children: React.ReactNode }) {


    return (
        <div className="min-w-full  flex items-center justify-center mb-3">
            <div className="grid grid-cols-4 grid-rows-3 gap-2 sm:gap-3 lg:gap-4 w-full h-full auto-rows-fr relative">
                {children}
            </div>
        </div>
    )
}