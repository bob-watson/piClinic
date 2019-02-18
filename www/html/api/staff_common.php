<?php
/*
 *	Copyright (c) 2019, Robert B. Watson
 *
 *	This file is part of the piClinic Console.
 *
 *  piClinic Console is free software: you can redistribute it and/or modify
 *  it under the terms of the GNU General Public License as published by
 *  the Free Software Foundation, either version 3 of the License, or
 *  (at your option) any later version.
 *
 *  piClinic Console is distributed in the hope that it will be useful,
 *  but WITHOUT ANY WARRANTY; without even the implied warranty of
 *  MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 *  GNU General Public License for more details.
 *
 *  You should have received a copy of the GNU General Public License
 *  along with piClinic Console software at https://github.com/docsbydesign/piClinic/blob/master/LICENSE.
 *	If not, see <http://www.gnu.org/licenses/>.
 *
 */
/*******************
 *
 *	utility functions used by staff resource
 *
 *********************/
require_once 'api_common.php';
exitIfCalledFromBrowser(__FILE__);

// Deifine the elements in the LogFieldInfo
define ("STAFF_REQ_ARG", 0, false);        // request param name is index 0
define ("STAFF_DB_ARG", 1, false);         // db field name is index 1
define ("STAFF_DB_REQ_GET", 2, false);     // whether the field must appear in a GET request
define ("STAFF_DB_QS_GET",3, false);       // variable can be used to filter GFET query
define ("STAFF_DB_REQ_POST", 4, false);    // whether the field must appear in a POST request
define ("STAFF_DB_REQ_PATCH", 5, false);    // whether the field must appear in a POST request
define ("STAFF_DB_CLEANFIRST", 6, false);  // whether to clean the string before using

/*
 * Returns an array that defines the query parameters and DB field names used by the log
 */
function getStaffFieldInfo() {
    $returnValue = [
        // STAFF_REQ_ARG,   STAFF_DB_ARG,               STAFF_DB_REQ_GET,
        //                                                      STAFF_DB_QS_GET,
        //                                                              STAFF_DB_REQ_POST,
        //                                                                      STAFF_DB_REQ_PATCH,
        //                                                                               STAFF_DB_CLEANFIRST
        ["staffID",        "staffID",                   false,  true,   false,  true,    false],
        ["memberID",       "memberID",                  false,  true,   true,   false,   true],
        ["username",       "username",                  false,  true,   true,   true,    true],
        ["password",       "password",                  false,  true,   false,  false,   false],
        ["lastName",       "lastName",                  false,  true,   true,   false,   true],
        ["firstName",      "firstName",                 false,  true,   true,   false,   true],
        ["position",       "position",                  false,  true,   false,  false,   true],
        ["contactInfo",    "contactInfo",               false,  true,   false,  false,   true],
        ["altContactInfo", "altContactInfo",            false,  true,   false,  false,   true],
        ["active",         "active",                    false,  true,   false,  false,   false],
        ["preferredLanguage",       "preferredLanguage",                  false,  true,   false,  false,   true],
        ["preferredClinicPublicID", "preferredClinicPublicID",    false,  true,   false,  false,   false],
        ["lastLogin",      "lastLogin",                 false,  true,   false,  false,   false],
        ["accessGranted",  "accessGranted",             false,  true,   false,  false,   false]
    ];
    return $returnValue;
}

/*
 *
 */
function makeStaffQueryStringFromRequestParameters ($requestParameters, $dbView = 'DB_TABLE_STAFF') {
	 // create query string for get operation
	$queryString = "SELECT * FROM `".
		$dbView. "` WHERE ";
	$paramCount = 0;
	$activeField = false;

    $staffDbFields = getStaffFieldInfo();
    foreach ($staffDbFields as $reqField) {
        if ($reqField[STAFF_DB_QS_GET]) {
            if (!empty($requestParameters[$reqField[STAFF_REQ_ARG]])) {
                $queryString .= "`". $reqField[STAFF_DB_ARG] ."` LIKE '".$requestParameters[$reqField[STAFF_REQ_ARG]]."' AND ";
                $paramCount += 1;
                // special case for Active because 0 is a valid value that appears empty
                if ($requestParameters[$reqField[STAFF_REQ_ARG]] == 'Active') {$activeField = true;}
            }
        }
    }
	if (!$activeField && isset($requestParameters['Active'])) {
	    // Active was in the query string but didn't get picked up in the previous loop
		$queryString .= "`Active` = '".$requestParameters['Active']."' AND ";
		$paramCount += 1;
	}

    // if no paremeters, then select all from the first 100 staff
    $queryString .= "TRUE ORDER BY `username` ASC";
    $queryString .= ' '.DB_QUERY_LIMIT.';';
	return $queryString;
 }
 /*
 *
 *	Trims whitespace from string fields
 *
 */
 function cleanStaffStringFields ($staffIn) {
 	$staffOut = $staffIn;
 	// remove the token if present\
     if (!empty($staffOut['token'])) {
        unset($staffOut['token']);
     }
	// clean strings of extra white space
	//  string fields are listed here
	$stringFields = getStaffFieldInfo();
	foreach ($stringFields as $field) {
		if (($field[STAFF_DB_CLEANFIRST]) && (!empty($staffIn[$field[STAFF_REQ_ARG]]))) {
            $staffOut[$field[STAFF_REQ_ARG]] = trim($staffIn[$field[STAFF_REQ_ARG]]);
        }
	}
	return ($staffOut);	
 }
// EOF