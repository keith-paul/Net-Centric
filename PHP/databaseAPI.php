<?php

require("../PHP/creds.php");

echo $_POST["method"]();

function sanitize($str, $quotes = ENT_NOQUOTES) {
    $str = htmlspecialchars($str, $quotes);
    return $str;
}

function getDatabases() {
    // retrieve and sanitize posted values.
    if (isset($_POST['server'])) {
        $server = json_decode(sanitize($_POST['server']));
    }
    if (isset($_POST['username'])) {
        $username = json_decode(sanitize($_POST['username']));
    }
    if (isset($_POST['password'])) {
        $password = json_decode(sanitize($_POST['password']));
    }
    $databaseNames = array();

    $dbConn = mysqli_connect($server, $username, $password);
    $query = "SHOW DATABASES";
    $result = $dbConn->query($query);

    if ($result) {
        while ($row = $result->fetch_array()) {
            array_push($databaseNames, $row[0]);
        }
    }

    $return = new stdClass();
    $return->credentials = $server + "  " + $username + "   " + $password;
    $return->succsss = true;
    $return->errorMessage = "";
    $return->data['database_names'] = $databaseNames;
    $json = json_encode($return);
    return $json;
}

function insertNewSite() {
    // retrieve and sanitize posted values.

    if (isset($_POST['RelatedBattle'])) {
        $RelatedBattle = json_decode(sanitize($_POST['RelatedBattle']));
    }

    if (isset($_POST['SiteName'])) {
        $SiteName = json_decode(sanitize($_POST['SiteName']));
    }

    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "INSERT INTO CivilWarSites ( SiteID ,RelatedBattle, SiteName ) " .
        "VALUE ( " .
        "" . "NULL". ", " .
        "" . $RelatedBattle . ", " .
        "'" . $SiteName ."'". ");";
    $result = $dbConn->query($query);
    $return = new stdClass();
    $return->querystring = $query;
    if ($result) {
        //$return->connection = $dbConn;
        // $return->credentials = (string) (demoUsername() . demoPassword() . demoDB() . " on " . demoServer());
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}

function insertNewBattle() {
    // retrieve and sanitize posted values.

    if (isset($_POST['BattleName'])) {
        $BattleName = json_decode(sanitize($_POST['BattleName']));
    }

    if (isset($_POST['EndDate'])) {
        $EndDate = json_decode(sanitize($_POST['EndDate']));
    }
    if (isset($_POST['StartDate'])) {
        $StartDate = json_decode(sanitize($_POST['StartDate']));
    }

    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "INSERT INTO CivilWarBattles ( ID ,BattleName, EndDate, StartDate  ) " .
        "VALUE ( " .
        "" . "NULL". ", " .
        "'" . $BattleName . "', " .
        "'" . $EndDate . "', " .
        "'" . $StartDate ."'". ");";
    $result = $dbConn->query($query);
    $return = new stdClass();
    $return->querystring = $query;
    if ($result) {
        //$return->connection = $dbConn;
        // $return->credentials = (string) (demoUsername() . demoPassword() . demoDB() . " on " . demoServer());
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}

function updateGarden() {
    // retrieve and sanitize posted values.

    if (isset($_POST['ID'])) {
        $ID = json_decode(sanitize($_POST['ID']));
    }
    if (isset($_POST['newParentID'])) {
        $newParentID = json_decode(sanitize($_POST['newParentID']));
    }

    if (isset($_POST['newName'])) {
        $newName = json_decode(sanitize($_POST['newName']));
    }

    if (isset($_POST['newWidth'])) {
        $newWidth = json_decode(sanitize($_POST['newWidth']));
    }

    if (isset($_POST['newLength'])) {
        $newLength = json_decode(sanitize($_POST['newLength']));
    }

    if (isset($_POST['newXPos'])) {
        $newXPos = json_decode(sanitize($_POST['newXPos']));
    }

    if (isset($_POST['newYPos'])) {
        $newYPos = json_decode(sanitize($_POST['newYPos']));
    }

    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());
    if ($dbConn->connect_error) {
        die("Connection failed: " . $dbConn->connect_error);
    }
    $query = "UPDATE RectGarden " +
        "SET ParentID='" + $newParentID + "'" +
        "SET Name='" + $newName + "'" +
        "SET Width='" + $newWidth + "'" +
        "SET Length='" + $newLength + "'" +
        "SET XPos='" + $newXPos + "'" +
        "SET YPos='" + $newYPos + "'" +
        "WHERE ID=" + $ID;
    $result = $dbConn->query($query);
    $return = new stdClass();
    $return->querystring = $query;
    if ($result) {
        $return->success = true;
    } else {
        $return->success = false;
    }
    return json_encode($return);
}

/**
 * function getGardens()
 *
 * preconditions: a file of the form given in DemoCreds.php that contains
 *                the credentials that will be used to access the database.
 *                This is not secure -- just for demo purposes.
 *
 * arguments: none
 *
 * action: retrieves all of the rows from table RectGardens and returns
 *         them in toto in the gardens property of the returned object.
 *
 * return An object that has the following fields:
 *     connect_error: error returned from mysqli_connect but only if an error
 *                    occured.  null otherwise
 *     success: a boolean indicating if the call was successful (true) or not
 *     gardens: an array of rows as arrays of columns
 *     querystring: the query string that was executed
 *     credentials: is this a bad idea or what?
 *
 * postconditions
 */

function getBattles() {
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());

    $query = "SELECT * FROM CivilWarBattles";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }

    $battles = array();

    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 7; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($battles, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->battles = $battles;
    $return->querystring = $query;
    return json_encode($return);
}

function getBattlesAndSites(){
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());

    $query = "Select BattleName,EndDate,StartDate, SiteName
              From CivilWarSites join CivilWarBattles
              WHERE RelatedBattle = CivilWarBattles.ID";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }

    $battlesAndSites = array();

    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 4; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($battlesAndSites, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->battlesAndSites = $battlesAndSites;
    $return->querystring = $query;
    return json_encode($return);
}

function getSites(){
    $dbConn = mysqli_connect(demoServer(), demoUsername(), demoPassword(), demoDB());

    $query = "SELECT * FROM CivilWarSites";
    $result = $dbConn->query($query);
    if ($dbConn->connect_error) {
        $return->connect_error = "Connection failed: " . $dbConn->connect_error;
        $return->success = false;
        return json_encode($return);
    }

    $sites = array();

    if ($result) {
        while ($row = $result->fetch_array()) {
            $allColumns = array();
            for ($i = 0; $i < 3; $i++) {
                array_push($allColumns, $row[$i]);
            }
            array_push($sites, $allColumns);
        }
    }
    $return = new stdClass();
    $return->success = true;
    $return->sites = $sites;
    $return->querystring = $query;
    return json_encode($return);
}
