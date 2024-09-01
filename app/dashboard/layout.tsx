import Navbar from "@/app/ui/dashboard/navbar"

export default function Dashboard({ children }: { children: React.ReactNode }) {	
	return (
		<main className="flex flex-col sm:flex-row h-auto max-h-screen sm:min-h-screen p-2 gap-3">
			<Navbar />
			{/* <section
				className="flex h-16 sm:min-h-screen flex-row sm:flex-col bg-gradient-main w-full sm:w-16 sm:hover:w-56 rounded-xl py-2 transition-all"
				onMouseEnter={() => setIsHovered(true)}
				onMouseLeave={() => setIsHovered(false)}
			>
				<ul className="flex flex-row sm:flex-col items-star sm:items-center justify-start h-12 sm:h-[80%] w-full">
					<Link href="/dashboard" key="Home" className="flex items-center justify-center w-full">
						<li className="flex items-center justify-center w-full">
							<div className={`flex ${isHovered ? 'justify-start' : 'justify-center'} items-center gap-3 w-full h-16 px-2  hover:cursor-pointer`}>
								<Image src={DashboardIcon} alt="Dashboard" className="h-10 w-10" />
								<span className={`text-green-900 text-lg ${isHovered ? '' : 'hidden'} w-full transition-all`}>Dashboard</span>
							</div>
						</li>
					</Link>
					{
						session?.user?.permissions?.includes('read:crops') && (
							<Link href="/dashboard/crops" key="Crops" className="flex items-center justify-center w-full">
								<li className="flex items-center justify-center w-full">
									<div className={`flex ${isHovered ? 'justify-start' : 'justify-center'} items-center gap-3 w-full h-16 px-2  hover:cursor-pointer`}>
										<Image src={CropsIcon} alt="Crops" className="h-10 w-10" />
										<span className={`text-green-900 text-lg ${isHovered ? '' : 'hidden'} w-full transition-all`}>Cultivos</span>
									</div>
								</li>
							</Link>
						)
					}
					{
						session?.user?.permissions?.includes('read:smallholdings') && (
							<Link href="/dashboard/smallholdings" key="Smallholdings" className="flex items-center justify-center w-full">
								<li className="flex items-center justify-center w-full">
									<div className={`flex ${isHovered ? 'justify-start' : 'justify-center'} items-center gap-3 w-full h-16 px-2  hover:cursor-pointer`}>
										<Image src={SmallholdingsIcon} alt="Smallholdings" className="h-10 w-10" />
										<span className={`text-green-900 text-lg ${isHovered ? '' : 'hidden'} w-full transition-all`}>Parcelas</span>
									</div>
								</li>
							</Link>
						)
					}
					{
						session?.user?.permissions?.includes('read:storages') && (
							<Link href="/dashboard/storages" key="Storages" className="flex items-center justify-center w-full">
								<li className="flex items-center justify-center w-full">
									<div className={`flex ${isHovered ? 'justify-start' : 'justify-center'} items-center gap-3 w-full h-16 px-2  hover:cursor-pointer`}>
										<Image src={StorageIcon} alt="Storages" className="h-10 w-10" />
										<span className={`text-green-900 text-lg ${isHovered ? '' : 'hidden'} w-full transition-all`}>Almacenes</span>
									</div>
								</li>
							</Link>
						)
					}
					{
						session?.user?.permissions?.includes('read:deliveries') && (
							<Link href="/dashboard/deliveries" key="Deliveries" className="flex items-center justify-center w-full">
								<li className="flex items-center justify-center w-full">
									<div className={`flex ${isHovered ? 'justify-start' : 'justify-center'} items-center gap-3 w-full h-16 px-2  hover:cursor-pointer`}>
										<Image src={DeliveryIcon} alt="Deliveries" className="h-10 w-10" />
										<span className={`text-green-900 text-lg ${isHovered ? '' : 'hidden'} w-full transition-all`}>Pedidos</span>
									</div>
								</li>
							</Link>
						)
					}
					{
						session?.user?.permissions?.includes('read:users') && (
							<Link href="/dashboard/users" key="Users" className="flex items-center justify-center w-full">
								<li className="flex items-center justify-center w-full">
									<div className={`flex ${isHovered ? 'justify-start' : 'justify-center'} items-center gap-3 w-full h-16 px-2  hover:cursor-pointer`}>
										<Image src={UsersIcon} alt="User" className="h-10 w-10" />
										<span className={`text-green-900 text-lg ${isHovered ? '' : 'hidden'} w-full transition-all`}>Usuarios</span>
									</div>
								</li>
							</Link>
						)
					}
				</ul>
				<div className="flex flex-col h-12 justify-center sm:justify-end sm:h-36">
					<Link href="/" onClick={() => signOut({redirect: false})}>
						<div className={`flex ${isHovered ? 'justify-start' : 'justify-center'} items-center gap-3 w-full h-16 px-2  hover:cursor-pointer`}>
							{
								session?.user?.picture ? (
									<img src={session?.user?.picture} alt="User" className="h-10 w-10 rounded-full" />
								) : (
									<img src="/icons/logout.svg" alt="Logout" className="h-10 w-10" />
								)
							}

							<span className={`text-green-900 text-lg ${isHovered ? '' : 'hidden'} w-full transition-all`}>Cerrar Sesión</span>
						</div>
					</Link>
				</div>
			</section> */}
			<section className="flex flex-col h-full w-full">
				{children}
			</section>
		</main>
	)
}