const backToTop = document.getElementById("myBtn");

window.onscroll = function() {toTop()};

function toTop() {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    backToTop.style.display = "block";
  } else {
    backToTop.style.display = "none";
  }
}


function topFunction() {

  document.documentElement.scrollTop = 0;
}

backToTop.addEventListener('click', topFunction)