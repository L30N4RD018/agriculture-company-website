import { errorToast } from "@/app/lib/errors"

export async function fetchTableInfo(key: string) {    
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/${key}`, { cache: "no-store" })
        if (response.status !== 200) {
            return []
        }
        const data = await response.json()
        return data
    } catch (error) {
        errorToast((error as Error).message)
        return []
    }
}

export async function fetchInfo(id: number, key: string) {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/${key}/${id}`, { cache: "no-store" })
        if (response.status !== 200) {            
            return 
        }
        const data = await response.json()
        return data
    } catch (error) {
        errorToast((error as Error).message)
        return []
    }

}

export async function fetchMonthlyCrops() {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/crops/months`, { cache: "no-store" })        
        const data = await response.json()
        return data
    } catch (error) {
        errorToast((error as Error).message)
        return []
    }
}

export async function deleteInfo(id: number, key: string) {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/${key}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        const data = await response.json()
        alert(data.detail.message)        
        return data
    } catch (error) {
        errorToast((error as Error).message)
        return null
    }
}

interface CreateUpdateProps {
    data: {[key: string]: any};
    update: boolean;
    formKey: string;
}

export async function createUpdate(props: CreateUpdateProps) {        
    const { data, update, formKey } = props
    console.log(data)
    try {        
        const response = await fetch(`${process.env.PUBLIC_API_URL}/${formKey}`, {
            method: update ? 'PUT' : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        if (response.status !== 200) {
            const responseData = await response.json()
            errorToast(responseData.Error)
            return null
        }
        const responseData = await response.json()
        return responseData        
    } catch (error) {
        errorToast((error as Error).message)
        return null
    }
}


export async function login(email: string, password: string) {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/users/login?email=${email}&password=${password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })        
        const data = await response.json()
        if (response.status !== 200) {
            errorToast(data.message)
        }
        return data
    } catch (error) {                
        return null
    }
}