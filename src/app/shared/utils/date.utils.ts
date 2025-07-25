export function convertToIsoDate(dateStr?: string): string | null {
  if (!dateStr) return null;

  const [day, month, year] = dateStr.split('/');
  const isoDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

  return isNaN(isoDate.getTime()) ? null : isoDate.toISOString();
}

export function formatDisplayDate(
  dateString?: string,
  options: Intl.DateTimeFormatOptions = { day: '2-digit', month: 'long', year: 'numeric' },
  locale: string = 'en-GB'
): string {
  if (!dateString) return '—';

  let date: Date | null = null;

  // Handle dd/MM/yyyy
  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      date = new Date(+year, +month - 1, +day);
    }
  } else {
    // Assume ISO or yyyy-MM-dd
    date = new Date(dateString);
  }

  if (!date || isNaN(date.getTime())) return '—';

  return new Intl.DateTimeFormat(locale, options).format(date);
}


export function formatBirthdate(date: Date): string {
  // Format as "dd/MM/yyyy"
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
