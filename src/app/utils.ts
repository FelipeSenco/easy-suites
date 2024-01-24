export const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
export const cellPhoneRegex = /^[1-9][0-9][0-9]{9}$/;

export const Meses = {
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

export function formatDateToDDMMYYYY(date: Date) {
  if (!date) return "";

  const d = new Date(date);
  let month = "" + (d.getMonth() + 1); // Months are zero-based
  let day = "" + d.getDate();
  const year = d.getFullYear();

  if (month.length < 2) month = "0" + month;
  if (day.length < 2) day = "0" + day;

  return [day, month, year].join("/");
}
