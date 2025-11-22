import { Flower } from "lucide-react";
import { Card } from "../card";
import { ScrollArea } from "../scroll-area";


const PendingRequests = () => {
    return (
         <div className=''>
            Pending Requests
            {/* PENDING LISTS */}
            <ScrollArea className="h-[460px] mt-4 overflow-y-auto">
                {/* LIST ITEMS */}
                <div className="flex flex-col gap-4">
                    <Card>
                        <div className="flex items-center gap-4 pl-4">
                            {/* <CHECKBOX> SEE IF YOU FIND A WAY TO MAKE A CHECKBOX */}
                            <Flower className="h-4"/>
                            <label className="text-sm text-muted-foreground">
                                1. Lorem ipsum dolor, sit amet consectetur adipisicing elit. | Erika Lave 
                            </label>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 pl-4">
                            {/* <CHECKBOX> SEE IF YOU FIND A WAY TO MAKE A CHECKBOX */}
                            <Flower className="h-4"/>
                            <label className="text-sm text-muted-foreground">
                                2. Lorem ipsum dolor, sit amet consectetur adipisicing elit. | Cliff Jao
                            </label>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 pl-4">
                            {/* <CHECKBOX> SEE IF YOU FIND A WAY TO MAKE A CHECKBOX */}
                            <Flower className="h-4"/>
                            <label className="text-sm text-muted-foreground">
                                3. Lorem ipsum dolor, sit amet consectetur adipisicing elit. | Columbina Canon
                            </label>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 pl-4">
                            {/* <CHECKBOX> SEE IF YOU FIND A WAY TO MAKE A CHECKBOX */}
                            <Flower className="h-4"/>
                            <label className="text-sm text-muted-foreground">
                                4. Lorem ipsum dolor, sit amet consectetur adipisicing elit. | Hello Lyre
                            </label>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 pl-4">
                            {/* <CHECKBOX> SEE IF YOU FIND A WAY TO MAKE A CHECKBOX */}
                            <Flower className="h-4"/>
                            <label className="text-sm text-muted-foreground">
                                5. Lorem ipsum dolor, sit amet consectetur adipisicing elit. | Keepy Tepo
                            </label>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 pl-4">
                            {/* <CHECKBOX> SEE IF YOU FIND A WAY TO MAKE A CHECKBOX */}
                            <Flower className="h-4"/>
                            <label className="text-sm text-muted-foreground">
                                6. Lorem ipsum dolor, sit amet consectetur adipisicing elit. | Keepy Tepo
                            </label>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 pl-4">
                            {/* <CHECKBOX> SEE IF YOU FIND A WAY TO MAKE A CHECKBOX */}
                            <Flower className="h-4"/>
                            <label className="text-sm text-muted-foreground">
                                7. Lorem ipsum dolor, sit amet consectetur adipisicing elit. | Keepy Tepo
                            </label>
                        </div>
                    </Card>
                    <Card>
                        <div className="flex items-center gap-4 pl-4">
                            {/* <CHECKBOX> SEE IF YOU FIND A WAY TO MAKE A CHECKBOX */}
                            <Flower className="h-4"/>
                            <label className="text-sm text-muted-foreground">
                                8. Lorem ipsum dolor, sit amet consectetur adipisicing elit. | Keepy Tepo
                            </label>
                        </div>
                    </Card>
                </div>
            </ScrollArea>
         </div>
    )
}

export default PendingRequests;