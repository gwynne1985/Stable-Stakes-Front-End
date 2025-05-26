// Utility to convert '10 SEP' to 'YYYY-MM-DD' using the current year
export function toISODate(dateStr: string): string {
  if (!dateStr) return '';
  const [day, monthShort] = dateStr.split(' ');
  const months = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];
  const month = months.indexOf(monthShort.toUpperCase());
  if (month === -1) return '';
  const year = new Date().getFullYear(); // You can adjust this if you have a year in your data
  return `${year}-${String(month+1).padStart(2,'0')}-${String(day).padStart(2,'0')}`;
} 