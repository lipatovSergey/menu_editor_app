import { useState, ReactNode } from "react";
import { SortingContext } from "./SortingContext";

/**
 * Type definition for the props of the SortingProvider component.
 */
type SortingProviderProps = {
  /**
   * The child elements that will be wrapped by this provider.
   */
  children: ReactNode;
};

/**
 * Provides the SortingContext to its children.
 * This component manages the currently active sorting option.
 */
export const SortingProvider = ({ children }: SortingProviderProps) => {
  /**
   * State to hold the ID of the currently active sorting option.
   * Defaults to null, indicating no active sorting.
   */
  const [activeSorting, setActiveSorting] = useState<string | null>(null);

  /**
   * Provides the SortingContext value to all child components.
   * The context value includes the 'activeSorting' state and the 'setActiveSorting' function.
   */
  return (
    <SortingContext.Provider value={{ activeSorting, setActiveSorting }}>
      {children}
    </SortingContext.Provider>
  );
};