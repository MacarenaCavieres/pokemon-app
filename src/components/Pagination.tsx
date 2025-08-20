type Props = {
    page: number;
    totalPages: number;
    onPageChange: (newPage: number) => void;
};

function Pagination({ page, totalPages, onPageChange }: Props) {
    const getPages = () => {
        const pages = [];

        if (page > 3) {
            pages.push(1);
            if (page > 4) pages.push("...");
        }

        const start = Math.max(1, page - 2);
        const end = Math.min(totalPages, page + 2);

        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        if (page < totalPages - 2) {
            if (page < totalPages - 3) pages.push("...");
            pages.push(totalPages);
        }

        return pages;
    };

    const pages = getPages();

    return (
        <div className="flex justify-center items-center gap-2 mt-16">
            <button
                className="px-3 py-1 rounded bg-red-400 text-yellow-100 font-bold disabled:bg-gray-400 disabled:cursor-default cursor-pointer"
                onClick={() => onPageChange(page - 1)}
                disabled={page === 1}
            >
                Previous
            </button>

            {pages.map((num, index) =>
                num === "..." ? (
                    <span key={index} className="px-2 text-black text-lg">
                        ...
                    </span>
                ) : (
                    <button
                        key={index}
                        onClick={() => onPageChange(+num)}
                        className={`px-3 py-1 rounded font-bold cursor-pointer ${
                            num === page
                                ? "bg-yellow-300 text-red-700"
                                : "bg-white text-red-400 hover:bg-yellow-100"
                        }`}
                    >
                        {num}
                    </button>
                )
            )}

            <button
                className="px-3 py-1 rounded bg-red-400 text-yellow-100 font-bold disabled:bg-gray-400 disabled:cursor-default cursor-pointer"
                onClick={() => onPageChange(page + 1)}
                disabled={page === totalPages}
            >
                Next
            </button>
        </div>
    );
}

export default Pagination;
