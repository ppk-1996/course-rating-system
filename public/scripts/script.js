$('#update_admin').click(function () {

        $('#admin_username').html("Old ID");
        $('.admin_new').show();
        $('#add_btn').hide();
        $('#update_btn').show();
        $('#delete_btn').hide();
        $('.admin_password').hide();

    });

    $('#add_admin').click(function () {

        $('#admin_username').html("ID");
        $('.admin_password').show();
        $('.admin_new').hide();
        $('#add_btn').show();
        $('#update_btn').hide();
        $('#delete_btn').hide();
    });
    $('#delete_admin').click(function () {

        $('#admin_username').html("ID");
        $('.admin_new').hide();
        $('#add_btn').hide();
        $('#update_btn').hide();
        $('#delete_btn').show();
        $('.admin_password').hide();

    });
    
        /******************** Admin CRUD Validation***********************/
    $('#admin_crud_form').validate({
        rules: {
            admin_username: "required",
            admin_pass: "required",
            admin_new_username: "required",
            admin_new_pass: "required",

        },

        submitHandler: function (form) {
            form.submit();
        }
    });
