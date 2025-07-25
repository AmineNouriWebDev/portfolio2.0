$(document).ready(function () {
  // typing animation
  (function ($) {
    $.fn.writeText = function (content) {
      var contentArray = content.split(""),
        current = 0,
        elem = this;
      setInterval(function () {
        if (current < contentArray.length) {
          elem.text(elem.text() + contentArray[current++]);
        }
      }, 80);
    };
  })(jQuery);

  // input text for typing animation
  $("#holder").writeText("WEB DESIGNER + FRONT-END DEVELOPER");

  // initialize wow.js
  new WOW().init();

  // Push the body and the nav over by 285px over
  var main = function () {
    $(".fa-bars").click(function () {
      $(".nav-screen").animate(
        {
          right: "0px"
        },
        200
      );

      $("body").animate(
        {
          right: "285px"
        },
        200
      );
    });

    // Then push them back */
    $(".fa-times").click(function () {
      $(".nav-screen").animate(
        {
          right: "-285px"
        },
        200
      );

      $("body").animate(
        {
          right: "0px"
        },
        200
      );
    });

    $(".nav-links a").click(function () {
      $(".nav-screen").animate(
        {
          right: "-285px"
        },
        500
      );

      $("body").animate(
        {
          right: "0px"
        },
        500
      );
    });
  };

  $(document).ready(main);

  // Variables pour gérer le défilement
  let scrollTimeout;

  // initiate full page scroll
  $(document).find('#fullpage').fullpage({
    scrollBar: true, // Garder la scrollbar native
    // responsiveWidth: 400, // Suppression de l'option responsiveWidth
    navigation: true,
    navigationTooltips: ["home", "about", "portfolio", "contact", "connect"],
    anchors: ["home", "about", "portfolio", "contact", "connect"],
    menu: "#myMenu",
    fitToSection: false, // Revenir à false comme dans l'original
    scrollingSpeed: 1000, // Vitesse de défilement
    keyboardScrolling: true, // Activer la navigation au clavier
    touchSensitivity: 15, // Sensibilité tactile
    normalScrollElementTouchThreshold: 5, // Seuil tactile
    
    // Fonction pour gérer les transitions fluides
    onLeave: function(index, nextIndex, direction) {
      // Ajouter une classe pendant la transition
      $('body').addClass('fp-transitioning');
      return true;
    },

    afterLoad: function(anchorLink, index){
      // Retirer la classe de transition
      $('body').removeClass('fp-transitioning');
      
      // Synchroniser l'état actif du menu header
      $(".header-links li").removeClass("active");
      if(anchorLink === "about"){
        $(".header-links li[data-menuanchor='about']").addClass("active");
      } else if(anchorLink === "portfolio"){
        $(".header-links li[data-menuanchor='portfolio']").addClass("active");
      } else if(anchorLink === "contact"){
        $(".header-links li[data-menuanchor='contact']").addClass("active");
      }
      
      // Synchroniser l'état actif du menu sidebar
      $(".nav-links li").removeClass("active");
      if(anchorLink === "about"){
        $(".nav-links li[data-menuanchor='secondPage']").addClass("active");
      } else if(anchorLink === "portfolio"){
        $(".nav-links li[data-menuanchor='thirdPage']").addClass("active");
      } else if(anchorLink === "contact"){
        $(".nav-links li[data-menuanchor='fourthPage']").addClass("active");
      }

      var loadedSection = $(this);

      //using index
      if (index == 1) {
        /* add opacity to arrow */
        $(".fa-chevron-down").each(function () {
          $(this).css("opacity", "1");
        });
        $(".header-links a").each(function () {
          $(this).css("color", "white");
        });
        $(".header-links").css("background-color", "transparent");
      } else if (index != 1) {
        $(".header-links a").each(function () {
          $(this).css("color", "black");
        });
        $(".header-links").css("background-color", "white");
      }

      //using index
      if (index == 2) {
        /* animate skill bars */
        $(".skillbar").each(function () {
          $(this)
            .find(".skillbar-bar")
            .animate(
              {
                width: $(this).attr("data-percent")
              },
              2500
            );
        });
      }
    }
  });

  // Gestionnaire de défilement amélioré pour la molette
  var lastScrollTime = 0;
  var scrollDelay = 800; // Délai entre les défilements
  
  var wheelHandler = function(e) {
    var currentTime = Date.now();
    
    // Empêcher les défilements trop rapides
    if (currentTime - lastScrollTime < scrollDelay) {
      e.preventDefault();
      return false;
    }
    
    var delta = e.originalEvent.deltaY || e.originalEvent.detail || e.originalEvent.wheelDelta;
    
    // Seuil minimum pour déclencher le défilement
    if (Math.abs(delta) > 50) {
      e.preventDefault();
      lastScrollTime = currentTime;
      
      if (delta > 0) {
        // Défilement vers le bas
        if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveSectionDown) {
          $.fn.fullpage.moveSectionDown();
        }
      } else {
        // Défilement vers le haut
        if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveSectionUp) {
          $.fn.fullpage.moveSectionUp();
        }
      }
    }
  };

  // Attacher les gestionnaires d'événements avec une approche plus compatible
  $(document).on('wheel', wheelHandler);
  $(document).on('DOMMouseScroll', wheelHandler);

  // move section down one
  $(document).on("click", "#moveDown", function () {
    if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveSectionDown) {
      $.fn.fullpage.moveSectionDown();
    }
  });

  // fullpage.js link navigation
  $(document).on("click", "#skills", function () {
    if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveTo) {
      $.fn.fullpage.moveTo(2);
    }
  });

  $(document).on("click", "#projects", function () {
    if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveTo) {
      $.fn.fullpage.moveTo(3);
    }
  });

  $(document).on("click", "#contact", function () {
    if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveTo) {
      $.fn.fullpage.moveTo(4);
    }
  });

  // smooth scrolling pour les liens d'ancrage
  $(function () {
    $("a[href*=#]:not([href=#])").click(function (e) {
      e.preventDefault();
      if (
        location.pathname.replace(/^\//, "") ==
          this.pathname.replace(/^\//, "") &&
        location.hostname == this.hostname
      ) {
        var target = $(this.hash);
        var targetAnchor = this.hash.slice(1);
        
        // Utiliser fullPage.js pour la navigation
        if (targetAnchor === "about") {
          if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveTo) {
            $.fn.fullpage.moveTo(2);
          }
        } else if (targetAnchor === "portfolio") {
          if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveTo) {
            $.fn.fullpage.moveTo(3);
          }
        } else if (targetAnchor === "contact") {
          if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveTo) {
            $.fn.fullpage.moveTo(4);
          }
        } else if (targetAnchor === "home" || targetAnchor === "aboutme") {
          if (typeof $.fn.fullpage !== 'undefined' && $.fn.fullpage.moveTo) {
            $.fn.fullpage.moveTo(1);
          }
        }
      }
    });
  });

  //ajax form
  $(function () {
    // Get the form.
    var form = $("#ajax-contact");

    // Get the messages div.
    var formMessages = $("#form-messages");

    // Set up an event listener for the contact form.
    $(form).submit(function (e) {
      // Stop the browser from submitting the form.
      e.preventDefault();

      // Serialize the form data.
      var formData = $(form).serialize();

      // Submit the form using AJAX.
      $.ajax({
        type: "POST",
        url: $(form).attr("action"),
        data: formData
      })
        .done(function (response) {
          // Make sure that the formMessages div has the 'success' class.
          $(formMessages).removeClass("error");
          $(formMessages).addClass("success");

          // Set the message text.
          $(formMessages).text(response);

          // Clear the form.
          $("#name").val("");
          $("#email").val("");
          $("#phone").val("");
          $("#message").val("");
        })
        .fail(function (data) {
          // Make sure that the formMessages div has the 'error' class.
          $(formMessages).removeClass("success");
          $(formMessages).addClass("error");

          // Set the message text.
          if (data.responseText !== "") {
            $(formMessages).text(data.responseText);
          } else {
            $(formMessages).text(
              "Oops! An error occured and your message could not be sent."
            );
          }
        });
    });
  });
});