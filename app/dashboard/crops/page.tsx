import { fetchTableInfo } from "@/app/lib/data"
import Table from "@/app/ui/dashboard/table"

export default async function Crops() {	
	const data = await fetchTableInfo('crops');
	const inputs = {
		"Tipo": { type: "text", props: { required: true, placeholder: "Tipo de Cultivo", for: "type" } },
		"Estado": { type: "select", props: { required: true, options: ["Sown", "Harvested", "Stored", "Delivering", "Delivered"], defaultValue: "Sown", for: "state" } },
		"Fecha de Siembra": { type: "date", props: { required: true, placeholder: "Fecha de Siembra", for: "sow_date" } },
		"Fecha de Cosecha": { type: "date", props: { required: false, placeholder: "Fecha de Cosecha", for: "harvest_date" } },
		"Almacén": { type: "number", props: { required: false, placeholder: "Almacén", for: "storage_id" } },
		"Parcela": { type: "number", props: { required: false, placeholder: "Parcela", for: "smallholding_id" } },
		"Cantidad": { type: "number", props: { required: true, placeholder: "Cantidad", for: "quantity" } }
	}
	return (
		<div className="flex flex-col">
			
			<Table
				data={data}
				keys={["ID", "TIPO", "ESTADO", "FECHA DE SIEMBRA", "FECHA DE COSECHA", "ALMACEN", "PARCELA", "CANTIDAD"]}
				formsKey="Cultivo"
				formsInputs={inputs}
				apiKey='crops'
				title={'Gestión de Cultivos'}
			/>
		</div>
	);
}
