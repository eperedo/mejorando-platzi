const tutorials = window.initialData?.initialState?.tutorials;
const course = window.initialData?.initialState?.course;
const courseId = window.initialData?.initialState?.course?.id;
const userId = window.contactInfo?.userId;
const concepts = window.initialData?.initialState?.concepts;

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

function addLaunchDate(launch_date) {
	if (launch_date) {
		const $el = document.querySelector('.AddToLearningPath');
		const $parent = $el.parentNode;
		const $dom = document.createElement('p');
		$dom.classList.add('mp-launch-date');
		$dom.setAttribute('title', launch_date);
		$dom.textContent = `Curso lanzado el ${new Date(
			launch_date,
		).toLocaleDateString()}`;
		$parent.insertBefore($dom, $el);
	}
}

function setQuantityOfTutorials(numberTutorials, numberOfPages) {
	if (numberTutorials > 0) {
		const tabs = document.querySelectorAll('.SingleTab');
		let $tutorialTab;
		tabs.forEach((tab) => {
			if (tab.textContent.toLowerCase() === 'tutoriales de estudiantes') {
				$tutorialTab = tab;
			}
		});
		let totalNumber = numberTutorials;
		if (numberOfPages > 1) {
			totalNumber = (numberOfPages - 1) * numberTutorials;
		}
		$tutorialTab.textContent +=
			numberOfPages > 1 ? ` (+${totalNumber})` : ` (${totalNumber})`;
	}
}

if (tutorials) {
	const tabContentDom = document.querySelector('div.TabsContent-elements');
	if (tabContentDom) {
		const totalPages = tutorials.pagesCount;
		setQuantityOfTutorials(tutorials.results.length, tutorials.pagesCount);
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

if (course) {
	addLaunchDate(course.launch_date);
}

if (concepts) {
	const $tabClasses = document.querySelectorAll('.SingleTab')[0];

	function pluralize(text, number) {
		return number > 1 ? `${text}s` : text;
	}

	function renderClassInfo(addGlobalProgress) {
		const $titleEls = document.querySelectorAll('.Material-title');
		let totalSeenInMinutes = 0;
		let totalInMinutes = 0;
		const courseInfo = concepts.reduce((acumParent, item, index) => {
			const result = item.materials.reduce(
				(acum, material) => {
					const minutes = Math.floor(material.duration / 60);
					const seconds = material.duration % 60;
					acum.totalSeconds += seconds;
					acum.totalMinutes += minutes;
					if (material.seen) {
						acum.totalSecondsSeen += seconds;
						acum.totalMinutesSeen += minutes;
					}
					return acum;
				},
				{
					totalSeconds: 0,
					totalSecondsSeen: 0,
					totalMinutes: 0,
					totalMinutesSeen: 0,
				},
			);

			const quantityClasses = item.materials.length;
			const labelClases = pluralize('clase', item.materials.length);
			const hoursTotal = Math.floor(result.totalMinutes / 60);
			const secsToMinutes = Math.floor((result.totalSecondsSeen / 60) % 60);
			const minutesTotal = result.totalMinutes + secsToMinutes;
			let description = `${item.title} - ${quantityClasses} ${labelClases} en `;
			if (hoursTotal > 0) {
				description += `${hoursTotal} ${pluralize('hora', hoursTotal)} `;
			}
			if (minutesTotal > 0) {
				if (hoursTotal > 0) {
					description += `y `;
				}
				description += `${minutesTotal} ${pluralize('minuto', minutesTotal)}`;
			}

			if ($titleEls[index]) {
				$titleEls[index].textContent = description;
			}

			// total seen
			totalSeenInMinutes += result.totalMinutesSeen;
			totalInMinutes += result.totalMinutes;

			acumParent.push({
				title: item.title,
				description,
				quantityClasses: item.materials.length,
				...result,
			});
			return acumParent;
		}, []);
		if (addGlobalProgress) {
			const $progress = document.querySelector(
				'.CourseDetail-middle-right span',
			);
			if ($progress) {
				const diffTime = totalInMinutes - totalSeenInMinutes;
				if (diffTime > 0) {
					const hours = Math.floor(diffTime / 60);
					if (hours > 0) {
						$progress.textContent += ` - ${hours} ${pluralize(
							'hora',
							hours,
						)} restantes.`;
					} else {
						$progress.textContent += ` - ${diffTime} ${pluralize(
							'minuto',
							diffTime,
						)} restantes.`;
					}
				}
				window.totalTime = {
					totalSeenInMinutes,
					totalInMinutes,
				};
			}
		}
		window.final = courseInfo;
	}

	if ($tabClasses) {
		$tabClasses.addEventListener('click', () => {
			setTimeout(() => {
				renderClassInfo(false);
			}, 1000);
		});
	}

	renderClassInfo(true);
}
