import React from "react";
import ReactDOM from "react-dom";
import { createStore } from "redux";
import { connect, Provider } from "react-redux";

const mapStateToProps = state => {
	return state;
};

const mapDispatchToProps = dispatch => {
	return {
		start: () => {
			dispatch({ type: "START" });
		},
		stop: () => {
			dispatch({ type: "STOP" });
		}
	};
};

const StopWatch = connect(
	mapStateToProps,
	mapDispatchToProps
)(props => {
	const { runnig, time, start, stop } = props;
	const minutes = Math.floor(time / 60);
	const seconds = time - minutes * 60;

	return (
		<div>
			<p>{`${minutes}:${seconds}`}</p>
			<button onClick={runnig ? stop : start}>
				{runnig ? "STOP" : "START"}
			</button>
		</div>
	);
});

const update = (model, intent) => {
	const { time, runnig } = model;
	switch (intent.type) {
		case "TICK":
			model = Object.assign({}, model, {
				time: time + (runnig ? 1 : 0)
			});
			break;
		case "START":
			model = Object.assign({}, model, {
				runnig: true
			});
			break;
		case "STOP":
			model = Object.assign({}, model, {
				runnig: false
			});
			break;
	}

	return model;
};

const container = createStore(update, { runnig: true, time: 0 });

ReactDOM.render(
	<Provider store={container}>
		<StopWatch />
	</Provider>,
	document.getElementById("root")
);

setInterval(() => {
	container.dispatch({ type: "TICK" });
}, 1000);
