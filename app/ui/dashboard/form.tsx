import { AiOutlineClose } from "react-icons/ai";
import { InputData } from "@/app/lib/definitions";
import { createUpdate, fetchInfo } from "@/app/lib/data";

interface Props{
	data: {[key: string]: any};
	title: string;
	handleClose: () => void;
	update: boolean;
	formKey: string
	values?:	{[key: string]: any};
}

export default function Form(props: Props) {
	const { data, title, handleClose, update, formKey, values } = props	
	const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault()
		const form = e.currentTarget
		const dataForm: {[key: string]: string} = {}
		Object.keys(data).forEach((key: string) => {
			const input: InputData = data[key]
			const value = form[input.props.for].value
			dataForm['id'] = values ? values.id.toString() : 0;
			if (value !== null && value !== ''){
				dataForm[input.props.for] = value;
			}			
		})
		createUpdate({data: dataForm, update, formKey})
		handleClose()
	}
	return (
		<>
			<div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-50"></div>
			<div className="form-container w-1/2 bg-white rounded-xl pt-2">
				<div className="flex w-full h-10 items-center justify-center">
					<h2 className="text-lg text-green-500">{title}</h2>
				</div>
				<div>
					<button className="close-button flex items-center justify-cente text-red-800 px-4 py-2 rounded-lg w-10" onClick={handleClose}>
						<AiOutlineClose className="text-xl" />
					</button>
				</div>
				<form className="flex flex-col gap-4 p-4" onSubmit={handleFormSubmit}>
					<div className="grid grid-cols-2 gap-4">
						{Object.keys(data).map((key) => {
							const inputType = data[key].type;
							const inputProps = data[key].props;
							return (
								<div key={key} className="flex flex-col gap-2">
									<label htmlFor={key} className="text-sm text-gray-600">
										{key}
										{inputProps.required && <span className="text-red-500">*</span>}
									</label>
									{inputType !== 'select' && (
										<input
											type={inputType}
											id={key}
											name={inputProps.for}
											className="border border-gray-300 rounded-lg p-2 outline-green-500"
											{...inputProps}
										/>
									)}
									{inputType === 'select' && (
										<select
											id={key}
											name={inputProps.for}
											className="border border-gray-300 rounded-lg p-2 outline-green-500 "
											style={{ backgroundColor: 'white'}}
											{...inputProps}
										>
											{inputProps.options.map((option: string) => (
												<option
													key={option}
													value={option}
													style={{ borderRadius: '0' }}
												>
													{option}
												</option>
											))}
										</select>
									)}
								</div>
							);
						})}
					</div>
					<div className="flex items-center justify-center h-12">
						<button className="bg-green-500 hover:bg-green-300 w-28 h-12 rounded-lg text-white">Guardar</button>
					</div>
				</form>
			</div>
		</>
	);
}