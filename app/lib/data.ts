import { errorToast } from "@/app/lib/errors"

export async function fetchTableInfo(key: string, onError: (message: string) => void) {    
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/${key}`, { cache: "no-store" })
        if (!response.ok) {
            const responseData = await response.json()
            throw new Error(responseData.detail.error || 'Error inesperado')
        }
        return await response.json()
    } catch (error) {        
        onError((error as Error).message)
        return []
    }
}

export async function fetchInfo(id: number, key: string, onError: (message: string) => void) {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/${key}/${id}`, { cache: "no-store" })
        if (!response.ok) {
            const responseData = await response.json()
            throw new Error(responseData.detail.error || 'Error inesperado')
        }        
        return await response.json()
    } catch (error) {
        onError((error as Error).message)
    }

}

export async function fetchMonthlyCrops(onError: (message: string) => void) {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/crops/months`, { cache: "no-store" })        
        if (!response.ok) {
            const responseData = await response.json()
            throw new Error(responseData.detail.error || 'Error inesperado')
        }
        return await response.json()
    } catch (error) {
        onError((error as Error).message)
        return []
    }
}

export async function deleteInfo(id: number, key: string, onError: (message: string) => void, onSuccess: (message: string) => void) {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/${key}/${id}`, {
            method: "DELETE",
            headers: {
                "Content-Type": "application/json"
            }
        })
        if (!response.ok) {
            const responseData = await response.json()
            throw new Error(responseData.detail.error || 'Error inesperado')
        }
        const data = await response.json()
        onSuccess(data.message)
        return data
    } catch (error) {
        onError((error as Error).message)
        
    }
}

interface CreateUpdateProps {
    data: {[key: string]: any};
    update: boolean;
    formKey: string;
}

export async function createUpdate(props: CreateUpdateProps, onError: (message: string) => void, onSuccess: (message: string) => void) {        
    const { data, update, formKey } = props
    console.log(JSON.stringify(data))
    try {        
        const response = await fetch(`${process.env.PUBLIC_API_URL}/${formKey}`, {
            method: update ? 'PUT' : 'POST',
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(data),
        })
        if (!response.ok) {
            const responseData = await response.json()
            throw new Error(responseData.detail.error || 'Error inesperado')
        }
        const responesData = await response.json()
        onSuccess(responesData.message)
        return responesData        
    } catch (error) {        
        onError((error as Error).message)
        
    }
}


export async function login(email: string, password: string, onError: (message: string) => void, onSuccess: (message: string) => void) {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/users/login?username=${email}&password=${password}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        })                
        if (!response.ok) {
            const responseData = await response.json()
            throw new Error(responseData.detail.error || 'Error inesperado')
        }
        const data = await response.json()
        onSuccess(data.message)
        return data
    } catch (error) {                
        onError((error as Error).message)

    }
}

export async function fetchRoles() {
    try {
        const response = await fetch(`${process.env.PUBLIC_API_URL}/users/roles`, { cache: "no-store" })
        const data = await response.json()
        return data
    } catch (error) {
        errorToast((error as Error).message)
        return []
    }
}