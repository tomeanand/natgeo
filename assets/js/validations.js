var login_buttons = [
'<div class="btn-group"><a href="'+window.tt.path+'/customer/mypage" class="btn btn-primary btn-xs login_color">USER_NAME</a><a href="javascript:void(0)" class="btn btn-primary btn-xs dropdown-toggle drop_pin login_color" data-toggle="dropdown"><span class="caret"></span></a><ul class="dropdown-menu"><li><a href="'+window.tt.path+'/customer/bookings">Bookings</a></li><li><a href="'+window.tt.path+'/customer/settings">Account Settings</a></li><li><a href="javascript:void(0)" class="logout_action">Logout</a></li></ul></div>'
,'<button class="btn btn-primary login_customer btn-xs"><span class="icon icon-material-lock"> LOGIN</span></button>'
]
var currentPage = window.location.href;
function initialiseValidations()    {


    $('.btn_c_cancel').hide();
    $('.btn_c_reset').hide();
    $('#id_login_error').hide();


    $('.login_customer').click(function()   {
        $('#login_box').modal();
    });
    $('.fg_pswd_link').click(function() {
        $('#id_action_type').attr('value','true');
        $('#id_password').attr('value','1234567');
        $('#login_form').bootstrapValidator('resetForm', true);
        $('.fg_pswd_link').hide();
        $('.box_pwd').hide();
        $('.btn_c_login').hide()
        $('.btn_c_register').hide()
        $('.btn_c_cancel').show();
        $('.btn_c_reset').show();
    });

    $('.btn_c_register').click(function()   {
        $('#login_box').modal('hide');
        $('#register_box').modal();
    });

    $('.btn_c_cancel').click(function() {
        $('#id_action_type').attr('value','false');
        $('#id_password').attr('value','');
        $('#login_form').bootstrapValidator('resetForm', true);
        $('.fg_pswd_link').show();
        $('.box_pwd').show();   
        $('.btn_c_login').show();
        $('.btn_c_register').show() ;
        $('.btn_c_cancel').hide();
        $('.btn_c_reset').hide();               
    });


    $('.btn_c_reset').click(function()  {
    });





    $('#register_form').bootstrapValidator({container: 'tooltip',
        feedbackIcons: {valid: 'icon icon-material-done',invalid: 'icon icon-material-close',validating: 'glyphicon glyphicon-refresh'},
        fields: {
            fname: {
                validators: {notEmpty: {message: 'Your name is required'}
                }
            },
            phone: {
                validators: {
                    digits: {message: 'The phone number can contain digits only'},
                    notEmpty: {message: 'Your phone number is required'},
                    stringLength: {min: 8,max: 12,message: 'Not a valid Phone number'}

                }
            },
            email: {
                validators: {
                    emailAddress: {message: 'The value is not a valid email address'},
                    notEmpty: {message: 'Email is required'},
                    remote: {url: window.tt.path+'/customer/has_user',message: 'This email id has been used by someone. If its yours please try to login or click forgot password.'}
                }
            },
            password: {
                validators: {
                    notEmpty: {message: 'Please enter your password'},
                    stringLength: {min: 6,max: 30,message: 'Password be more than 6 and less than 30 characters long'}
                }
            },
            confirmPassword: {
                validators: {
                    notEmpty: { message: 'The confirm password is required and can\'t be empty'},
                    identical: {field: 'password',message: 'The password and its confirm are not the same'}
                }
            }            
        }
    }).on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                $('#register_form').bootstrapValidator('resetForm', true);
                $('#register_box').modal('hide');

            }, 'json');
        });


    $('#login_form').bootstrapValidator({container: 'tooltip',
        feedbackIcons: {valid: 'icon icon-material-done',invalid: 'icon icon-material-close',validating: 'glyphicon glyphicon-refresh'},
        fields: {
            
            email: {
                validators: {
                    emailAddress: {message: 'The value is not a valid email address'},
                    notEmpty: {message: 'Email is required'}
                }
            },
            password: {
                validators: {
                    notEmpty: {message: 'Password is required'},
                    stringLength: {min: 6,max: 30,message: 'Password be more than 6 and less than 30 characters long'}
                }
            }                        
        }
    }).on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
            var form_data = $form.serialize();

            $.post($form.attr('action'), $form.serialize(), function(result) {
                // $('#register_form').bootstrapValidator('resetForm', true);
                // $('#register_box').modal('hide');
                if(result.type == 'true')    {
                    if(result.valid == 'true')    {
                        $('#login_box').modal('hide');
                        swal("Mail sent!", result.message, "success");
                    }
                    else    {
                        $('#login_box').modal('hide');
                        swal("Not registered", result.message, "error")
                    }
                }
                else    {
                     if(result.valid == 'true')    {
                         $('#login_box').modal('hide');
                         $('.login_btns').html(login_buttons[0].replace("USER_NAME", result.user));
                     }
                     else   {
                        $('#login_form').bootstrapValidator('resetForm', true);
                        $('#id_login_error').show();
                     }
                }
                     
                


            }, 'json');
        }).on('status.field.bv', function(e, data) {  
            //console.debug(e, data);
            $('#id_login_error').hide();
        }); 



    $('#register_box').on('shown.bs.modal', function() {
        $('#register_form').bootstrapValidator('resetForm', true);
    });
    $('#login_box').on('shown.bs.modal', function() {
        $('#login_form').bootstrapValidator('resetForm', true);
        $('#id_action_type').attr('value','false');
        $('#id_password').attr('value','');
        $('#id_login_error').hide();
        $('.fg_pswd_link').show();
        $('.box_pwd').show();   
        $('.btn_c_login').show();
        $('.btn_c_register').show() ;
        $('.btn_c_cancel').hide();
        $('.btn_c_reset').hide(); 
    }); 


    $('.logout_action').click(function()    {
        $.ajax({ type: "POST", url: window.tt.path+'/customer/logout' }).done(function( msg ) {
            if(msg == 'true')   {
                window.location.reload();
            }
          });        
    })

// *************** Pagewise vaidations ***********************

    if(currentPage.indexOf('aboutus') >= 0)    {
        $('#contact_form').bootstrapValidator({container: 'tooltip',
                feedbackIcons: {valid: 'icon icon-material-done',invalid: 'icon icon-material-close',validating: 'glyphicon glyphicon-refresh'},
                fields: {
                    fname : {
                        validators : {
                            notEmpty: {message: 'Your name is required'}
                        }
                    },
                    email: {
                        validators: {
                            emailAddress: {message: 'The value is not a valid email address'},
                            notEmpty: {message: 'Email is required'}
                        }
                    },
                    phone: {
                        validators: {
                            digits: {message: 'The phone number can contain digits only'},
                            notEmpty: {message: 'Your phone number is required'},
                            stringLength: {min: 8,max: 12,message: 'Not a valid Phone number'}
                        }
                    },
                    comments: {
                        validators: {
                            notEmpty: {message: 'Your name is required'},
                            stringLength: {min: 40,message: 'Please give some more info about your query.'}
                    }                          
                }
            }
            }).on('success.form.bv', function(e) {
            // Prevent form submission
            e.preventDefault();
            var $form = $(e.target);
            var bv = $form.data('bootstrapValidator');
            // Use Ajax to submit form data
            $.post($form.attr('action'), $form.serialize(), function(result) {
                $('#contact_form').bootstrapValidator('resetForm', true);
                swal("Thank you", "Your message has been sent. Thank you for your time. We will contact you soon.")

            }, 'json');
        });

            // contact us ends here        
    }   


}

