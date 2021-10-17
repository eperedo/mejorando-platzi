const tutorials = window.initialData?.initialState?.tutorials;
const courseId = window.initialData?.initialState?.course?.id;
const userId = window.contactInfo?.userId;

const avatarDom = document.querySelector('.Actionsv2-avatar');
let avatarUrl = '';
if (avatarDom) {
	avatarUrl = avatarDom.getAttribute('src');
}

function timeSince(date) {
	var seconds = Math.floor((new Date() - date) / 1000);
	var interval = seconds / 31536000;
	if (interval > 1) {
		return `Hace ${Math.floor(interval)} años`;
	}
	interval = seconds / 2592000;
	if (interval > 1) {
		return `Hace ${Math.floor(interval)} meses`;
	}
	interval = seconds / 86400;
	if (interval > 1) {
		return `Hace ${Math.floor(interval)} días`;
	}
	interval = seconds / 3600;
	if (interval > 1) {
		return `Hace ${Math.floor(interval)} horas`;
	}
	interval = seconds / 60;
	if (interval > 1) {
		return `Hace ${Math.floor(interval)} minutos`;
	}
	return Math.floor(seconds) + ' segundos';
}

function tutorialItemHtml({ createdAt, nLikes, title }, ownArticle) {
	const heartClass = ownArticle ? 'is-loved ' : '';
	const userPhoto =
		ownArticle && avatarUrl
			? `<img class="Actionsv2-avatar TutorialAvatar" src="${avatarUrl}" width="16" height="16" />`
			: '';
	const html = `
		<div class="Star is-level-1 is-small">
			<span class="Star-heart ${heartClass}"></span>
			<span class="Star-number">${nLikes}</span>
		</div>
		<a class="Tutorial-anchor">
			<p class="Tutorial-title">
				${title} ${userPhoto}
			</p>
		<div class="Tutorial-action">
			<div class="Tutorial-icon">
				<span class="icon-clock_A"></span>
			</div>
			<div class="Tutorial-action-description">${timeSince(new Date(createdAt))}</div>
			</div>
		</a>`;
	return html;
}

function renderTutorials(data = []) {
	const parentDom = document.querySelector('.TurorialsList');
	for (let index = 0; parentDom.childElementCount > 1; index++) {
		parentDom.removeChild(parentDom.lastChild);
	}
	data.forEach((tutObject) => {
		const newChild = document.createElement('a');
		newChild.classList.add('Tutorial', 'TutorialMejorandoPlatzi');
		newChild.setAttribute('href', tutObject.detailUrl);
		newChild.innerHTML = tutorialItemHtml(
			tutObject,
			tutObject.authorId == userId,
		);
		parentDom.appendChild(newChild);
	});
}

if (tutorials) {
	const tabContentDom = document.querySelector('div.TabsContent-elements');
	if (tabContentDom) {
		const totalPages = tutorials.pagesCount;
		if (totalPages > 1) {
			const pageDom = document.createElement('div');
			pageDom.classList.add('TutorialsPages');

			for (let index = 0; index < totalPages; index++) {
				const page = index + 1;
				const button = document.createElement('button');
				const initialClass =
					index === 0 ? ['mj-btn-page', 'active'] : ['mj-btn-page'];
				button.classList.add(...initialClass);
				button.textContent = page;
				button.addEventListener('click', async () => {
					button.setAttribute('disabled', true);
					const r = await fetch(
						`https://platzi.com/v2/contributions/list/?course_id=${courseId}&page=${page}`,
					);
					const json = await r.json();
					pageDom.childNodes.forEach((item) => {
						item.classList.remove('active');
					});
					button.classList.add('active');
					renderTutorials(json.results);
					button.removeAttribute('disabled');
				});
				pageDom.appendChild(button);
			}

			tabContentDom.appendChild(pageDom);
		}
	}
}
