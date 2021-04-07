/*!
 * Start Bootstrap - Creative v6.0.1 (https://startbootstrap.com/themes/creative)
 * Copyright 2013-2020 Start Bootstrap
 * Licensed under MIT (https://github.com/BlackrockDigital/startbootstrap-creative/blob/master/LICENSE)
 */
//-------------------------------------------
// THIS IS NOT A PART OF THE PLUGIN. 
// ONLY FOR THE DEMO.
//-------------------------------------------

/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
////////////////   CODE FOR PHOTO FALLERY   /////////////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
!(function() {
    'use strict';

    var numOfImages = window.location.search ? parseInt(window.location.search.match(/\d+$/)[0]) : 70,
        gallery = $('#gallery'),
        videos = [{
                title: "Victoria's Secret",
                url: "https://player.vimeo.com/video/8974462?byline=0&portrait=0",
                thumb: "https://b.vimeocdn.com/ts/432/699/43269900_100.jpg"
            },
            {
                title: "PEOPLE ARE AWESOME 2013 FULL HD ",
                url: "https://www.youtube.com/embed/W3OQgh_h4U4",
                thumb: "https://img.youtube.com/vi/W3OQgh_h4U4/0.jpg"
            },
            {
                title: "Biting Elbows - 'Bad Motherfucker' Official Music Video",
                url: "https://player.vimeo.com/video/62092214?byline=0&portrait=0",
                thumb: "https://b.vimeocdn.com/ts/431/797/431797120_100.jpg"
            }
        ];

    // Get some photos from Flickr for the demo
    $.ajax({
            url: 'https://api.flickr.com/services/rest/',
            data: {
                format: 'json',
                method: 'flickr.interestingness.getList',
                per_page: numOfImages,
                api_key: 'b51d3a7c3988ba6052e25cb152aecba2' // this is my own API key, please use yours
            },
            dataType: 'jsonp',
            jsonp: 'jsoncallback'
        })
        .done(function(data) {
            var loadedIndex = 1,
                isVideo;

            // add the videos to the collection
            data.photos.photo = data.photos.photo.concat(videos);

            $.each(data.photos.photo, function(index, photo) {
                isVideo = photo.thumb ? true : false;
                // http://www.flickr.com/services/api/misc.urls.html
                var url = 'http://farm' + photo.farm + '.static.flickr.com/' + photo.server + '/' + photo.id + '_' + photo.secret,
                    img = document.createElement('img');

                // lazy show the photos one by one
                img.onload = function(e) {
                    img.onload = null;
                    var link = document.createElement('a'),
                        li = document.createElement('li')
                    link.href = this.largeUrl;

                    link.appendChild(this);
                    if (this.isVideo) {
                        link.rel = 'video';
                        li.className = 'video'
                    }
                    li.appendChild(link);
                    gallery[0].appendChild(li);

                    setTimeout(function() {
                        $(li).addClass('loaded');
                    }, 25 * loadedIndex++);
                };

                img['largeUrl'] = isVideo ? photo.url : url + '_b.jpg';
                img['isVideo'] = isVideo;
                img.src = isVideo ? photo.thumb : url + '_t.jpg';
                img.title = photo.title;
            });

            // finally, initialize photobox on all retrieved images
            $('#gallery').photobox('a', { thumbs: true }, callback);
            // using setTimeout to make sure all images were in the DOM, before the history.load() function is looking them up to match the url hash
            setTimeout(window._photobox.history.load, 1000);

            function callback() {
                console.log('callback for loaded content:', this);
            };
        });
})();
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////
//////////////////////   Víctor Rodríguez   /////////////////////
///////////         victor.rdrgz.prz@gmail.com       ////////////
/////////////////////////////////////////////////////////////////
/////////////////////////////////////////////////////////////////


function showSportDescription(element) {
    document.getElementById(element).style.display = 'block';
}

$(".col-lg-4 col-sm-6").focusout(function() {
    console.log('puto');
    document.getElementsByClassName('photo-text').style.display = 'none';
});

(function($) {
    "use strict"; // Start of use strict

    // Smooth scrolling using jQuery easing
    $('a.js-scroll-trigger[href*="#"]:not([href="#"])').click(function() {
        if (location.pathname.replace(/^\//, '') == this.pathname.replace(/^\//, '') && location.hostname == this.hostname) {
            var target = $(this.hash);
            target = target.length ? target : $('[name=' + this.hash.slice(1) + ']');
            if (target.length) {
                $('html, body').animate({
                    scrollTop: (target.offset().top - 72)
                }, 1000, "easeInOutExpo");
                return false;
            }
        }
    });

    // Closes responsive menu when a scroll trigger link is clicked
    $('.js-scroll-trigger').click(function() {
        $('.navbar-collapse').collapse('hide');
    });

    // Activate scrollspy to add active class to navbar items on scroll
    $('body').scrollspy({
        target: '#mainNav',
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

    // Magnific popup calls
    /*$('#portfolio').magnificPopup({
        delegate: 'a',
        type: 'image',
        tLoading: 'Loading image #%curr%...',
        mainClass: 'mfp-img-mobile',
        gallery: {
            enabled: true,
            navigateByImgClick: true,
            preload: [0, 1]
        },
        image: {
            tError: '<a href="%url%">The image #%curr%</a> could not be loaded.'
        }
    });*/

})(jQuery); // End of use strict


var slideIndex = 0;
showSlides();

function showSlides() {
    var i;
    var slides = document.getElementsByClassName("mySlides");
    //var dots = document.getElementsByClassName("dot");
    for (i = 0; i < slides.length; i++) {
        slides[i].style.display = "none";
    }
    slideIndex++;
    if (slideIndex > slides.length) { slideIndex = 1 }
    /*for (i = 0; i < dots.length; i++) {
        dots[i].className = dots[i].className.replace(" active", "");
    }*/
    slides[slideIndex - 1].style.display = "block";
    //dots[slideIndex - 1].className += " active";
    setTimeout(showSlides, 2000); // Change image every 2 seconds
}