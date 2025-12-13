import AdminProfileInformation from "@/src/app/components/ui/Admin/AdminProfile/AdminProfileInformation";
import AdminProfileItineraries from "@/src/app/components/ui/Admin/AdminProfile/AdminProfileItineraries";


const page = () => {
    return (
         <div className="grid grid-cols-2 p-4 mb-4 gap-2">
            <div className="bg-primary-foreground h-[600px] rounded-md">
                <AdminProfileInformation/>
            </div>
            <div className="flex flex-col gap-2">
                <div className="bg-primary-foreground p-4 rounded-md">
                    <AdminProfileItineraries/>
                </div>
                <div className="bg-primary-foreground p-4 rounded-md">
                    <AdminProfileItineraries/>
                </div>
            </div>
         </div>
    )
}

export default page;