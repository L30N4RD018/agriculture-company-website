import { fetchTableInfo } from "@/app/lib/data"
import StoragesTable from "@/app/ui/dashboard/StoragesTable";
import { errorToast } from "@/app/lib/errors";

export default async function Storages() {
    const data = await fetchTableInfo('storages', (message) => {errorToast(message)});    
	return (
        <StoragesTable data={data} />
    )
}