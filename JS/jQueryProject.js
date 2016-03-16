/**
 * Created by Keith Paul on 3/15/2016.
 */

"use strict";

var JQueryProject = function() {

    var num = 0;
    var boardArray = [];

    function clickerXO(imageId) {


        var idClicked = '#' + imageId.id;

        if (idClicked[1] == 'b') {
            //
            if (num == 0) {
                $(idClicked).fadeOut();
                idClicked = idClicked.replaceAt(1, 'o');
                num = 1;
                boardArray[idClicked[2]] = 'o';
                if(winCheckO() == true){
                    $('#tictacboard').hide();
                    $('#winO').fadeIn();
                }
                tieCheck();
            }
            else if (num == 1) {
                $(idClicked).fadeOut();
                num = 0;
                idClicked = idClicked.replaceAt(1, 'x');
                boardArray[idClicked[2]] = 'x';
                if(winCheckX() == true){
                    $('#tictacboard').hide();
                    $('#winX').fadeIn();
                }
                tieCheck();
            }
            $(idClicked).fadeIn();

        }


    }

    function winCheckX(){
        if(boardArray[1] == 'x' && boardArray[2] == 'x' && boardArray[3] == 'x'){
            return true;
        }
        else if(boardArray[4] == 'x' && boardArray[5] == 'x' && boardArray[6] == 'x'){
            return true;
        }
        else if(boardArray[7] == 'x' && boardArray[8] == 'x' && boardArray[9] == 'x'){
            return true;
        }
        else if(boardArray[1] == 'x' && boardArray[4] == 'x' && boardArray[7] == 'x'){
            return true;
        }
        if(boardArray[2] == 'x' && boardArray[5] == 'x' && boardArray[8] == 'x'){
            return true;
        }
        else if(boardArray[3] == 'x' && boardArray[6] == 'x' && boardArray[9] == 'x'){
            return true;
        }
        else if(boardArray[1] == 'x' && boardArray[5] == 'x' && boardArray[9] == 'x'){
            return true;
        }
        else if(boardArray[3] == 'x' && boardArray[5] == 'x' && boardArray[7] == 'x'){
            return true;
        }
        else
            return false;
    }

    function winCheckO(){

            if(boardArray[1] == 'o' && boardArray[2] == 'o' && boardArray[3] == 'o'){
                return true;
            }
            else if(boardArray[4] == 'o' && boardArray[5] == 'o' && boardArray[6] == 'o'){
                return true;
            }
            else if(boardArray[7] == 'o' && boardArray[8] == 'o' && boardArray[9] == 'o'){
                return true;
            }
            else if(boardArray[1] == 'o' && boardArray[4] == 'o' && boardArray[7] == 'o'){
                return true;
            }
            if(boardArray[2] == 'o' && boardArray[5] == 'o' && boardArray[8] == 'o'){
                return true;
            }
            else if(boardArray[3] == 'o' && boardArray[6] == 'o' && boardArray[9] == 'o'){
                return true;
            }
            else if(boardArray[1] == 'o' && boardArray[5] == 'o' && boardArray[9] == 'o'){
                return true;
            }
            else if(boardArray[3] == 'o' && boardArray[5] == 'o' && boardArray[7] == 'o'){
                return true;
            }
            else
                return false;
    }

    function tieCheck(){
        var count = 0;
        for(var i = 1; i <= 9;i++){
            if(boardArray[i] != null){
                count ++;
            }
        }
        if(count == 9){
            $('#tictacboard').hide();
            $('#tie').fadeIn();
        }
    }



//Javscirpt does not have a built in way to replace a character in a string
//Source: http://stackoverflow.com/questions/1431094/how-do-i-replace-a-character-at-a-particular-index-in-javascript
//Posted by Cem Kalyoncu
    String.prototype.replaceAt = function (index, character) {
        return this.substr(0, index) + character + this.substr(index + character.length);
    }
    return{
        'clickerXO'       :clickerXO,
    };
}();