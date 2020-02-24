(function($) {
  "use strict"; // Start of use strict

  // Smooth scrolling using jQuery easing
  $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
    if (
      location.pathname.replace(/^\//, "") ==
        this.pathname.replace(/^\//, "") &&
      location.hostname == this.hostname
    ) {
      var target = $(this.hash);
      target = target.length ? target : $("[name=" + this.hash.slice(1) + "]");
      if (target.length) {
        $("html, body").animate(
          {
            scrollTop: target.offset().top - 72
          },
          1000,
          "easeInOutExpo"
        );
        return false;
      }
    }
  });

  // Closes responsive menu when a scroll trigger link is clicked
  $(".js-scroll-trigger").click(function() {
    $(".navbar-collapse").collapse("hide");
  });

  // Activate scrollspy to add active class to navbar items on scroll
  $("body").scrollspy({
    target: "#mainNav",
    offset: 75
  });

  // Collapse Navbar
  var navbarCollapse = function() {
    if ($("#mainNav").offset().top > 100) {
      $("#mainNav").addClass("navbar-scrolled");
    } else {
      $("#mainNav").removeClass("navbar-scrolled");
    }
  };
  // Collapse now if page is not at top
  navbarCollapse();
  // Collapse the navbar when page is scrolled
  $(window).scroll(navbarCollapse);

  var images = [
    {
      src: "friendly_kitchen",
      description: "A Friendly Kitchen"
    },
    {
      src: "alleyway",
      description: "An Alleyway"
    },
    {
      src: "astronaut",
      description: "Astronaut concept art for Beethoven Project"
    },
    {
      src: "cabin",
      description: "A Cabin"
    },
    {
      src: "house_profile",
      description: "A Profile of a House"
    },
    {
      src: "house_study",
      description: "Study of a Home"
    },
    {
      src: "weather_moods",
      description: "Drawings of various Seasons"
    },
    {
      src: "landscape_study",
      description: "Various Landscapes"
    },
    {
      src: "winter_trees",
      description: "Some Winter Trees"
    },
    {
      src: "robot_garage",
      description: "The Garage of a Robot"
    },
    {
      src: "fox",
      description: "A Fox"
    }
  ];

  const imageElement = document.querySelector("#images");
  images
    .map(
      image => `
          <div class="col-lg-4 image-row">
            <div class="portfolio-box">
              <img class="img-fluid" src="img/portfolio/${image.src}.jpg" alt="${image.description}">
              <a class="portfolio-box-caption" href="img/portfolio/${image.src}.jpg">
                <div class="project-name">
                ${image.description}
                </div>
              </div>
            </a>
          </div>
        `
    )
    .forEach(element => imageElement.insertAdjacentHTML("beforeend", element));

  // Magnific popup calls
  $("#portfolio").magnificPopup({
    delegate: "a",
    type: "image",
    tLoading: "Loading image #%curr%...",
    mainClass: "mfp-img-mobile",
    gallery: {
      enabled: true,
      navigateByImgClick: true,
      preload: [0, 1, 2, 3]
    },
    image: {
      tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
    }
  });
})(jQuery); // End of use strict
