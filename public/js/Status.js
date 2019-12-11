var i = 0;
function move() {
  if (i == 0) {
    i = 1;
    var elem = document.getElementById("myBar2");
    var width = 1;
    var id = setInterval(frame, 10);
    function frame() {
      if (width >= 25) {
        clearInterval(id);
        i = 0;
      } else {
        width++;
        elem.style.width = width + "%";
      }
    }
  }
}

function move2() {
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar3");
      var width = 1;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 25) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }
      }
    }
  }

  function move3() {
    if (i == 0) {
      i = 1;
      var elem = document.getElementById("myBar4");
      var width = 1;
      var id = setInterval(frame, 10);
      function frame() {
        if (width >= 25) {
          clearInterval(id);
          i = 0;
        } else {
          width++;
          elem.style.width = width + "%";
        }

    }
  }
}


