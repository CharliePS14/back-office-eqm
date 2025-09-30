import { clsx } from "clsx";
import currency from "currency.js";
import { twMerge } from "tailwind-merge";

/**
 * Combines multiple class names into a single string.
 *
 * This function uses `clsx` to conditionally join class names and `twMerge`
 * to merge them, ensuring that conflicting Tailwind CSS classes are resolved.
 * It simplifies the process of dynamically adding/removing class names
 * and avoids issues when multiple classes might conflict.
 *
 * @param {...(string | undefined | null | false)[]} classes - A list of class names or conditional values.
 *    Each value can be a string, `undefined`, `null`, or `false`, which will be ignored.
 * @returns {string} A single string with the merged class names.
 *
 * @example
 * ```ts
 * const buttonClasses = cn('btn', isPrimary && 'btn-primary', isDisabled && 'btn-disabled');
 * console.log(buttonClasses); // Output will be 'btn btn-primary' or 'btn btn-disabled'
 * ```
 */
export function cn(...classes: (string | undefined | null | false)[]) {
  return twMerge(clsx(classes));
}

/**
 * Dispatches a `storage` event manually on the `window` object.
 *
 * This function simulates a change in localStorage or sessionStorage by triggering
 * a `StorageEvent`. This can be useful in scenarios where you need to notify different
 * parts of the application about storage updates without actually modifying localStorage.
 *
 * @param {string} key - The key associated with the storage event.
 * @param {string | null} newValue - The new value associated with the key. Use `null` to indicate removal.
 */
export function dispatchStorageEvent(key: string, newValue: string | null) {
  window.dispatchEvent(new StorageEvent("storage", { key, newValue }));
}

/**
 * Formats a given value as a string representing shares.
 *
 * The function accepts a numeric or string input and formats it
 * using a configuration that sets the precision to zero, uses a comma
 * as the thousands separator, and applies Vedic formatting rules.
 * The formatted string does not include any currency symbol.
 *
 * @param value - The numeric or string value to format as shares.
 * @returns A formatted string representing the shares.
 */
export const formatShares = (value: string | number): string => {
  const config = {
    precision: 0,
    separator: ",",
    symbol: "",
  };
  return currency(value, config).format();
};
