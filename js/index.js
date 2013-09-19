function toMustache(){
  var str = "";
  $(".ce").each(function(){
    var ml = parseInt($(this).css("margin-left")) / 10;
    if(ml == 0){
      str += "<h1>" + $(this).text() + "</h1>";
    }
    if(ml == 1){
      str += "<h2>" + $(this).text() + "</h2>";
    }
    if(ml == 2){
      str += "<p>" + $(this).text() + "</p>";
    }
    if(ml >= 3){
      str += "<li>" + $(this).text() + "</li>";
    }
    str += "\n";
  });

  $("#output").html(str);
  $("#source-text").val(str);
}


$(function(){
  $('#myTab a').click(function (e) {
    e.preventDefault();
    $(this).tab('show');
  });
  $(document).on('keydown', '.ce', function(e){
    var fireEvent = true;
    var keycode = e.which;
    var offset = $(this).caret();
    if(!e.shiftKey && keycode == $.ui.keyCode.ENTER){
      var pos = $(this).caret();
      var str1 = $(this).text().substring(0, pos);
      var str2 = $(this).text().substring(pos);
      $(this).text(str1);
      $(this).clone(true).insertAfter($(this)).text(str2);
      $(this).next(".ce")[0].focus();
      fireEvent =  false;
    }
    if(keycode == $.ui.keyCode.BACKSPACE){
      if(offset == 0){
        var tmp2 = $(this).text();
        var tmp = $(this).prev(".ce").text();
        $(this).prev(".ce").text(tmp + tmp2);
        $(this).prev(".ce").caret(tmp.length);
        $(this).remove();
        fireEvent =  false;
      }
    }
    if(keycode == $.ui.keyCode.DELETE){
        if($(this).text().length == offset){
          var tmp2 = $(this).text();
          var tmp = $(this).next(".ce").text();
          $(this).text(tmp2 + tmp);
          //$(this).next(".ce")[0].focus();
          $(this).next(".ce").remove();
          $(this).caret(tmp2.length);
          fireEvent =  false;
        }
    }
    if(keycode == $.ui.keyCode.UP && $(this).prev(".ce")[0]!=null){
      $(this).prev(".ce")[0].focus();
      fireEvent =  false;
    }
    if(keycode == $.ui.keyCode.DOWN && $(this).next(".ce")[0]!=null){
      $(this).next(".ce")[0].focus();
      fireEvent =  false;
    }
    if(keycode == $.ui.keyCode.RIGHT){
      if($(this).text().length == offset){
        $(this).next(".ce")[0].focus();
        fireEvent =  false;
      }
    }
    if(keycode == $.ui.keyCode.LEFT){
      if(0 == offset){
        $(this).prev(".ce").caret(-1);
        fireEvent =  false;
      }
    }
    if(e.shiftKey && keycode == $.ui.keyCode.TAB) { 
      var ml = parseInt($(this).css("margin-left")) - 10;
      if(ml >= 0){
        $(this).css("margin-left", ml);
      }
      fireEvent =  false;
    }else if(keycode == $.ui.keyCode.TAB){
        var ml = parseInt($(this).css("margin-left")) + 10;
        $(this).css("margin-left", ml);
        fireEvent =  false;
    }

    //AutoFix
    //ツリーじゃないので動きが変
    //var beforeMl = 0;
    //$(".ce").each(function(){
    //  var ml = parseInt($(this).css("margin-left")) / 10;
    //  if(ml > beforeMl + 1){
    //    ml = beforeMl + 1;
    //    $(this).css("margin-left", ml * 10);
    //  }
    //  beforeMl = ml;
    //});

    //Rendering
    toMustache();
    return fireEvent;
  });
  
});

