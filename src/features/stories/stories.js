function renderStories() {
	const isProfilePage = window.location.pathname.includes('/p/');
	const imgDom = document.querySelector('img.Layout--radius');
	const logoDom = document.querySelector('figure.LogoHeader-name img');
	const careers = window.data ? window.data.careers : [];
	if (isProfilePage && careers.length > 0) {
		const totalCareers = window.data.careers.length;
		let ciIndex = 0;
		let ciProgress = 0;
		let timerId;

		if (imgDom && careers.length > 0) {
			imgDom.classList.add('cursor-pointer');
			imgDom.addEventListener('click', () => {
				window.scrollTo(0, 0);
				const parentStoryModal = document.createElement('div');
				renderStoryModal(parentStoryModal);
			});
		}

		function renderStoryModal(parent) {
			parent.classList.add('story-container');
			document.body.appendChild(parent);
			renderSingleStory(parent);
			renderHeader(parent);
			renderNav(parent);
			document.body.classList.add('story-open');
			timerId = setInterval(() => {
				const a = document.querySelector(`#progresswhite-${ciIndex}`);
				if (a) {
					if (ciProgress < 100) {
						ciProgress += 2;
						a.style.setProperty('width', `${ciProgress}%`);
					} else {
						const i = document.querySelector(`#story-${careers[ciIndex].id}`);
						if (i) {
							i.dispatchEvent(new Event('click'));
						}
					}
				}
			}, 100);
		}

		function renderSingleStory(parent) {
			careers.forEach((career, index) => {
				const el = document.createElement('div');
				el.setAttribute('id', `story-${career.id}`);
				el.classList.add('story-item');

				el.addEventListener(
					'click',
					onStoryClick.bind(null, el, index, parent),
				);
				el.style.setProperty(
					'background',
					`linear-gradient(0deg, ${career.color} 70%, rgba(160, 160, 160, 1) 100%)`,
				);

				// badge
				const badgeEl = document.createElement('div');
				const badgeImgEl = document.createElement('img');
				badgeImgEl.setAttribute('src', career.logo);
				badgeImgEl.classList.add('story-badge');
				badgeEl.appendChild(badgeImgEl);
				el.appendChild(badgeEl);

				// career title
				const titleEl = document.createElement('p');
				titleEl.textContent = career.title;
				el.appendChild(titleEl);

				// only show first story
				if (index > 0) {
					el.classList.add('story-hidden');
				}

				// add story to parent container
				parent.appendChild(el);
			});
		}

		function onStoryClick(domEl, currentIndex, parent) {
			ciProgress = 0;
			ciIndex += 1;
			domEl.classList.toggle('story-hidden');
			if (currentIndex !== careers.length - 1) {
				const nextCareer = careers[currentIndex + 1];
				const dom = document.querySelector(`div#story-${nextCareer.id}`);
				const progressDom = document.querySelector(
					`div#progress-${currentIndex}`,
				);
				progressDom.classList.add('progress-full');
				dom.classList.toggle('story-hidden');
			} else {
				parent.classList.add('story-hidden');
				document.body.classList.remove('story-open');
				document.body.removeChild(parent);
				ciIndex = 0;
				ciProgress = 0;
				clearInterval(timerId);
			}
		}

		function renderHeader(parent) {
			const el = document.createElement('div');
			el.classList.add('header-container');

			const headerContainer = document.createElement('div');
			headerContainer.classList.add('header-container2');

			//username
			const userContainer = document.createElement('div');
			userContainer.classList.add('user-container');
			userContainer.innerHTML = `<img width="32" height="32" src="${imgDom.getAttribute(
				'src',
			)}" /><p class="username">${window.data.username} - ${
				window.data.points
			} puntos</p>`;
			el.appendChild(userContainer);

			for (let index = 0; index < totalCareers; index++) {
				const progressContainer = document.createElement('div');
				progressContainer.classList.add('progress-container');
				const item = document.createElement('div');
				item.setAttribute('id', `progress-${index}`);
				item.classList.add('progress-item');
				progressContainer.appendChild(item);

				const itemWhite = document.createElement('div');
				itemWhite.setAttribute('id', `progresswhite-${index}`);
				itemWhite.classList.add('progress-item-white');
				progressContainer.appendChild(itemWhite);
				headerContainer.appendChild(progressContainer);
			}

			el.appendChild(headerContainer);
			parent.appendChild(el);
		}

		function renderNav(parent) {
			const el = document.createElement('div');
			el.classList.add('nav');

			const navContainer = document.createElement('div');
			navContainer.classList.add('nav-container');

			const newLogo = document.createElement('img');
			newLogo.setAttribute('height', 52);
			newLogo.setAttribute('src', logoDom.getAttribute('src'));
			navContainer.appendChild(newLogo);

			// close button
			const closeDom = document.createElement('button');
			closeDom.classList.add('story-close-button');
			closeDom.textContent = 'Cerrar ❌';
			closeDom.addEventListener('click', () => {
				parent.classList.add('story-hidden');
				document.body.removeChild(parent);
				ciIndex = 0;
				ciProgress = 0;
				document.body.classList.remove('story-open');
				clearInterval(timerId);
			});
			navContainer.appendChild(closeDom);

			el.appendChild(navContainer);
			parent.appendChild(el);
		}
	}
}

renderStories();
