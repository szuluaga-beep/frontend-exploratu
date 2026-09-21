import Link from "next/link";

export const CallToAction = () => {
	return (
		<section className="py-20 bg-yellow-500 text-black text-center">
			<div className="container mx-auto px-6">
				<h2 className="text-4xl font-bold mb-6">
					¿Listo para tu próxima aventura?
				</h2>
				<p className="text-xl mb-10">
					Únete a ExploraTu hoy mismo y comienza a explorar o a compartir tu
					mundo.
				</p>
				<div className="space-y-4 sm:space-y-0 sm:space-x-6 flex flex-col sm:flex-row justify-center">
					<Link
						href="/register" /* Link to your sign-up page */
						className="bg-white text-black hover:bg-gray-200 font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
					>
						Regístrate Ahora
					</Link>
					<Link
						href="#" /* Link to your contact page */
						className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-black font-bold py-3 px-8 rounded-full shadow-lg transition duration-300 ease-in-out transform hover:scale-105"
					>
						Contactanos
					</Link>
				</div>
			</div>
		</section>
	);
};
