export function validate(inputValue: unknown): Promise<void> {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      return typeof inputValue === 'string' && /^[a-zA-Z]+$/.test(inputValue) ? resolve() : reject();
    }, 1000);
  });
}
