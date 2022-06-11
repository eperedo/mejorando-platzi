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
			newLogo.setAttribute(
				'src',
				'data:image/png;base64,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',
			);
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
