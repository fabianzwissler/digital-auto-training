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
		<style>
		.slidecontainer {
		  width: 350px;
		  display:flex;
		  justify-content: space-between;
		  align-items: center;
		  flex-direction: row;
		  flex-wrap: nowrap;
		}

		.slider {
		  -webkit-appearance: none;
		  width: 100%;
		  height: 50px;
		  background: #d3d3d3;
		  outline: none;
		  
		}

		.slider::-webkit-slider-thumb {
		  -webkit-appearance: none;
		  appearance: none;
		  width: 50px;
		  height: 50px;
		  border: 0;
		  background: url('https://fazwit00.netlify.app/car.png');
		  cursor: pointer;
		}

		.slider::-moz-range-thumb {
		  width: 50px;
		  height: 50px;
		  border: 0;
		  background: url('https://fazwit00.netlify.app/car.png');
		  cursor: pointer;
		}
		</style>
	<div class="slidecontainer">
        <img src="https://fazwit00.netlify.app/stone.png" width=50px>
		<input type="range" min="0" max="200" value="00" class="slider" id="myRange">
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