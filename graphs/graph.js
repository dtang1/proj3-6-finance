

function graph(opts, data) {
	var o = {
		graph : "pie",
		initialWidth : 200,
		holder : "holder"
	};
	for(i in opts) o[i] = opts[i];
	var width = o.initialWidth;
	var svg = Raphael(o.holder, width, width);
	return Graph[o.graph](svg, opts, data);
}

var Graph = {
	pie : function(svg, opts, data) {
		var height = svg.width + (data.values.length+0.4) * svg.width * 0.1;
		svg.setSize(svg.width, height);
		svg.pieChart(svg.width/2, svg.width/2, svg.width*7/16, data.values, data.labels, "rgba(255,255,255,0.5)");
		return svg;
	}
}




