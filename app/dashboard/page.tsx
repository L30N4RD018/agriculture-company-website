// 'use client'
// import { useSession } from "next-auth/react";
import CropsChart from "@/app/ui/dashboard/crops-chart";

const Dashboard = () => {
	// const { data: session } = useSession();
	return (
		<div className="flex flex-col h-screen w-full py-2">
			<div className="w-full">
				<h1 className="text-3xl font-bold text-green-900">Dashboard</h1>
			</div>
			<div className="w-full">
				{/* <p className="text-green-900 text-lg">Welcome {session?.user?.name}</p> */}
				<div>
					<CropsChart />
				</div>
			</div>			
		</div>
	)
}
export default Dashboard;