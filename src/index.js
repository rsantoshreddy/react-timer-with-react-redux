import React from "react";
import ReactDOM from "react-dom";

const view = m => {
	const { runnig, time } = m;
	const minutes = Math.floor(time / 60);
	const seconds = time - minutes * 60;

	const handler = () => {
		container.dispatch(runnig ? "STOP" : "START");
	};

	return (
		<div>
			<p>{`${minutes}:${seconds}`}</p>
			<button onClick={handler}>{runnig ? "STOP" : "START"}</button>
		</div>
	);
};

const update = (model, intent) => {
	let state = {};
	const { time, runnig } = model;
	switch (intent) {
		case "TICK":
			state = Object.assign(model, {
				time: time + (runnig ? 1 : 0)
			});
			break;
		case "START":
			state = Object.assign(model, {
				runnig: true
			});
			break;
		case "STOP":
			state = Object.assign(model, {
				runnig: false
			});
			break;
	}

	return state;
};

const createStore = reducer => {
	let internalState = { runnig: true, time: 0 };
	const handlers = [];
	return {
		getState: () => internalState,
		dispatch: intent => {
			internalState = reducer(internalState, intent);
			handlers.forEach(h => h());
		},
		subscribe: handler => handlers.push(handler)
	};
};

const container = createStore(update);

const render = () => {
	ReactDOM.render(
		view(container.getState()),
		document.getElementById("root")
	);
};

container.subscribe(render);

setInterval(() => {
	container.dispatch("TICK");
}, 1000);






