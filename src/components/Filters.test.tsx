import { describe, expect, it, vi } from "vitest";
import Filters from "./Filters";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";

describe("Filters", () => {
    it("renders input, select and buttons correctly", () => {
        const mockHandleChange = vi.fn();
        render(<Filters handleChange={mockHandleChange} />);

        expect(screen.getByLabelText(/Search by name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Search by favorites/i)).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /apply/i })).toBeInTheDocument();
        expect(screen.getByRole("button", { name: /clear/i })).toBeInTheDocument();
    });

    it("calls handleChange with typed search when clicking Apply", async () => {
        const mockHandleChange = vi.fn();
        render(<Filters handleChange={mockHandleChange} />);

        const input = screen.getByPlaceholderText(/enter a name/i);
        await userEvent.type(input, "pikachu");

        await userEvent.click(screen.getByRole("button", { name: /apply/i }));

        expect(mockHandleChange).toHaveBeenCalledWith(
            expect.objectContaining({ search: "pikachu", favorites: "" })
        );
    });

    it("calls handleChange with selected option when clicking Apply", async () => {
        const mockHandleChange = vi.fn();
        render(<Filters handleChange={mockHandleChange} />);

        const select = screen.getByLabelText(/search by favorites/i);
        await userEvent.selectOptions(select, "favorites");

        await userEvent.click(screen.getByRole("button", { name: /apply/i }));

        expect(mockHandleChange).toHaveBeenCalledWith(
            expect.objectContaining({ search: "", favorites: "favorites" })
        );
    });

    it("calls handleChange with empty values when clicking Clear", async () => {
        const mockHandleChange = vi.fn();
        render(<Filters handleChange={mockHandleChange} />);

        await userEvent.type(screen.getByPlaceholderText(/enter a name/i), "pikachu");
        await userEvent.selectOptions(screen.getByLabelText(/search by favorites/i), "favorites");

        await userEvent.click(screen.getByRole("button", { name: /clear/i }));

        expect(mockHandleChange).toHaveBeenCalledWith({ search: "", favorites: "" });

        const searchInput = screen.getByPlaceholderText(/enter a name/i) as HTMLInputElement;
        const select = screen.getByLabelText(/search by favorites/i) as HTMLSelectElement;

        expect(searchInput.value).toBe("");
        expect(select.value).toBe("");
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
