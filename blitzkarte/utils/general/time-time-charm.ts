import { formatCountdown } from "./formatters";

export const deadlineTimer = (deadline: string, paddingUntil: string): string => {
  const difference = Date.parse(deadline) - Date.now();
  return formatCountdown(difference, paddingUntil);
}