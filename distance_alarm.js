import SignalWithMedia from "https://playground-plugins.netlify.app/reusable/SignalWithMedia.js"
const plugin = ({ widgets, vehicle, simulator }) => {
    
	
	widgets.register(
		"SeatAnimated",
		SignalWithMedia("Vehicle.Driver.Announcement.Haptic.Seat.Seating.Vibrating", {
			[false]: {
				type: "image",
				url: "https://fazwit00.netlify.app/SeatOff.png"
			},
			[true]: {
				type: "image",
				url: "https://fazwit00.netlify.app/SeatOn.png"
			}
		}, vehicle)
	)

    return {};
};

export default plugin;