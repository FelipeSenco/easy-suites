export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const cellPhoneRegex = /^[1-9][0-9][0-9]{9}$/;

export const Meses: Record<string, number> = {
  Janeiro: 1,
  Fevereiro: 2,
  Março: 3,
  Abril: 4,
  Maio: 5,
  Junho: 6,
  Julho: 7,
  Agosto: 8,
  Setembro: 9,
  Outubro: 10,
  Novembro: 11,
  Dezembro: 12,
};

export function formatDateToYYYYMMDD(date: Date) {
  if (!date) return "";

  const d = new Date(date);
  let month = "" + (d.getMonth() + 1); // Months are zero-based
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [year, month, day].join("-");
}

export function formatDateToDDMMMYYYY(date: Date) {
  if (!date) return "";

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    return "Invalid Date";
  }

  const monthAbbreviations = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  const year = parsedDate.getUTCFullYear();
  const month = monthAbbreviations[parsedDate.getUTCMonth()]; // Use the abbreviation
  const day = String(parsedDate.getUTCDate()).padStart(2, "0");

  return [day, month, year].join(" ");
}
