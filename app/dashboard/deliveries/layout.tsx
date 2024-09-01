'use client'
import { useSession } from "next-auth/react";

export default function Dashboard({ children }: { children: React.ReactNode }) {
    const { data: session, status } = useSession();
    return (
        <>
            {
                status === 'loading' ? (
                    <div className="flex items-center justify-center h-full">
                        <h1>Cargando...</h1>
                    </div>
                ) : (
                    session?.user?.permissions?.includes('read:deliveries') ? (
                        <>
                            {children}
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <h1 className="text-2xl text-red-500">No tienes permisos para acceder a esta sección</h1>
                        </div>
                    )
                )
            }
        </>
    )
}