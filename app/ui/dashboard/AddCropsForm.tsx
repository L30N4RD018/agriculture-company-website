import React from 'react';
import { AiOutlineClose } from 'react-icons/ai';

interface AddCropFormProps {
    onClose: () => void;
    onSubmit: (data : {[key: string]: any}) => void;
}

const AddCropForm: React.FC<AddCropFormProps> = ({onClose, onSubmit}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries())
        onSubmit(data);
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg w-96">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Agregar Cultivo</h2>
                        <button className="text-red-800 px-4 py-2 rounded-lg w-10" onClick={onClose}>
                            <AiOutlineClose className="text-xl" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-2">
                        <label htmlFor="type">Tipo</label>
                        <input type="text" name="type" id="type" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none" required />
                        <label htmlFor="state">Estado</label>
                        <select name="state" id="state" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none" required>
                            <option value="">Seleccione un estado</option>
                            <option value="Sown">Sembrado</option>
                            <option value="Harvested">Cosechado</option>
                            <option value="Storaged">Almacenado</option>
                            <option value="Delivering">Por entregar</option>
                            <option value="Delivered">Entregado</option>
                        </select>                                                                        
                        <div className="flex gap-2">
                            <div className="flex flex-col">
                                <label htmlFor="sow_date">Fecha de Siembra</label>
                                <input type="date" name="sow_date" id="sow_date" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none" required />
                            </div>
                            <div className="flex flex-col">
                                <label htmlFor="harvest_date">Fecha de Cosecha</label>
                                <input type="date" name="harvest_date" id="harvest_date" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none"/>
                            </div>
                        </div>
                        <label htmlFor="smallholding_id">ID de Parcela</label>
                        <input type="number" name="smallholding_id" id="smallholding_id" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none" required />
                        <label htmlFor="storage_id">ID de Almacenamiento</label>
                        <input type="number" name="storage_id" id="storage_id" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none"/>
                        <label htmlFor="quantity">Cantidad</label>
                        <input type="number" name="quantity" id="quantity" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none" required />
                        <button type="submit" className="bg-green-500 text-white rounded-lg p-2">Agregar</button>
                    </div>                    
                </form>
            </div>
        </div>
    );    
}

export default AddCropForm;