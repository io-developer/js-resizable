/**
 * resizable.js
 * author: Sergey Sedyshev
 */

var resizable = function( elem, limitByParent ) {
	var cornerElem = document.createElement("div");
	cornerElem.className = resizable.resizeCornerClass;
	elem.appendChild(cornerElem);
	
	elem.addEventListener("change", onChange);
	cornerElem.addEventListener("mousedown", onMouseDown);
	
	var startW;
	var startH;
	
	var startMouseX;
	var startMouseY;
	
	var compStyle;
	
	var parent;
	var parentW;
	var parentH;
	var parentCompStyle;
	var limited;
	
	function getStylePixels( style, prop ) {
		return parseFloat(style.getPropertyValue(prop).replace(/px/gi, ""))
	}
	
	function refresh() {
		compStyle = window.getComputedStyle(elem, null);
		parent = elem.parentNode;
		limited = limitByParent;
		if (limited === undefined && parent) {
			limited = parent.classList.contains(resizable.resizeLimiterClass);
		}
		if (parent) {
			parentCompStyle = window.getComputedStyle(parent, null);
			parentW = parent.offsetWidth;
			parentH = parent.offsetHeight;
		}
	}
	
	function setSize( w, h ) {
		if (limited) {
			var wMax = parentW - elem.offsetLeft;
			var hMax = parentH - elem.offsetTop;
			
			w = (w > wMax) ? wMax : w;
			h = (h > hMax) ? hMax : h;
		}
		
		w -= getStylePixels(compStyle, "padding-left");
		w -= getStylePixels(compStyle, "padding-right");
		
		h -= getStylePixels(compStyle, "padding-top");
		h -= getStylePixels(compStyle, "padding-bottom");
		
		w = (w < 0) ? 0 : w;
		h = (h < 0) ? 0 : h;
		
		elem.style.width = w + "px";
		elem.style.height = h + "px";
	}
	
	function dispatchChanged() {
		var evt = document.createEvent("Event");
		evt.initEvent("change", true, false);
		var children = elem.childNodes;
		var i = children.length;
		while (i--) {
			var child = children[i];
			child.dispatchEvent(evt);
		}
		elem.dispatchEvent(evt);
	}
	
	function onMouseDown( e ) {
		e.stopPropagation();
		
		refresh();
		
		startW = elem.offsetWidth;
		startH = elem.offsetHeight;
		
		startMouseX = e.screenX;
		startMouseY = e.screenY;
		
		document.addEventListener("mouseup", onMouseUp);
		document.addEventListener("mousemove", onMouseMove);
	}
	
	function onMouseUp( e ) {
		onMouseMove(e);
		
		document.removeEventListener("mouseup", onMouseUp);
		document.removeEventListener("mousemove", onMouseMove);
	}
	
	function onMouseMove( e ) {
		var w = startW + e.screenX - startMouseX;
		var h = startH + e.screenY - startMouseY;
		setSize(w, h);
		dispatchChanged();
	}
	
	function onChange( e ) {
		refresh();
		setSize(elem.offsetWidth, elem.offsetHeight);
	}
}


resizable.resizableClass = "resizable";
resizable.resizeLimiterClass = "resizable-limiter";
resizable.resizeCornerClass = "resizable-corner";


resizable.init = function() {
	var arr = document.querySelectorAll("." + resizable.resizableClass);
	var i = -1;
	var l = arr.length;
	while (++i < l) {
		resizable(arr[i]);
	}
}

resizable.initOnDocumentReady = function() {
	document.addEventListener("DOMContentLoaded", resizable.init);
}
