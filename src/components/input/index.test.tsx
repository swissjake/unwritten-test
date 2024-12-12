import { describe, it, expect, vi, beforeEach, afterEach } from "vitest";
import { render, screen, fireEvent, act } from "@testing-library/react";
import Input from "./index";

describe("Input", () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("renders search input with correct placeholder", () => {
    const setSearchTerm = vi.fn();
    render(<Input setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText("Search for a country...");
    expect(input).toBeInTheDocument();
  });

  it("updates input value when typing", () => {
    const setSearchTerm = vi.fn();
    render(<Input setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(input, { target: { value: "brazil" } });

    expect(input).toHaveValue("brazil");
  });

  it("debounces search term updates", async () => {
    const setSearchTerm = vi.fn();
    render(<Input setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText("Search for a country...");

    fireEvent.change(input, { target: { value: "brazil" } });

    expect(setSearchTerm).not.toHaveBeenCalled();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    expect(setSearchTerm).toHaveBeenCalledWith("brazil");
    expect(setSearchTerm).toHaveBeenCalledTimes(1);
  });

  it("cleans up timeout on unmount", () => {
    const setSearchTerm = vi.fn();
    const { unmount } = render(<Input setSearchTerm={setSearchTerm} />);

    const input = screen.getByPlaceholderText("Search for a country...");
    fireEvent.change(input, { target: { value: "brazil" } });

    unmount();

    act(() => {
      vi.advanceTimersByTime(1000);
    });

    // setSearchTerm should not be called after unmount
    expect(setSearchTerm).not.toHaveBeenCalled();
  });

  it("renders search icon", () => {
    const setSearchTerm = vi.fn();
    render(<Input setSearchTerm={setSearchTerm} />);

    const searchContainer = screen.getByRole("textbox").parentElement;
    expect(searchContainer).toHaveClass("flex", "items-center");
  });
});
