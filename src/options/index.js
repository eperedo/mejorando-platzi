const form = document.querySelector('form#form-options');
const btn = document.querySelector('button.btn');
const lightCourseDom = form.querySelector('input#enableLightMode');

btn.setAttribute('disabled', true);

function showMessage(text, type = 'success') {
	document.querySelector('dialog#notify-container').open = true;
	const notify = document.querySelector('div#notification');
	notify.className = type;
	notify.textContent = text;
	setTimeout(() => {
		document.querySelector('dialog#notify-container').open = false;
	}, 3000);
}

chrome.storage.sync.get(['enableLightMode'], (values) => {
	lightCourseDom.checked = values.enableLightMode;
	btn.removeAttribute('disabled');
});

form.addEventListener('submit', (e) => {
	btn.setAttribute('disabled', true);
	e.preventDefault();
	const enableLightMode = lightCourseDom.checked;
	try {
		chrome.storage.sync.set({ enableLightMode }, () => {
			showMessage('Options saved!');
			btn.removeAttribute('disabled');
		});
	} catch (error) {
		showMessage(error.message, 'error');
		throw error;
	}
});
