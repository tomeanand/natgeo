<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Taxi_model extends CI_Model{
    private $__table = 'tt_taxi';
    
    
    public function __construct()
    {
        parent::__construct();
    }

    public function get_all($route){
    	$list = [];
		$query = 'select tt_taxi.taxi_id,tt_taxi.taxi_name,tt_taxi.taxi_desc,tt_taxi.taxi_rate,tt_taxi.taxi_image, tt_taxi_type.taxi_type_name, tt_taxi_type.taxi_type_id from tt_taxi INNER JOIN tt_taxi_type ON tt_taxi.taxi_type=tt_taxi_type.taxi_type_id';
		$taxi = $this->db->query($query)->result();
		foreach($taxi as $row){
			$list[$row->taxi_id] = $this->calculate_rate($row, $route);
		}
        return $list;
    }

    public function calculate_rate($item, $route)	{
    	$trip_type = $this->get_trip_type($route);
    	$taxi = array(
    		'name' => $item->taxi_name,
            'desc' => $item->taxi_desc,
    		'rate' => $item->taxi_rate,
    		'distance' => $route['distance_unit'],
            'duration' => $route['duration'],
            'time' => $route['time'],
            'date' => $route['date'],        
            'from' => $route['origin'],        
            'to' => $route['destination'],        
    		'trip_type' => $trip_type,
            'taxi_type_name' => $item->taxi_type_name,
            'taxi_type' => $item->taxi_type_id,
    		'taxi_img' => $item->taxi_image
    		 );

    	$base_fare = $this->get_base_fare($item->taxi_type_id, $trip_type)->result()[0];
    	$base_km = $this->get_min_km($trip_type)->result()[0];

        $taxi['base_fare'] = $base_fare->taxi_rate;
    	$taxi['min_km'] = $this->check_min_distance_exception ($item->taxi_type_id, $trip_type, $base_km->trip_min_km);
    	
        $taxi['breakup'] = $this->calculate_final_rate($taxi);

        //print_r($taxi);print_r('<br><br>');
    	return $taxi;
    }

    public function calculate_final_rate($cab)
    {
       $distance = ceil ($cab['distance'] / 1000);
       $extra_km = ( $distance >  $cab['min_km'] ? ( $distance - $cab['min_km']) : 0 );
       $extra_km_charge = $extra_km * $cab['rate'];
       $night = $this->get_night_charge($cab);
       $outstation_charge = $this->get_outstation_charge($cab);


       $total = $cab['base_fare'] + $extra_km_charge;
       $total = $this->add_service_charge($total);
       $total += $night['rate'];
       $total += ($outstation_charge);


       $breakup = array('extra_k' => $extra_km , 'extra_charge' => $extra_km_charge,'base'=> $cab['base_fare']);
       $breakup['night'] =  $night;
       $breakup['total'] = ceil($total);
       $breakup['outstation'] = $outstation_charge;
       return $breakup;
    }

    public function get_base_fare($taxi_id, $trip_type)	{
		$this->db->where(array("taxi_type"=>$taxi_id,"trip_type"=>$trip_type));
		return $this->db->get('tt_base_fare');    	
    }

    public function get_min_km($trip_type)    {
        $this->db->where(array("trip_type_id"=>$trip_type));
        return $this->db->get('tt_trip_type');          
    }

    public function get_trip_type($route)	{
    	$trip_type = $route['trip'];
    	$origin = $route['origin'];
		
		if($trip_type == 'airport')	{	return ( $origin == lang('trv_inter') ? 1 : 2 );	}
    	elseif ($trip_type == 'railway') { return ( $origin == lang('trv_central') ? 3 : 4 );	}
    	elseif ($trip_type == 'city') {    return 5;   }
        elseif ($trip_type == 'outstation') { return 6;	}
    	elseif ($trip_type == 'point') { return 7;	}    	
    }

    public function get_night_charge($cab)  {
        $time = $cab['time'];
        $trtype = $cab['trip_type'];
        $ttype = $cab['taxi_type'];
        
        if((int)$trtype >=5)    {
             return  array('isNight' =>false, 'rate' => 0 );
        }       

       //cludge
        $rate_table = array(
                1 => array(0,50,75,0,50),
                2 => array(0,50,75,0,50),
                3 => array(0,75,75,0,75),
                4 => array(0,75,75,0,75),
                5 => array(0,50,75,0,0),
                6 => array(0,0,0,0,0),
                7 => array(0,0,0,0,0),
            );

        $ampm = substr($time, -2);
        $t = (int)explode(":", $time)[0];
        $rate = $rate_table[$trtype][$ttype];
        if($trtype == 6)    {
             return  array('isNight' =>false, 'rate' => 0 );
        }
        else if(  ($ampm == "PM" && ($t == 10 || $t == 11 || $t == 12 ))  ||  ($ampm == "AM" && ($t == 1 || $t == 2 || $t == 3 || $t == 4 )) )    {
         return array('isNight' =>($rate ==0 ? false : true), 'rate' => $rate ); 
        }else {
        return  array('isNight' =>false, 'rate' => 0 );

        }

    }

    public function get_outstation_charge($cab)    {
            return $cab['trip_type'] == 6 ? 200 : 0;
    }

    public function add_service_charge($total)    {
        return $total + ($total* 4.94/100);
    }

    public function check_min_distance_exception($taxi_type,$trip_type,$min_km)  {
        //Innova - Airport Domestic
        if($taxi_type == 4 && $trip_type == 2)    {
            return 30;
        }
        return $min_km;
    }
    
}