'use client'
import { BiLeaf } from "react-icons/bi";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { errorToast } from "@/app/lib/errors";


export default function Home() {
	const router = useRouter();
		
	const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
		e.preventDefault();
		const email = (e.currentTarget[0] as HTMLInputElement).value;
		const password = (e.currentTarget[1] as HTMLInputElement).value;				
		const responseNextAuth = await signIn('credentials', {
			email,
			password,
			redirect: false
		})
		console.log(responseNextAuth)
		if(responseNextAuth?.error){
			errorToast(responseNextAuth.error)
			return
		}else if(responseNextAuth?.ok)
			router.push('/dashboard')
	};

	return (
		<main className="flex flex-col sm:flex-row min-h-screen gap-y-6">
			<section className="flex flex-col w-full h-56 justify-end items-center gap-y-4">
				<div className="flex flex-col gap-4 w-16 h-16 items-center justify-center rounded-full border-green-500 border bg-yellow-200">
					<BiLeaf className="w-10 h-10 text-green-500"/>
				</div>
				<h1 className="text-2xl font-bold text-green-900">Agriculture Company</h1>
			</section>
			<section className="flex flex-col w-full sm:w-1/2 gap-4 items-center">
				<form className="flex flex-col w-3/4 gap-4" onSubmit={handleSubmit}>
					<input type="email" placeholder="Correo Electrónico" className="p-3 rounded-lg border border-gray-300" required/>
					<input type="password" placeholder="Contraseña" className="p-3 rounded-lg border border-gray-300" required/>
					<button type="submit" className="bg-green-500 text-white p-3 rounded-lg hover:bg-green-300">Iniciar Sesión</button>
				</form>
			</section>
			<footer className="flex flex-col w-full h-16 justify-center items-center">
				<p className="text-sm">© 2024 Agriculture Company</p>
			</footer>
		</main>
	);
}
