import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const navigateBasedOnRole = (role) => {
  switch (role) {
    case 'admin':
      return '/admin/dashboard';
    case 'customer':
      return '/customer/dashboard';
    case 'affiliate':
      return '/affiliate/dashboard';
    default:
      return '/';
  }
};