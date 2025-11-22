import { CircleDollarSign, MailWarning } from "lucide-react";


const AdminInboxRightPanel = () => {
    return (
         <div className="flex flex-col p-8 gap-4 border-2 rounded-lg h-full">
            <div className="flex gap-4">
                <CircleDollarSign/>
                [REQUEST FOR REFUND]
            </div>
            <span className="text-[12px] text-muted-foreground">
                by Cerydra Lava Hysilens
            </span>
            <div className="text-sm pt-4">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Molestiae, delectus esse iste, ipsa in molestias expedita iure accusantium ut ratione consequuntur consectetur quidem. Similique provident fugit beatae, unde facilis autem!
            </div>
            <div className="mt-auto flex justify-between">
                <div>
                    <span className="text-[12px] text-muted-foreground">
                        Created at: 2020/12/27
                    </span>
                </div>
                <div>
                    <span className="text-[12px] text-muted-foreground">
                        Sent on: 11:01 PM
                    </span>
                </div>
            </div>
         </div>
    )
}

export default AdminInboxRightPanel;