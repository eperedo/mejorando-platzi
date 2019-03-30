const title = document.querySelector('h2.CourseBanner-title');

if (title) {
	const durations = document.querySelectorAll('.MaterialContent-duration');
	const totalMinutes = getMinutesFromVideos(durations);
	const totalHours = totalMinutes / 60;
	const linkTitle = document.createElement('a');
	linkTitle.textContent = ` - ${totalHours.toFixed(2)} h`;
	linkTitle.href = '#';
	linkTitle.title = `${totalMinutes} minutes`;
	linkTitle.classList.add('title-hours');
	title.appendChild(linkTitle);
}

function getMinutesFromVideos(durations) {
	let total = 0;
	durations.forEach(item => {
		const currentItem = item.textContent.split(':')[0];
		if (!isNaN(currentItem)) {
			total += Number(currentItem);
		}
	});
	return total;
}
