var zeh = {
    search: function(){
        var query = $("[name=search]").val();

        $('.z-content').fadeOut();
        $('#z-results').fadeIn();
        $('#pluswrap').fadeIn();


        $.getJSON('http://www.omdbapi.com/?s=' + encodeURIComponent(query) + '&callback=?', function(data){
            $("#z-results-content").html("");
            for(r in data.Search)
            {
                if(data.Search[r].Poster.length > 5) {
                    $("#z-results-content").append('<tr onclick="zeh.loadContent(\''+data.Search[r].imdbID+'\')">'+
                               '<td data-label="Poster" style="width:160px">'+
                               '<img src="'+data.Search[r].Poster+'" width="150px" alt=""></td>'+
                               '            <td data-label="Year" style="width:65px">'+data.Search[r].Year+'</td>'+
                               '            <td data-label="Title">'+data.Search[r].Title+'</td>'+
                               '        </tr>');
                }
            }
            $('#pluswrap').fadeOut();

        });
    },
    loadContent: function(imdbID) {
        $('.z-content').fadeOut();
        $('#pluswrap').fadeIn();


        $.getJSON('http://www.omdbapi.com/?i=' + imdbID + '&plot=full&r=json', function(data){
            $("#z-results-content").html("");

            $('#z-c-title').html(data.Title);
            $('#z-c-year').html(data.Year +' <i>'+ data.Runtime +'</i>');
            $('#z-c-desc').html(data.Plot);
            $('#z-c-poster').attr('src', data.Poster);
            $('#z-c-tags').html("");
            var tags = data.Genre.toString().split(', ');
            for(tag in tags)
            {
                $('#z-c-tags').append('<span class="tag">'+tags[tag]+'</span>');
            }
            $('#z-torrent-button').on('click', function(){
                $('#pluswrap').fadeIn();
                $.getJSON('https://allorigins.pw/get?url=' + encodeURIComponent('https://kat.cr/usearch/'+encodeURIComponent(data.Title + ' ' + data.Year)+'/') + '&callback=?', function(data){
                    //var torrents = $(data.contents).find( "tr[id^=torrent_]" );
                    var torrents = $(data.contents).find( "[data-sc-replace]" );
                    $('#z-torrent-table-contents').html('');
                    $(torrents).each(function(){
                        var params = JSON.parse($(this).attr('data-sc-params').replace(new RegExp("'", 'g'), '"').toString());

                        $('#z-torrent-table-contents').append('<tr> <td>'+decodeURIComponent(params.name)+'</td> <td><a href="'+params.magnet+'"><i class="fa fa-magnet"></i></a></td> </tr>');

                    });
                    $('#pluswrap').fadeOut();

                    $.fancybox('#z-torrent-table',{
                          openEffect  : 'none',
                          closeEffect : 'none',
                          nextEffect  : 'none',
                          prevEffect  : 'none',
                          padding     : 0,
                          margin      : [60, 60, 60, 60] // Increase left/right margin
                      });
                });
            });
            $('#z-content-card').fadeIn();
            $('#pluswrap').fadeOut();

        });
    }
};
/**/
