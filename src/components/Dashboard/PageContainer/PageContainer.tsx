export default function PageContainer({ children,pageIndex }: { children: React.ReactNode,pageIndex:number }) {


    return (
        <div className="min-w-full  ">
            <div className={`w-full  ${pageIndex==2?"grid-system-sm":"grid-system"} relative`}>
                {children}
            </div>
        </div>
    )
}