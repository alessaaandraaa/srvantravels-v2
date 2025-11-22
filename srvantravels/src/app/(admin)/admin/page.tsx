import AdminCalendar from "../../components/ui/Admin/AdminHome/AdminCalendar";
import { Sales, Revenue, Customers } from "../../components/ui/Admin/AdminHome/AdminHeaderCards";
import AdminLineChart from "../../components/ui/Admin/AdminHome/AdminLineChart";
import PendingRequests from "../../components/ui/Admin/AdminHome/AdminPendingRequests";

const Homepage = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-2 mb-8">
            <div className="bg-primary-foreground rounded-lg">
                <Sales/>
            </div>
            <div className="bg-primary-foreground rounded-lg">
                <Revenue/>
            </div>
            <div className="bg-primary-foreground rounded-lg">
                <Customers/>
            </div>
            <div className="bg-primary-foreground p-4 rounded-lg col-span-3">
                <AdminLineChart/>
            </div>
            <div className="bg-primary-foreground p-4 ounded-lg col-span-1">
                <AdminCalendar/>
            </div>
            <div className="bg-primary-foreground p-4 rounded-lg col-span-2">
                <PendingRequests/>
            </div>
        </div>
    )
}

export default Homepage;