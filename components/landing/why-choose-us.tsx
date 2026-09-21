import React from "react";

export const WhyChooseUs = () => {
	return (
		<section className="py-16 bg-gray-100">
			<div className="container mx-auto px-6 text-center">
				<h2 className="text-4xl font-bold mb-12 text-gray-800">
					¿Por qué elegir ExploraTu?
				</h2>
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-3 text-indigo-700">
							Experiencias Auténticas
						</h3>
						<p className="text-gray-600">
							Conecta con locales que te mostrarán el verdadero corazón de cada
							lugar.
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-3 text-indigo-700">
							Seguridad y Confianza
						</h3>
						<p className="text-gray-600">
							Guías verificados y sistema de pago seguro para tu tranquilidad.
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-3 text-indigo-700">
							Flexibilidad Total
						</h3>
						<p className="text-gray-600">
							Tours personalizados a tu medida, horarios flexibles y precios
							justos.
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-3 text-indigo-700">
							Comunidad Apasionada
						</h3>
						<p className="text-gray-600">
							Únete a una red de viajeros y guías que aman explorar y compartir.
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-3 text-indigo-700">
							Soporte Dedicado
						</h3>
						<p className="text-gray-600">
							Estamos aquí para ayudarte en cada paso de tu aventura.
						</p>
					</div>
					<div className="bg-white p-6 rounded-lg shadow-md">
						<h3 className="text-xl font-semibold mb-3 text-indigo-700">
							Gana con tu Pasión
						</h3>
						<p className="text-gray-600">
							Guías: monetiza tu conocimiento y amor por tu ciudad.
						</p>
					</div>
				</div>
			</div>
		</section>
	);
};
