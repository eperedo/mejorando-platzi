// locales
const TR_KEYS = {
	optionsButtonSave: 'optionsButtonSave',
	optionsTitle: 'optionsTitle',
	optionsLightMode: 'optionsLightMode',
	optionsStories: 'optionsStories',
	optionsXRay: 'optionsXRay',
};
const TR_TITLE = chrome.i18n.getMessage(TR_KEYS.optionsTitle);
const TR_LIGHT_MODE = chrome.i18n.getMessage(TR_KEYS.optionsLightMode);
const TR_STORIES = chrome.i18n.getMessage(TR_KEYS.optionsStories);
const TR_XRAY = chrome.i18n.getMessage(TR_KEYS.optionsXRay);
const TR_BUTTON_SAVE = chrome.i18n.getMessage(TR_KEYS.optionsButtonSave);
window.document.title = TR_TITLE;
document.querySelector('h1#option-title').textContent = TR_TITLE;
document.querySelector(`label#${TR_KEYS.optionsLightMode}`).textContent =
	TR_LIGHT_MODE;
document.querySelector(`label#${TR_KEYS.optionsStories}`).textContent =
	TR_STORIES;
document.querySelector(`label#${TR_KEYS.optionsXRay}`).textContent = TR_XRAY;
document.querySelector(`button#${TR_KEYS.optionsButtonSave}`).textContent =
	TR_BUTTON_SAVE;

const form = document.querySelector('form#form-options');
const btn = document.querySelector('button.btn');
const lightCourseDom = form.querySelector('input#enableLightMode');
const enableStoriesProfileDom = form.querySelector(
	'input#enableStoriesProfile',
);
const enableXRayDom = form.querySelector('input#enableXRay');

function showMessage(text, type = 'success') {
	document.querySelector('dialog#notify-container').open = true;
	const notify = document.querySelector('div#notification');
	notify.className = type;
	notify.textContent = text;
	setTimeout(() => {
		document.querySelector('dialog#notify-container').open = false;
	}, 3000);
}

chrome.storage.sync.get(
	['enableLightMode', 'enableStoriesProfile', 'enableXRay'],
	(values) => {
		lightCourseDom.checked = values.enableLightMode;
		enableStoriesProfileDom.checked = values.enableStoriesProfile;
		enableXRayDom.checked = values.enableXRay;
		btn.removeAttribute('disabled');
	},
);

form.addEventListener('submit', (e) => {
	btn.setAttribute('disabled', true);
	e.preventDefault();
	const enableLightMode = lightCourseDom.checked;
	const enableStoriesProfile = enableStoriesProfileDom.checked;
	const enableXRay = enableXRayDom.checked;
	try {
		chrome.storage.sync.set(
			{ enableLightMode, enableStoriesProfile, enableXRay },
			() => {
				showMessage('Options saved!');
				btn.removeAttribute('disabled');
			},
		);
	} catch (error) {
		showMessage(error.message, 'error');
		throw error;
	}
});
