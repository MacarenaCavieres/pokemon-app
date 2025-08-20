function Loader() {
    return (
        <div className="flex justify-center items-center h-32 gap-3">
            <div className="relative w-10 h-10 rounded-full border-4 border-black animate-bounce">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full"></div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white"></div>
            </div>
            <div className="relative w-10 h-10 rounded-full border-4 border-black animate-bounce [animation-delay:-.3s]">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full"></div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white"></div>
            </div>
            <div className="relative w-10 h-10 rounded-full border-4 border-black animate-bounce [animation-delay:-.5s]">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-red-500 rounded-t-full"></div>
                <div className="absolute bottom-0 left-0 w-full h-1/2 bg-white rounded-b-full"></div>
                <div className="absolute top-1/2 left-1/2 w-3 h-3 bg-black rounded-full -translate-x-1/2 -translate-y-1/2 border-2 border-white"></div>
            </div>
        </div>
    );
}
export default Loader;
