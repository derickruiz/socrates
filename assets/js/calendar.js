var Calendar = (function () {

    var months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    var now   = new Date(),
        day   = now.getDate(),
        dayOfWeek = now.getDay(),
        month = now.getMonth(),
        year  = now.getFullYear(),
        daysThisMonth = getDaysInMonth(month + 1, year),
        firstOfThisMonth = new Date(year, month, 1),
        startingDayThisMonth = firstOfThisMonth.getDay();

    function getDaysInMonth(month, year)  {
        if (month === 1 || month === 3 || month === 5 || month === 7 || month === 8 || month === 10 || month === 12) {
            return 31;
        } else if (month === 4 || month === 6 || month === 9 || month === 11) {
            return 30;
        } else if (month === 2) {
            if (isLeapYear(year)) {
                return 29;
            } else {
                return 28;
            }
        }
    }

    function isLeapYear() {
    	return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

    /* DOM Related stuff */
    var CalendarView = document.querySelector(".CalendarView"),
        CalendarRow = document.createElement("div"),
        CalendarDay,
        CalendarDayNumber,
        CalendarDayChart;

    CalendarRow.classList.add("CalendarView--row");
    CalendarView.appendChild(CalendarRow);

    var rowPositionCounter = 0; // Keeps track of where the current day is in the row.
    var currentIterationCounter = 0; // Keeps track of which iteration we're on.

    for (var i = 0; i < startingDayThisMonth; i += 1) {
        CalendarDay = document.createElement("div");
        CalendarDay.classList.add("CalendarView--day");
        CalendarRow.appendChild(CalendarDay);
    }

    for (var i = 1; i <= daysThisMonth; i += 1) {

        // For every 7 days create a row. (COMPLETE)
        // For the first row, create empty blocks until we reach the day of firstOfThisMonth
        // For the last row, create empty blocks until we reach the 7th block.
        // If it's today, then set a different class that says it's today.

        if (currentIterationCounter === 0) {
            rowPositionCounter += startingDayThisMonth;
        }

        if (rowPositionCounter % 7 === 0) {
            rowPositionCounter = 1;
            CalendarRow = document.createElement("div");
            CalendarRow.classList.add("CalendarView--row");
            CalendarView.appendChild(CalendarRow);
        }

        CalendarDay = document.createElement("div");
        CalendarDay.classList.add("CalendarView--day");

        CalendarDayNumber = document.createElement("div");
        CalendarDayNumber.classList.add("CalendarView--dayNumber");
        CalendarDayNumber.innerHTML = i;

        CalendarDayChart = document.createElement("div");
        CalendarDayChart.classList.add("CalendarView--dayChart");

        CalendarDay.appendChild(CalendarDayNumber);
        CalendarDay.appendChild(CalendarDayChart);

        CalendarRow.appendChild(CalendarDay);

        currentIterationCounter += 1;
    }

    // Do a check for how many days are left in the last week.

})();