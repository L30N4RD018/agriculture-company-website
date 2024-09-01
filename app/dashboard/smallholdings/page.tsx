import { fetchTableInfo } from "@/app/lib/data"
import { Smallholding } from "@/app/lib/definitions"
import Table from "@/app/ui/dashboard/table"

export default async function Smallholdings() {
    const data: Smallholding[] = await fetchTableInfo('smallholdings');
    const inputs = {
        "Tamaño": {
            type: "number",
            props: {
                required: true,
                placeholder: "Tamaño",
                for: "size"								
            }            
        },
        "Ubicación": {
            type: "text",
            props: {
                required: true,
                placeholder: "Ubicación",
                for: "ubication"
            }
        },
        "Forma": {
            type: "text",
            props: {
                required: true,
                placeholder: "Forma",
                for: "shape"
            }
        },
        "Delimitación": {
            type: "select",
            props: {
                required: true,
                placeholder: "Delimitación",
                options: ["true", "false"],
                defaultValue: "false",                
                for: "delimited"
            }
        }
    
    }
	return <Table 
                data={data} 
                keys={["ID", "TAMAÑO", "UBICACIÓN", "FORMA" ,"DELIMITACIÓN"]} 
                formsKey="Parcela"
                formsInputs={inputs}
                apiKey="smallholdings"
                title={'Gestión de Parcelas'}
            />
}