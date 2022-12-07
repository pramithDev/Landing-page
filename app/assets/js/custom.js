$(document).ready(function () {

    //MAIN SLIDER SLICK
    $('.main-slider-wrapper').slick({
        infinite: true,
        speed: 600,
        autoplay: true,
        autoplaySpeed: 3000,
        cssEase: 'linear'
    });

    //LINE IMAGE SLIDER
    $('.line-image-slider').slick({
        centerMode: true,
        centerPadding: '100px',
        arrows: false,
        autoplay: true,
        autoplaySpeed: 3000,
        infinite: true,
        slidesToShow: 3,
        responsive: [
            {
                breakpoint: 1023,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '100px',
                    slidesToShow: 2
                }
            },
            {
                breakpoint: 767,
                settings: {
                    arrows: false,
                    centerMode: true,
                    centerPadding: '80px',
                    slidesToShow: 1
                }
            },
            {
                breakpoint: 425,
                settings: {
                    arrows: false,
                    centerMode: false,
                    slidesToShow: 1
                }
            }
        ]
    });

    //MOBILE MENU CLICK
    var $topNavigation = $(".nav-menu-items");
    
    $('#nav-trigger').click(function(event){
        $topNavigation.slideToggle(500);
        $("#nav-trigger").toggleClass('active');
        event.stopPropagation();
    });
});