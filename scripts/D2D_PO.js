
getBaseUrlToLoad = function(whichEltOfUrl){
	var baseUrl;
	var re = new RegExp(whichEltOfUrl);
	var scripts = document.getElementsByTagName('script');
	for(i=0;i<scripts.length; i++){
		baseUrl = scripts[i].src;
		if(re.test(baseUrl)){
			var reg=new RegExp("(.*/).*script.*", "g");
			baseUrl = baseUrl.replace(reg, "$1");
		}
	}
	return baseUrl;
}

addEvent = function(obj, event, fct) {
    if (obj.attachEvent) //Est-ce IE ?
        obj.attachEvent("on" + event, fct); //Ne pas oublier le "on"
    else
        obj.addEventListener(event, fct, true);
}


getParamsFromUrl = function (){	
	var t = location.search.substring(1).split('&');	
	var f = [];
	for (var i=0; i<t.length; i++){
		var x = t[ i ].split('=');
		f[x[0]]=x[1];
	}
	return f;
}


getUrlWhithoutNumPo = function (){	
	var url = document.location.href;
	url = url.substring(0, url.length-document.location.search.length)+'?';
	arrayParams = getParamsFromUrl();
	console.log(arrayParams.length);
	for(i=0; i<arrayParams.length; i++){
		if(arrayParams[i][0] != 'num_po'){
			console.log(arrayParams[i][0]+'='+arrayParams[i][1]);
		}
		
	}
	return url;	
}

goToUrl = function(){
	var url = getUrlWithNumPo();
	setChatroom();
	document.location.href=url;
}

getUrlWithNumPo = function(){
	var url = getUrlWhithoutNumPo();
	url+= '&num_po='+getSearchNumPo();
	return url;
}

getSearchNumPo = function(){
	return document.getElementById('searchNumPo').value;
}

goToUrlWithNode = function(whichNode){
	goToUrlWithNumPo(whichNode.innerHTML);
}

goToUrlWithNumPo = function(whichNumPo){
	setSearchNumPo(whichNumPo);
	goToUrl();
}

setSearchNumPoFromUrlAndLaunchSetContainers = function(){	
	if (typeof(getParamsFromUrl()['num_po']) != 'undefined'){
		if(getParamsFromUrl()['num_po'].length > 0){
			var numPo = getParamsFromUrl()['num_po'];
			setSearchNumPoWithUrl();
			setContainers();
			setChatroom();
		}
	}
}

setChatroom = function(){
	var whichNumPo = $('#searchNumPo').val();
	var whichUserName = $('#userName').val();
//	var baseUrlToLoad = "http://test-d2d.fcsystem.com/esolutions/AttachPoToUserName.php?whichNumPo=4000213g01&whichUserName=pgWeb";
	var urlToLoad = "http://test-d2d.fcsystem.com/esolutions/AttachPoToUserName.php";
     
	 
	$.ajax({
		url : urlToLoad,
		type : 'GET', // Le type de la requête HTTP, ici devenu POST
		data : 'whichNumPo=' + whichNumPo + '&whichUserName=' + whichUserName, 
		dataType : 'html',		
		success: function(result){
            $("#div_D2D_PO").html(result);
        }}); 
/*
    $.ajax({
		url : urlToLoad,
		type : 'GET', // Le type de la requête HTTP, ici devenu POST
		data : 'whichNumPo=' + whichNumPo + '&whichUserName=' + whichUserName, 
		dataType : 'html',
/*
		success: function(result)//retour de requête
		{
			alert("Record successfully updated");
		}
*/
/*
    });   
*/

	console.log(whichNumPo+" "+userName);
}


setSearchNumPoWithUrl = function(){
	console.log(']') ;
	if (typeof(getParamsFromUrl()['num_po']) != 'undefined'){
		if(getParamsFromUrl()['num_po'].length > 0){
			var numPo = getParamsFromUrl()['num_po'];
			setSearchNumPo(numPo);		
		}
	}
}



setContainers = function () {	
    var whichNumPo = $('#searchNumPo').val();
    var whichUserName = $('#userName').val();
    setD2D_PO_EnteteSyntheseContainer(whichNumPo);
    setD2D_PO_TracaAmontContainer(whichNumPo);
    setD2D_PO_TracaAvalContainer(whichNumPo);
}


setSearchNumPo = function(whichNumPo){
	document.getElementById('searchNumPo').value = whichNumPo;
}


setD2D_PO_EnteteSyntheseContainer = function (whichNumPo) {
    var urlToLoad = baseUrlToLoad + '&sqlrfilepath=D2D_PO_EnteteSynthese.sql&num_po=' + whichNumPo;

    $.ajax({
        url: urlToLoad,
        dataType: 'json',
        success: 
			function (json) {
				$('#D2D_PO_EnteteSyntheseContainer').columns({
					data: json,
				});			

			}
    });
	
}

setD2D_PO_TracaAmontContainer = function (whichNumPo) {
    var urlToLoad = baseUrlToLoad + '&sqlrfilepath=D2D_PO_TracaAmont.sql&num_po=' + whichNumPo;
    $.ajax({
        url: urlToLoad,
        dataType: 'json',
        success: function (json) {
            $('#D2D_PO_TracaAmontContainer').columns({
                data: json,
				  plugins: ['gotopage']

            });
        }
    });
}

setD2D_PO_TracaAvalContainer = function (whichNumPo) {
    var urlToLoad = baseUrlToLoad + '&sqlrfilepath=D2D_PO_TracaAval.sql&num_po=' + whichNumPo;
    $.ajax({
        url: urlToLoad,
        dataType: 'json',
        success: function (json) {
            $('#D2D_PO_TracaAvalContainer').columns({
                data: json,
            });
        }
    });
}

var baseUrlToLoad = getBaseUrlToLoad('D2D_PO.js')+'WsGetJsonFromSql.php?apikey=595c015a-98c4-4097-9d89-c5b83ed28ff1&isonlyresult=TRUE';

addEvent(window , "load", setSearchNumPoFromUrlAndLaunchSetContainers);
