import React from 'react';
import { BiX, BiHash, BiMap, BiShapePolygon } from 'react-icons/bi';

interface AddCropFormProps {
    onClose: () => void;
    onSubmit: (data : {[key: string]: any}) => void;
}

const AddSmallholdingForm: React.FC<AddCropFormProps> = ({onClose, onSubmit}) => {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries())
        onSubmit(data);
        onClose();
    }

    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
            <div className="bg-white p-8 rounded-lg">
                <form onSubmit={handleSubmit}>
                    <div className="flex justify-between items-center mb-4">
                        <h2 className="text-lg font-semibold">Agregar Parcela</h2>
                        <button className="text-red-800 px-4 py-2 rounded-lg w-10" onClick={onClose}>
                            <BiX className="text-xl" />
                        </button>
                    </div>
                    <div className="flex flex-col gap-4 w-full">
                        <label htmlFor="ubication">Ubicación</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <BiMap className="text-gray-600"/>
                            </div>
                            <input type="text" name="ubication" id="ubication" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none" required />
                        </div>
                        <label htmlFor="size">Tamaño</label>
                        <div className="relative mt-1">
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <BiHash className="text-gray-600"/>
                            </div>
                            <input type="number" name="size" id="size" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none appearance-none" required />
                        </div>                       
                        <label htmlFor="shape">Forma</label>
                        <div className="relative mt-1">                           
                            <div className="absolute inset-y-0 right-0 flex items-center pr-2">
                                <BiShapePolygon className="text-gray-600"/>
                            </div>
                            <input type="text" name="shape" id="shape" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none" required />
                        </div>
                        <label htmlFor="delimitation">Delimitación</label>
                        <div className="relative mt-1">
                            <select name="delimitation" id="delimitation" className="border border-gray-300 rounded-lg p-2 bg-white focus:border-green-500 outline-none w-full" required>
                                <option value="true">Sí</option>
                                <option value="false">No</option>
                            </select>
                        </div>
                        <button type="submit" className="bg-green-500 text-white rounded-lg p-2">Agregar</button>
                    </div>                    
                </form>
            </div>
        </div>
    );    
}

export default AddSmallholdingForm;
