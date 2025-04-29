import { RefObject, useEffect } from "react";

/**
 * When the page loads, it'll automatically focus on the element
 * @param elementRef - is the HTMLElement reference
 * @param shouldFocus - optional flag to control when focus should happen
 */
const useFocus = <T extends HTMLElement | null>(
  elementRef: RefObject<T>,
  shouldFocus: boolean = true
) => {
  useEffect(() => {
    if (elementRef.current && shouldFocus) {
      elementRef.current.focus();
    }
  }, [shouldFocus]);
};

export default useFocus;
