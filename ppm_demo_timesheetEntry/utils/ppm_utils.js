function getWeekRange(selectedDate) {
    const dateParts = selectedDate.split('-');
    const startDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
    const endDate = new Date(dateParts[0], dateParts[1] - 1, dateParts[2]);
   
    const dayOfWeek = startDate.getDay() === 0 ? 7 : startDate.getDay();
    startDate.setDate(startDate.getDate() - dayOfWeek + 1);
  
    endDate.setTime(startDate.getTime());
    endDate.setDate(startDate.getDate() + 6);
  
    const monthAbbr = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
    
    const formatDate = (date) => {
        const day = date.getDate().toString().padStart(2, '0');
        const month = monthAbbr[date.getMonth()];
        const year = date.getFullYear().toString().slice(-2); 
        return `${day}-${month}-${year}`;
    };
  
    // Logic: "22-Dec-25 to 28-Dec-25"
    return `${formatDate(startDate)} to ${formatDate(endDate)}`;
}
  
module.exports = { getWeekRange };