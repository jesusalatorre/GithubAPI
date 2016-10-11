(function fetch_users(){
 
    function append_users(user) {
        $('.user-output').append('<p>' + user.login + '</p> <br>' + '<p>' + user.email + '</p> <br>' + '<p>' + user.url + '<p>' + user.url + '</p>');
    }
 
    function github_user(data) {
        this.login = data['login'];
        this.email = data['email'];
        this.url = data['url'];
    }
 
    function query_api(url){

        $.ajax({
            url: url,
            type: 'GET',
            success: function(data){
            	if (data instanceof Array){
            		$.each(data, function(i, single_hash){
               			var received_user = new github_user(single_hash);
                		append_users(received_user);
                });
            }
            else{
            	var received_user= new github_user(data);
            	append_users(received_user);
            }
        }
        });
    }
 
    var url = 'https://api.github.com/';
 
    $('.selection-step1-button').click(function(){
        url = 'https://api.github.com/';
 
        var answer = $(this).html();
        $('#step1-answer').html(answer);
        url += answer;
 
        $('.selection-menu-step2').removeClass('hidden');
    });
 
    $('.selection-step2-button').click(function(){
 
        var answer = $(this).html();
 
        $('#step2-answer').html(answer);
 
        if (answer === 'single user') {
            url += '/';
        }
        else {
            url += '?since=';
        }
        $('.selection-menu-step3').removeClass('hidden');
    });
 
    $('#submit-query').click(function(){
        var answer = $('#selection-input').val();
        url += answer;
        query_api(url);
    });
 
})();