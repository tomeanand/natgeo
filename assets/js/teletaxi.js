
$(document).ready(function()	{

var currentPage = window.location.href;

if(window.tt.isHome)	{
	var tabs = ['airport','railway','outstation','city','point'];
	var tabStr = '#bookingTab a[href="#'+tabs[Number(window.tt.currentTab)]+'"]';
	$(tabStr).tab('show')
	var a = moment().subtract(0, 'day');
	var mindate = a.format('DD/MM/YYYY');
	var selectedDate;
	var selectedTab = "airport";
	var hasSelected = {a:false, r:false, o:false, c1:false, c2:false, p1:false, p2:false};
	
	var addedTime = moment(new Date()); // the day before DST in the US
	addedTime = addedTime.add(3, 'hours').hours()*4;

	$('#progress_bar').hide();


	for(var i=0; i<5; i++)	{
		var picker = "datePicker_"+i;
		var dpicker = $('#'+picker).datetimepicker({format:'DD/MM/YYYY',minDate:mindate, maskInput: true,  pickTime: false, useCurrent: true, defaultDate:moment()});
		dpicker.on('change', function(e) {
			selectedDate = $(this).data("DateTimePicker").getDate();	
			showCutoffTime();
		});
	}
	selectedDate = $('#datePicker_0').data("DateTimePicker").getDate();
	showCutoffTime();



	function showCutoffTime()	{
		var option_list = "";
		if(mindate == selectedDate.format('DD/MM/YYYY'))	{
			option_list = createList(true,addedTime);
		}
		else	{
			option_list = createList(false,addedTime);
		}
		$("#air_time").html(option_list);
		$("#rail_time").html(option_list);
		$("#out_time").html(option_list);
		$("#city_time").html(option_list);		
		$("#point_time").html(option_list);		
	}

	 	$('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
		 	selectedTab = String($(e.target).attr('href')).substring(1);

			$('#air_loc_to_error').html('');
			$('#rail_loc_to_error').html('');
			$('#out_loc_to_error').html('');
			$('#city_loc_from_error').html('');
			$('#city_loc_to_error').html('');
			$('#point_loc_from_error').html('');
			$('#point_loc_to_error').html('');

		 	//console.debug(selectedTab, e.relatedTarget)
		})

		$('.book_btn').click(function()	{

			var formName = $('form[name="'+selectedTab+'_form"]');
			formName.attr('method', 'post');
			formName.attr('action', window.tt.path+'/booking/taxi_selection');
			var journey = {f:'',to:''};

			

			window.tt.formName = (formName);
			switch(selectedTab)	{
				case 'airport':
					$('#air_loc_to_error').html( !hasSelected.a ? 'Please choose an area from the list' : '');
					journey.f = ( formName.find('input:radio[name="from"]:checked').attr('value') )
					hasSelected.a ? getDistance(journey.f ,$("#air_loc_to").val()) : "";
				break;

				case 'railway':
					$('#rail_loc_to_error').html( !hasSelected.r ? 'Please choose an area from the list' : '');
					journey.f = ( formName.find('input:radio[name="from"]:checked').attr('value') )
					hasSelected.r ? getDistance(journey.f ,$("#rail_loc_to").val()) : "";					
				break;

				case 'outstation':
					$('#out_loc_to_error').html( !hasSelected.o ? 'Please choose an area from the list' : '');
					journey.f = ( 'Trivandrum' )
					hasSelected.o ? getDistance(journey.f ,$("#out_loc_to").val()) : "";
				break;

				case 'city':
					$('#city_loc_from_error').html( !hasSelected.c1 ? 'Please choose an area from the list' : '');
					$('#city_loc_to_error').html( !hasSelected.c2 ? 'Please choose an area from the list' : '');
					if(hasSelected.c1 && hasSelected.c2)	{
						journey.f = $("#city_loc_from").val();
						journey.to = $("#city_loc_to").val();
						getDistance(journey.f,journey.to)
					}

				break;

				case 'point':
					$('#point_loc_from_error').html( !hasSelected.p1 ? 'Please choose an area from the list' : '');
					$('#point_loc_to_error').html( !hasSelected.p2 ? 'Please choose an area from the list' : '');	
					
					if(hasSelected.p1 && hasSelected.p2)	{
						journey.f = $("#point_loc_from").val();
						journey.to = $("#point_loc_to").val();
						getDistance(journey.f,journey.to)
					}

				break;																
			}
			console.log(journey)
			//formName.submit();

			
		});

		$('#air_loc_to').typeahead( {ajax: window.tt.path+'/booking/get_local_town', displayField:'place_name', onSelect: function(item){  hasSelected.a = true;  } });
		$('#rail_loc_to').typeahead( {ajax: window.tt.path+'/booking/get_local_town', displayField:'place_name', onSelect: function(item){ hasSelected.r = true; } });

		$('#out_loc_to').typeahead( {ajax: window.tt.path+'/booking/get_cities', displayField:'city', onSelect: function(item){ hasSelected.o = true; } });

		$('#city_loc_from').typeahead( {ajax: window.tt.path+'/booking/get_local_town', displayField:'place_name', onSelect: function(item){ hasSelected.c1 = true; } });
		$('#city_loc_to').typeahead( {ajax: window.tt.path+'/booking/get_local_town', displayField:'place_name', onSelect: function(item){ hasSelected.c2 = true;  } });

		$('#point_loc_from').typeahead( {ajax: window.tt.path+'/booking/get_cities', displayField:'city', onSelect: function(item){  hasSelected.p1 = true; } });
		$('#point_loc_to').typeahead( {ajax: window.tt.path+'/booking/get_cities', displayField:'city', onSelect: function(item){ hasSelected.p2 = true;  } });	

		$('#air_loc_to').on('input',function(e){ hasSelected.a = false; $('#air_loc_to_error').html('')})	
		$('#rail_loc_to').on('input',function(e){ hasSelected.r = false; $('#rail_loc_to_error').html('')})	
		
		$('#out_loc_to').on('input',function(e){ hasSelected.o = false; $('#out_loc_to_error').html('')})	
		
		$('#city_loc_from').on('input',function(e){ hasSelected.c1 = false; $('#city_loc_from_error').html('')})	
		$('#city_loc_to').on('input',function(e){ hasSelected.c2 = false; $('#city_loc_to_error').html('')})	
		
		$('#point_loc_from').on('input',function(e){ hasSelected.p1 = false; $('#point_loc_from_error').html('')})	
		$('#point_loc_to').on('input',function(e){ hasSelected.p2 = false; $('#point_loc_to_error').html('')})	



		function getDistance(from,to)	{
			$('#progress_bar').show();
			calculateDistances(from,to);
		}

		window.tt.helloThere = function()	{
			window.tt.route.trip = selectedTab;
			var json_str = JSON.stringify(window.tt.route);
			$('<input>').attr({ type: 'hidden', value:json_str , name: 'route'}).appendTo(window.tt.formName);
			window.tt.formName.submit()
		}

	}
	else if(currentPage.indexOf('taxi_selection') >= 0)	{
		 $('.cab_row [data-toggle="tooltip"]').tooltip();
		 //
		 $('.car_btn').click(function()	{
		 	var id = $(this).attr('data-car');
		 	

			$.ajax({ type: "POST", url: window.tt.path+'/booking/set_booking', data: window.tt.result[id] }).done(function( msg ) {
			    if(msg == 'true')	{
			    	window.location.href = window.tt.path+'/booking/book_selected'
			    }
			  });

		 });
		 //
	}
	else if(currentPage.indexOf('quick_booking') >= 0)	{
		quick_gmap_booking();
	}
	else if(currentPage.indexOf('book_selected') >= 0)	{
		$('#accordion').collapse();

		$('#accordion').on('hidden.bs.collapse', function(event){
		console.log(event);
		
	});
	}

	else if(currentPage.indexOf('aboutus') >= 0)	{
		
	}

	else	{

		console.log('No home')
	}




	// 

	initialiseValidations()



})









