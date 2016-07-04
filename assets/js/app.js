(function () {

    var app = document.getElementById("app");

    // Data
    var data = {
        timers: [{
            timerName: "web dev"
        },
        {
            timerName: "another timer"
        }]
    };

    // UI
    var CreateTimerButton = function () {
        return m("button", {class: "Button"}, "create a timer");
    };

    // Routes
    var Home = {
        controller: function () {

            return {
                timers: data.timers
            }
        },
        view: function (controller) {
            if (controller.timers) {
                return m("div", [
                    controller.timers.map(function (timer, index) {
                        return m("div", timer.timerName);
                    }),
                    CreateTimerButton()
                ]);
            } else {
                return m("div", [
                    m("div", "You don't have any timers yet"),
                    CreateTimerButton()
                ]);
            }

        }
    };

    m.route.mode = "hash";

    m.route(app, "/", {
        "/": Home
    });

})();