import { fetchTableInfo } from "@/app/lib/data"
import { Smallholding } from "@/app/lib/definitions"
import SmallholdingsTable from "@/app/ui/dashboard/SmallholdingsTable"
import { errorToast } from "@/app/lib/errors";

export default async function Smallholdings() {
    const data: Smallholding[] = await fetchTableInfo('smallholdings', (message) => {errorToast(message)});        
	return (
        <SmallholdingsTable data={data} />
    );
}