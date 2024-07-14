export const enterKeyHandler = (
  event: React.KeyboardEvent<HTMLFormElement>
) => {
  if (event.key === 'Enter') event.preventDefault();
};
