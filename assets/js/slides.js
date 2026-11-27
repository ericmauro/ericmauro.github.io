// https://cabrerahector.com/javascript/how-to-make-an-image-slider-with-jquery-from-scratch/
$(() => {
    jQuery(($) => {
        const slider = $('#jquery-slideshow'); // cache the slider object for later use
        let item_width = slider.parent().outerWidth(); // get the width of the container for later use
        let timer = null; // will reference our autoplay() timer
        let prev_button = null; // will reference our "Previous" button
        let next_button = null; // will reference our "Next" button

        // We have more than one slide,
        // let's add the pagination buttons
        if ( slider.children("li").length > 1 ) {

            // Create the Previous button
            prev_button = document.createElement('a');
            prev_button.setAttribute('href', '#');
            prev_button.setAttribute('id', 'btn-prev');
            prev_button.innerHTML = '<span class="fa fa-angle-left"></span><span>Previous</span>';

            // Create the Next button
            next_button = document.createElement('a');
            next_button.setAttribute('href', '#');
            next_button.setAttribute('id', 'btn-next');
            next_button.innerHTML = '<span class="fa fa-angle-right"></span><span>Next</span>';

            // Add previous/next buttons
            slider.parent().append(prev_button, next_button);

            // Handle clicks on the prev button
            slider.parent().on('click', 'a#btn-prev', (e) => {
                e.preventDefault();

                slider.children('li:last').prependTo(slider);
                slider.css('left', -item_width);

                slider.animate({
                    left: 0
                }, 300, 'swing');
            });

            // Handle clicks on the next button
            slider.parent().on('click', 'a#btn-next', (e) => {
                e.preventDefault();

                slider.animate({
                    left: -item_width
                }, 300, 'swing', () => {
                    slider.children('li:first').appendTo(slider);
                    slider.css('left', 0);
                });
            });
        }

        // Autoplay slider (but only when the window/tab is active
        // to save resources)
        document.addEventListener('visibilitychange', () => {
            if ( 'undefined' !== typeof document.hidden && document.hidden ) {
                clearInterval(timer);
                timer = null;
            } else {
                autoplay();
            }
        }, false);

        // Pause/resume autoplay on hover in/out
        slider.hover(() => {
            if ( timer ) {
                clearInterval(timer);
                timer = null;
            }
        }, () => {
            autoplay();
        });

        // Helpers
        function autoplay() {
            if ( $('a#btn-next').length ) {
                if ( timer ) {
                    clearInterval(timer);
                    timer = null;
                }

                timer = setInterval(function(){
                    $('a#btn-next').trigger('click');
                }, 5000);
            }
        }

        function adjust(){
            item_width = slider.parent().outerWidth();
            slider.children('li').width(item_width).parent().width(item_width * slider.children('li').length);
        }

        // Adjust the slider when/if the window gets resized
        $( window ).on('resize', adjust);
        adjust();

        autoplay();
    });
});