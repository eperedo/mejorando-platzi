const form = document.querySelector('form#form-options');
const btn = document.querySelector('button.btn');

function showMessage(text, type = 'success') {
	document.querySelector('dialog#notify-container').open = true;
	const notify = document.querySelector('div#notification');
	notify.className = type;
	notify.textContent = text;
	setTimeout(() => {
		document.querySelector('dialog#notify-container').open = false;
	}, 3000);
}

form.addEventListener('submit', e => {
	btn.setAttribute('disabled', true);
	e.preventDefault();
	const fileInput = form.querySelector('input#file');
	const file = fileInput.files[0];
	if (file && file.type == 'application/json') {
		let reader = new FileReader();
		reader.readAsText(file, 'utf-8');
		reader.addEventListener('load', () => {
			try {
				const snippets = JSON.parse(reader.result);
				chrome.storage.sync.set({ snippets }, () => {
					showMessage('Options saved!');
					btn.removeAttribute('disabled');
				});
			} catch (error) {
				showMessage(error.message, 'error');
				throw error;
			} finally {
				reader = null;
				form.reset();
			}
		});
	}
});
