import { Sales, Revenue, Customers } from "../../components/ui/Admin/AdminHome/AdminHeaderCards";
import AdminLineChart from "../../components/ui/Admin/AdminHome/AdminLineChartWrap";

const Homepage = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-2 mb-4">
            <div className="bg-primary-foreground rounded-lg">
                <Sales/>
            </div>
            <div className="bg-primary-foreground rounded-lg">
                <Revenue/>
            </div>
            <div className="bg-primary-foreground rounded-lg">
                <Customers/>
            </div>
            <div className="bg-primary-foreground p-12 rounded-lg col-span-3">
                <AdminLineChart/>
            </div>

        </div>
    )
}

export default Homepage;