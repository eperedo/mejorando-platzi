const teachers = {};

const tabs = ['Profesor', 'Experiencia', 'Cursos', 'Opiniones'];

function buildUi(content) {
	const ui = `
		<button class="xray-close">&times;</button>
    <header class="xray-header">
      <h2>
        <a href="${content.teacherUrl}" target="_blank">XRAY Platzi - ${content.name}</a>
      </h2>
    </header>
    <section class="tab-container">
      <div class="tab-groups">
      </div>
      <div class="tab-content">
      </div>
    </section>
  `;
	return ui;
}

function buildTabs() {
	const $tabGroups = document.querySelector('div.tab-groups');
	tabs.forEach((tab, index) => {
		const btn = document.createElement('button');
		btn.setAttribute('id', `btn-tab-${index}`);
		btn.classList.add('tab-title');
		if (index === 0) {
			btn.classList.add('active');
		}
		btn.textContent = tab;
		btn.addEventListener('click', () => {
			const $currentTab = document.querySelector(
				`#xray-tab-content-item-${index}`,
			);
			if ($currentTab) {
				$currentTab.classList.add('active');
			}
			tabs.forEach((x, tabIndex) => {
				const $btn = document.querySelector(`button#btn-tab-${tabIndex}`);
				$btn.classList.remove('active');
				if (tabIndex !== index) {
					const $x = document.querySelector(
						`#xray-tab-content-item-${tabIndex}`,
					);
					if ($x) {
						$x.classList.remove('active');
					}
				}
			});
			btn.classList.add('active');
		});
		$tabGroups.appendChild(btn);
	});
}

function buildProfesorTabContent(content, id) {
	const $el = document.querySelector('div.tab-content');
	const $bio = document.createElement('div');
	$bio.setAttribute('id', `xray-tab-content-item-${id}`);
	$bio.classList.add('xray-tab-content-item');
	if (id === 0) {
		$bio.classList.add('active');
	}

	let tabContent = content.about.reduce((acum, item) => {
		return acum + `<p class="about-text">${item.text}</p>`;
	}, '');

	tabContent += `<p class="about-text">Ha dictado ${content.stats.courses} cursos en platzi.</p>`;
	tabContent += `<p class="about-text">Ha recibido ${content.stats.reviews} opiniones de estudiantes.</p>`;
	tabContent += `<p class="about-text">${content.stats.students} estudiantes aprendieron y se certificaron con sus cursos.</p>`;

	$bio.innerHTML = `<h2>${content.bio}</h2><div>${tabContent}</div>`;

	$el.appendChild($bio);
}

function buildExperienceTabContent(content, id) {
	const $el = document.querySelector('div.tab-content');
	const $bio = document.createElement('div');
	$bio.setAttribute('id', `xray-tab-content-item-${id}`);
	$bio.classList.add('xray-tab-content-item');

	const tabContent = content.jobs.reduce((acum, item) => {
		return (
			acum + `<p class="about-text">${item.position} en ${item.company}</p>`
		);
	}, '');

	$bio.innerHTML = `<h2>Experiencia Laboral</h2><div>${tabContent}</div>`;

	$el.appendChild($bio);
}

function buildCoursesTabContent(content, id) {
	const $el = document.querySelector('div.tab-content');
	const $bio = document.createElement('div');
	$bio.setAttribute('id', `xray-tab-content-item-${id}`);
	$bio.classList.add('xray-tab-content-item');

	const tabContent = content.courses.reduce((acum, item) => {
		return (
			acum +
			`<div class="xray-card">
        <img src="${item.imageUrl}" width="40" height="40" alt="${item.name}" />
        <a class="card-text" target="_blank" href="${item.courseUrl}">${item.name}</a>
      </div>`
		);
	}, '');

	$bio.innerHTML = `<h2>Cursos Impartidos</h2><div class="xray-card-container">${tabContent}</div>`;

	$el.appendChild($bio);
}

function buildReviewsTabContent(content, id) {
	const $el = document.querySelector('div.tab-content');
	const $bio = document.createElement('div');
	$bio.setAttribute('id', `xray-tab-content-item-${id}`);
	$bio.classList.add('xray-tab-content-item');

	const tabContent = content.reviews.reduce((acum, item) => {
		const avatar =
			item.studentAvatar ||
			'https://static.platzi.com/static/website/v2/images/avatar_default.png';
		return (
			acum +
			`<div class="xray-card">
        <img src="${avatar}" width="40" height="40" alt="${item.studentUsername}" />
        <p class="card-text" target="_blank" href="${item.courseUrl}">${item.text}</p>
      </div>`
		);
	}, '');

	$bio.innerHTML = `<h2>Opiniones de Estudiantes</h2><div class="xray-card-container">${tabContent}</div>`;

	$el.appendChild($bio);
}

function closeButton() {
	const $btn = document.querySelector('.xray-close');
	if ($btn) {
		$btn.addEventListener('click', () => {
			const $xray = document.querySelector('.xray-container');
			$xray.remove();
			document.querySelector('video').play();
			document
				.querySelector('.VideoPlayer')
				.classList.remove('VideoPlayerOpacity');
		});
	}
}

function insertXRay(teacherInfo) {
	const $videoContainer = document.querySelector('.MaterialVideo');
	if ($videoContainer) {
		document.querySelector('video').pause();
		document.querySelector('.VideoPlayer').classList.add('VideoPlayerOpacity');
		const $xRay = document.createElement('div');
		$xRay.classList.add('xray-container');
		$xRay.innerHTML = buildUi(teacherInfo);
		$videoContainer.appendChild($xRay);
		buildTabs();
		buildProfesorTabContent(teacherInfo, 0);
		buildExperienceTabContent(teacherInfo, 1);
		buildCoursesTabContent(teacherInfo, 2);
		buildReviewsTabContent(teacherInfo, 3);
		closeButton();
	}
}

const $nameTeacher = document.querySelector('.Header-course-info-content p');
if ($nameTeacher) {
	$nameTeacher.addEventListener('click', async () => {
		const $xray = document.querySelector('.xray-container');
		if (!$xray) {
			if (teachers[$nameTeacher.textContent]) {
				insertXRay(teachers[$nameTeacher.textContent]);
			} else {
				const res = await fetch(
					`https://platziverse.vercel.app/api/teacher.js?name=${$nameTeacher.textContent}`,
				);
				if (res.ok) {
					const data = await res.json();
					teachers[$nameTeacher.textContent] = data;
					insertXRay(data);
				}
			}
		} else {
			$xray.remove();
			document.querySelector('video').play();
			document
				.querySelector('.VideoPlayer')
				.classList.remove('VideoPlayerOpacity');
		}
	});
}
