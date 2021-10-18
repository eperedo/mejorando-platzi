chrome.storage.sync.get(['enableXRay'], ({ enableXRay }) => {
	if (enableXRay) {
		injectCss(chrome.runtime.getURL('features/x-ray/x-ray.css'), 'head');
		injectScript(chrome.runtime.getURL('features/x-ray/x-ray.js'), 'body');
	}
});
