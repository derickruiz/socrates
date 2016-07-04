(function () {

    var app = document.getElementById("app");

    var CreateTimerButton = function () {
        return m("button", {class: "Button"}, "create a timer");
    };

    var Home = {
        controller: function () {
            var timers = [{
                timerName: "web dev"
            },
            {
                timerName: "another timer"
            }];

            return {
                timers: timers
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
            }

        }
    };

    m.route.mode = "hash";

    m.route(app, "/", {
        "/": Home
    });

})();