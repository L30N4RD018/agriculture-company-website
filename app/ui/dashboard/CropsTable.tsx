'use client'
import { 
    BiPlus, BiEraser, BiEdit, BiChevronLeft, 
    BiChevronRight, BiChevronsLeft, BiChevronsRight,
    BiShowAlt
} from "react-icons/bi"
import { deleteInfo, fetchTableInfo, createUpdate } from "@/app/lib/data"
import { errorToast, successToast } from "@/app/lib/errors"
import  AddCropForm  from "@/app/ui/dashboard/AddCropsForm"
import { useEffect, useState } from "react"
import { useSession } from "next-auth/react"

interface TableProps {
    data: { [key: string]: any }[];    
}

export default function CropsTable(props: TableProps) {
    const [data, setData] = useState(props.data);
    const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
    const [checkedAll, setCheckedAll] = useState<boolean>(false);
    const [selectedItems, setSelectedItems] = useState<{ [key: string]: any }[]>([]);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [itemsPerPage, setItemsPerPage] = useState<number>(10);    
    const [values, setValues] = useState<{[key: string]: any}>({});
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
    const { data: session } = useSession();
    
    const totalPages = Math.ceil(data.length / itemsPerPage);
    const maxNavPages = 5;
    const minPage = Math.max(1, currentPage - Math.floor(maxNavPages / 2));
    const maxPage = Math.min(totalPages, minPage + maxNavPages - 1);
    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;
    const currentItems = data.slice(indexOfFirstItem, indexOfLastItem);

    const handlePage = (page: number) => {
        if (page < 1 || page > totalPages) {
            return;
        }
        setCurrentPage(page);
    }

    const handleCheckAll = () => {
        const newCheckedItems = data.reduce((acc, _, index) => {
            acc[index] = checkedAll ? false : true;
            return acc;
        }, {} as Record<number, boolean>);
        setCheckedItems(newCheckedItems);
        setSelectedItems(checkedAll ? [] : data);
        setCheckedAll(!checkedAll);
    }

    const handleCheck = (index: number) => {
        const newCheckedItems = { ...checkedItems, [index]: !checkedItems[index] };
        setCheckedItems(newCheckedItems);
        const newSelectedItems = data.filter((_, idx) => newCheckedItems[idx]);
        setSelectedItems(newSelectedItems);
        if (newSelectedItems.length === data.length) {
            setCheckedAll(true);
        } else {
            setCheckedAll(false);
        }
    }

    const handleDelete = async () => {
        if (selectedItems.length === 0) {
            errorToast('No items selected');
            return;
        }
        if (confirm(`¿Estás seguro de eliminar ${selectedItems.length} elementos?`)) {
            await Promise.all(selectedItems.map(item => deleteInfo(item.id, 'crops', (message) => {errorToast(message)}, (message) => {successToast(message)})));
            setData(data.filter((item) => !selectedItems.includes(item)));
        }
    }

    const handleAddClick = () => {
        setIsModalOpen(true);
    }

    const handleClose = () => {
        setIsModalOpen(false);
    }

    const handleSubmit = async (data: {[key: string]: any}) => {
        Object.keys(data).forEach((key: string) => {
            if (data[key] === '') {
                delete data[key];
            }            
        })
        await createUpdate({data, update: false, formKey: 'crops'}, (message) => {errorToast(message)}, (message) => {successToast(message)});
    }

    useEffect(() => {
        fetchTableInfo('crops', (message) => {errorToast(message)}).then((data) => {
            setData(data);
        });
    }, [isModalOpen]);

    return (
        <div className="flex flex-col w-full gap-1">
            <div className="flex h-16 w-full items-center px-2 gap-4">
                <div className="w-full"><h2 className="text-lg font-bold">Gestión de Cultivos</h2></div>
                {
                    session?.user?.permissions.includes('create:crops') && (
                        <button onClick={handleAddClick} className="flex items-center justify-center p-1 bg-green-500 rounded-lg w-10 hover:bg-green-300">
                            <BiPlus className="text-white text-2xl"/>
                        </button>                        
                    )                    
                }
                {isModalOpen && <AddCropForm onClose={handleClose} onSubmit={handleSubmit}/>}
                {
                    session?.user?.permissions.includes('delete:crops') && (
                        <button className="flex items-center justify-center p-1 bg-red-500 rounded-lg w-10 hover:bg-red-300" onClick={handleDelete}>
                            <BiEraser className="text-white text-2xl"/>
                        </button>
                    )
                }
            </div>
            <div className="w-full border rounded-md">
                <table className="w-full">
                    <thead className="rounded-t-lg h-10">
                        <tr className="text-xs border-b border-gray-300 text-center max-w-10">
                            <th className="flex flex-col h-14 justify-center items-center">
                                <input 
                                    type="checkbox"
                                    className="form-checkbox h-4 w-4 text-green-500 transition duration-150 ease-in-out"
                                    checked={checkedAll && Object.keys(checkedItems).length === data.length} 
                                    onChange={handleCheckAll}
                                />
                            </th>
                            <th>Tipo</th>
                            <th>Estado</th>
                            <th>Fecha De Siembra</th>                            
                            <th>Acciones</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((item, index) => (
                            <tr key={item.id} className="text-xs border-b border-gray-300 text-center max-w-10">
                                <td className="flex flex-col h-14 justify-center items-center">
                                    <input 
                                        type="checkbox"
                                        className="form-checkbox h-4 w-4 text-green-500 transition duration-150 ease-in-out"
                                        checked={checkedItems[index]}
                                        onChange={() => handleCheck(index)}
                                    />
                                </td>
                                <td>{item.type}</td>
                                <td>{item.state}</td>
                                <td>{item.sow_date}</td>
                                <td className="flex gap-1 justify-center">                                    
                                    {
                                        session?.user?.permissions.includes('read:crops') && (
                                            <button className="flex items-center justify-center p-1 rounded-md w-8 hover:bg-blue-300">
                                                <BiShowAlt className="text-base"/>
                                            </button>
                                        )
                                    }                              
                                    {
                                        session?.user?.permissions.includes('update:crops') && (
                                            <button className="flex items-center justify-center p-1 rounded-md w-8 hover:bg-blue-300">
                                                <BiEdit className="text-base"/>
                                            </button>
                                        )
                                    }
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="flex justify-center w-full items-center gap-4">
                <button onClick={() => handlePage(1)} disabled={currentPage === 1} className="flex items-center justify-center p-1 rounded-md w-8 hover:bg-green-300">
                    <BiChevronsLeft className="text-lg"/>
                </button>
                <button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1} className="flex items-center justify-center p-1 rounded-md w-8 hover:bg-green-300">
                    <BiChevronLeft className="text-lg"/>
                </button>
                {
                    Array.from({ length: maxPage - minPage + 1 }, (_, i) => i + minPage).map((page) => (
                        <button key={page} onClick={() => handlePage(page)} className={`hover:font-bold text-green-900 px-2 rounded-lg h-7 max-w-10 ${page === currentPage ? 'bg-green-300' : ''}`}>
                            {page}
                        </button>
                    ))
                }
                <button onClick={() => handlePage(currentPage + 1)} disabled={currentPage === totalPages} className="flex items-center justify-center p-1 rounded-md w-8 hover:bg-green-300">
                    <BiChevronRight className="text-base"/>
                </button>
                <button onClick={() => handlePage(totalPages)} disabled={currentPage === totalPages} className="flex items-center justify-center p-1 rounded-md w-8 hover:bg-green-300">
                    <BiChevronsRight className="text-base"/>
                </button>
            </div>
        </div>
    );
}