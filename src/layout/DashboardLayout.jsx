
import { AppSidebar } from "@/components/ui/app-sidebar"

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    SidebarInset,
    SidebarProvider,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import avatarImage from "@/assets/imgs/avatar.png";
import { Link, Outlet } from "react-router";
import useAuthStore from "@/store/authStore";

export default function DashboardLayout() {
    const { user } = useAuthStore()
    const { logout } = useAuthStore()

    return (
        <SidebarProvider>
            <AppSidebar />
            <SidebarInset>
                <header className="flex h-20 shrink-0 items-center gap-2 transition-[width,height] ease-linear group-has-[[data-collapsible=icon]]/sidebar-wrapper:h-16 bg-slate-100">
                    <div className="flex items-center gap-2  justify-between w-full px-4 md:px-8">
                        <div className="flex items-center gap-x-2">
                            <SidebarTrigger className="-ml-1 cursor-pointer" />
                            <h1 className="text-sm">Dashboard</h1>
                        </div>
                        {/* <Breadcrumb>
                            <BreadcrumbList>
                                <BreadcrumbItem className="hidden md:block">
                                    <BreadcrumbLink href="#">
                                        Building Your Application
                                    </BreadcrumbLink>
                                </BreadcrumbItem>
                                <BreadcrumbSeparator className="hidden md:block" />
                                <BreadcrumbItem>
                                    <BreadcrumbPage>Data Fetching</BreadcrumbPage>
                                </BreadcrumbItem>
                            </BreadcrumbList>
                        </Breadcrumb> */}

                        <DropdownMenu>
                            <DropdownMenuTrigger className="cursor-pointer">
                                <div className="flex items-center gap-2">
                                    <img
                                        src={avatarImage}
                                        alt=""
                                        className="w-8 h-8 rounded-full"
                                    />
                                    <span className="text-sm font-semibold">
                                        {user?.firstName} {user?.lastName}
                                    </span>
                                </div>


                            </DropdownMenuTrigger>
                            <DropdownMenuContent>
                                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                                <DropdownMenuSeparator />
                                <DropdownMenuItem className="cursor-pointer hover:bg-accent">
                                    <Link to="/affiliate/profile">Profile</Link>
                                </DropdownMenuItem>
                                <DropdownMenuItem onClick={() => logout()} className="cursor-pointer hover:bg-accent">Logout</DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                </header>
                <div className="flex flex-1 flex-col gap-4 p-3 md:p-5">
                    <Outlet />
                </div>
            </SidebarInset>
        </SidebarProvider>
    )
}
