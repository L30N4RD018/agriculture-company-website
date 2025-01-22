import { fetchTableInfo, fetchRoles } from "@/app/lib/data"
import UsersTable from "@/app/ui/dashboard/UsersTable"
import { errorToast, successToast } from "@/app/lib/errors";

export default async function Crops() {
    const data = await fetchTableInfo('users', (message) => {errorToast(message)});
    const roles = await fetchRoles();
    const rolesOptions = roles.map((role: {[key: string]: string}) => role.name); // List of roles that exist in the database    
	return (
        <UsersTable data={data} roles={rolesOptions} />

    )
}