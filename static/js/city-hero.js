/**
 * Client JS for home page
 */

(function($) {
    $(document).ready(function() {
        $('#slide-list li').first().addClass('carousel-active');
        
        // Add homepage project carousel
        var sliding = false;        
        $('.slider-move').bind('click', function(ev) {
            // Kill the default click event
            ev.preventDefault();
            
            // Only proceed if the carousel is not currently sliding
            if(sliding === false) {
                sliding = true;
                
                // Figure out which direction we should go
                var dir = ($(ev.target).hasClass('totheright')) ? 'left' : 'right';

                // What is our current left-most image?
                var cur_image = $('#slide-list li.carousel-active');

                // What is the next image we want to go to?
                var next_image = (dir === 'left') ? $('#slide-list .carousel-active').next() : $('#slide-list .carousel-active').prev();

                // Only slide if there is an image to slide to
                if(next_image.length) {
                    // delta is the number of pixels to slide - this should be abstracted out to the 
                    console.log(cur_image.outerWidth(true));
                    var delta = 240;
                    var move_to = parseInt($('#slide-list').css('marginLeft'));
                    move_to = (dir === 'left') ? move_to - delta : move_to + delta;
                    console.log(move_to);
                
                    $('#slide-list').animate(
                        { marginLeft: move_to+'px'}, 
                        500, 
                        function() { 
                            cur_image.removeClass('carousel-active');
                            next_image.addClass('carousel-active');
                            sliding = false;
                        }
                    );
                } else {
                    sliding = false;
                }
            }
        });
    });
    
    /**
     * Form jquery for client
     */
    $(document).ready(function() {
        var id = 1;
        // $('.form-item-help')....
        
        // Fields with wizard tips
        $('.wizard-tip').each(function (ind, tip) {
            var tip_id = $(tip).attr('id')
              , input_id_len = tip_id.length - ('-wizard-tip').length
            
            // The field and the wizard tip must have corresponding id's. When
            // a field receives focus, hide all tips and show the one for that
            // field.
            input_id = tip_id.substr(0,input_id_len);
            $('#' + input_id).focus(function() {
                $('.wizard-tip').hide();
                $(tip).show();
            });
        });
        
        // Geocoding textfields
        $('.textfield.geocode').each(function () {
            id++;
            var geocodeMapID = 'geocode-input-map-id-' + id;
            $thisField = $(this);
            
            // Add place for map
            // TODO: Make this abstract for any textfield
            $thisField.after('<div id="' + geocodeMapID + '" class="geocoding-input-map"></div>' + 
                '<input class="textfield hidden" type="text" name="project-lat" id="project-lat" size="50" />' + 
                '<input class="textfield hidden" type="text" name="project-lon" id="project-lon" size="50" />');
            
            // Make map
            var latlng = new google.maps.LatLng(41.659,-100.714);
            var options = {
                zoom: 2,
                center: latlng,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                disableDefaultUI: true,
            };
            map = new google.maps.Map(document.getElementById(geocodeMapID), options);
            
            // Create geocoder
            var geocoder = new google.maps.Geocoder();
            
            // Make marker for choosing: false,
            var markerShadow = new google.maps.MarkerImage(
                '/images/map-shadow-icon.png',
                new google.maps.Size(25, 25),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34)
            );
            var markerImage = new google.maps.MarkerImage(
                '/images/map-icon.png',
                new google.maps.Size(16, 25),
                new google.maps.Point(0, 0),
                new google.maps.Point(10, 34)
            );
            var marker = new google.maps.Marker({
                map: map,
                draggable: true,
                icon: markerImage,
                shadow: markerShadow
            });
            
            // Autocomplete
            $thisField.autocomplete({
                // This bit uses the geocoder to fetch address values
                source: function(request, response) {
                    geocoder.geocode( {'address': request.term }, function(results, status) {
                        response($.map(results, function(item) {
                            return {
                                label: item.formatted_address,
                                value: item.formatted_address,
                                latitude: item.geometry.location.lat(),
                                longitude: item.geometry.location.lng()
                            }
                        }));
                    })
                },
                // This bit is executed upon selection of an address
                select: function(event, ui) {
                    $("#project-lat").val(ui.item.latitude);
                    $("#project-lon").val(ui.item.longitude);
                    var location = new google.maps.LatLng(ui.item.latitude, ui.item.longitude);
                    marker.setPosition(location);
                    map.setCenter(location);
                    map.setZoom(10);
                }
            });
            
            // Reverse geocode map
            google.maps.event.addListener(marker, 'drag', function() {
                geocoder.geocode({'latLng': marker.getPosition()}, function(results, status) {
                    if (status == google.maps.GeocoderStatus.OK && typeof results[0] != 'undefined') {
                        $thisField.val(results[0].formatted_address);
                        $('#project-lat').val(marker.getPosition().lat());
                        $('#project-lon').val(marker.getPosition().lng());
                    }
                });
            });
        });
    });

})(jQuery);
