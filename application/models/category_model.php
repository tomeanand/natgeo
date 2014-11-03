<?php  if ( ! defined('BASEPATH')) exit('No direct script access allowed');

class category_model extends CI_Model{
    private $__table = 'categorylist';
    
    
    public function get_all(){
	return $this->db->get($this->__table);
    }


    public function get_category_detail($category_id){
	$this->db->where('category_id',$category_id);
	return $this->db->get($this->__table);
    }

    public function update_category($category_id,$category_array){	
	$this->db->where('category_id',$category_id);
	return $this->db->update($this->__table, $category_array);    
    }
    
    public function delete_category($category_id){
	$this->db->where('category_id',$category_id);
	return $this->db->delete($this->__table);
    }
    
    public  function save_category($category_array){
	$this->db->set($category_array);
	$this->db->insert($this->__table);
	return $this->db->insert_id();
    
    }
    
}