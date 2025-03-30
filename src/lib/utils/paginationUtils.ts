export const getTableRange = (length: number): number[] => {
    const numberOfDivisions = Math.ceil(length / 10);
    return Array.from({ length: numberOfDivisions }, (_, i) => (i + 1) * 10);
  };