import { fetchTableInfo } from "@/app/lib/data"
import Table from "@/app/ui/dashboard/table"

export default async function Crops() {
    const data = await fetchTableInfo('deliveries');    
    const inputs = {
        "Cliente": {
            type: "text",
            props: {
                required: true,
                placeholder: "Cliente",
                for: "client_name"								
            }            
        },
        "Fecha de Entrega": {
            type: "date",
            props: {
                required: true,
                placeholder: "Fecha de Entrega",
                for: "delivery_date"
            }
        },
        "Fecha de Solicitud": {
            type: "date",
            props: {
                required: true,
                placeholder: "Fecha de Solicitud",
                for: "request_date"
            }
        },
        "Dirección": {
            type: "text",
            props: {
                required: true,
                placeholder: "Dirección",
                for: "address"
            }
        }
    
    }
	return <Table 
                data={data} 
                keys={["ID", "CLIENTE", "FECHA DE ENTREGA", "FECHA DE SOLICITUD" ,"DIRECCION"]} 
                formsKey="Pedido"             
                formsInputs={inputs}
                apiKey="deliveries"
                title={'Gestión de Pedidos'}
            />
}