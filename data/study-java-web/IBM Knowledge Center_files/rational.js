/*******************************************************************************
 * Copyright (c) 2005, 2011 IBM Corporation.
 * All rights reserved. 
 *******************************************************************************/

/*******************************************************************************
 * Merged JS file containing Rational UA functions
 * collapse.js, popup.js, resizer.js, thumbnail.js, and tutorials.js
 * 20110804 JTA
 *******************************************************************************/

// BEGIN COLLAPSE.JS

/***************************************************** 
* Example of calling the collapse() function:
* 
* <div class="collapseheadlearnmore"><a href="javascript:void(0)" class="collapsehead" onclick="collapse(this)">Learn more about something</a></div><div class="collapsecontent">This section should be collapsed and hidden.</div>
* 
* The collapse effect works standalone, but can take advantage of styles for better appearance.
* For example, you could define styles for div.collapsehead, div.collapsecontent, and a.collapsehead
* for nice results.
*
* IMPORTANT: For this to work, there must be no spaces or linebreaks 
* between the collapsehead div and the collapsecontent div.
* 
* Also, in the runtime output, provide a <noscript>, like this:
* 
* <noscript>
* <style type="text/css"><!--
* div.collapsecontent{display:block;}
* //--></style>
* </noscript>
* 20100318: jta  Updated function to improve node traversal in case browser counts text nodes
*
*******************************************************/

function collapse(loc){
	
	//Navigate to the content division using DOM, then change its style
	var foc=loc.parentNode.parentNode;
	for (i=0;i<foc.childNodes.length;i++) {
		var foc2=foc.childNodes[i];
		if (foc2.attributes) {
			for (j=0;j<foc2.attributes.length;j++) {
				if (foc2.attributes[j].nodeName.toLowerCase() == 'class') {
			   		if (foc2.attributes[j].nodeValue == 'collapsecontent') {
			      			foc2.style.display=foc2.style.display=='block'?'none':'block';
						break;
			   		}
				}
		   	}
		}
	}
	
	//Find the header anchor by navigating the DOM tree, then change its class attribute to use a different style
	//var headA = loc.parentNode.firstChild;
	var headA = loc.parentNode;
	for (i=0;i<headA.childNodes.length;i++) {
		var headB=headA.childNodes[i];
		if (headB.attributes) {
			for (j=0;j<headB.attributes.length;j++) {
				if (headB.attributes[j].nodeName.toLowerCase() == 'class') {
			   		if ((headB.attributes[j].nodeValue == 'collapsehead') || (headB.attributes[j].nodeValue == 'collapseheadopen')) {
			      			headB.className=headB.className=='collapsehead'?'collapseheadopen':'collapsehead';
						break;
			   		}
				}
		   	}
		}
	}
}  

// END COLLAPSE.JS
/*****************************************************************************************/
// BEGIN POPUP.JS

/**********************
* Fixed window, no scrollbar, not resizable, placed at position 400,400 position on screen 
**********************/
function popup_window( url, id, width, height ) { 
	popup = window.open( url, id, 'toolbar=no,scrollbars=no,location=no,statusbar=no,menubar=no,resizable=no,width=' + width + ',height=' + height + ',left=400,top=400' ); 
	popup.focus(); 
}

/**********************
* Resizable pop-up window with scrollbars, placed at position 0,0 on screen 
**********************/
function popup_html( url, id, width, height ) { 
	popup = window.open( url, id, 'toolbar=no,scrollbars=yes,location=no,statusbar=no,menubar=no,resizable=yes,width=' + width + ',height=' + height + ',left=0,top=0' ); 
	popup.focus(); 
}

// END POPUP.JS
/*****************************************************************************************/
// BEGIN RESIZER.JS


function resizeAtPageLoad() {

  imgw = new Array();
  imgh = new Array();
  neww = new Array();
  newh = new Array();
  mapn = new Array();

  for (i=0;i<document.images.length;i++) {
      imgw[i]=document.images[i].width;
      imgh[i]=document.images[i].height;
      mapn[i]=document.images[i].useMap;
  }

  areacoords = new Array();
  areaelems = new Array();
  if (document.getElementsByTagName) {
     areaelems = document.getElementsByTagName("area");
  } else if (document.all) {
     areaelems = document.all.tags("area");
  }

  for (i=0;i<areaelems.length;i++) {
       areacoords[i]=areaelems[i].coords;
  }

  for (i=0;i<document.images.length;i++) {
      resize(i);
  }

  for (i=0;i<areaelems.length;i++) {
        rescale(i);
  }
}

