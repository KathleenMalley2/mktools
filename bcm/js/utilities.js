$(document).ready(function () {

    $(document).on('click', '.create_RIS', function () {
        var $this = $(this);
        var ris_id = $this.attr('ris_id');
        get_broker(ris_id, 'create');
    });

    $(document).on('click', '.update_RIS', function () {
        var $this = $(this);
        var ris_id = $this.attr('ris_id');
        get_broker(ris_id, 'update');
    });

    initilize_selection();

    $(".contact_type").change(function () {
        var contact_type = $(this).attr('id');
        var contactOption = $("option:selected", this).val();
        if (contactOption == 'other') {
            other_contact_input(contact_type, 'show');
        } else {
            other_contact_input(contact_type, 'hide');
        }
    });

    $('#create_contacts_detail').submit(function (e) {
        e.preventDefault();
        save_contacts();
    });

    $('#create_contacts_initial').submit(function (e) {
        e.preventDefault();
        initilize_select_rows();
    });

    $(document).on('click', '#back', function () {
        goto_landing_page();
    });

    $(document).on('click', '#clear_data', function () {
        initilize_selection();
    });

    $(function () {
        $('[data-toggle="tooltip"]').tooltip()
    })

});

function initilize_selection() {
    $('#new_states').empty();
    $('#contact_rows').empty();
    $.ajax({
        url: "../includes/ris_contacts.php",
        data: {func_request: "new_states"},
        type: 'GET',
        dataType: "json",
        cache: false,
        success: function (result) {
            for (var i = 0; i < result.length; i++)
                for (var name in result[i]) {
                    if (name == 'state_id') {
                        var row = result[i];
                        var key = row.state_id;
                        var value = row.state_value;
                        $('#new_states').append($('<option></option').text(value).attr('value', key));
                    }
                }
        }
    })
}

function initilize_select_rows() {
    $('#contact_rows').empty();
    var state_selected = $('#new_states :selected').val();
    var sort_column = $('input:radio[name=sort_column]:checked').val();
   // event.preventDefault();
    if (state_selected == 'null') {
        alert('Please select a State');
    } else {
        $.ajax({
            url: "../includes/ris_contacts.php",
            data: {func_request: "new_ris_top_1000", state_selected: state_selected, sort_column: sort_column},
            type: 'GET',
            dataType: "json",
            cache: false,
            success: function (response) {
                var trHTML = '<tr><th>&nbsp;</th><th>Company Name</th><th align="right">Sales Volume</th><th align="right">Total Offices</th><th>Franchise Affiliation</th><th>Relo Referral Network</th><th>City</th><th>State</th><th># Contacts</th></tr>';
                $.each(response, function (i, item) {
                    var button_class = 'update_RIS';
                    var button_value = 'Update';
                    if (item.total_contacts == 0) {
                        button_class = 'create_RIS';
                        button_value = 'Create';
                    }
                    trHTML += '<tr><td><input type="button" class="' + button_class + '" ris_id="' + item.ris_id + '" value="' + button_value + '"></td><td>' + item.company_name + '</td><td align="right">' + item.sales_volume + '</td>';
                    trHTML += '<td align="right">' + item.total_offices + '</td><td>' + item.franchise_affiliation + '</td><td>' + item.relo_referral_network + '</td><td>' + item.city + '</td><td>' + item.state + '</td><td>' + item.total_contacts + '</td></tr>';
                });
                $('#contact_rows').append(trHTML);
            }
        })
    }
}

function initilize_contact_types() {
//    $.ajax({
//        url: "../includes/ris_contacts.php",
//        data: {func_request: "get_contact_types"},
//        type: 'GET',
//        dataType: "json",
//        cache: false,
//        success: function (result) {
//            for (var i = 0; i < result.length; i++)
//                for (var name in result[i]) {
//                    if (name == 'contact_type_id') {
//                        var row = result[i];
//                        var contact_type_id = row.contact_type_id;
//                        var contact_type_desc = row.contact_type_desc;
//                        var contact_type_code = row.contact_type_code;
//                        $('#create_contacts_detail').append($('<div></div>').attr('class', 'form-group'));
//                        $('#create_contacts_detail').append($('<label></label>').text(contact_type_desc).attr('for', contact_type_id));
//                        $('#create_contacts_detail').append($('<select></select>').attr('id', contact_type_id).attr('data-contact_type_code', contact_type_code).attr('class', 'update'));
//                        
//                    }
//                }
//            $('#create_contacts_detail').append($('<div></div>').attr('class', 'form-group'));
//            $('#create_contacts_detail').append($('<input>').attr('class', 'btn btn-info').attr('id', 'submit_form').attr('type', 'submit').val('Submit'));
//            $('#create_contacts_detail').append($('<input>').attr('class', 'btn btn-info').attr('id', 'back').attr('type', 'button').val('Back'));
//        }
//    })
}

