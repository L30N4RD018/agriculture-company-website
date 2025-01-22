'use client'
import { BiLeaf, BiMenu } from "react-icons/bi";
import { useSession } from "next-auth/react";
import { useState } from "react";
import Link from "next/link";



const Navbar = () => {
    const { data: session } = useSession();    
    const [isHovered, setIsHovered] = useState(false);
    // const links = [
    //     { name: 'Dashboard', icon: DashboardIcon, href: '/dashboard', permissions: 'read:dashboard', span: 'Dashboard' },
    //     { name: 'Crops', icon: CropsIcon, href: '/dashboard/crops', permissions: 'read:crops', span: 'Cultivos' },
    //     { name: 'Smallholdings', icon: SmallholdingsIcon, href: '/dashboard/smallholdings', permissions: 'read:smallholdings', span: 'Parcelas' },
    //     { name: 'Storages', icon: StorageIcon, href: '/dashboard/storages', permissions: 'read:storages', span: 'Almacenes' },
    //     { name: 'Deliveries', icon: DeliveryIcon, href: '/dashboard/deliveries', permissions: 'read:deliveries', span: 'Entregas' },
    //     { name: 'Users', icon: UsersIcon, href: '/dashboard/users', permissions: 'read:users', span: 'Usuarios' },
    //     { name: 'Signout', icon: LogoutIcon, href: '/', span: 'Cerrar Sesión', onClick: () => signOut({redirect: false, callbackUrl: '/'}) }
    // ]

    return (
        <nav className="fixed top-0 right-0 z-50 w-screen min-h-16 bg-green-500 items-center px-2 flex">
            <div className="flex items-center justify-between w-full">
                <Link href="/dashboard">
                    <div className="flex flex-col gap-4 w-10 h-10 items-center justify-center rounded-full border-green-500 border bg-yellow-200">
                        <BiLeaf className="w-5 h-5 text-green-500"/>
                    </div>
                </Link>
                <BiMenu className="w-8 h-8 text-white" />
            </div>
        </nav>
    );
}

export default Navbar;