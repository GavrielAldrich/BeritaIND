const getCurrentDateDetails = () => {
  const months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const d = new Date();
  const day = days[d.getDay()];
  const month = months[d.getMonth()];
  const thisYear = d.getFullYear();
  const dayNum = d.getDate();
  return { day, month, thisYear, dayNum };
};

export default getCurrentDateDetails;
