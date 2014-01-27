

function graph(opts, data) {
	var o = {
		graph : "pie",
		width : 200,
		height : 200,
		holder : "holder",
		labelText : {font: '12px Helvetica, Arial', fill: "#00f"}
	};
	for(i in opts) o[i] = opts[i];
	var width = o.width;
	var svg = Raphael(o.holder, width, width);
	svg.__graph = [o.graph, opts, data];
	svg.redraw = function(width) {
		svg.clear();
		svg.setSize(width,width);
		Graph[svg.__graph[0]](this, svg.__graph[1], svg.__graph[2]);
	};
	return Graph[o.graph](svg, opts, data);
}

var Graph = {
	pie : function(svg, opts, data) {
		var height = svg.width + (data.values.length+0.4) * svg.width * 0.1;
		svg.setSize(svg.width, height);
		svg.pieChart(svg.width/2, svg.width/2, svg.width*7/16, data.values, data.labels, data.colors, "rgba(255,255,255,0.5)");
		return svg;
	},
	donut : function(svg, opts, data) {
		if (!opts.ratio) opts.ratio = 1/3;
		var height = svg.width + (data.values.length+0.4) * svg.width * 0.1;
		svg.setSize(svg.width, height);
		svg.donutChart(svg.width/2, svg.width/2, svg.width*7/16, svg.width*7/16*(1-opts.ratio), data.values, data.labels, data.colors, "rgba(255,255,255,0.5)");
		return svg;
	},
	linechart : function(svg, opts, data) {
		var height = opts.height; if (!height) height = (svg.width * 3/8);
		svg.setSize(svg.width, height);
		svg.lineChart(opts, data);
		return svg;
	}
}




