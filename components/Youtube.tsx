export default function Youtube() {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10">
          <span className="inline-block bg-red-100 text-red-600 text-xs font-bold px-3 py-1 rounded-full mb-3">
            Video
          </span>
          <h2 className="text-3xl font-extrabold text-gray-800">
            Sekilas Pondok Pesantren
          </h2>
          <p className="text-gray-500 mt-2 text-sm max-w-xl mx-auto">
            Saksikan langsung suasana dan kegiatan di Pondok Pesantren Thoriqul Irsyad.
          </p>
        </div>

        <div className="flex justify-center">
          <div className="w-full max-w-3xl rounded-2xl overflow-hidden shadow-xl">
            <div className="relative w-full" style={{ paddingBottom: "56.25%" }}>
              <iframe
                className="absolute inset-0 w-full h-full"
                src="https://www.youtube.com/embed/RkJxRs-XVCM?si=3zOZhmHFGU6tWE8s"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
