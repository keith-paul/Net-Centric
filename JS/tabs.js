/**
 * Created by Keith Paul on 2/23/2016.
 *
 * Most of this comes from http://www.elated.com/articles/javascript-tabs/
 * which relates to creating tabbed pages. It has been modified to fit my purposes
 */
var tabLinks = new Array();
var contentDivs = new Array();

function init() {

    // Grab the tab links and content divs from the page
    var tabListItems = document.getElementById('tabs').childNodes;
    for ( var i = 0; i < tabListItems.length; i++ ) {
        if ( tabListItems[i].nodeName == "LI" ) {
            var tabLink = getFirstChildWithTagName( tabListItems[i], 'A' );
            var id = getHash( tabLink.getAttribute('href') );
            tabLinks[id] = tabLink;
            contentDivs[id] = document.getElementById( id );
        }
    }

    showTab();
    $("#winO").hide();
    $("#winX").hide();
    $("#tie").hide();
    $("#ticTac").show();
}

function showTab() {
    var selectedId = location.href.split("/").slice(-1);
    //added because the selctedId would only be index.html, but it needs to be ../index.html to work properly
    //../index.html is what is stored in contentDivs
    if(selectedId == "index.html" || selectedId == "" ){
        selectedId = "../index.html";
    }
    // Highlight the selected tab, and dim all others.
    // Also show the selected content div, and hide all others.
    for ( var id in contentDivs ) {
        if ( id == selectedId ) {
            tabLinks[id].className = 'selected';
        } else {
            tabLinks[id].className = '';
        }
    }

    // Stop the browser following the link
    return false;
}

function getFirstChildWithTagName( element, tagName ) {
    for ( var i = 0; i < element.childNodes.length; i++ ) {
        if ( element.childNodes[i].nodeName == tagName ) return element.childNodes[i];
    }
}

function getHash( url ) {
    var hashPos = url.lastIndexOf ( '#' );
    return url.substring( hashPos + 1 );
}



