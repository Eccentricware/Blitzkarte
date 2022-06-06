import { time } from "console";

export const convertSpaceToCamelCase = (spaceCase: string): string => {
  let spaceSplit: string[] = spaceCase.split(' ');
  for (let index = 0; index < spaceSplit.length; index++) {
    spaceSplit[index] = spaceSplit[index].toLowerCase();
    if (index > 0) {
      spaceSplit[index] = spaceSplit[index][0].toUpperCase() + spaceSplit[index].slice(1);
    }
  }
  return spaceSplit.join('');
}

export const convertSnakeToTitleCase = (snakeCase: string): string => {
  let snakeSplit: string[] = snakeCase.split('_');
  for (let index: number = 0; index < snakeSplit.length; index++) {
    snakeSplit[index] = snakeSplit[index].toLowerCase();
    snakeSplit[index] = snakeSplit[index][0].toUpperCase() + snakeSplit[index].slice(1);
  }
  return snakeSplit.join(' ');
}

export const convertSnakeToCamelCase = (snakeCase: string): string => {
  let snakeSplit: string[] = snakeCase.split('_');
  for (let index: number = 0; index < snakeSplit.length; index++) {
    snakeSplit[index] = snakeSplit[index].toLowerCase();
    if (index > 0) {
      snakeSplit[index] = snakeSplit[index][0].toUpperCase() + snakeSplit[index].slice(1);
    }
  }
  return snakeSplit.join('');
}

export const formatCountdown = (msLeft: number, paddingUntil: string): string => {
  let timer = '';
  // Days = 86,400,000 = 1000ms/s * 60s/m * 60m/hr * 24hr/day
  const days: number = Math.floor(msLeft / 86400000);
  msLeft -= 86400000 * days;

  // Hours = 3,600,000 = 1000ms/s * 60s/m * 60m/hr
  const hours: number = Math.floor(msLeft / 3600000);
  msLeft -= 3600000 * hours;

  // Minutes = 60,000 = 1000ms/s * 60s/m
  const minutes: number = Math.floor(msLeft / 60000);
  msLeft -= 60000 * minutes;

  // Seconds = 100 = 1000ms/s
  const seconds: number = Math.floor(msLeft / 1000);

  if (days > 0
    || paddingUntil === 'days') {
    timer += `${String(days).padStart(2, '0')}:`
  }

  if (hours > 0 || days > 0
    || ['days', 'hours'].includes(paddingUntil)) {
    timer += `${String(hours).padStart(2, '0')}:`
  }

  if (minutes > 0 || hours > 0 || days > 0
    || ['days', 'hours', 'minutes'].includes(paddingUntil)) {
    timer += `${String(minutes).padStart(2, '0')}:`
  }

  timer += String(seconds).padStart(2, '0');

  return timer;
}