import { clsx } from "clsx";
import { twMerge } from "tailwind-merge"
import { ROLES } from "./ROLES";

export function cn(...inputs) {
  return twMerge(clsx(inputs));
}

export const navigateBasedOnRole = (role) => {
  if (role.includes(ROLES.AFFILIATE)) {
    return '/affiliate/dashboard';
  }
  if (role.includes(ROLES.ADMIN)) {
    return '/admin/dashboard';
  }
  if (role.includes(ROLES.CUSTOMER)) {
    return '/customer/dashboard';
  }
  return '/';
};