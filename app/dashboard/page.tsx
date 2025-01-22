import CropsChart from "@/app/ui/dashboard/CropsChart";

const Dashboard = () => {
	return (
		<div className="flex flex-col h-screen w-full">			
			<div className="w-full">						
				<h1 className="text-lg font-bold">Estadísticas de Cultivos</h1>
				<CropsChart />
			</div>			
		</div>
	)
}
export default Dashboard;