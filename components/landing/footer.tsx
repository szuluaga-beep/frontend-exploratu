import Link from "next/link";
import React from "react";

export const Footer = () => {
	return (
		<footer className="bg-gray-800 text-white py-10">
			<div className="container mx-auto px-6 text-center md:flex md:justify-between md:items-center">
				<div className="mb-6 md:mb-0">
					<h3 className="text-2xl font-bold">ExploraTu</h3>
					<p className="text-gray-400 text-sm mt-2">
						&copy; 2025 ExploraTu. Todos los derechos reservados.
					</p>
				</div>
				<nav className="flex flex-wrap justify-center space-x-6">
					<Link
						href="#"
						className="hover:text-indigo-400 transition-colors duration-300"
					>
						Política de Privacidad
					</Link>
					<Link
						href="#"
						className="hover:text-indigo-400 transition-colors duration-300"
					>
						Términos de Servicio
					</Link>
					<Link
						href="#"
						className="hover:text-indigo-400 transition-colors duration-300"
					>
						Preguntas Frecuentes
					</Link>
					<Link
						href="#"
						className="hover:text-indigo-400 transition-colors duration-300"
					>
						Contacto
					</Link>
				</nav>
				<div className="mt-6 md:mt-0 flex justify-center space-x-4">
					{/* Social Media Icons (replace with actual SVG icons or libraries like React Icons) */}
					<Link
						href="#"
						className="text-gray-400 hover:text-white transition-colors duration-300"
					>
						FB
					</Link>
					<Link
						href="#"
						className="text-gray-400 hover:text-white transition-colors duration-300"
					>
						IG
					</Link>
					<Link
						href="#"
						className="text-gray-400 hover:text-white transition-colors duration-300"
					>
						TW
					</Link>
				</div>
			</div>
		</footer>
	);
};
