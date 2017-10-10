const version = '?v=20170901';
const clientid = '&client_id=RPGUL25RSMX1OOV0ZFGA3OGD0IF5XKQB0SA4RWEC1VIHWTHF';
const clientSecret = '&client_secret=UY2ZX5BNM03Z0SIHI4CPLHI4PMAW1PS01ZLK2D2NOV14DVL4';
const key = version + clientid + clientSecret;

let suburb = 'Takapuna';


var venueHtml = $('#venue-template').html();
var venueTemplate = Template7.compile(venueHtml);
 


$(function() {

    $.fn.extend({
        animateCss: function(animationName) {
            var animationEnd = 'webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend';
            this.addClass('animated ' + animationName).one(animationEnd, function() {
                $(this).removeClass('animated ' + animationName);
            });
            return this;
        }
    });



    let center = [-36.78529801780085, 174.76595878601074];
    let mapNE = L.latLng(-36.769728, 174.726492);
    let mapSE = L.latLng(-36.802551, 174.800564);
    let mapSW = L.latLng(-36.802792, 174.800564);
    let mapNW = L.latLng(-36.769625, 174.726492);
    let bounds = L.latLngBounds(mapNE, mapSE, mapSW, mapNW);
    let map = L.map('map', { maxBounds: bounds, zoomControl: false }).setView(center, 15);
    let light = L.tileLayer('https://api.mapbox.com/styles/v1/nurasharon/cj7tvhrv11qre2rqs4lzi4pp8/tiles/256/{z}/{x}/{y}?access_token=pk.eyJ1IjoibnVyYXNoYXJvbiIsImEiOiJjajZsaDNhZHYwdDF3MnZxbzFkNGlpank0In0.qVnptof0tU-lLkTRV7ha1Q', { minZoom: 15 }).addTo(map);


    let group = L.layerGroup().addTo(map);

    // zoom in function
    $('#in').click(function() {
        map.setZoom(map.getZoom() + 1)
    });
    // zoom out function
    $('#out').click(function() {
        map.setZoom(map.getZoom() - 1)
    });
    // center map function
    $('#center').click(function() {
        map.setView(center, 15)
    });

    // Takapuna 
    let takapunaPoly = {
        latlngs: [
            [-36.77993607001704, 174.74793434143066],
            [-36.79373545150328, 174.75709676742554],
            [-36.79535065870498, 174.7591781616211],
            [-36.79792804647051, 174.76211786270142],
            [-36.797721858640735, 174.76516485214233],
            [-36.79634725892455, 174.7668385505676],
            [-36.79655345045458, 174.7676968574524],
            [-36.79729229887935, 174.7680401802063],
            [-36.79718920417815, 174.768705368042],
            [-36.797275116438776, 174.7690486907959],
            [-36.79670809373787, 174.76975679397583],
            [-36.796123884140684, 174.76977825164795],
            [-36.79596923967795, 174.77089405059814],
            [-36.79706892685138, 174.7729754447937],
            [-36.7949554515793, 174.77685928344727],
            [-36.795848960435535, 174.77761030197144],
            [-36.79244669792634, 174.78029251098633],
            [-36.78878651955129, 174.77630138397217],
            [-36.78662126129863, 174.77503538131714],
            [-36.785401128504695, 174.77479934692383],
            [-36.78442157121647, 174.7754430770874],
            [-36.78473090644969, 174.77630138397217, ],
            [-36.78440438588912, 174.77673053741455],
            [-36.78373415511651, 174.77640867233276],
            [-36.782703019404906, 174.7772240638733],
            [-36.78218744634638, 174.77692365646362],
            [-36.780846940161865, 174.77694511413574],
            [-36.779626715429806, 174.77784633636475],
            [-36.77873301738629, 174.77763175964355],
            [-36.777942429661536, 174.7763442993164],
            [-36.773508112603324, 174.77587223052979],
            [-36.77199557370019, 174.77402687072754],
            [-36.77467687222591, 174.77295398712158],
            [-36.77594014383787, 174.77242827415466],
            [-36.77575967773931, 174.77149486541748],
            [-36.776077641532574, 174.7705614566803],
            [-36.777684627553455, 174.76943492889404],
            [-36.77711745986356, 174.76810455322266],
            [-36.77605186073361, 174.7668707370758],
            [-36.77551905561366, 174.76574420928955],
            [-36.77534718220434, 174.76428508758545],
            [-36.77567374135257, 174.76297616958618],
            [-36.77630966833312, 174.7609806060791],
            [-36.77704871197962, 174.75954294204712],
            [-36.77847521793724, 174.75922107696533],
            [-36.78057196163621, 174.75922107696533],
            [-36.78041728578198, 174.7580623626709],
            [-36.77916268120784, 174.75632429122922],
            [-36.781070359487515, 174.7542428970337],
            [-36.78263427653083, 174.75297689437866],
            [-36.78005637424152, 174.7497797012329],
            [-36.77993607001704, 174.74793434143066]
        ]
    }
    let polygon = L.polygon(takapunaPoly.latlngs, { color: '#394263', fillColor: '#394263', fillOpacity: 0.2, weight: 3 });
    let polygonZoom = L.polygon(takapunaPoly.latlngs, { color: '#394263', fillColor: '#394263', fillOpacity: 0, weight: 6 });

    map.addLayer(polygon);

    map.on('zoomend', function(e) {

        let zoomLevel = map.getZoom();

        if (zoomLevel == 15) {
            map.removeLayer(polygonZoom);
            map.addLayer(polygon);
            $('.logo').show();
        } else {
            map.removeLayer(polygon);
            map.addLayer(polygonZoom);
            $('.logo').hide();
        }
    });

    $('#dropdown').hide();
    $('.hamburger').click(function() {
        $('#dropdown').slideToggle('slow');

    });

    $('#dropdown .button').on('click',function(e){

        $('#dropdown .button').removeClass('current');
        $(this).addClass('current');

        let keyword = $(this).data('keyword');
    

        let exploreUrl = 'https://api.foursquare.com/v2/venues/explore'+key+'&near='+suburb+'&query='+keyword;


        $.ajax({
            url:exploreUrl,
            dataType:'jsonp',
            success:function(res){
                group.clearLayers();
                
                let data = res.response.groups[0].items;

                let venues = _(data).map(function(item){

                    console.log(item);

                    return {
                            latlng:[item.venue.location.lat,item.venue.location.lng],
                            description: item.venue.name,
            
                            venueid: item.venue.id,
                            type: item.venue.categories["0"].name
                        };
                });


                _(venues).each(function(venue){


                    let marker = L.marker(venue.latlng).addTo(group);
                    

                    //add venueid to marker
                    marker.venueid = venue.venueid;

                    marker.on('click',function(){
                
                        let venueUrl = 'https://api.foursquare.com/v2/venues/'+this.venueid+key;

                        //let venueHoursUrl = 'https://api.foursquare.com/v2/venues/'+this.venueid+'/hours'+key;

                        console.log(venueUrl);

                        $.ajax({
                            url:venueUrl,
                            dataType:'jsonp',
                            success:function(res){

                                //let photos = res.response.venue.photos.groups[0].items;
                                let venue = res.response.venue;

                                console.log(res.response.venue);

                                $('.modal-title').text(res.response.venue.name);

                                $('.modal-body').empty();

                                console.log(venue);
                                var output = venueTemplate(venue);
                                $(output).appendTo('.modal-body');


                                $('#myModal').modal('show');

                            }
                        });
                    });
                });
            }
        });
    });

    ///popup test

    //$('#myModalTest').modal('show');

});