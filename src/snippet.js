const copyIcon = chrome.runtime.getURL('static/copy.svg');
const targetNode = document.querySelector('.vjs-current-time-display');
const videoEl = document.querySelector('#videojs-player');
const timeouId = null;
let snippetData = null;

chrome.storage.sync.get('snippets', data => {
	console.log('Snippets from storage:', data);
	snippetData = data;
	createObserver();
});

function getSnippets(snippets) {
	const videoUrl = window.location.pathname.replace('/clases/', '');
	return snippets[videoUrl];
}

function thereIsAnSnippetHere(snippets, time) {
	return snippets[time];
}

function createObserver() {
	const observerOptions = {
		childList: true,
		attributes: false,
		subtree: false,
	};
	if (targetNode) {
		const observer = new MutationObserver(e => {
			if (e[0]) {
				const currentTime = e[0].addedNodes[1].nodeValue.trim();
				const videoSnippets = getSnippets(snippetData);
				if (videoSnippets && thereIsAnSnippetHere(videoSnippets, currentTime)) {
					if (timeouId) {
						clearTimeout(timeouId);
					} else {
						createDialog(videoSnippets[currentTime]);
					}
				}
			}
		});
		observer.observe(targetNode, observerOptions);
	}
}

function createIcon(icon) {
	const image = document.createElement('img');
	image.src = icon;
	image.width = 16;
	image.height = 16;
	image.alt = 'Paste Code';
	return image;
}

function createDialog({ text, action }) {
	const snippetDialog = document.querySelector(
		'dialog#mejorando-platzi-snippet',
	);
	if (snippetDialog) {
		snippetDialog.remove();
	}

	const link =
		action === 'link'
			? `<a target="_blank" rel="noopener" href="${text}">${text}</a>`
			: text;

	const html = `
		<section class="snippet-container">
			<code class="code">
				${link}
			</code>
			<button type="button" id="btn-paste"></button>
		</section>
	`;
	const el = document.createElement('dialog');
	el.id = 'mejorando-platzi-snippet';
	el.classList.add('dialog-container');
	el.style.marginLeft = 'auto';
	el.open = true;
	el.innerHTML = html;
	const btn = el.querySelector('#btn-paste');
	btn.appendChild(createIcon(copyIcon));
	btn.addEventListener('click', () => {
		const input = document.createElement('input');
		input.value = text;
		input.style.opacity = 0;
		el.appendChild(input);
		input.select();
		document.execCommand('copy');
		input.remove();
	});
	videoEl.appendChild(el);
	timeoutId = setTimeout(() => {
		el.open = false;
		el.remove();
	}, 5000);
}

// createObserver();
