/**
 * Copyright (c) 2017 ~ present NAVER Corp.
 * billboard.js project is licensed under the MIT license
 */
import CLASS from "../../config/classes";

export default {
	generateClass(prefix, targetId) {
		return ` ${prefix} ${prefix + this.getTargetSelectorSuffix(targetId)}`;
	},

	classText(d) {
		return this.generateClass(CLASS.text, d.index);
	},

	classTexts(d) {
		return this.generateClass(CLASS.texts, d.id);
	},

	classShape(d) {
		return this.generateClass(CLASS.shape, d.index);
	},

	classShapes(d) {
		return this.generateClass(CLASS.shapes, d.id);
	},

	generateExtraLineClass() {
		const $$ = this;
		const classes = $$.config.line_classes || [];
		const ids: string[] = [];

		return function(d) {
			const id: string = d.id || (d.data && d.data.id) || d;

			if (ids.indexOf(id) < 0) {
				ids.push(id);
			}

			return classes[ids.indexOf(id) % classes.length];
		};
	},

	classLine(d) {
		return this.classShape(d) + this.generateClass(CLASS.line, d.id);
	},

	classLines(d) {
		return this.classShapes(d) + this.generateClass(CLASS.lines, d.id);
	},

	classCircle(d) {
		return this.generateClass(CLASS.circle, d.index);
	},

	classCircles(d) {
		return this.generateClass(CLASS.circles, d.id);
	},

	classBar(d) {
		return this.classShape(d) + this.generateClass(CLASS.bar, d.index);
	},

	classBars(d) {
		return this.classShapes(d) + this.generateClass(CLASS.bars, d.id);
	},

	classArc(d) {
		return this.classShape(d.data) + this.generateClass(CLASS.arc, d.data.id);
	},

	classArcs(d) {
		return this.classShapes(d.data) + this.generateClass(CLASS.arcs, d.data.id);
	},

	classArea(d) {
		return this.classShape(d) + this.generateClass(CLASS.area, d.id);
	},

	classAreas(d) {
		return this.classShapes(d) + this.generateClass(CLASS.areas, d.id);
	},

	classRegion(d, i) {
		return `${this.generateClass(CLASS.region, i)} ${"class" in d ? d.class : ""}`;
	},

	classEvent(d) {
		return this.generateClass(CLASS.eventRect, d.index);
	},

	classTarget(id) {
		const additionalClassSuffix = this.config.data_classes[id];
		let additionalClass = "";

		if (additionalClassSuffix) {
			additionalClass = ` ${CLASS.target}-${additionalClassSuffix}`;
		}

		return this.generateClass(CLASS.target, id) + additionalClass;
	},

	classFocus(d) {
		return this.classFocused(d) + this.classDefocused(d);
	},

	classFocused(d) {
		return ` ${this.state.focusedTargetIds.indexOf(d.id) >= 0 ? CLASS.focused : ""}`;
	},

	classDefocused(d) {
		return ` ${this.state.defocusedTargetIds.indexOf(d.id) >= 0 ? CLASS.defocused : ""}`;
	},

	classChartText(d) {
		return CLASS.chartText + this.classTarget(d.id);
	},

	classChartLine(d) {
		return CLASS.chartLine + this.classTarget(d.id);
	},

	classChartBar(d) {
		return CLASS.chartBar + this.classTarget(d.id);
	},

	classChartArc(d) {
		return CLASS.chartArc + this.classTarget(d.data.id);
	},

	classChartRadar(d) {
		return CLASS.chartRadar + this.classTarget(d.id);
	},

	getTargetSelectorSuffix(targetId) {
		return targetId || targetId === 0 ?
			`-${targetId}`.replace(/[\s?!@#$%^&*()_=+,.<>'":;\[\]\/|~`{}\\]/g, "-") : "";
	},

	selectorTarget(id, prefix) {
		const pfx = prefix || "";
		const target = this.getTargetSelectorSuffix(id);

		// select target & circle
		return `${pfx}.${CLASS.target + target}, ${pfx}.${CLASS.circles + target}`;
	},

	selectorTargets(idsValue, prefix) {
		const $$ = this;
		const ids = idsValue || [];

		return ids.length ?
			ids.map(id => $$.selectorTarget(id, prefix)) : null;
	},

	selectorLegend(id) {
		return `.${CLASS.legendItem + this.getTargetSelectorSuffix(id)}`;
	},

	selectorLegends(ids) {
		const $$ = this;

		return ids && ids.length ?
			ids.map(id => $$.selectorLegend(id)) : null;
	},
};