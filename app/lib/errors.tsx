

export function errorToast(message: string) {
    return (
        <div className="bg-red-500 text-white p-2 rounded-md z-50">
            {message}
        </div>
    )
}