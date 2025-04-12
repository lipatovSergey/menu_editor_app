import { createContext, useContext } from "react";

/**
 * Type definition for the sorting context.
 */
type SortingContextType = {
  /**
   * The ID of the currently active sorting option, or null if no sorting is active.
   */
  activeSorting: string | null;
  /**
   * Function to set the active sorting option.
   * @param id The ID of the sorting option to activate, or null to clear the sorting.
   */
  setActiveSorting: (id: string | null) => void;
};

/**
 * Creates a context for managing the active sorting option.
 * Initializes with no active sorting and an empty function for setting the active sorting.
 */
export const SortingContext = createContext<SortingContextType>({
  activeSorting: null,
  setActiveSorting: () => {},
});

/**
 * Custom hook to access the sorting context.
 * Provides a convenient way to get and set the active sorting option.
 *
 * @returns An object containing the active sorting ID and the function to set it.
 * @throws Error If the hook is used outside of a SortingProvider.
 */
export const useSorting = () => {
  const context = useContext(SortingContext);
  if (!context) {
    throw new Error("useSorting must be used within SortingProvider");
  }
  return context;
};