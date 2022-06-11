function invertDarkMode() {
	const baseLayoutDom = document.querySelector('.BaseLayout');
	const newHomeSelector = document.querySelector('#home-student-new');
	if (baseLayoutDom || newHomeSelector) {
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