function other_contact_input(contact_type, form_action) {
    // <div id="contact1_border" class="hide_content">
    var other_element = '.other_' + contact_type + '_form';
    if (form_action == 'show') {
        $(other_element).show();
        $(other_element).addClass("other_shadow");
    } else {
        $(other_element).hide();
        $(other_element).removeClass("other_shadow");
    }

}

function goto_landing_page() {
    // Clear RIS contacts from select options
    $('#create_contacts_detail').find('select').each(function () {
        $(this).empty();
    });
    $("input[name*='other_']").val('');
    $('[class*="other_"]').hide();
    $("#create_contacts_form").hide();
    $("#create_contacts_list").show();
    $('#contact_rows').empty();
    initilize_select_rows();
}

function get_broker(ris_id, mode) {
    // mode = create or update
    $.ajax({
        url: "../includes/ris_contacts.php",
        data: {func_request: "get_broker", ris_id: ris_id, mode: mode},
        type: 'GET',
        dataType: "json",
        cache: false,
        success: function (result) {
            $("#create_contacts_list").hide();
            $("#create_contacts_form").show();
            $('#company_name').val(result[0].company_name);
            $('#corp_address').val(result[0].corp_address);
            $('#city').val(result[0].city);
            $('#st').val(result[0].st);
            $('#zip').val(result[0].zip);
            $('#status').val(result[0].status);
            $('#phone').val(result[0].phone);
            $('#total_offices').val(result[0].total_offices);
            $('#franchise_affiliation').val(result[0].franchise_affiliation);
            $('#relo_referral_network').val(result[0].relo_referral_network);
            $('#ris_id').val(ris_id);
            $('#ris_mode').val(mode);

            if (result[0].website.length > 0) {
                var website = result[0].website;
                if (website.indexOf("http://") === -1) {
                    website = "http://" + website;
                }
                $("#website_link").attr('href', website);
                $("#website_link").text(result[0].website);
                $("#website_link").show();
            } else {
                $("#website_link").hide();
            }

            for (var i = 0; i < result[0].contacts.length; i++)
                for (var name in result[0].contacts[i]) {
                    if (name == 'name') {
                        var row = result[0].contacts[i];
                        var contact_type = row.contact_type;
                        var contact_name = row.name;
                        var contact_email = row.email;
                        var contact_title = row.title;
                        if ((contact_name.length > 0 && contact_email.length > 0) || (contact_type == 'null') || contact_type == 'other') {
                            if (contact_title.length > 0) {
                                contact_name = contact_type + ' || ' + contact_title + ' || ' + contact_name + ' || ';
                            } else if (contact_type == 'null' || contact_type == 'other') {
                                contact_name = contact_name;
                            } else {
                                contact_name = contact_type + ' || ' + contact_name + ' || ';
                            }
                            var text_value = contact_name + ' ' + contact_email;
                            $('#create_contacts_detail').find('select').each(function () {
                                $(this).append($('<option></option').text(text_value).attr('value', contact_type));
                            });
                        }
                    }
                }
            for (var i = 0; i < result[0].current_contacts.length; i++)
                for (var name in result[0].current_contacts[i]) {
                    if (name == 'RIS_contact_type') {
                        var row = result[0].current_contacts[i];
                        var contact_type_id = row.contact_type_id;
                        var RIS_contact_type = row.RIS_contact_type;
                        var contact_email = row.email;
                        var contact_first_name = row.first_name;
                        var contact_last_name = row.last_name;
                        if (contact_type_id.length > 0 && RIS_contact_type.length > 0) {
                            if (RIS_contact_type == 'other') {
                                $('#other_' + contact_type_id + '_fname').val(contact_first_name);
                                $('#other_' + contact_type_id + '_lname').val(contact_last_name);
                                $('#other_' + contact_type_id + '_email').val(contact_email);
                                var other_element = '.other_' + contact_type_id + '_form';
                                $(other_element).show();
                                $(other_element).addClass("other_shadow");
                            }
                            $('#' + contact_type_id + ' option[value=' + RIS_contact_type + ']').prop('selected', true);

                        }
                    }
                }
        }

    }).done(function () {
        //  alert('done');
    });
}

