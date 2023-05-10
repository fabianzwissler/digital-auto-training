const plugin = ({ widgets, vehicle, simulator }) => {
    const container = document.createElement("div");
    container.setAttribute("style", `display:flex; align-items:center; justify-content:center; height: 100%; width: 100%;`);
    container.innerHTML = `
    <div class="distance">
        <input type="checkbox" id="distanceIndicator" name="distanceIndicator" value="Too Close!">
    </div>
      `;

    let boxGlobal = null;
    const listeners = [];

    widgets.register("DistanceAlarm", (box) => {
        boxGlobal = box;
        box.injectNode(container);
        return () => {
            boxGlobal = null;
            // Deactivation function for clearing intervals or such.
        };
    });

    var alarm = container.getElementsByClassName("distance")[0].children[0]
    console.log("Element getter");
    console.log("Element: " + alarm.innerHTML);

    function setAlarmState(value){
        alarm.checked = value;
    }
    

    simulator("Vehicle.Driver.Announcement.Haptic.Seat.Seating.Vibrating", "set", async ({ args }) => {
        console.log("called set");
        console.log("called set with: " +args[0]);
        
        const value = args[0];
        setAlarmState(value)
    });


    return {};
};

export default plugin;