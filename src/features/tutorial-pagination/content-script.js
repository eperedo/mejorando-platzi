injectCss(
	chrome.runtime.getURL('features/tutorial-pagination/tutorial.css'),
	'head',
);
injectScript(
	chrome.runtime.getURL('features/tutorial-pagination/tutorial.js'),
	'body',
);
