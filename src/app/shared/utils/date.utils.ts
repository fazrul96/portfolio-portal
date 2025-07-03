export function convertToIsoDate(dateStr?: string): string | null {
  if (!dateStr) return null;

  const [day, month, year] = dateStr.split('/');
  const isoDate = new Date(`${year}-${month}-${day}T00:00:00Z`);

  return isNaN(isoDate.getTime()) ? null : isoDate.toISOString();
}

export function formatDate(dateString?: string): string {
  if (!dateString) return '—';

  // Handle dd/MM/yyyy
  if (dateString.includes('/')) {
    const parts = dateString.split('/');
    if (parts.length === 3) {
      const [day, month, year] = parts;
      return `${year}/${month.padStart(2, '0')}/${day.padStart(2, '0')}`;
    }
  }

  // Handle ISO format yyyy-MM-dd
  if (dateString.includes('-')) {
    const date = new Date(dateString);
    if (!isNaN(date.getTime())) {
      const yyyy = date.getFullYear();
      const mm = String(date.getMonth() + 1).padStart(2, '0');
      const dd = String(date.getDate()).padStart(2, '0');
      return `${yyyy}/${mm}/${dd}`;
    }
  }

  return '—';
}

export function formatBirthdate(date: Date): string {
  // Format as "dd/MM/yyyy"
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}
