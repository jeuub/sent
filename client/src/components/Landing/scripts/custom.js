$(window).load(function () {

    "use strict";

    //------------------------------------------------------------------------
    //						PRELOADER SCRIPT
    //------------------------------------------------------------------------
    $('#preloader').delay(400).fadeOut('slow'); // will fade out the white DIV that covers the website.
    $('#preloader .loading-data').fadeOut(); // will first fade out the loading animation


    //------------------------------------------------------------------------
    //						NORMALIZE CAROUSEL HEIGHTS
    //------------------------------------------------------------------------
    $('#carousel-full-header .item').carouselHeights();
    $('#carousel-testimonials .item').carouselHeights();


    //------------------------------------------------------------------------
    //						COUNTER SCRIPT
    //------------------------------------------------------------------------
    $('.timer').counterUp({
        delay: 20,
        time: 2500
    });


    //------------------------------------------------------------------------
    //						COUNTDOWN OPTIONS SCRIPT
    //------------------------------------------------------------------------    
    if ($('div').is('.countdown')) {
        $('.countdown').jCounter({
            date: "14 february 2016 12:00:00", // Deadline date
            timezone: "Europe/Bucharest",
            format: "dd:hh:mm:ss",
            twoDigits: 'on',
            fallback: function () {
                console.log("count finished!")
            }
        });
    }


    //------------------------------------------------------------------------
    //						NAVBAR SLIDE SCRIPT
    //------------------------------------------------------------------------ 		
    $(window).scroll(function () {
        if ($(window).scrollTop() > $("nav").height()) {
            $("nav.navbar-slide").addClass("show-menu");
        } else {
            $("nav.navbar-slide").removeClass("show-menu");
            $(".navbar-slide .navMenuCollapse").collapse({
                toggle: false
            });
            $(".navbar-slide .navMenuCollapse").collapse("hide");
            $(".navbar-slide .navbar-toggle").addClass("collapsed");
        }
    });


    //------------------------------------------------------------------------
    //						NAVBAR HIDE ON CLICK (COLLAPSED) SCRIPT
    //------------------------------------------------------------------------ 		
    $('.nav a').on('click', function () {
        if ($('.navbar-toggle').css('display') != 'none') {
            $(".navbar-toggle").click()
        }
    });

})




