import AdminLineChartWrapper from "../../components/ui/Admin/AdminHome/AdminLineChartWrap";
import CustomersWrapper from "../../components/ui/Admin/AdminHome/CustomerWrapper";
import RevenueWrapper from "../../components/ui/Admin/AdminHome/RevenueWrapper";
import SalesWrapper from "../../components/ui/Admin/AdminHome/SalesWrapper";

const Homepage = () => {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-3 2xl:grid-cols-3 gap-2 mb-4">
            <div className="bg-primary-foreground rounded-lg">
                <SalesWrapper/>
            </div>
            <div className="bg-primary-foreground rounded-lg">
                <RevenueWrapper/>
            </div>
            <div className="bg-primary-foreground rounded-lg">
                <CustomersWrapper/>
            </div>
            <div className="bg-primary-foreground p-12 rounded-lg col-span-3">
                <AdminLineChartWrapper/>
            </div>
        </div>
    )
}

export default Homepage;