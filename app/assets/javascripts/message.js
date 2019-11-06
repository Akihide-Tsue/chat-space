$(function(){
  function buildMessage(message){
  var image = message.image? `<img class= "lower-message__image" src=${message.image} >` : "";
    var html =`<div class="message" data-message-id="${message.id}">
                <div class="upper-message">
                  <div class="upper-message__user-name">
                    ${message.user_name}
                  </div>
                  <div class="upper-message__date">
                    ${message.created_at}
                  </div>
                </div>
                <div class="lower-message">
                  <p class="lower-message__content">
                    ${message.content}
                  </p>
                  ${image}
                </div>
              </div>`
    return html;
  }

  var reloadMessages = function () {
    if (window.location.href.match(/\/groups\/\d+\/messages/)){
    var last_message_id = $('.message:last').data('message-id');
    $.ajax({
      url: "api/messages",
      type: "get",
      dataType: 'json',
      data: {id: last_message_id}
    })
    .done(function(messages){
      console.log(messages)
      var html = buildMessage(messages);//追加するHTMLの入れ物
        messages.forEach(function (messages) {//配列messagesの中身をHTMLに変換し→入れ物に
        html = buildMessage(messages); //メッセージが入ったHTMLを取得
        $('.messages').append(html);//append
      })
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__submit').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function() {
      alert('自動更新に失敗しました');
    })
    }
  }
  setInterval(reloadMessages, 5000);

  $('#new_message').on('submit', function(e){
    e.preventDefault()
    var formData = new FormData(this);
    var url = $(this).attr('action')
    console.log("OK")
    $.ajax({
      url: url,  //同期通信でいう『パス』
      type: "POST",  //同期通信でいう『HTTPメソッド』
      data: formData,
      dataType: 'json',
      processData: false,
      contentType: false
    })
    .done(function(message){
      var html = buildMessage(message);
      $('.messages').append(html);
      $('.messages').animate({scrollTop: $('.messages')[0].scrollHeight}, 'fast');
      $('.form__submit').prop('disabled', false);
      $('form')[0].reset();
    })
    .fail(function(){
      alert("メッセージ送信に失敗しました");
    })
  })
})