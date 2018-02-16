<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>VW Carnet</title>
    <link rel="stylesheet" type="text/css" href="theme.css">
    <script src="https://code.jquery.com/jquery-1.12.4.js"></script>
    <script type="text/javascript" src="script.js"></script>
    <link href="https://use.fontawesome.com/releases/v5.0.6/css/all.css" rel="stylesheet">
    <meta http-equiv=”Pragma” content=”no-cache”>
    <meta http-equiv=”Expires” content=”-1″>
    <meta http-equiv=”CACHE-CONTROL” content=”NO-CACHE”>
  </head>
  <body>
    <textarea name="message" id="message" readonly>

    </textarea>
    <div id="content">
      <div id="battery">
        <div id="edge">
          <center>
            <div id="tip"></div>
          </center>
          <center>
            <h1 id="percent">50%</h1>
            <span class="fas fa-bolt"></span>
          </center>
          <div id="fill"></div>
        </div>
        <p id="charge">test</p>
      </div>
      <div id="window">
        <img src="./images/window_front.png" alt="">
      </div>
      <div id="address">
        <span class="far fa-map"><span class="fas fa-map-pin"></span></span>
        <p id="addr">test</p>
      </div>
      <div id="locked">
        <span></span>
      </div>
      <div id="heat">
        <span class="fab fa-free-code-camp"></span>
      </div>
      <div id="dist">
        <h1></h1>
      </div>
    </div>
    <p id="time"></p>
  </body>
</html>
