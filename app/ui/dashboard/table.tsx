'use client'
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { AiOutlinePlus, AiOutlineEdit, AiOutlineDelete } from "react-icons/ai";
import { translateBoolean } from "@/app/lib/utils";
import { useSession } from "next-auth/react";
import { deleteInfo } from "@/app/lib/data";
import Form from "@/app/ui/dashboard/form";
import React, { useState } from "react";

interface TableProps {
	data: { [key: string]: any }[];
	keys: string[];
	formsKey: string;
	formsInputs: { [key: string]: any };
	apiKey: string;
	title?: string;
}

export default function Table(props: TableProps) {
	const { keys, formsKey, formsInputs, apiKey, title } = props;
	const [data, setData] = useState(props.data);
	const [checkedItems, setCheckedItems] = useState<Record<number, boolean>>({});
	const [checkedAll, setCheckedAll] = useState<boolean>(false);
	const [showAddForm, setShowAddForm] = useState<boolean>(false);
	const [showEditForm, setShowEditForm] = useState<boolean>(false);
	const [selectedItems, setSelectedItems] = useState<{ [key: string]: any }[]>([]);
	const [currentPage, setCurrentPage] = useState<number>(1);
	const [itemsPerPage, setItemsPerPage] = useState<number>(10);
	const [values, setValues] = useState<{[key: string]: any}>({});
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
		}
		else {
			setCheckedAll(false);
		}
	}

	const handleForm = () => {
		setShowAddForm(!showAddForm);
	}

	const handleEditForm = () => {
		setShowEditForm(!showEditForm);
	}

	const handleToShowEditForm = (values: {[key: string]: any}) => {
		setValues(values);
		handleEditForm();	
	}

	const handleDelete = async () => {
		if (selectedItems.length === 0) {
			return;
		}
		if (confirm(`¿Estás seguro de eliminar ${selectedItems.length} ${formsKey}?`)) {
			await Promise.all(selectedItems.map(item => deleteInfo(item.id, apiKey)));
			setData(data.filter((item) => !selectedItems.includes(item)));
		}
	}

	return (
		<div className="flex flex-col w-full gap-3">
			{showAddForm && <Form data={formsInputs} title={`Registro de ${formsKey}`} handleClose={handleForm} update={false} formKey={apiKey} />}
			{showEditForm && <Form data={formsInputs} title={`Actualización de ${formsKey}`} handleClose={handleEditForm} update={true} formKey={apiKey} values={values}/>}
			{
				session?.user?.permissions.includes(`create:${apiKey}`) && session?.user?.permissions.includes(`delete:${apiKey}`) && (
					<div className="flex h-16 w-full items-center px-2 gap-4 justify-end text-green-900">
						<div className="w-full"><h2 className="text-3xl font-bold text-green-900">{title}</h2></div>
						{session?.user?.permissions.includes(`create:${apiKey}`) && (
							<button className="flex items-center bg-green-500 px-4 py-2 rounded-lg w-32 hover:bg-green-300" onClick={() => handleForm()}>
								<AiOutlinePlus className="text-xl mr-2" />
								<span>Agregar</span>
							</button>
						)}
						{session?.user?.permissions.includes(`delete:${apiKey}`) && (
							<button className="flex items-center bg-red-500 px-4 py-2 rounded-lg w-32 hover:bg-red-300" onClick={handleDelete}>
								<AiOutlineDelete className="text-xl mr-2" />
								<span>Eliminar</span>
							</button>
						)}
					</div>
				)
			}
			<div className="w-full border rounded-md">
				<table className="w-full">
					<thead className="rounded-t-lg h-10">
						<tr className="text-xs sm:text-sm border-b border-gray-300 text-center max-w-10">
							<th className="flex flex-col h-14 justify-center items-center">
								<input
									type="checkbox"
									className="form-checkbox h-4 w-4 text-green-500 transition duration-150 ease-in-out"
									checked={checkedAll && Object.keys(checkedItems).length === data.length}
									onChange={() => handleCheckAll()}
								/>
							</th>
							{keys.map((key) => (
								<th key={key} className="">{key}</th>
							))}
							{
								session?.user?.permissions.includes(`update:${apiKey}`) && (
									<th className="">ACCIONES</th>
								)
							}
						</tr>
					</thead>
					<tbody>
						{currentItems.map((row, index) => (
							<tr key={index} className="text-xs sm:text-sm text-center border-t border-gray-300 h-10">
								<td className="w-8">
									<input
										type="checkbox"
										className="form-checkbox h-4 w-4 transition duration-150 ease-in-out "
										checked={checkedItems[index]}
										onChange={() => handleCheck(index)}
									/>
								</td>
								{Object.values(row).map((value, index) => (
									<td key={index} className="">{typeof value === 'boolean' ? translateBoolean(value) : value} </td>
								))}
								{
									session?.user?.permissions.includes(`update:${apiKey}`) && (
										<td className="w-32">
											<button className="text-green-800 px-2 py-1 rounded-lg hover:text-green-300" onClick={() => handleToShowEditForm(currentItems[index])}>
												<AiOutlineEdit className="text-xl" />
											</button>
										</td>
									)
								}
							</tr>
						))}
					</tbody>
				</table>
			</div>
			<div className="flex justify-center w-full items-center gap-4">
				<button onClick={() => handlePage(1)} disabled={currentPage === 1} className='hover:font-bold text-green-900 px-2 rounded-lg h-7 w-7 flex items-center text-base'>
					<FaChevronLeft />				
					<FaChevronLeft />
				</button>
				<button onClick={() => handlePage(currentPage - 1)} disabled={currentPage === 1} className='hover:font-bold text-green-900 px-2 rounded-lg h-7 w-7 flex items-center text-xs'>
					<FaChevronLeft />				
				</button>
				{
					Array.from({ length: maxPage - minPage + 1 }, (_, i) => i + minPage).map((page) => (
						<button key={page} onClick={() => handlePage(page)} className={`${page === currentPage ? 'bg-green-400' : ''} hover:font-bold text-green-900 px-2 rounded-lg h-7 max-w-10`}>{page}</button>
					))
				}
				<button onClick={() => handlePage(currentPage+1)} disabled={currentPage === totalPages} className='hover:font-bold text-green-900 px-2 rounded-lg h-7 w-7 flex items-center text-xs'>					
					<FaChevronRight />
				</button>
				<button onClick={() => handlePage(totalPages)} disabled={currentPage === totalPages} className='hover:font-bold text-green-900 px-2 rounded-lg h-7 w-7 flex items-center text-base'>
					<FaChevronRight />
					<FaChevronRight />
				</button>
			</div>
		</div>
	);
}
