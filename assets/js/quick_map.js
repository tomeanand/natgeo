function quick_gmap_booking()	{

$('#datePicker').datetimepicker({pickTime: false, useCurrent: true, defaultDate:moment()});

var rendererOptions = {draggable: true, polylineOptions: { strokeColor: "#FF0000" } };
	var directionsDisplay = new google.maps.DirectionsRenderer(rendererOptions);;
	var directionsService = new google.maps.DirectionsService();
	var map;
	var trivandrum = new google.maps.LatLng(8.487726, 76.963840);

	


var roadAtlasStyles = [
    {
      featureType: 'road.highway',
      elementType: 'geometry',
      stylers: [
        { hue: '#E8C196' },
        { saturation: 60 },
        { lightness: -20 }
      ]
    },{
      featureType: 'road.arterial',
      elementType: 'all',
      stylers: [
        { hue: '#2200ff' },
        { lightness: -40 },
        { visibility: 'simplified' },
        { saturation: 30 }
      ]
    },{
      featureType: 'road.local',
      elementType: 'all',
      stylers: [
        { hue: '#f6ff00' },
        { saturation: 50 },
        { gamma: 0.7 },
        { visibility: 'simplified' }
      ]
    },{
      featureType: 'water',
      elementType: 'geometry',
      stylers: [
        { saturation: 40 },
        { lightness: 40 }
      ]
    },{
      featureType: 'road.highway',
      elementType: 'labels',
      stylers: [
        { visibility: 'on' },
        { saturation: 98 }
      ]
    },{
      featureType: 'administrative.locality',
      elementType: 'labels',
      stylers: [
        { hue: '#0022ff' },
        { saturation: 50 },
        { lightness: -10 },
        { gamma: 0.90 }
      ]
    },{
      featureType: 'transit.line',
      elementType: 'geometry',
      stylers: [
        { hue: '#ff0000' },
        { visibility: 'on' },
        { lightness: -70 }
      ]
    }
  ];

 var icons;


	

	function initialize() {
// ,new google.maps.Size( 44, 32 ), new google.maps.Point( 0, 0 ),new google.maps.Point( 22, 32 )
	icons = {
		start: new google.maps.MarkerImage('assets/img/map_start.png'),
		end: new google.maps.MarkerImage('assets/img/map_end.png')
	};

		var mapOptions = {
			zoom: 15,
			center: trivandrum,
			mapTypeControlOptions: {
      			mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'usroadatlas']
    		}
		};
		map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
		
		directionsDisplay.setMap(map);
		directionsDisplay.setPanel(document.getElementById('directionsPanel'));
		//directionsDisplay.setOptions( { suppressMarkers: true } );

		var styledMapOptions = {name: 'TeleTaxi Road Atlas' };
		var usRoadMapType = new google.maps.StyledMapType(roadAtlasStyles, styledMapOptions);
		map.mapTypes.set('usroadatlas', usRoadMapType);
		map.setMapTypeId('usroadatlas');

		google.maps.event.addListener(directionsDisplay, 'directions_changed', function() {
			computeTotalDistance(directionsDisplay.getDirections());
		});

		

		calcRoute();
	}

	function calcRoute() {

		var request = {
			origin: 'Thiruvananthapuram, IN',
			destination: 'Kollam, IN',
			//waypoints:[{location: 'Bourke, NSW'}, {location: 'Broken Hill, NSW'}],
			travelMode: google.maps.TravelMode.DRIVING
			};
			directionsService.route(request, function(response, status) {
				if (status == google.maps.DirectionsStatus.OK) {
					directionsDisplay.setDirections(response);

					var leg = response.routes[ 0 ].legs[ 0 ];
					//makeMarker( leg.start_location, icons.start, "title" );
					//makeMarker( leg.end_location, icons.end, 'title' );
				}
			});
	}

	function makeMarker( position, icon, title ) {
		new google.maps.Marker({
			position: position,
			map: map,
			icon: icon,
			title: title
		});
	}

	function computeTotalDistance(result) {
		var total = 0;
		var starter, ender;
		var myroute = result.routes[0];
		for (var i = 0; i < myroute.legs.length; i++) {
			total += myroute.legs[i].distance.value;
			starter = (myroute.legs[i].start_address);
			ender = (myroute.legs[i].end_address);

		}
		total = total / 1000.0;
		// $scope.tripInfo.distance = 

		//  $scope.mapinfo.distance = Math.round(total) + ' km';
		$("#map_total").text(Math.round(total) + ' km');
		$("#map_start").text(starter);
		$("#map_end").text(ender);
	
	}

	google.maps.event.addDomListener(window, 'load', initialize);
	//initialize();



}