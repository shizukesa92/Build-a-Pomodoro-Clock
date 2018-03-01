$(document).ready(function() {

  var breakL = 0,
    length = 0,
    originalLength = 0,
    originalLength2 = 0,
    started = 0,
    started2 = 0,
    start = 0,
    pause = 0,
    interval0;

  $("#console").html(String.valueOf(0));

  $("#minus1").click(function() {
    if (parseInt($("#time1").text()) > 0) {
      breakL--;
      $("#time1").html(breakL);
      if (started2 === 0) {
        originalLength2 = breakL * 60;
      }
    }
  });

  $("#plus1").click(function() {
    if (parseInt($("#time1").text()) >= 0) {
      breakL++;
      $("#time1").html(breakL);
      if (started2 === 0) {
        originalLength2 = breakL * 60;
      }
    }
  });

  $("#minus2").click(function() {
    if (parseInt($("#time2").text()) > 0) {
      length--;
      $("#time2").html(length);
      if (started === 0 && started2 === 0) {
        originalLength = length * 60;
        if (started2 === 0){
          $("#time3").html(length);
        }
      }
    }
  });

  $("#plus2").click(function() {
    if (parseInt($("#time2").text()) >= 0) {
      length++;
      $("#time2").html(length);
      if (started === 0) {
        originalLength = length * 60;
        if (started2 === 0){
          $("#time3").html(length);
        }
      }
    }
  });

  $("#circle").click(function() {
    
    function interval1(){
      $("#title").html("Session");
      $("#fill").css("background", "green");
      if (started === 0){
        $("#time3").html(length);
        $("#time3").append(":00");      
        $("#fill").css("height", "0%");
      }
      started = 1;
      started2 = 0;
      interval0 = setInterval(intervalFunc, 1000);
    }
    
    function interval2(){
      clearInterval(interval0);
      $("#title").html("Break!");      
      $("#fill").css("background", "red");
      if (started2 === 0){
        $("#time3").html(breakL);
        $("#time3").append(":00");      
        $("#fill").css("height", "0%");
      }
      started = 0;
      started2 = 1;
      originalLength = originalLength2;
      interval0 = setInterval(intervalFunc, 1000);
    }
    
    function intervalFunc() {
      var time3 = $("#time3").text();

      if (time3 == "0:00") {
        if (started == 1){
          interval2();
          return;
        }
        if (started2 == 1){
          interval1();
          return;
        }
      }

      if (time3.slice(-2) == "00") {
        var re = time3.length == 4 ? time3.slice(0, 1) : time3.slice(0, 2),
          place = parseInt(re) - 1;
        time3 = time3.replace(re, place);
        time3 = time3.replace("00", "59");
        $("#time3").html(time3);
      } else if (time3.slice(-2) == "10") {
        time3 = time3.replace("10", "09");
        $("#time3").html(time3);
      } else if (time3[time3.length - 2] == "0") {
        var re = time3.slice(-2),
          place = "0" + (parseInt(re) - 1).toString();
        time3 = time3.replace(re, place);
        $("#time3").html(time3);
      } else {
        var re = time3.slice(-2),
          place = parseInt(re) - 1;
        time3 = time3.replace(re, place);
        $("#time3").html(time3);
      }

      var time4 = $("#time3").text(),
        seconds = time4.slice(-2),
        minutes = time4.length == 4 ? time4.slice(0, 1) : time4.slice(0, 2);
      var timeLeft = parseInt(seconds) + parseInt(minutes) * 60;
      var h = 100 - (timeLeft / originalLength * 100);
      $("#fill").css("height", h.toString() + "%");
    }
  
    if ($("time3").text() == "0") {
      return;
    }

   
    if ($("#time3").text().indexOf(":") == -1) {
      $("#time3").append(":00");
    }

    if (start == 1) {
      clearInterval(interval0);
      start = 0;
      return;
    }

    if (start === 0) {
      start = 1;
      started2 == 1? interval2() : interval1();
    }
  });

});