$(document).ready(function () {

    "use strict";



    //------------------------------------------------------------------------
    //						ANCHOR SMOOTHSCROLL SETTINGS
    //------------------------------------------------------------------------
    $('a.goto, .navbar .nav a').smoothScroll({
        speed: 1200
    });




    //------------------------------------------------------------------------
    //						FULL HEIGHT SECTION SCRIPT
    //------------------------------------------------------------------------
    $(".screen-height").css("min-height", $(window).height());
    $(window).resize(function () {
        $(".screen-height").css("min-height", $(window).height());
    });




    //------------------------------------------------------------------------	
    //                    MAGNIFIC POPUP(LIGHTBOX) SETTINGS
    //------------------------------------------------------------------------ 
    $('.portfolio-list li').magnificPopup({
        delegate: 'a:not(.btn, .link-item)',
        type: 'image',
        gallery: {
            enabled: true
        }
    });



    //------------------------------------------------------------------------
    //						VIDEO BACKGROUND SETTINGS
    //------------------------------------------------------------------------
    if ($('.audio-box')[0]) {

        audiojs.events.ready(function () {

            var audioArr = $('audio');

            // add data-attributes to all audio tags & playlist
            for (var i = 0; i < audioArr.length; i++) {
                $(audioArr).eq(i).attr('data-index', i);
                var checkPlaylist = $(audioArr).eq(i).closest('.audio-box').find('.playlist');
                if (checkPlaylist) {
                    $(checkPlaylist).attr('data-playlist', i);
                }
            };

            // init audiojs plugin
            var audio = audiojs.createAll({
                trackEnded: function () {
                    var next = $('ol.playlist li.playing').next();
                    if (!next.length) next = $('ol.playlist li').first();
                    next.addClass('playing').siblings().removeClass('playing');
                    var cur = $('ol.playlist li.playing').closest('.audio-box').find('audio').attr('data-index');
                    audio[cur].load($('a', next).attr('data-src'));
                    audio[cur].play();
                }
            });

            function stopPlayers() {
                for (var i = 0; i < audioArr.length; i++) {
                    $('.playlist li').removeClass('playing');
                    audio[i].pause();
                };
            }

            // check default song
            $('.audiojs .play').click(function () {
                var defSong = $(this).closest('.audiojs').find('audio').attr('src');
                var allSong = $(this).closest('.audio-box').find('.playlist li');
                var singlePlayer = $(this).closest('.audiojs').hasClass('singlePlayer');

                for (var i = 0; i < allSong.length; i++) {
                    var checkDef = $(allSong).eq(i).find('a');
                    if (defSong == checkDef.attr('data-src')) {
                        stopPlayers();
                        $(checkDef).closest('li').addClass('playing').siblings('li').removeClass('playing');
                    } else {
                        continue;
                    }
                };

                if (singlePlayer) {
                    stopPlayers()
                }
            });

            // change song
            $('.playlist li a').click(function (event) {
                var curSong = $(this).attr('data-src');
                var curAudioTag = $(this).closest('.playlist').siblings('.audiojs').find('audio').attr('data-index');
                var curPlayList = $(this).closest('.playlist').attr('data-playlist');
                var checkPlaying = $(this).closest('li').hasClass('playing');

                // Play current song
                if (curAudioTag == curPlayList) {
                    if (!checkPlaying) {
                        stopPlayers();

                        audio[curAudioTag].load(curSong);
                        audio[curAudioTag].play();
                    } else {
                        audio[curAudioTag].pause();
                    }
                }

                $(this).closest('li').addClass('playing').siblings('li').removeClass('playing');

                event.preventDefault();
            });
        })

    }



    //------------------------------------------------------------------------
    //						VIDEO BACKGROUND SETTINGS
    //------------------------------------------------------------------------
    if ($('.video-bg')[0]) {
        $(function () {
            var BV = new $.BigVideo({
                container: $('.video-bg'),
                useFlashForFirefox: false
            });
            BV.init();
            if (navigator.userAgent.match(/iPhone|iPad|iPod|Android|BlackBerry|IEMobile/i)) {
                BV.show('images/video_gag.jpg');
            } else {
                if (!!window.opera || navigator.userAgent.indexOf(' OPR/') >= 0) {
                    BV.show('video/video_bg.ogv', {
                        doLoop: true,
                        ambient: true
                    });
                } else {
                    BV.show('video/video_bg.mp4', {
                        doLoop: true,
                        ambient: true,
                        altSource: 'video/video_bg.ogv'
                    });
                }
                BV.getPlayer().on('loadedmetadata', function () {
                    $('#big-video-wrap video').fadeIn('slow');
                });
            }
        });
    }




    //------------------------------------------------------------------------------------------
    //                     INITIALIZATION WOW.JS
    //------------------------------------------------------------------------------------------
    var wow = new WOW();
    wow.init();



    //------------------------------------------------------------------------
    //					SUBSCRIBE FORM VALIDATION'S SETTINGS
    //------------------------------------------------------------------------          
    $('#subscribe_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.closest("form"));
        },
        messages: {
            email: {
                required: "We need your email address to contact you",
                email: "Please, enter a valid email"
            }
        },

        highlight: function (element) {
            $(element)
        },

        success: function (element) {
            element
                .text('').addClass('valid')
        }
    });




    //------------------------------------------------------------------------------------
    //						SUBSCRIBE FORM MAILCHIMP INTEGRATIONS SCRIPT
    //------------------------------------------------------------------------------------		
    $('#subscribe_form').submit(function () {
        $('.error').hide();
        $('.error').fadeIn();
        // submit the form
        if ($(this).valid()) {
            $('#subscribe_submit').button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    newsletter_email: $('#subscribe_email').val()
                },
                success: function (data) {
                    $('#subscribe_submit').button('reset');

                    //Use modal popups to display messages
                    $('#modalSubscribeSuccess .modal-title .mailchimp-data-message').html(data);
                    $('#modalSubscribeSuccess').modal('show');

                },
                error: function () {
                    $('#subscribe_submit').button('reset');

                    //Use modal popups to display messages
                    $('#modalSubscribeError').modal('show');

                }
            });
        }
        return false;
    });




    //------------------------------------------------------------------------
    //					SUBSCRIBE 2 FIELDS FORM VALIDATION'S SETTINGS
    //------------------------------------------------------------------------          
    $('#subscribe_form_2').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.closest(".validation-message"));
        },
    messages: {
					name: "???????? ???????",
					email: {
						required: "?????? ?????????????????? email ?????????? ?????? ??????????.",
						email: "????????????????????, ?????????????? ???????????????????? email"
					}
				},

        highlight: function (element) {
            $(element)
        },

        success: function (element) {
            element
                .text('').addClass('valid')
        }
    });




    //------------------------------------------------------------------------------------
    //						SUBSCRIBE 2 FIELDS FORM MAILCHIMP INTEGRATIONS SCRIPT
    //------------------------------------------------------------------------------------		
    $('#subscribe_form_2').submit(function () {
        $('.error').hide();
        $('.error').fadeIn();
        // submit the form
        if ($(this).valid()) {
            $('#subscribe_submit_2').button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    newsletter_email: $('#subscribe_email_2').val(),
                    newsletter_name: $('#subscribe_name_2').val()
                },
                success: function (data) {
                    $('#subscribe_submit_2').button('reset');

                    //Use modal popups to display messages
                    $('#modalSubscribeSuccess2 .modal-title .mailchimp-data-message').html(data);
                    $('#modalSubscribeSuccess2').modal('show');

                },
                error: function () {
                    $('#subscribe_submit_2').button('reset');

                    //Use modal popups to display messages
                    $('#modalSubscribeError2').modal('show');

                }
            });
        }
        return false;
    });




    //------------------------------------------------------------------------------------
    //						CONTACT FORM VALIDATION'S SETTINGS
    //------------------------------------------------------------------------------------		  
    $('#contact_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            name: "required",
            message: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
     	messages: {
					name: "???????????????????? ??????????????????",
					message: "???????????????????? ??????????????????",
					email: {
						required: "???????????????????? ??????????????????",
						email: "????????????????????, ?????????????? ???????????????????? ????????????"
					}
				},

        highlight: function (element) {
            $(element)
                .text('').addClass('error')
        },

        success: function (element) {
            element
                .text('').addClass('valid')
        }
    });




    //------------------------------------------------------------------------------------
    //								CONTACT FORM SCRIPT
    //------------------------------------------------------------------------------------	

    $('#contact_form').submit(function () {
        // submit the form
        if ($(this).valid()) {
            $('#contact_submit').button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    contactname: $('#contact_name').val(),
                    contactemail: $('#contact_email').val(),
                    contactmessage: $('#contact_message').val()
                },
                success: function () {
                    $('#contact_submit').button('reset');
                    //Use modal popups to display messages
                    $('#modalContactSuccess').modal('show');
                },
                error: function () {
                    $('#contact_submit').button('reset');
                    //Use modal popups to display messages
                    $('#modalContactError').modal('show');
                }
            });
        } else {
            $('#contact_submit').button('reset')
        }
        return false;
    });

    //------------------------------------------------------------------------------------
    //						RENTAL FORM VALIDATION'S SETTINGS
    //------------------------------------------------------------------------------------

    $('#rent_form .input-daterange').datepicker({
        startDate: "Beginning of time",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true
    });

    $('#rent_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            type: "required",
            start: "required",
            pickloc: "required",
            end: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function (error, element) {
            error.insertAfter(element);
        },
        messages: {
            type: "Please enter car type",
            start: "Please enter valid Date",
            pickloc: "Please enter a Pick-up Location",
            end: "Please enter valid Date",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        }
    });


    //------------------------------------------------------------------------------------
    //				            RENTAL FORM SCRIPT
    //------------------------------------------------------------------------------------

    $('#rent_form').submit(function () {
        // submit the form
        if ($(this).valid()) {
            $('#rent_submit').button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    renttype: $('#rent-type').val(),
                    pickuploc: $('#pickup-location').val(),
                    dropoffloc: $('#dropoff-location').val(),
                    pickdate: $('#pickup-date').val(),
                    picktime: $('#pickup-time').val(),
                    dropdate: $('#dropoff-date').val(),
                    droptime: $('#dropoff-time').val(),
                    rentemail: $('#rent_email').val()
                },
                success: function () {
                    $('#rent_submit').button('reset');
                    //Use modal popups to display messages
                    $('#modalRentSuccess').modal('show');
                },
                error: function () {
                    $('#rent_submit').button('reset');
                    //Use modal popups to display messages
                    $('#modalRentError').modal('show');
                }
            });
        } else {
            $('#rent_submit').button('reset')
        }
        return false;
    });




    //------------------------------------------------------------------------------------
    //						BOOKING FORM VALIDATION'S SETTINGS
    //------------------------------------------------------------------------------------

    $('#booking_form .input-daterange').datepicker({
        startDate: "Beginning of time",
        todayBtn: "linked",
        autoclose: true,
        todayHighlight: true
    });

    $('#booking_form').validate({
        onfocusout: false,
        onkeyup: false,
        rules: {
            loc: "required",
            start: "required",
            end: "required",
            guests: "required",
            email: {
                required: true,
                email: true
            }
        },
        errorPlacement: function (error, element) {
            error.appendTo(element.closest(".validation-message"));
        },
        messages: {
            loc: "Please enter location",
            start: "Please enter valid Date",
            end: "Please enter valid Date",
            guests: "Please enter number of guests",
            email: {
                required: "What's your email?",
                email: "Please, enter a valid email"
            }
        }
    });



    //------------------------------------------------------------------------------------
    //				            BOOKING FORM SCRIPT
    //------------------------------------------------------------------------------------

    $('#booking_form').submit(function () {
        // submit the form
        if ($(this).valid()) {
            $('#booking_submit').button('loading');
            var action = $(this).attr('action');
            $.ajax({
                url: action,
                type: 'POST',
                data: {
                    location: $('#location').val(),
                    checkin: $('#checkin-date').val(),
                    checkout: $('#checkout-date').val(),
                    guests: $('#guests_num').val(),
                    bookingemail: $('#booking_email').val()
                },
                success: function () {
                    $('#booking_submit').button('reset');
                    //Use modal popups to display messages
                    $('#modalBookingSuccess').modal('show');
                },
                error: function () {
                    $('#booking_submit').button('reset');
                    //Use modal popups to display messages
                    $('#modalBookingError').modal('show');
                }
            });
        } else {
            $('#booking_submit').button('reset')
        }
        return false;
    });



});


//------------------------------------------------------------------------
//						NORMALIZE CAROUSEL HEIGHTS FUNCTION
//------------------------------------------------------------------------
$.fn.carouselHeights = function () {

    var items = $(this), //grab all slides
        heights = [], //create empty array to store height values
        tallest; //create variable to make note of the tallest slide

    var normalizeHeights = function () {

        items.each(function () { //add heights to array
            heights.push($(this).height());
        });
        tallest = Math.max.apply(null, heights); //cache largest value
        items.each(function () {
            $(this).css('min-height', tallest + 'px');
        });
    };

    normalizeHeights();

    $(window).on('resize orientationchange', function () {
        //reset vars
        tallest = 0;
        heights.length = 0;

        items.each(function () {
            $(this).css('min-height', '0'); //reset min-height
        });
        normalizeHeights(); //run it again 
    });

};