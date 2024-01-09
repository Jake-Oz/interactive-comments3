export const convertDateToWords = (date: Date) => {
  let date1 = date;
  let date2 = new Date();

  // To calculate the time difference of two dates
  let Difference_In_Time = date2.getTime() - date1.getTime();

  // To calculate the no. of days between two dates
  let Difference_In_Days = Math.round(Difference_In_Time / (1000 * 3600 * 24));

  let dateInWords = "";
  if (Difference_In_Days < 1) {
    dateInWords = "Just added";
  } else if (Difference_In_Days < 7) {
    dateInWords =
      Difference_In_Days == 1
        ? `${Difference_In_Days} day ago`
        : `${Difference_In_Days} days ago`;
  } else if (Difference_In_Days < 30) {
    const weeks = Math.round(Difference_In_Days / 7);
    dateInWords = weeks == 1 ? `${weeks} week ago` : `${weeks} weeks ago`;
  } else if (Difference_In_Days < 365) {
    const months = Math.round(Difference_In_Days / 30);
    dateInWords = months == 1 ? `${months} month ago` : `${months} months ago`;
  }
  return dateInWords;
};
