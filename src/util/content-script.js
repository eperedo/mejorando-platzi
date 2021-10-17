function injectScript(file, node) {
	var th = document.getElementsByTagName(node)[0];
	var s = document.createElement('script');
	s.setAttribute('type', 'text/javascript');
	s.setAttribute('src', file);
	th.appendChild(s);
}

function injectCss(file, node) {
	var th = document.getElementsByTagName(node)[0];
	var s = document.createElement('link');
	s.setAttribute('rel', 'stylesheet');
	s.setAttribute('href', file);
	th.appendChild(s);
}
