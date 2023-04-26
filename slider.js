const plugin = ({ widgets, vehicle, simulator }) => {
    const container = document.createElement("div");
    container.setAttribute("style", `display:flex; height: 100%; width: 100%;`);
    container.innerHTML = `
    <div class="slidecontainer">
        <input type="range" min="0" max="200" value="50" class="slider" id="myRange">
    </div>
      `;

    let boxGlobal = null;
    const listeners = [];

    widgets.register("SliderDistance", (box) => {
        boxGlobal = box;
        box.injectNode(container);
        return () => {
            boxGlobal = null;
            // Deactivation function for clearing intervals or such.
        };
    });

    var slider = document.getElementById("myRange");

    slider.oninput = function() {
         listeners[0](this.value);
    }

    simulator(
        "Vehicle.Body.Pdc.Front.Middle.DistanceToObstacle",
        "set",
        async ({ args }) => {
            listeners[0] = args[0];
        }
    );

    return {};
};

export default plugin;