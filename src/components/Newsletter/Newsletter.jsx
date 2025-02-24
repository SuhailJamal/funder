const Newsletter = ()=>{
    return(
        <>
        <div className="bg-slate-200 py-16 mt-5 mb-5 dark:bg-gray-800 dark:text-white">
      <div className="max-w-6xl mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 p-4">
        <div className="w-full text-center lg:text-left">
          <h2 className="text-gray-800 text-5xl font-extrabold mb-6 dark:text-white">Stay Updated</h2>
          <p className="text-lg text-gray-600 dark:text-white">Subscribe to our newsletter for the latest updates, tips, and exclusive offers.</p>
        </div>

        <div className="w-full max-lg:max-w-lg">
          <form className="flex items-center">
            <input type="email" placeholder="Enter your email" className="w-full lg:w-[300px] text-gray-800 bg-white py-3.5 px-4 text-base border border-[#ddd] border-r-0 rounded-l-lg outline-none focus:border-blue-600" required />
            <button type="submit" className="bg-blue-600 hover:bg-blue-700 text-white text-base font-semibold tracking-wide py-3.5 px-6 border border-blue-600 rounded-r-lg outline-none">
              Subscribe
            </button>
          </form>
        </div>
      </div>
    </div>
        </>
    )
}
export default Newsletter;