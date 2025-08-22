import type { FilterInputs } from "../types";
import { useForm } from "react-hook-form";

const selectOptions = [
    {
        title: "-- Select an option --",
        value: "",
    },
    {
        title: "Favorites",
        value: "favorites",
    },
    {
        title: "All",
        value: "all",
    },
];

type Props = {
    handleChange: (filters: FilterInputs) => void;
};
function Filters({ handleChange }: Props) {
    const { register, handleSubmit } = useForm({
        defaultValues: {
            search: "",
            favorites: "",
        },
    });

    const handleFilters = (data: FilterInputs) => {
        handleChange(data);
    };

    return (
        <form
            className="flex justify-center items-center flex-wrap gap-5 my-10 text-lg flex-col md:flex-row"
            onChange={handleSubmit(handleFilters)}
        >
            <div className="flex flex-col gap-2 md:min-w-1/3 min-w-2/3">
                <label htmlFor="search">Search by name</label>
                <input
                    type="text"
                    placeholder="Enter a name"
                    id="search"
                    className="focus:outline-none border-2 border-pink-800 p-2 rounded-lg"
                    {...register("search")}
                />
            </div>
            <div className="flex flex-col gap-2 md:min-w-1/3 min-w-2/3">
                <label htmlFor="favorites">Search by favorites</label>
                <select
                    id="favorites"
                    className="focus:outline-none border-2 border-pink-800 p-2 rounded-lg "
                    {...register("favorites")}
                >
                    {selectOptions.map((item) => (
                        <option key={item.value} value={item.value}>
                            {item.title}
                        </option>
                    ))}
                </select>
            </div>
            {/* <div className="flex gap-3">
                <button
                    type="submit"
                    className="mt-5 px-3 py-1 h-10 w-24 text-center rounded-lg uppercase bg-red-400 cursor-pointer font-bold text-yellow-100"
                >
                    Apply
                </button>
                <button
                    type="button"
                    className="mt-5 px-3 py-1 h-10 w-24 text-center rounded-lg uppercase bg-red-400 cursor-pointer font-bold text-yellow-100"
                    onClick={() => handleClear()}
                >
                    Clear
                </button>
            </div> */}
        </form>
    );
}
export default Filters;
