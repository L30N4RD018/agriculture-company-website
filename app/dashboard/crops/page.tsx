import { fetchTableInfo } from "@/app/lib/data"
import CropsTable from "@/app/ui/dashboard/CropsTable"
import { errorToast } from "@/app/lib/errors";

export default async function Crops() {	
	const data = await fetchTableInfo('crops', (message) => {errorToast(message)});	
	return (
		<div className="flex flex-col">			
			<CropsTable data={data}/>
		</div>
	);
}
