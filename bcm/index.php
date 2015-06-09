<?php
    //$path_prepend = "http://marketing.realtor.com/tablet/";
	//$assets = "http://marketing.realtor.com/assets/"; 

    /** Global and Session Manager */
    //require_once ('constants.inc.php');

	//include  ('password_protect.php');


$userip = ($_SERVER['HTTP_CLIENT_IP']);
$ip1 = '209.74.96.130';
$ip2 = '208.77.56.74';
$ip3 = '65.127.200.94';
$ip4 = '204.50.74.170';
$ip5 = '67.52.99.194';

//if (($userip != $ip1) && ($userip != $ip2)) {
if (($userip != $ip1) && ($userip != $ip2) && ($userip != $ip3) && ($userip != $ip4) && ($userip != $ip5)) {
	include  ('password_protect.php');
} else{
	//header("Location:http://".$_SERVER['HTTP_HOST']."/inventory/");
}


?> 

<!doctype html>
<html lang="en">
    <head>
        <link href="css/master.css" rel="stylesheet" type="text/css"/>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta name="description" content="RIS Contact Management">
        <title>RIS Contact Management</title>
        <!-- Latest compiled and minified CSS -->
        <link rel="stylesheet" href="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/css/bootstrap.min.css">
        <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/themes/smoothness/jquery-ui.css">
        <link href="css/master.css" rel="stylesheet" type="text/css"/>
        <link rel="stylesheet" href="css/master.css">
        <!-- jQuery library -->
        <link href="css/master.css" rel="stylesheet" type="text/css"/>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/1.11.1/jquery.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.11.4/jquery-ui.min.js"></script>

        <!-- Latest compiled JavaScript -->
        <script src="http://maxcdn.bootstrapcdn.com/bootstrap/3.3.4/js/bootstrap.min.js"></script>
        <script type="text/javascript" src="js/utilities.js"></script>
    </head>
    <body>
        <header>
            <div >
                <div class="logo"> <a href="/" class="pure-menu-heading"><img src="img/rdc-logo-rb.png" alt=""></a> </div>
            </div>
        </header>
        <div class="clear"></div>
        <h2>Broker Contact Management</h2>

        <div id="create_contacts_list" class="show_content"> 
            <form id="create_contacts_initial" class="form-horizontal">
                <div class="form-group">
                    <label for="new_states" class="control-label col-xs-5 text-right">Select a State</label>
                    <select id="new_states" class="show_content"></select>
                </div>

                <div class="form-group">
                    <label for="sort_column" class="control-label col-xs-5 text-right">Sort By:</label>
                    <div class="col-xs-3">
                        <input type="radio" name="sort_column" value="sales_volume" checked >Sales Volume<br>
                        <input type="radio" name="sort_column" value="total_offices">Total Offices<br>
                        <input type="radio" name="sort_column" value="franchise_affiliation">Franchise Affiliation<br>
                        <input type="radio" name="sort_column" value="relo_referral_network">Relo Referral Network<br>
                        <input type="radio" name="sort_column" value="company_name">Company Name
                    </div>
                </div>

                <div class="form-group">
                    <label for="submit_criteria" class="control-label col-xs-5 text-right"></label>
                    <div class="col-xs-3">
                        <input type="submit" id="submit_criteria" name="submit_criteria" value="Select">&nbsp;
                        <input type="button" id="clear_data" name="clear_data" value="Clear">
                    </div>
                </div>
            </form>
            <table id="contact_rows" class="table table-bordered"></table>
        </div>
        <div id="create_contacts_form" class="hide_content">
            <div class="clear" id="website">
                <p>website: <a id="website_link" href="" target="_blank"></a></p>
            </div>
            <form id="create_contacts_detail" class="form-horizontal">               
                <input hidden type="text" id="ris_id" name="ris_id" class="update"> 
                <input hidden type="text" id="ris_mode" name="ris_mode" class="update"> 
                <div class="form-group col-xs-12">
                    <label for="company_name" class="control-label col-xs-3 text-right" >Company Name</label>
                    <div class="col-xs-3">
                        <input type="text" id="company_name" name="company_name" class="form-control" disabled>
                    </div>
                    <label for="corp_address" class="control-label col-xs-1 text-right">Address</label>
                    <div class="col-xs-3">
                        <input type="text" id="corp_address" name="corp_address" class="form-control" disabled>
                    </div>
                </div>

                <div class="form-group col-xs-12">                    
                    <label for="status" class="control-label col-xs-3 text-right">Status</label>
                    <div class="col-xs-3">
                        <input type="text" id="status" name="status" class="form-control" disabled>
                    </div>  
                    <label for="city" class="control-label col-xs-1 text-right">City</label>
                    <div class="col-xs-3">
                        <input type="text" id="city" name="city" class="form-control" disabled>
                    </div>
                </div>

                <div class="form-group col-xs-12"> 
                    <label for="total_offices" class="control-label col-xs-3 text-right">Total Offices</label>
                    <div class="col-xs-3">
                        <input type="number" id="total_offices" name="total_offices" class="form-control" disabled>
                    </div>
                    <label for="state" class="control-label col-xs-1 text-right">State</label>
                    <div class="col-xs-3">
                        <input type="text" id="st" name="st" class="form-control" disabled>
                    </div>
                </div>

                <div class="form-group col-xs-12">
                    <label for="franchise_affiliation" class="control-label col-xs-3 text-right">Franchise Affiliation</label>
                    <div class="col-xs-3">
                        <input type="text" id="franchise_affiliation" name="franchise_affiliation" class="form-control" disabled>
                    </div>
                    <label for="zip" class="control-label col-xs-1 text-right">Zip</label>
                    <div class="col-xs-3">
                        <input type="text" id="zip" name="zip" class="form-control" disabled>
                    </div>
                </div>

                <div class="form-group col-xs-12">
                    <label for="relo_referral_network" class="control-label col-xs-3 text-right">Relo Referral Network</label>
                    <div class="col-xs-3">
                        <input type="text" id="relo_referral_network" name="relo_referral_network" class="form-control" disabled>
                    </div>
                    <label for="phone" class="control-label col-xs-1 text-right">Phone</label>
                    <div class="col-xs-3">
                        <input type="tel" id="phone" name="phone" class="form-control" disabled>
                    </div>
                </div>

                <div class="form-group other1">
                    <label for="1" class="control-label col-xs-5 text-right" data-toggle="tooltip" data-placement="right" data-html="true" title="<ul>
                           <li>Message from Ryan O&lsquo;Hara about big news</li>
                           <li>High level business strategy communication</li>
                           <li>Broker Advisory content</li>
                           <li>News about relationship with NewsCorp</li>
                           </ul>">Top Level CEO / Owner</label>
                    <div class="col-xs-3">
                        <select id="1" class="contact_type" data-contact_type_code="CEO"></select>
                    </div>
                </div>
                <div class="form-group hide_content other_1_form col-xs-12 other1">
                    <label for="other_1_fname" class="control-label col-xs-2 text-right">Top Level CEO / Owner - Other First Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_1_fname" name="other_1_fname" class="form-control">
                    </div>

                    <label for="other_1_lname" class="control-label col-xs-1 text-right">Other Last Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_1_lname" name="other_1_lname" class="form-control">
                    </div>

                    <label for="other_1_email" class="control-label col-xs-1 text-right">Other Email</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_1_email" name="other_1_email" class="form-control">
                    </div>
                </div>              

                <div class="form-group">
                    <label for="2" class="control-label col-xs-5 text-right" data-toggle="tooltip" data-placement="right" data-html="true" title="<ul>
                           <li>Means to promote broker brand</li>
                           <li>Lead generation / optimization</li>
                           <li>Digital marketing success stories</li>
                           </ul>">Digital Consumer Marketing</label>
                    <div class="col-xs-3">
                        <select id="2" class="contact_type" data-contact_type_code="DIG_MRKT"></select>
                    </div>
                </div> 
                <div class="form-group hide_content other_2_form col-xs-12">
                    <label for="other_2_fname" class="control-label col-xs-2 text-right">Digital Consumer Marketing - Other First Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_2_fname" name="other_2_fname" class="form-control">
                    </div>

                    <label for="other_2_lname" class="control-label col-xs-1 text-right">Other Last Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_2_lname" name="other_2_lname" class="form-control">
                    </div>

                    <label for="other_2_email" class="control-label col-xs-1 text-right">Other Email</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_2_email" name="other_2_email" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label for="3" class="control-label col-xs-5 text-right" data-toggle="tooltip" data-placement="right" data-html="true" title="<ul>
                           <li>New tools for your agents</li>
                           <li>Upcoming webinars</li>
                           <li>Product updates &minus; new digital marketing solutions</li>
                           <li>Showcase optimization</li>
                           <li>Digital marketing success stories </li>
                           </ul>">Training / Implementation / Internal Marketing</label>
                    <div class="col-xs-3">
                        <select id="3" class="contact_type" data-contact_type_code="INT_MRKT"></select>
                    </div>
                </div>
                <div class="form-group hide_content other_3_form col-xs-12">
                    <label for="other_3_fname" class="control-label col-xs-2 text-right">Training / Implementation / Internal Marketing - Other First Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_3_fname" name="other_3_fname" class="form-control">
                    </div>

                    <label for="other_3_lname" class="control-label col-xs-1 text-right">Other Last Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_3_lname" name="other_3_lname" class="form-control">
                    </div>

                    <label for="other_3_email" class="control-label col-xs-1 text-right">Other Email</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_3_email" name="other_3_email" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label for="4" class="control-label col-xs-5 text-right" data-toggle="tooltip" data-placement="right" data-html="true" title="<ul>
                           <li>MLS and Data feeds</li>
                           <li>Product changes</li>
                           <li>Upcoming releases</li>
                           </ul>">Technical</label>
                    <div class="col-xs-3">
                        <select id="4" class="contact_type" data-contact_type_code="TECH"></select>
                    </div>
                </div> 
                <div class="form-group hide_content other_4_form col-xs-12">
                    <label for="other_4_fname" class="control-label col-xs-2 text-right">Technical - Other First Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_4_fname" name="other_4_fname" class="form-control">
                    </div>

                    <label for="other_4_lname" class="control-label col-xs-1 text-right">Other Last Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_4_lname" name="other_4_lname" class="form-control">
                    </div>

                    <label for="other_4_email" class="control-label col-xs-1 text-right">Other Email</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_4_email" name="other_4_email" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label for="5" class="control-label col-xs-5 text-right" data-toggle="tooltip" data-placement="right" data-html="true" title="<ul>
                           <li>Billing</li>
                           <li>Price changes</li>
                           <li>Renewal notices</li>
                           </ul>">Vendor Relations / Billing / Account Management</label>
                    <div class="col-xs-3">
                        <select id="5" class="contact_type" data-contact_type_code="VEND_REL"></select>
                    </div>
                </div> 
                <div class="form-group hide_content other_5_form col-xs-12">
                    <label for="other_5_fname" class="control-label col-xs-2 text-right">Vendor Relations / Billing / Account Management - Other First Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_5_fname" name="other_5_fname" class="form-control">
                    </div>

                    <label for="other_5_lname" class="control-label col-xs-1 text-right">Other Last Name</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_5_lname" name="other_5_lname" class="form-control">
                    </div>

                    <label for="other_5_email" class="control-label col-xs-1 text-right">Other Email</label>
                    <div class="col-xs-2">
                        <input type="text" id="other_5_email" name="other_5_email" class="form-control">
                    </div>
                </div>

                <div class="form-group">
                    <label for="submit_form" class="control-label col-xs-5 text-right"></label>
                    <div class="col-xs-3">
                        <input type="submit" id="submit_form" name="submit_form" value="Submit">&nbsp;
                        <input type="button" id="back" name="back" value="Back">
                    </div>
                </div>

            </form>
        </div>
    </body>
</html>


































