import { describe, expect, it, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Pagination from "./Pagination";

describe("Filters", () => {
    it("renders Previous, Next, and page buttons", () => {
        render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);

        expect(screen.getByText(/previous/i)).toBeInTheDocument();
        expect(screen.getByText(/next/i)).toBeInTheDocument();
        ["1", "2", "3", "...", "5"].forEach((text) => {
            expect(screen.getByText(text)).toBeInTheDocument();
        });
    });

    it("disables Previous button on first page", () => {
        render(<Pagination page={1} totalPages={5} onPageChange={vi.fn()} />);
        expect(screen.getByText(/previous/i)).toBeDisabled();
        expect(screen.getByText(/next/i)).not.toBeDisabled();
    });

    it("disables Next button on last page", () => {
        render(<Pagination page={5} totalPages={5} onPageChange={vi.fn()} />);
        expect(screen.getByText(/next/i)).toBeDisabled();
        expect(screen.getByText(/previous/i)).not.toBeDisabled();
    });

    it("calls onPageChange with correct number when clicking numeric buttons", async () => {
        const mockOnPageChange = vi.fn();
        render(<Pagination page={2} totalPages={5} onPageChange={mockOnPageChange} />);

        await userEvent.click(screen.getByText("3"));
        expect(mockOnPageChange).toHaveBeenCalledWith(3);

        await userEvent.click(screen.getByText("1"));
        expect(mockOnPageChange).toHaveBeenCalledWith(1);
    });

    it("calls onPageChange when clicking Previous and Next", async () => {
        const mockOnPageChange = vi.fn();
        render(<Pagination page={3} totalPages={5} onPageChange={mockOnPageChange} />);

        await userEvent.click(screen.getByText(/previous/i));
        expect(mockOnPageChange).toHaveBeenCalledWith(2);

        await userEvent.click(screen.getByText(/next/i));
        expect(mockOnPageChange).toHaveBeenCalledWith(4);
    });

    it("renders ellipsis when there are many pages", () => {
        render(<Pagination page={10} totalPages={20} onPageChange={vi.fn()} />);

        expect(screen.getAllByText("...").length).toBeGreaterThanOrEqual(1);
    });
});
