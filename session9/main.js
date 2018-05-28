$(document).ready(function () {
	$('#search').on('submit', function (e) {
		e.preventDefault();
		ajaxSearch();
	});

	$('#keyword').on('input', function (e) {
		$('#result-list').html('');
	});

	$(window).on('scroll', function (e) {
		var sbHeight = window.innerHeight * (window.innerHeight / document.body.offsetHeight);
		console.log($(this).scrollTop());
		console.log($(document).height());
		console.log(sbHeight);
		// if ($(this).scrollTop() > $(document).height() - $(this).height()) {
		// 	ajaxSearch('more');
		// }
	})
});

function ajaxSearch(action) {
	let input = $('#keyword').val();
	let pageToken = $('#page-token').text();
	$.ajax({
		url: 'https://www.googleapis.com/youtube/v3/search?part=snippet&q={' + input + '}&key=AIzaSyA9gQZ-oYomFypZN7PsupZJtOfQqA6Q3qw',
		type: 'GET',
		data: {
			pageToken: pageToken,
			maxResults: 5
		},
		success: function (data) {
			let html = '';
			let items = data.items;
			$(items).each(function (index, item) {
				html += `<a class="result col-md-12" href="https://www.youtube.com/watch?v=${item.id.videoId}" target="_blank">
							<div class="row">
								<img src="${item.snippet.thumbnails.medium.url}" alt="" class="col-md-4 img-responsive">
								<div class="video_info col-md-8">
									<h3 class="title">${item.snippet.title}</h3>
									<p class="description">${item.snippet.description}</p>
									<span>View >></span>
								</div>
							</div>
						</a>`;
			});

			if (action === 'more') {
				$('#result-list').append(html);
			} else {
				$('#result-list').html(html);
			}

			$('#page-token').text(data.nextPageToken);
		},
		error: function (error) {
			console.log(error);
		}
	});
}