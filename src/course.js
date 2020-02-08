const title = document.querySelector('h1.CourseDetail-left-title');

if (title) {
	const durations = document.querySelectorAll('.MaterialItem-copy-time');
	const totalMinutes = getMinutesFromVideos(durations);
	const totalHours = totalMinutes / 60;
	const linkTitle = document.createElement('a');
	linkTitle.textContent = ` ${totalHours.toFixed(2)} h`;
	linkTitle.href = '#';
	linkTitle.title = `${totalMinutes.toFixed(2)} minutes`;
	linkTitle.classList.add('title-hours');
	title.appendChild(linkTitle);
}

function getMinutesFromVideos(durations) {
	let totalMinutes = 0;
	let totalSeconds = 0;
	durations.forEach(item => {
		const currentItem = item.textContent.split(':');
		const minute = currentItem[0];
		const second = currentItem[1].split(' min')[0];
		if (!isNaN(minute)) {
			totalMinutes += Number(minute);
		}
		if (!isNaN(second)) {
			totalSeconds += Number(second);
		}
	});
	return totalMinutes + totalSeconds / 60;
}
