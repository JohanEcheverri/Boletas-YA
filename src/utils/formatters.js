export const fmtCOP = (n) => `$${Number(n).toLocaleString("es-CO")}`;

export const fmtDate = (d) => {
  if (!d) return "";


  const [year, month, day] = d.split("-");
  const months = ["ene", "feb", "mar", "abr", "may", "jun", "jul", "ago", "sep", "oct", "nov", "dic"];


  return `${parseInt(day)} ${months[parseInt(month) - 1]}. ${year}`;
};
