$(document).ready(function () {
	let trackChange = setInterval(() => {
		let oldValue = $('#oldInput').val();
		let newValue = $('#keyword').val();

		if (newValue !== oldValue) {
			$('#result-list').html('');
			ajaxSearch();
		}

		$('#oldInput').val(newValue);
	}, 1000);

	$(window).on('scroll', function (e) {
		if ($(this).scrollTop() + $(this).height() >= $(document).height()) {
			ajaxSearch('more');
		}
	});
});

function ajaxSearch(action) {
	let input = $('#keyword').val();
	let pageToken = $('#page-token').text();

	if (input.length) {
		$.ajax({
			url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q={' + input + '}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw',
			type: 'GET',
			data: {
				pageToken: pageToken,
				maxResults: 5
			},
			beforeSend: function () {
				$('#loading-img').addClass('show-loading');
			},
			success: function (data) {
				let items = data.items;

				if (items.length) {
					let cols = [];
					$(items).each(function (index, item) {
						let col = $('<a>', {
							class: 'result col-md-12',
							href: `https://www.youtube.com/watch?v=${item.id.videoId}`,
							target: '_blank'
						})
							.append(
								$('<div>', {class: 'row'})
									.append($('<img>', {
										src: `${item.snippet.thumbnails.medium.url}`,
										class: 'col-md-4 img-responsive'
									}))
									.append($('<div>', {class: 'video_info col-md-8'})
										.append($('<h3>', {class: 'title', text: item.snippet.title}))
										.append($('<p>', {class: 'description', text: item.snippet.description}))
										.append($('<span>', {text: 'View >>'}))
									));
						cols.push(col);
					});

					if (action === 'more') $('#result-list').append(cols);
					else $('#result-list').html(cols);
				} else {
					$('#result-list').html('<div class="no-data">No data more</div>');
				}

				$('#page-token').text(data.nextPageToken);
			},
			complete: function () {
				$('#loading-img').removeClass('show-loading');
			},
			error: function (error) {
				console.log(error);
			}
		});
	} else {
		$('#result-list').html('');
	}
}

function trackInput(oldValue) {
	console.log('dfdksjhfdksjfh');
	let newValue = $('#keyword').val();
	if (newValue !== oldValue) {
		$('#result-list').html('');
		ajaxSearch();
	}

	oldValue = $('#keyword').val();
}