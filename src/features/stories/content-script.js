chrome.storage.sync.get(
	['enableStoriesProfile'],
	({ enableStoriesProfile }) => {
		if (enableStoriesProfile) {
			injectCss(chrome.runtime.getURL('features/stories/stories.css'), 'head');
			injectScript(
				chrome.runtime.getURL('features/stories/stories.js'),
				'body',
			);
		}
	},
);