function resizeAllImages() {
    for (i=0;i<document.images.length;i++) {
        resize(i);
    }

    for (i=0;i<areaelems.length;i++) {
        rescale(i);
    }
}

function resize(j) {
    var inTable = 0;
    var co=document.images[j];
    while (co.parentNode) {
        if (co.nodeName.toLowerCase() == 'table') {
            inTable=1;
        }
        co = co.parentNode;
    }

    if (inTable == 0) {
        
        var w = imgw[j];
        var h = imgh[j];
        
            if (document.images[j].offsetLeft != null) {
                var ix=0;
                var o=document.images[j];
                while (o != null) {
                    ix += o.offsetLeft;
                    o = o.offsetParent;
                } 
            } else if (document.images[j].x != null) {
                var ix=document.images[j].x;
            }

            if (window.innerWidth == null) {
                var iw = document.body.clientWidth;
                var ih = document.body.clientHeight; 
            } else {
                var iw = window.innerWidth;
                var ih = window.innerHeight;
            }
            
/** removed: tall images will no longer be resized to vertical space
*           if (((w+ix) > iw) || (h > ih)) {
*                if (ih/h >= iw/w) {
*                    var nw = iw-25-ix;
*                    var nh=h*(nw/w);
*                } else {
*                    var nh=ih-25;
*                    var nw=w*(nh/h);
*                }
** added replacement section below ********************************/

            if ((w+ix) > iw) {
                 var nw = iw-25-ix;
                 var nh=h*(nw/w);
            } else {
                var nw=w;
                var nh=h;
            }

            document.images[j].width=nw;
		    neww[j]=nw;
            document.images[j].height=nh;
		    newh[j]=nh;
    }
}

function rescale(j) {

  var currCoords = new Array();
  currCoords = areacoords[j].split(",");
  for (var l=0;l<currCoords.length;l++) {
    currCoords[l] = parseInt(currCoords[l]);
  }
  
  var thisMap = areaelems[j].parentNode.name;

  for (var m=0;m<document.images.length;m++) {
    if (document.images[m].useMap.substring(1) == thisMap) {
       for (var k=0;k<currCoords.length;k++) {
           currCoords[k] = (parseInt(currCoords[k]*(neww[m]/imgw[m]))).toString();
       }
	   areaelems[j].coords = currCoords.join(",");
    }
  }
}

// END RESIZER.JS
/*****************************************************************************************/
// BEGIN THUMBNAIL.JS


/**********************
* Create a thumbnail of an image by displaying the upper left corner 
* of the image. The thumbnail is 120px by 120px.
* When the thumbnail is clicked, display the full-sized image in a
* separate window.
**********************/
      function displayImage(image, altText) {
      document.write('<a href="#" onClick=openwin("'+image+'")>');
      document.write('<div style=" position: absolute; clip : rect(0px 120px 120px 0px); "><img border=0 src="'+image+'" alt="'+altText+'"></div>');
      document.write('</a>');
    }
    
   function openwin(image) {
    //get the actually size of the image and use that for window
      var ww, wh;
      img = new Image;
      img.src = image;
      wh = img.height;
      ww = img.width;    window.open(image,'imagewindow','width='+ww+',height='+wh+',dependent=yes,location=no,menubar=no,scrollbars=no,status=no,titlebar=no');
    }  

// END THUMBNAIL.JS
/*****************************************************************************************/
// BEGIN TUTORIALS.JS


/* 
Example of calling this function:
<div class="collapseheadlearnmore"><a href="javascript:void(0)" class="collapsehead" onclick="collapse(this)">Learn more about something</a></div><div class="collapsecontent">This section should be collapsed and hidden.</div>
The collapse effect also takes advantage of styles defined in tutorials.css
*/

/* Removed duplicate of collapse(loc) function 20110804 JTA */

/*
*
* These functions are used by Tours in the gallery
*
*
*/

/* Removed duplicate of popup_window function 20110804 JTA */

/* Removed duplicate of popup_html function 20110804 JTA */

