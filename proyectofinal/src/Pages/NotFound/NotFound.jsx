const NotFound = () => {
    return (
        <div className="h-screen w-full bg-gradient-to-b from-blue-400 to-blue-200 flex justify-center">
            <div className="bg-white m-28 mx-12 absolute md:flex md:flex-row-reverse flex flex-col-reverse  p-10 h-96 w-4/5">
                <img src="https://onlinezebra.com/wp-content/uploads/2019/01/error-404-not-found.jpg" class="md:w-auto w-48 md:mt-10 mt-auto md:h-auto h-40 md:object-left ml-4 " />
                <div className="md:text-center   md:mt-10 mt-24">
                    <h1 className="text-lg md:text-6xl text-gray-600 font-quicksand text-center">404</h1>
                    <h2 className="text-sm md:text-4xl text-gray-500 font-quicksand text center flex justify-center">Oops! Something went wrong</h2>
                    <p className=" text-xs md:text-lg p-4 text-quicksand text-justify"> Remember those old 404 pages from the 90s that said somethink like "Something's gone wrong, but don't worry, our websmasters have been notified. "But were the websmasters ever notified? I mean, were they really?</p>
                </div>
            </div >
        </div>
    );
}

export default NotFound;