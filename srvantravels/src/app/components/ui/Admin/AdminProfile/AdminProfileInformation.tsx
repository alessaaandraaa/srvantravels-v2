const AdminProfileInformation = () => {
    return (
         <div className=''>
            <div className="bg-primary-foreground h-[600px] rounded-md p-6 flex flex-col justify-between">
            
            {/* Top: Profile Header */}
            <div className="flex items-center gap-4 border-b pb-4">
                <div className="w-20 h-20 bg-gray-300 rounded-full" />
                
                <div>
                <h2 className="text-xl font-bold">John Doe</h2>
                <p className="text-sm text-muted-foreground">Administrator</p>
                </div>
            </div>

            {/* Middle: Information */}
            <div className="mt-6 space-y-4 text-sm">
                <div className="flex justify-between">
                <span className="text-muted-foreground">Email</span>
                <span>johndoe@email.com</span>
                </div>

                <div className="flex justify-between">
                <span className="text-muted-foreground">Phone</span>
                <span>+63 9XX XXX XXXX</span>
                </div>

                <div className="flex justify-between">
                <span className="text-muted-foreground">Address</span>
                <span>Manila, Philippines</span>
                </div>

                <div className="flex justify-between">
                <span className="text-muted-foreground">Role</span>
                <span>Admin</span>
                </div>
            </div>

            {/* Bottom Buttons */}
            <div className="mt-auto flex flex-col gap-2">
                <button className="bg-blue-600 text-white py-2 rounded-md">
                    Edit Profile
                </button>
            </div>

            </div>
         </div>
    )
}

export default AdminProfileInformation;