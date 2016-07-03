
(function () {

    // autosize($(".js-correctform-textarea"));

    var slice = Array.prototype.slice;

    var dayCharts = document.querySelectorAll(".CalendarView--dayChart"),
        dayChartsArray = slice.call(dayCharts);

    dayChartsArray.forEach(function (element) {

        var data = [
    {
        value: 300,
        color:"#F7464A",
        highlight: "#FF5A5E",
        label: "Red"
    },
    {
        value: 50,
        color: "#46BFBD",
        highlight: "#5AD3D1",
        label: "Green"
    },
    {
        value: 100,
        color: "#FDB45C",
        highlight: "#FFC870",
        label: "Yellow"
    }
];

        var canvas = document.createElement("canvas");

        canvas.style.width = "36px"
        canvas.style.height = "36px";
        element.appendChild(canvas);

        var ctx = canvas.getContext("2d"),
            chart = new Chart(ctx).Pie(data, {
                segmentShowStroke: false,
                animateRotate: false,
                animateScale: false,
                showTooltips: false
            });

    });
}());