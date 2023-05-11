const plugin = ({ widgets, vehicle, simulator }) => {
    const container = document.createElement("div");
    container.setAttribute("style", 
	    `
		top:30%;
		width: 100%;
		font-family:sans-serif;
		text-align:center;
		position: fixed;
		`);
    container.innerHTML = `
	<div class="slidecontainer">
        <input type="range" min="0" max="200" value="50" class="slider" id="myRange">
    </div>
	<div class="distanceToObstacle"><span>0</span> cm </div>
	<div>bis zum Hindernis.</div>
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

    var slider = container.getElementsByClassName("slidecontainer")[0].children[0]
    console.log("Element: " + slider.innerHTML);

    slider.oninput = function() {        
        console.log("Value: " + this.value)
		container.querySelector(".distanceToObstacle span").innerHTML = this.value;
    for (const listener of listeners) {
        listener(this.value);
        console.log("Write to listener: " + this.value)
      } 
    }

    let currentSliderValue = "";

    simulator(
        "Vehicle.Body.Pdc.Front.Middle.DistanceToObstacle",
        "subscribe",
        async ({ args }) => {
            listeners[0] = args[0];
        }
    );
    simulator(
        "Vehicle.Body.Pdc.Front.Middle.DistanceToObstacle",
        "get",
        async ({ args }) => {
            return args[0];
        }
    );
    simulator(
        "Vehicle.Body.Pdc.Front.Middle.DistanceToObstacle",
        "set",
        async ({ args }) => {
            return args[0];
        }
    );
   


    return {};
};

export default plugin;