import React from "react";

export const HowItWorksGuide = () => {
	return (
		<section id="how-it-works-guide" className="py-16 bg-white">
			<div className="container mx-auto px-6 text-center">
				<h2 className="text-4xl font-bold mb-12 text-gray-800">
					¿Cómo ser un guía?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<div className="text-green-500 text-5xl mb-4">📝</div>{" "}
						{/* Replace with actual icons */}
						<h3 className="text-2xl font-semibold mb-4 text-black">
							1. Crea tu Perfil
						</h3>
						<p className="text-gray-600">
							Comparte tu experiencia, pasiones y los tours que ofreces.
						</p>
					</div>
					<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<div className="text-green-500 text-5xl mb-4">📢</div>{" "}
						{/* Replace with actual icons */}
						<h3 className="text-2xl font-semibold mb-4 text-black">
							2. Promociona tus Tours
						</h3>
						<p className="text-gray-600">
							Atrae a turistas interesados en tus especialidades y destinos.
						</p>
					</div>
					<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<div className="text-green-500 text-5xl mb-4">💰</div>{" "}
						{/* Replace with actual icons */}
						<h3 className="text-2xl font-semibold mb-4 text-black">
							3. Gana y Explora
						</h3>
						<p className="text-gray-600">
							Genera ingresos haciendo lo que amas: compartir tu mundo.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
