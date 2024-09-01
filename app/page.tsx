'use client'
import Tractor from "@/public/tractor.png";
import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";


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

		router.push('/dashboard')
	};

	return (
		<main className="flex flex-col sm:flex-row min-h-screen gap-y-6">
			<section className="flex flex-col h-auto sm:min-h-screen bg-gray-900 w-full sm:w-[60%]">
				<img src={Tractor.src} alt="Tractor" className="w-full h-[250px] sm:h-[450px]" />
				<div className="flex flex-col h-full items-center justify-center bg-gray-950 py-3">
					<h1 className="text-white text-4xl">Agriculture Company</h1>
				</div>
			</section>
			<section className="flex flex-col h-auto sm:min-h-screen bg-gray-800 w-full sm:w-[60%] items-center justify-center">
				<div className="flex flex-col items-center justify-center h-3/4 w-80 sm:w-[60%] bg-gray-600 text-center gap-4 rounded-2xl">
					<h2 className="text-white text-xl font-bold">Estimado usuario <br /> ¡Bienvenido! a nuestro sistema</h2>					
					<form className="flex flex-col items-center justify-center w-full p-4" onSubmit={handleSubmit}>
						<div className="flex flex-col w-full items-center">
							<div className="w-full">
								<div className="flex flex-col gap-2 w-full items-start">
									<label htmlFor="username">
										<span className="text-white font-semibold">Correo electrónico</span>
									</label>
									<input type="email" placeholder="Correo electrónico" className="w-full h-12 p-2 mb-4 rounded-lg outline-none hover:outline-green-500 hover:border-0" />
								</div>
								<div className="flex flex-col gap-2 w-full items-start">
									<label htmlFor="password">
										<span className="text-white font-semibold">Contraseña</span>
									</label>
									<input type="password" placeholder="Contraseña" className="w-full h-12 p-2 mb-4 rounded-lg outline-none hover:outline-green-500 hover:border-0" />
								</div>
								<button className="bg-gradient-main w-full h-12 rounded-lg text-green-900">Iniciar sesión</button>
							</div>
						</div>
					</form>
				</div>
			</section>
		</main>
	);
}
