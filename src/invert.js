chrome.storage.sync.get(['enableLightMode'], ({ enableLightMode }) => {
	if (enableLightMode) {
		invertDarkMode();
	}
});

function invertDarkMode() {
	const baseLayoutDom = document.querySelector('.BaseLayout');
	if (baseLayoutDom) {
		styleDarkMode();
	}
}

function styleDarkMode() {
	var filterStyle = document.createElement('style');
	filterStyle.innerHTML =
		':root{filter: invert(100%);}img, .vjs-tech, .LivePlayer-embedCode { filter: invert(100%);}.vjs-fullscreen {background-color: white !important;filter: invert(1) !important;}';
	document.head.appendChild(filterStyle);
}