function save_contacts() {
    // mode = create or update
    var save_mode = $('#ris_mode').val();
    var ris_id = $('#ris_id').val();
    var error_message = '';
    var contact_ceo = $('#1 :selected').val();
    var contact_dig_mrkt = $('#2 :selected').val();
    var contact_int_mrkt = $('#3 :selected').val();
    var contact_tech = $('#4 :selected').val();
    var contact_vend_rel = $('#5 :selected').val();
    var other_data = {};

    //event.preventDefault();
    if (contact_ceo == 'null' && contact_dig_mrkt == 'null' && contact_int_mrkt == 'null' && contact_tech == 'null' && contact_vend_rel == 'null') {
        error_message += 'Please specify at least one contact.\n';
    }

    if (!error_message) {
        if (contact_ceo == 'other') {
            var other_1_fname = $('#other_1_fname').val().trim();
            var other_1_lname = $('#other_1_lname').val().trim();
            var other_1_email = $('#other_1_email').val().trim();
            var valid_email = validateEmail(other_1_email);
            if (other_1_fname.length == 0 || other_1_lname.length == 0 || !valid_email) {
                error_message += 'Please enter valid (Other) Top Level CEO / Owner contact information. \n';
            } else {
                other_data['other1'] = {other_1_fname: other_1_fname, other_1_lname: other_1_lname, other_1_email: other_1_email};
            }
        }
        if (contact_dig_mrkt == 'other') {
            var other_2_fname = $('#other_2_fname').val().trim();
            var other_2_lname = $('#other_2_lname').val().trim();
            var other_2_email = $('#other_2_email').val().trim();
            var valid_email = validateEmail(other_2_email);
            if (other_2_fname.length == 0 || other_2_lname.length == 0 || !valid_email) {
                error_message += 'Please enter valid (Other) Digital Consumer Marketing contact information. \n';
            } else {
                other_data['other2'] = {other_2_fname: other_2_fname, other_2_lname: other_2_lname, other_2_email: other_2_email};
            }
        }
        if (contact_int_mrkt == 'other') {
            var other_3_fname = $('#other_3_fname').val().trim();
            var other_3_lname = $('#other_3_lname').val().trim();
            var other_3_email = $('#other_3_email').val().trim();
            var valid_email = validateEmail(other_3_email);
            if (other_3_fname.length == 0 || other_3_lname.length == 0 || !valid_email) {
                error_message += 'Please enter valid (Other) Training / Implementation / Internal Marketing contact information. \n';
            } else {
                other_data['other3'] = {other_3_fname: other_3_fname, other_3_lname: other_3_lname, other_3_email: other_3_email};
            }
        }
        if (contact_tech == 'other') {
            var other_4_fname = $('#other_4_fname').val().trim();
            var other_4_lname = $('#other_4_lname').val().trim();
            var other_4_email = $('#other_4_email').val().trim();
            var valid_email = validateEmail(other_4_email);
            if (other_4_fname.length == 0 || other_4_lname.length == 0 || !valid_email) {
                error_message += 'Please enter valid (Other) Technical contact information. \n';
            } else {
                other_data['other4'] = {other_4_fname: other_4_fname, other_4_lname: other_4_lname, other_4_email: other_4_email};
            }
        }
        if (contact_vend_rel == 'other') {
            var other_5_fname = $('#other_5_fname').val().trim();
            var other_5_lname = $('#other_5_lname').val().trim();
            var other_5_email = $('#other_5_email').val().trim();
            var valid_email = validateEmail(other_5_email);
            if (other_5_fname.length == 0 || other_5_lname.length == 0 || !valid_email) {
                error_message += 'Please enter valid (Other) Vendor Relations / Billing / Account Management contact information. \n';
            } else {
                other_data['other5'] = {other_5_fname: other_5_fname, other_5_lname: other_5_lname, other_5_email: other_5_email};
            }
        }
    }
    if (!error_message) {
        $.ajax({
            url: "../includes/ris_contacts.php",
            data: {func_request: "create_contacts",
                save_mode: save_mode,
                ris_id: ris_id,
                contact_ceo: contact_ceo,
                contact_dig_mrkt: contact_dig_mrkt,
                contact_int_mrkt: contact_int_mrkt,
                contact_tech: contact_tech,
                contact_vend_rel: contact_vend_rel,
                other_data: other_data},
            type: 'POST',
            success: function () {
                alert('Save successful');
                goto_landing_page();
            }
        })
    } else {
        alert(error_message);
    }
}

function validateEmail(email) {
    var re = /\S+@\S+\.\S+/;
    return re.test(email);
}

function tempSubmit() {
    $('#before-submission').animate({opacity: 0}, 300);
    setTimeout(function () {
        $('#before-submission').css("display", "none");
        $('#after-submission').css("display", "block").animate({opacity: 1}, 300);
    }, 300);
}