import React from "react";

export const HowItWorksTourist = () => {
	return (
		<section id="how-it-works-tourist" className="py-16 bg-gray-50">
			<div className="container mx-auto px-6 text-center">
				<h2 className="text-4xl font-bold mb-12 text-gray-800">
					¿Cómo funciona para turistas?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-3 gap-10">
					<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<div className="text-indigo-500 text-5xl mb-4">🌍</div>{" "}
						{/* Replace with actual icons */}
						<h3 className="text-2xl mb-4 text-black font-semibold">
							1. Busca tu Destino
						</h3>
						<p className="text-gray-600">
							Encuentra guías locales en tus destinos favoritos alrededor del
							mundo.
						</p>
					</div>
					<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<div className="text-indigo-500 text-5xl mb-4">🤝</div>{" "}
						{/* Replace with actual icons */}
						<h3 className="text-2xl mb-4 text-black font-semibold">
							2. Conecta y Reserva
						</h3>
						<p className="text-gray-600">
							Chatea con guías, personaliza tu tour y reserva de forma segura.
						</p>
					</div>
					<div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transition-shadow duration-300">
						<div className="text-indigo-500 text-5xl mb-4">✨</div>{" "}
						{/* Replace with actual icons */}
						<h3 className="text-2xl mb-4 text-black font-semibold">
							3. Disfruta la Experiencia
						</h3>
						<p className="text-gray-600">
							Vive aventuras únicas con el conocimiento y la pasión de tu guía
							local.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
