function searchMovie(){
	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'a7460f96',
			's': $('#search-input').val()
		},
		success: function(result){
			if(result.Response=="True"){
				let movies = result.Search;

				$('#movie-list').html('');

				$.each(movies, function(i, data){
					$('#movie-list').append(`
						<div class="col-md-3 col-sm-2">
							<div class="card mb-3">
							  <img class="card-img-top" src="`+data.Poster+`" alt="Poster">
							  <div class="card-body">
							    <h5 class="card-title">`+data.Title+`</h5>
							    <h6 class="card-subtitle mb-2 text-muted">`+data.Year+`</h6>
							    <a href="#" class="card-link see-detail" data-toggle="modal" data-target="#exampleModal" data-id="`+ data.imdbID + `">Movie Detail</a>
							  </div>
							</div>
						</div>
					`);
				});

				$('#search-input').val('');

			}else{
				$('#movie-list').html(`
					<div class="col">
						<h5 class="text-center">`+result.Error+`</h5>
					</div>
				`);
			}
		}
	});
}


$('#search-button').on('click', function(){
	searchMovie();
});

$('#search-input').on('keyup', function(e){
	if(e.keyCode === 13){
		searchMovie();
	}
});

$('#movie-list').on('click', '.see-detail', function(){
	$.ajax({
		url: 'http://omdbapi.com',
		type: 'get',
		dataType: 'json',
		data: {
			'apikey': 'a7460f96',
			'i': $(this).data('id')
		},
		success: function(movie){
			if(movie.Response ==="True"){
				$('.modal-body').html(`
					<div class="container-fluid">
						<div class="row">
							<div class="col-md-4 tex-center">
								<img src="`+ movie.Poster +`" class="img-fluid">
							</div>

							<div class="col-md-8">
								<table class="table table-borderless">
								  <tbody>
								    <tr>
								      <th scope="row">Title</th>
								      <td>:</td>
								      <td>`+movie.Title+`</td>
								    </tr>
								     <tr>
								      <th scope="row">Year</th>
								      <td>:</td>
								      <td>`+movie.Year+`</td>
								    </tr>
								    <tr>
								      <th scope="row">Released</th>
								      <td>:</td>
								      <td>`+movie.Released+`</td>
								    </tr>
								    <tr>
								      <th scope="row">Genre</th>
								      <td>:</td>
								      <td>`+movie.Genre+`</td>
								    </tr>
								    <tr>
								      <th scope="row">Actors</th>
								      <td>:</td>
								      <td>`+movie.Actors+`</td>
								    </tr>
								    <tr>
								      <th scope="row">Plot</th>
								      <td>:</td>
								      <td>`+movie.Plot+`</td>
								    </tr>
								  </tbody>
								</table>
							</div>
						</div>	
					</div>
				`);
			}
		}
	});
});






























