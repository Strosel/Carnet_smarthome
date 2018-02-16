var charge = false;
var windows = "start";
var heat = "start";
var locked = "lock";
var dist = "";

$(document).ready(function() {
  $('#charge').hide();
  $('#addr').hide();
  $('.fa-bolt').hide();

  var date = new Date();
  var min = "0"+date.getMinutes();
  var time = date.getHours() + ":" + min.substr(-2) + "> ";

  $('#message').text(time+'Welcome to CarNet\n');

  getStatus();

  setInterval("getStatus()" , 90000);
  //setTimeout(function() {location.reload();}, 10000);

  $("#edge").click(function() {
    if (charge) {
      newMessage( $('#charge').text() );
    }
  });

  $('.fa-map, .fa-map-pin').click(function() {
    newMessage( "Location: " + $('#addr').text() );
  });

  $('#window>img').click(function(){
    console.log("Clicked window "+windows );
    newMessage(windows + "ing Windowheating. This might take a minute");
    $.get("./trigger.php?task=windowheating&action="+windows, function(data) {
      console.log(data);
    });
  });
  $('#heat>span').click(function(){
    console.log("Clicked heat "+heat);
    newMessage(heat + "ing Heating. This might take a minute");
    $.get("./trigger.php?task=heating&action="+heat, function(data) {
      console.log(data);
    });
  });

  $('#locked>span').click(function() {
    newMessage("Your car is "+locked+"ed");
  });

  $('#dist>h1').click(function() {
    newMessage("Your car has driven "+dist);
  });

});

function getStatus() {
  console.log("getStatus");
  $.getJSON("./fetch.php",
  function(data) {

    if(data.address.length != 0){
      $('#addr').text(data.address);
    }
    else {
      $('#addr').text("Unknown error");
    }

    if(data.window_front != "OFF"){
      $('#window>img').attr("src", "./images/window_front_on.png");
      windows = "stop";
    }
    else{
      $('#window>img').attr("src", "./images/window_front.png");
      windows = "start";
    }

    if(data.heat != "OFF"){
      $('#heat>span').css("color", "rgb(255, 163, 58)");
      heat = "stop";
    }
    else{
      $('#heat>span').css("color", "black");
      heat = "start";
    }

    $('#dist>h1').text(data.dist);
    dist = data.dist;

    $('#locked>span').attr("class", "fas fa-" + data.locked);
    locked = data.locked;

    var date = new Date(data.statustime*1000);
    var min = "0"+date.getMinutes();
    $('#time').text("Information fetched on: " + date.getHours() + ":" + min.substr(-2) + " " + date.getDate() + "-" + (date.getMonth()+1) + "-" + date.getFullYear());

    $('#fill').css("height", data.battery);
    $('#percent').text(data.battery);
    if(parseInt(data.battery) < 25){
      $('#fill').css("background", "rgb(244, 66, 66)");
    }
    else{
      $('#fill').css("background", "rgb(66, 244, 104)");
    }
    if(data.charging != "OFF"){
      charge = true;
      $('#fill').css("background", "rgb(255, 163, 58)");
      $('.fa-bolt').show();
      if (data.charging == "EXT") {
        $('#charge').text("Your car is charging Externaly");
      }
      else if (data.charging == "INT") {
        $('#charge').text("Your car is charging Internaly");
      }
      else {
        $('#charge').text("Unknown error");
      }
    }
    else {
      charge = false;
      $('.fa-bolt').hide();
    }
  });
}

function newMessage(mess) {
  var date = new Date();
  var min = "0"+date.getMinutes();
  var time = date.getHours() + ":" + min.substr(-2) + "> ";

  var div = document.getElementById('message');
  div.innerHTML += time+mess+'\n';

  $('#message').scrollTop($('#message')[0].scrollHeight);
}
