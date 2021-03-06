/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
/* eslint-disable */
// @ts-nocheck
/* global sandbox, window */
import bb from "../../src/";
import {
	doDrag,
	fireEvent,
	getBBox,
	hexToRgb,
	hoverChart,
	parseNum,
	parseSvgPath,
	simulator
} from "./helper";

/**
 * Create a DOM element
 * @param {String} idValue id value
 */
const initDom = idValue => {
	const id = idValue && idValue.replace && idValue.replace("#", "");

	if (!document.getElementById(id)) {
		sandbox(id, {
			style: "width:640px;height:480px;"
		});

		document.body.style.margin = "0px";
	}
};

/**
 * Generate chart
 * @param {Object} args chart options
 * @return {bb} billboard.js instance
 */
const generate = args => {
	let chart;
	let inputType = "mouse";

	if (args) {
		if (!args.bindto) {
			args.bindto = "#chart";
		}

		initDom(args.bindto);

		// when touch param is set, make to be 'touch' input mode
		if (args.interaction && args.interaction.inputType && args.interaction.inputType.touch) {
			inputType = "touch";
		}

		window.$$TEST$$.convertInputType = inputType;

		chart = bb.generate(args);
	}

	return chart;
};

export default {
	doDrag,
	fireEvent,
	generate,
	getBBox,
	hexToRgb,
	hoverChart,
	parseNum,
	parseSvgPath,
	simulator
};
