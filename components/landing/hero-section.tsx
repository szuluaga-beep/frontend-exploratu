import Image from "next/image";
import Link from "next/link";
import { Logo } from "../ui/logo";

export const HeroSection = () => {
	return (
		<section className="relative h-screen flex items-center justify-center text-center text-white">
			<div className=" max-w-4xl mx-auto z-20 p-6">
				<Logo width={150} height={150} className="mb-4" />
				<h1 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4 animate-fade-in-down">
					Explora el Mundo con Guías Locales
				</h1>
				<p className="text-xl md:text-2xl mb-8 animate-fade-in-up">
					Conectamos turistas con guías apasionados para experiencias auténticas
					e inolvidables.
				</p>
				<div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center">
					<Link
						href="/tours"
						className="bg-yellow-300 hover:bg-yellow-400     text-black font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
					>
						Encuentra un Guía
					</Link>
					<Link
						href="/register"
						className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
					>
						Sé un Guía
					</Link>
				</div>
			</div>
		</section>
	);
};
