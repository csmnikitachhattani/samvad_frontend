export function getDuration(start_date, end_date) {
    const start = new Date(start_date);
    const end = new Date(end_date);
    console.log('hfjrhfjrh',start, end)
  
    if (end < start) {
      return {
        error: "End date should be greater than start date"
      };
    }
  
    const diffMs = end - start;
  
    const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));
  
    const diffMonths =
      (end.getFullYear() - start.getFullYear()) * 12 +
      (end.getMonth() - start.getMonth());
  
    const diffYears = end.getFullYear() - start.getFullYear();
    console.log(diffDays)
    return diffDays
  }