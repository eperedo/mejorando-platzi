chrome.storage.sync.get(['enableLightMode'], ({ enableLightMode }) => {
	if (enableLightMode) {
		injectScript(
			chrome.runtime.getURL('features/light-mode/light-mode.js'),
			'body',
		);
	}
});
