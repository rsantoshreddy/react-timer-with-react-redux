import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";

const view = m => {
	const { runnig, time } = m;
	const minutes = Math.floor(time / 60);
	const seconds = time - minutes * 60;

	const handler = () => {
		container.dispatch(runnig ? { type: "STOP" } : { type: "START" });
	};

	return (
		<div>
			<p>{`${minutes}:${seconds}`}</p>
			<button onClick={handler}>{runnig ? "STOP" : "START"}</button>
		</div>
	);
};

const update = (model, intent) => {
	const { time, runnig } = model;
	switch (intent.type) {
		case "TICK":
			model = Object.assign(model, {
				time: time + (runnig ? 1 : 0)
			});
			break;
		case "START":
			model = Object.assign(model, {
				runnig: true
			});
			break;
		case "STOP":
			model = Object.assign(model, {
				runnig: false
			});
			break;
	}

	return model;
};

const container = createStore(update, { runnig: true, time: 0 });

const render = () => {
	ReactDOM.render(
		view(container.getState()),
		document.getElementById("root")
	);
};

container.subscribe(render);

setInterval(() => {
	container.dispatch({ type: "TICK" });
}, 1000);
