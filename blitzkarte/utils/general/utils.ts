export const convertSpaceToCamelCase = (spaceCase: string): string => {
  let spaceCaseSplit: string[] = spaceCase.split(' ');
  for (let index = 0; index < spaceCaseSplit.length; index++) {
    spaceCaseSplit[index] = spaceCaseSplit[index].toLowerCase();
    if (index > 0) {
      spaceCaseSplit[index] = spaceCaseSplit[index][0].toUpperCase();
    }
  }
  return spaceCaseSplit.join('');
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