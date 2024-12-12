import { describe, it, expect, vi } from "vitest";
import { renderHook, waitFor } from "@testing-library/react";
import { useGetCountries } from "./useGetCountries";

describe("useGetCountries", () => {
  it("should fetch countries", async () => {
    const { result } = renderHook(() => useGetCountries());

    await waitFor(() => {
      expect(result.current.countries).toBeDefined();
    });
  });

  it("should handle loading state", () => {
    const { result } = renderHook(() => useGetCountries());
    expect(result.current.loading).toBe(true);
  });

  it("should handle error state", async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error("Failed to fetch"));

    const { result } = renderHook(() => useGetCountries());

    await waitFor(() => {
      expect(result.current.error).toBe("Failed to fetch");
    });
  });
});
