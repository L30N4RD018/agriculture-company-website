import Navbar from "@/app/ui/dashboard/Navbar"

export default function Dashboard({ children }: { children: React.ReactNode }) {	
	return (
		<main className="flex flex-col sm:flex-row h-auto max-h-screen sm:min-h-screen gap-3">
			<Navbar />			
			<section className="flex flex-col h-full w-full pt-20 px-2">
				{children}
			</section>
		</main>
	)
}