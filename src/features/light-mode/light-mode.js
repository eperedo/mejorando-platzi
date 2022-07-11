const routes = ['home', 'cursos', 'clases', 'precios'];
function invertDarkMode() {
	if (routes.some((x) => window.location.pathname.includes(x))) {
		styleDarkMode();
	}
}

function styleDarkMode() {
	var filterStyle = document.createElement('style');
	filterStyle.innerHTML =
		':root{filter: invert(100%);}img, .vjs-tech, .LivePlayer-embedCode { filter: invert(100%) !important;}.vjs-fullscreen {background-color: white !important;filter: invert(1) !important;}';
	document.head.appendChild(filterStyle);
}

invertDarkMode();
