import { describe, expect, it, vi } from "vitest";
import Filters from "./Filters";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Filters", () => {
    it("renders input and select correctly", () => {
        const mockHandleChange = vi.fn();
        render(<Filters handleChange={mockHandleChange} />);

        expect(screen.getByLabelText(/Search by name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Search by favorites/i)).toBeInTheDocument();
    });

    it("calls handleChange when typing in search input and submitting", async () => {
        const mockHandleChange = vi.fn();
        render(<Filters handleChange={mockHandleChange} />);

        const input = screen.getByPlaceholderText(/enter a name/i);

        await userEvent.type(input, "pikachu");

        expect(mockHandleChange).toHaveBeenCalled();
        expect(mockHandleChange).toHaveBeenCalledWith(
            expect.objectContaining({ search: "pikachu", favorites: "" })
        );
    });

    it("calls handleChange when selecting favorites and submitting", async () => {
        const mockHandleChange = vi.fn();
        render(<Filters handleChange={mockHandleChange} />);

        const select = screen.getByLabelText(/search by favorites/i);

        await userEvent.selectOptions(select, "favorites");

        expect(mockHandleChange).toHaveBeenCalled();
        expect(mockHandleChange).toHaveBeenCalledWith(
            expect.objectContaining({ search: "", favorites: "favorites" })
        );
    });

    it("default values are empty", () => {
        const mockHandleChange = vi.fn();
        render(<Filters handleChange={mockHandleChange} />);

        const searchInput = screen.getByPlaceholderText(/Enter a name/i) as HTMLInputElement;
        const select = screen.getByLabelText(/Search by favorites/i) as HTMLSelectElement;

        expect(searchInput.value).toBe("");
        expect(select.value).toBe("");
    });
});
