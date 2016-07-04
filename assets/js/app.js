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
    var CreateTimerButton = function () {
        return m("button", {class: "Button"}, "create a timer");
    };

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
            }

        }
    };

    m.route.mode = "hash";

    m.route(app, "/", {
        "/": Home
    });

})();