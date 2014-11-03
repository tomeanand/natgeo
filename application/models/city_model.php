<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class City_model extends CI_Model{
    private $__table = 'tt_cities';
    private $__table_local = 'tt_place_local';
    
    
    public function __construct()
    {
        parent::__construct();
    }

    public function get_all(){
        return $this->db->get($this->__table);
    }

     public function get_places($place){
     	$this->db->like(array("city"=>$place));
        return $this->db->get($this->__table);        	
     }

     public function get_local_places($place){
        $this->db->like(array("place_name"=>$place));
        return $this->db->get($this->__table_local);          
     }     

    
}