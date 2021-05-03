export const formatDeadline = (deadline: string): number => {
  const newDeadline = Number(deadline.split("-").join(""));
  return newDeadline;
};
