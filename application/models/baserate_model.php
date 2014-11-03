<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class Baserate_model extends CI_Model{
    private $__table = 'tt_base_fare';
    
    
    public function __construct()
    {
        parent::__construct();
    }

    public function get_all(){
        return $this->db->get($this->__table);
    }

    public function get_base_fare($taxi_id, $trip_type)	{
		$this->db->where(array("taxi_type"=>$taxi_id,"trip_type"=>$trip_type));
		return $this->db->get($this->_table_name);    	
    }

    
}