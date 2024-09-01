'use client'
import SmallholdingsIcon from "@/public/icons/farm.png";
import DeliveryIcon from "@/public/icons/delivery.svg";
import DashboardIcon from "@/public/icons/dash.png";
import LogoutIcon from "@/public/icons/logout.svg";
import StorageIcon from "@/public/icons/silo.png";
import CropsIcon from "@/public/icons/wheat.svg";
import UsersIcon from "@/public/icons/users.svg";
import { useSession, signOut } from "next-auth/react";
import Image from "next/image";
import { useState } from "react";
import Link from "next/link";



const Navbar = () => {
    const { data: session } = useSession();    
    const [isHovered, setIsHovered] = useState(false);
    const links = [
        { name: 'Dashboard', icon: DashboardIcon, href: '/dashboard', permissions: 'read:dashboard', span: 'Dashboard' },
        { name: 'Crops', icon: CropsIcon, href: '/dashboard/crops', permissions: 'read:crops', span: 'Cultivos' },
        { name: 'Smallholdings', icon: SmallholdingsIcon, href: '/dashboard/smallholdings', permissions: 'read:smallholdings', span: 'Parcelas' },
        { name: 'Storages', icon: StorageIcon, href: '/dashboard/storages', permissions: 'read:storages', span: 'Almacenes' },
        { name: 'Deliveries', icon: DeliveryIcon, href: '/dashboard/deliveries', permissions: 'read:deliveries', span: 'Entregas' },
        { name: 'Users', icon: UsersIcon, href: '/dashboard/users', permissions: 'read:users', span: 'Usuarios' },
        { name: 'Signout', icon: LogoutIcon, href: '/', span: 'Cerrar Sesión', onClick: () => signOut({redirect: false, callbackUrl: '/'}) }
    ]

    return (
        <section
            className="flex flex-row w-full bg-gradient-main rounded-xl px-1 transition-all sm:flex-col sm:w-16 sm:hover:w-60 sm:min-h-screen"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
        >
            <ul className="grid grid-cols-7 sm:grid-cols-1 sm:grid-rows-7 items-start sm:items-center justify-center sm:h-full max-h-screen">
                {
                    links.map((link, index) => {
                        const { name, icon, href, permissions, span, onClick } = link;
                        if (permissions && !session?.user?.permissions?.includes(permissions)) return null;
                        return (
                            <Link href={href} key={index}>
                                <li className="flex items-center justify-center w-full">
                                    {
                                        name === 'Signout' ? (
                                            <div onClick={onClick} className={`flex ${isHovered ? 'justify-start' : 'justify-center'} items-center gap-3 w-full h-10 px-2  hover:cursor-pointer`}>
                                                {
                                                    session?.user?.picture ? (
                                                        <img src={session?.user?.picture} alt={name} className="h-8 rounded-full" />
                                                    ) : (
                                                        <Image src={icon} alt={name} className="h-8 w-8" />
                                                    )
                                                }
                                                <span className={`text-green-900 text-lg ${isHovered ? 'hidden sm:block' : 'hidden'} w-full transition-all`}>{span}</span>
                                            </div>
                                        ) : (
                                            <div className={`flex ${isHovered ? 'justify-start' : 'justify-center'} items-center gap-3 w-full h-10 px-2 hover:cursor-pointer`}>
                                                <Image src={icon} alt={name} className="h-8 w-8" />
                                                <span className={`text-green-900 text-lg ${isHovered ? 'hidden sm:block' : 'hidden'} w-full transition-all`}>{span}</span>
                                            </div>
                                        )
                                    }
                                </li>
                            </Link>
                        )
                    })
                }
            </ul>
        </section>
    );
}

export default Navbar;