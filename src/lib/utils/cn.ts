/**
 * Conditionally join CSS class names.
 * Lightweight alternative to clsx/classnames.
 */
export function cn(...inputs: (string | boolean | undefined | null)[]): string {
  return inputs.filter(Boolean).join(" ");
}
