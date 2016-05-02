
function onLoad()
{
    getBattles();
    getBattlesAndSites();
    getSites();
}

function ajaxInsertNewSite(method, RelatedBattle, SiteName)
{
    return $.ajax({
        url: '../PHP/databaseAPI.php',
        type: 'POST',
        data: {method: method,
            RelatedBattle: RelatedBattle,
            SiteName: SiteName
        }
    });
}

function insertNewSite()
{
    var RelatedBattle, SiteName;
    RelatedBattle = JSON.stringify($('#RelatedBattle option:selected').val());
    SiteName = JSON.stringify($('#SiteName').val());
    ajax = ajaxInsertNewSite("insertNewSite", RelatedBattle, SiteName);
    ajax.done(insertNewSiteCallback);
    ajax.fail(function () {
        alert("Failure");
    });
    getBattles();
    getBattlesAndSites();
    getSites();
}

function insertNewSiteCallback(response_in)
{
    response = JSON.parse(response_in);
    if (!response['success'])
    {
        $("#results").html("");
        //alert("Insert failed on query:" + '\n' + response['querystring']);
    } else
    {
        $("#results").html(response['credentials'] + '<br>' +
            response['querystring'] + '<br>' +
            response['success'] + '<br>');

    }
}

function ajaxInsertNewBattle(method, BattleName, StartDate, EndDate)
{
    return $.ajax({
        url: '../PHP/databaseAPI.php',
        type: 'POST',
        data: {method: method,
            BattleName: BattleName,
            StartDate: StartDate,
            EndDate: EndDate
        }
    });
}

function insertNewBattle()
{
    var BattleName, StartDate, EndDate;
    BattleName = JSON.stringify($('#BattleName').val());
    StartDate = JSON.stringify($('#StartDate').val());
    EndDate = JSON.stringify($('#EndDate').val());
    ajax = ajaxInsertNewBattle("insertNewBattle", BattleName, StartDate, EndDate);
    ajax.done(insertNewBattleCallback);
    ajax.fail(function () {
        alert("Failure");
    });
    getBattles();
    getBattlesAndSites();
    getSites();
}

function insertNewBattleCallback(response_in)
{
    response = JSON.parse(response_in);
    if (!response['success'])
    {
        $("#results").html("");
        //alert("Insert failed on query:" + '\n' + response['querystring']);
    } else
    {
        $("#results").html(response['credentials'] + '<br>' +
            response['querystring'] + '<br>' +
            response['success'] + '<br>');

    }
}

function getBattles()
{
    //alert ("in getBattles()");
    ajax = ajaxgetBattles("getBattles");
    ajax.done(getBattlesCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxgetBattles(method)
{

    return $.ajax({
        url: '../PHP/databaseAPI.php',
        type: 'POST',
        data: {method: method}
    });
}

function getBattlesCallback(responseIn)
{
    //alert("in getBattlesCallback" + responseIn);
    response = JSON.parse(responseIn);
    $battles = response["battles"];
    if (!response['success'])
    {
        $("#results").html("getBattles failed");
    } else
    {
        $('#RelatedBattle').find('option').remove();
        showTable($battles, "battlesRow","tableOfBattles",4);
        $.each($battles,
            function (key, battles)
                /*
                 * - key is the zero based position in the array
                 * - value is the entire row in the table
                 * - we want the value returned from selecting to be the
                 *   garden id -- position 0 in the row
                 * - we want the value that is displayed in the select
                 *   control to be the name of the garden -- zero based
                 *   position 2 in the row  Therefore:
                 */
            {
                $("#RelatedBattle")
                    .append($('<option>',
                        {
                            value: battles[0].toString(),
                            text: battles[1].toString()
                        }));

            }
        )
        ;
    }
}

function getBattlesAndSites()
{
    ajax = ajaxgetBattlesAndSites("getBattlesAndSites");
    ajax.done(getBattlesAndSitesCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxgetBattlesAndSites(method)
{

    return $.ajax({
        url: '../PHP/databaseAPI.php',
        type: 'POST',
        data: {method: method}
    });
}

function getBattlesAndSitesCallback(responseIn) {
    //alert("in getBattlesCallback" + responseIn);
    response = JSON.parse(responseIn);
    $battlesAndSites = response["battlesAndSites"];
    if (!response['success']) {
        $("#results").html("getBattles failed");
    }
    else {
        showTable($battlesAndSites, "battlesAndSitesRow","tableOfSitesAndBattles",4);
    }
}
function getSites()
{
    //alert ("in getSites()");
    ajax = ajaxgetSites("getSites");
    ajax.done(getSitesCallback);
    ajax.fail(function () {
        alert("Failure");
    });
}

function ajaxgetSites(method)
{

    return $.ajax({
        url: '../PHP/databaseAPI.php',
        type: 'POST',
        data: {method: method}
    });
}

function getSitesCallback(responseIn) {
    //alert("in getBattlesCallback" + responseIn);
    response = JSON.parse(responseIn);
    $sites = response["sites"];
    if (!response['success']) {
        $("#results").html("getBattles failed");
    }
    else {
        showTable($sites, "sitesRow","tableOfSites",3);
    }
}

function showTable(queryResult, newID, parentTable,columns){
    $('#' + parentTable ).empty();
    var newLength = queryResult.length;
    for (i = 0; i < newLength; i++) {
        $("#" + parentTable).append($('<tr>', {
            id: (newID + i).toString()
        }));
    }
    for (i = 0; i < newLength; i++) {
        for (j = 0; j < columns; j++) {
            $("#"+newID + i).append($('<td>', {
                value: queryResult[i][j],
                text: queryResult[i][j]
            }));
        }
    }
}

