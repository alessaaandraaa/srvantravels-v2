const page = () => {
    return (
         <div className="grid grid-cols-4 gap-4 mb-8">
            <div className="col-span-2 rounded-lg bg-primary-foreground h-[600px]">
                Map
            </div>
            <div className="flex flex-col col-span-2 gap-4">
                <div className="rounded-lg bg-primary-foreground h-[275px]">
                    Form
                </div>
                <div className="rounded-lg bg-primary-foreground h-[275px]">
                    Table
                </div>
            </div>
         </div>
    )
}

export default page;