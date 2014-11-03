<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="utf-8">
  <title>NatGeo Quiz Administration</title>
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta name="description" content="">
  <meta name="author" content="">
  <!-- Le styles -->
  <!-- <link rel="stylesheet" type="text/css" href="<?php print base_url()?>assets/css/metro-bootstrap.min.css">
  <link rel="stylesheet" href="<?php print base_url()?>assets/css/iconFont.css">
  <link rel="stylesheet" href="<?php print base_url()?>assets/css/docs.css"> -->
    <link href="<?php print base_url()?>assets/css/metro/metro-bootstrap.css?v=2" rel="stylesheet">
    <link href="<?php print base_url()?>assets/css/metro/metro-bootstrap-responsive.css" rel="stylesheet">
    <link href="<?php print base_url()?>assets/css/metro/iconFont.css" rel="stylesheet">
    <link rel="stylesheet" href="<?php print base_url()?>assets/css/docs.css">  



</head>
<body class="metro">
  <!-- Static navbar -->

            <div class="navigation-bar" style="margin-bottom:20px;background-color:#000;">
                <div class="navigation-bar-content" style="height:150px">
                    <a href='<?php echo site_url('contestants/admin_home')?>' class="element" style="height:150px">
                    <span class=""></span> <img style="height:130px" src="<?php print base_url()?>assets/img/logo.png" class="navbar-brand"></sup>
                    </a>
                    <span class="element-divider" style="height:150px"></span>

                    <a class="pull-menu" href="#"></a>
                    <ul class="element-menu drop-up" style="margin-top:50px">
                     <?php if( $this->session->userdata('username'))  { ?>
                       <!--  <li><a href="<?php echo site_url('taxi_list/all')?>">Taxi List</a></li>
                        <li><a href="<?php echo site_url('basefare/all')?>">Minimum Fare</a></li>
                        <li><a href="<?php echo site_url('taxi_type/all')?>">Taxi Types</a></li>
                        <li><a href="<?php echo site_url('places/all')?>">Manage Locations</a></li> -->
                          <!--<li><a href="<?php echo site_url('cuisine/all')?>">Cuisine</a></li>
                          <li><a href="<?php echo site_url('client/all')?>">Clients</a></li> 
                          <li><a href="<?php echo site_url('groups/all')?>">Groups</a></li>
                          <li><a href="<?php echo site_url('users/all')?>">Users</a></li>
                        <li><a href="<?php echo site_url('taxi_list/admin_home')?>">Admin Home</a></li>-->
                          
                        <?php } ?>
                       <!--  <li><a href="<?php echo site_url('auth/logout')?>">Logout</a></li> -->
                       
                    </ul>
                </div>
            </div>


<div class="grid fluid">
  <div class="row padding20">
    <div class="span2">
      
<?php if( $this->session->userdata('username'))  { ?>
        <nav class="sidebar light">
            <ul>
                <li class="title">Quick Links</li>
                 <li class="stick bg-emerald"><a  href="<?php echo site_url('contestants/all')?>" ><i class="icon-user"></i>Contestant List</a></li>
                 <li class="stick bg-emerald"><a  href="<?php echo site_url('auth/logout')?>"><i class="icon-exit"></i>Logout</a></li>
                 <!-- <li class="stick bg-emerald"><a  href="#"><i class="icon-thumbs-up"></i>Trip Completed</a></li>
                 <li class="stick bg-emerald"><a  href="#"><i class="icon-stats-up"></i>Analytics</a></li>
                 <li class="stick bg-emerald"><a  href="#"><i class="icon-mail"></i>Notification</a></li>
                 <li class="stick bg-emerald"><a  href="#"><i class="icon-equalizer"></i>Settings</a></li> -->
            </ul>
        </nav>
      <?php } ?>  

    </div>
    <div class="span10"><?php $this->load->view($content);?></div>
  </div>
</div>


<footer class="bs-footer" role="contentinfo">
  <div class="container">
    <!-- <blockquote class="place-right">
    <small></small>
</blockquote> -->
   
  </div>
</footer>

   <!-- <script src="<?php print base_url()?>assets/js/metro/jquery/jquery_v2.0.1.js"></script>-->
    <script src="<?php print base_url()?>assets/js/metro/jquery/jquery.widget.min.js"></script>
    <script src="<?php print base_url()?>assets/js/metro/metro.min.js">
    <script src="<?php print base_url()?>assets/js/metro/metro/metro-dropdown.js"></script> 
</body>
</html>

