export const formatCpf = (value: string) => {
  const numbers = value.replace(/\D/g, '').slice(0, 11);
  if (numbers.length <= 3) return numbers;
  if (numbers.length <= 6) return numbers.replace(/(\d{3})(\d+)/, '$1.$2');
  if (numbers.length <= 9) return numbers.replace(/(\d{3})(\d{3})(\d+)/, '$1.$2.$3');
  return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d+)/, '$1.$2.$3-$4');
};