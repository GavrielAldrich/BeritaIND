const getCurrentDateDetails = {
  months: [
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
  ],
  days: [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ],
  get: function () {
    const d = new Date();
    const day = this.days[d.getDay()];
    const month = this.months[d.getMonth()];
    const thisYear = d.getFullYear();
    const dayNum = d.getDate();
    return { day, month, thisYear, dayNum };
  },
};

export default getCurrentDateDetails;
