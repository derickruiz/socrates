const utils = {

    /* Takes a number and returns an array with values up to that number. */
    range: function (number) {
        let array = [];

        for (let i = 0; i < number; i += 1) {
            array.push(i);
        }

        return array;
    }
};

const CalendarModel = function (month, year) {

    // Some constantants
    const MONTHS = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
          DAYS = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    function isLeapYear() {
        return ((year % 4 == 0) && (year % 100 != 0)) || (year % 400 == 0);
    }

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

    // Helper methods for the view
    function monthName(monthNumber) {
        return MONTHS[monthNumber];
    }

    // Recalculates the model properties.
    function update() {
        daysOfMonth(getDaysInMonth(selectedMonth() + 1, selectedYear));

        firstOfMonth = new Date(selectedYear, selectedMonth(), 1);
        lastOfMonth = new Date(selectedYear, selectedMonth(), daysOfMonth());

        startingDayMonth(firstOfMonth.getDay());
        lastDayMonth(lastOfMonth.getDay());
    }

    let date;

    if (month && year) {
        date = new Date(year, month, 1);
    } else {
        date = new Date();
    }

    let dayOfWeek = date.getDay(),
          selectedMonth = m.prop(date.getMonth()),
          selectedYear  = date.getFullYear(),
          daysOfMonth = m.prop(getDaysInMonth(selectedMonth() + 1, selectedYear)),
          firstOfMonth = new Date(selectedYear, selectedMonth(), 1),
          lastOfMonth = new Date(selectedYear, selectedMonth(), daysOfMonth()),
          startingDayMonth = m.prop(firstOfMonth.getDay()),
          lastDayMonth = m.prop(lastOfMonth.getDay());

    return {
        daysOfMonth: daysOfMonth,
        startingDayMonth: startingDayMonth,
        lastDayMonth: lastDayMonth,
        selectedMonth: selectedMonth,

        // VIEW METHODS
        monthName: monthName,
        update: update
    };

};

const Calendar = {
    controller: function(args) {
        return {
            calendar: args.model
        };
    },
    view: function(ctrl) {

        return m(".CalendarView", [
            (function () {
                let calendarRows = [];
                let calendarRow = m(".CalendarView--row");
                calendarRows.push(calendarRow);

                let counter = 0;

                // Add empty days for previous month based on this month's starting day.
                for (let i = 0; i < ctrl.calendar.startingDayMonth(); i += 1, counter += 1) {
                    calendarRow.children.push(
                        m(".CalendarView--day.CalendarView--day-notMonth", [
                            m(".CalendarView--dayNumber")
                        ])
                    );
                }

                for (let i = 0; i < ctrl.calendar.daysOfMonth(); i += 1, counter += 1) {

                    if (counter % 7 === 0) {
                        calendarRow = m(".CalendarView--row");
                        calendarRows.push(calendarRow);
                    }

                    calendarRow.children.push(
                        m(".CalendarView--day", [
                            m(".CalendarView--dayNumber", i + 1),
                            m(".CalendarView--dayChart")
                        ])
                    );

                }

                for (let i = ctrl.calendar.lastDayMonth(); i < 6; i += 1) {
                    calendarRow.children.push(
                        m(".CalendarView--day.CalendarView--day-notMonth", [
                            m(".CalendarView--dayNumber")
                        ])
                    );
                }

                return calendarRows;

            }).call(this)
        ]);
    }
};

const CalendarSelector = {

    controller: function (args) {

        return {
            calendar: args.model
        };

    },
    view: function (ctrl) {

        return m(".Calendar--selector Selector", [
            // Make this span display the current month.
            m("span", {class: "Selector--selectedOption"}, ctrl.calendar.monthName(ctrl.calendar.selectedMonth())),
            m("select", {class: "Selector--select", onchange: m.withAttr("value",
                function (value) {
                    ctrl.calendar.selectedMonth(parseInt(value));
                    ctrl.calendar.update();
                })
            }, [
                // Render each of the options.
                utils.range(12).map((month) => {
                    return m("option", {
                        value: month,
                    }, ctrl.calendar.monthName(month));
                })
            ])
        ]);
    }
};

const App = {
    controller: function () {
        return {
            calendarModel: CalendarModel()
        };
    },
    view: function(ctrl) {
        return [
            //nested component
            m.component(CalendarSelector, {model: ctrl.calendarModel}),
            m(".Stats.Stats-day", [
                m(".Stats--entry", "work minutes: ", [
                    m("span.Stats--entryContent", "1044")
                ]),
                m(".Stats--entry", "repose minutes: ", [
                    m("span.Stats--entryContent", "976")
                ])
            ]),
            m.component(Calendar, {model: ctrl.calendarModel})
        ]
    }
};

m.mount(document.querySelector(".Calendar"), App);