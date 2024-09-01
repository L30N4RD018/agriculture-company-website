import { fetchTableInfo } from "@/app/lib/data"
import Table from "@/app/ui/dashboard/table"

export default async function Crops() {
    const data = await fetchTableInfo('users');
    const inputs = {"User": {type: "username", props: {required: true, placeholder: "Email", for: "username"}},
                    "Rol": {type: "select", props: {required: true, options: ["admin", "user"], defaultValue: "user", for: "user_role"}}
    }
	return <Table 
                data={data} keys={["ID", "EMAIL", "ROL"]} 
                formsKey="Usuario"
                formsInputs={inputs}
                apiKey="users"
                title="Gestión de Usuarios"
            />
}