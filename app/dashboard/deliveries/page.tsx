import { fetchTableInfo } from "@/app/lib/data"
import DeliveriesTable from "@/app/ui/dashboard/DeliveriesTable";
import { errorToast } from "@/app/lib/errors";

export default async function Crops() {
    
    const data = await fetchTableInfo('deliveries', (message) => {errorToast(message)});        
	return (
        <DeliveriesTable data={data} />
    )
}