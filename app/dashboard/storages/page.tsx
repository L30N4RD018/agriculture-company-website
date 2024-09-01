import { fetchTableInfo } from "@/app/lib/data"
import Table from "@/app/ui/dashboard/table"

export default async function Crops() {
    const data = await fetchTableInfo('storages');
    const inputs = {
        "Capacidad Máxima": {
            type: "number",
            props: {
                required: true,
                placeholder: "Capacidad Máxima",
                for: "max_capacity"								
            }            
        },
        "Capacidad Actual": {
            type: "number",
            props: {
                required: true,
                placeholder: "Capacidad Actual",
                for: "current_capacity"
            }
        },
        "Ubicación": {
            type: "text",
            props: {
                required: true,
                placeholder: "Ubicación",
                for: "storage_ubication"
            }
        },
        "Equipamiento": {
            type: "text",
            props: {
                required: true,
                placeholder: "Equipamiento",
                for: "equipment"
            }
        }
    }
	return <Table 
                data={data} 
                keys={["ID", "CAPACIDAD MÁXIMA", "CAPACIDAD ACTUAL", "UBICACIÓN" ,"EQUIPAMIENTO"]} 
                formsKey="Almacén"
                formsInputs={inputs}
                apiKey="storages"
                title="Gestión de Almacenes"
            />
}