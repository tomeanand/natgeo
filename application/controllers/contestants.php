<?php defined('BASEPATH') OR exit('No direct script access allowed');

class Contestants extends CI_Controller {

  public function __construct(){  
    parent::__construct();  
    if (!$this->ion_auth->logged_in()){
      redirect('auth', 'refresh');
    }   
    $this->load->library('grocery_CRUD');
    $this->load->model('customer_model','cmodel');
  }

  public function index(){  
    redirect('contestants/all');
  }

  public function all(){
//$this->output->enable_profiler(true);
    $crud = new grocery_CRUD();
    $crud->set_table('natgeo_contastant');    
    $crud->set_subject('Contastant List');
  
    $crud->display_as('name','Name');
    $crud->display_as('email','Email');
    $crud->display_as('phone','Phone');
    $crud->display_as('attempted','Questions Attempted');
    $crud->display_as('score','Total Score');

    $crud->required_fields('name','email','phone','attempted','score');

    $crud->columns('name','email','phone','attempted','score');

    $crud->unset_add();
    $crud->unset_edit();

    $data['gcrud'] = $crud->render();

    $data['content'] = 'admin/view_customer_list';  
    $this->load->view('admin/template_admin',$data);
  }


  public function send_score()  {

    $insert_data = array(
        'name' => $this->input->post('name')
      , 'email' => $this->input->post('email')
      , 'phone' => $this->input->post('phone')
      , 'attempted' => $this->input->post('attempted')
      , 'scored' => $this->input->post('scored')
      );  
    print_r($insert_data);
      //$result = $this->cmodel->add_user($insert_date);
      //echo json_encode($result);  
  }



  public function admin_home()  {
    $data['content'] = 'admin/view_admin_landing';  
    $this->load->view('admin/template_admin',$data);    
  }

//@class ends
}