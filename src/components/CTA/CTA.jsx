const CTA = ()=>{
    return (
        <>
        <div className="bg-gray-800 w-full font-[sans-serif]">
      <div className="grid md:grid-cols-2 gap-4 items-center md:max-h-[475px] overflow-hidden">
        <div className="relative w-full h-full md:min-h-[470px]">
          <img src="https://readymadeui.com/team-image.webp" className="w-full h-full object-cover shrink-0" />
          <span className="w-full h-full absolute inset-0 bg-blue-600 opacity-50"></span>
        </div>
        <div className="p-6 max-w-xl mx-auto">
          <h1 className="sm:text-4xl text-2xl font-bold text-blue-500">CTA Section!</h1>
          <div className="mt-6">
            <p className="text-sm text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nuncet
              tempus blandit, metus mi consectetur nibh, a pharetra felis turpis vitae ligula. Etiam laoreet velit nec neque
              ultrices, non consequat mauris tincidunt.</p>
            <p className="mt-2 text-sm text-gray-300">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis accumsan, nuncet
              tempus blandit, metus mi consectetur nibh.</p>
          </div>
          <button type="button"
            className="px-6 py-3 mt-10 rounded text-white text-sm tracking-wider font-semibold border-none outline-none bg-gray-600 hover:bg-gray-700">Get started</button>
        </div>
      </div>
    </div>
    </>
    )
}
export default CTA;