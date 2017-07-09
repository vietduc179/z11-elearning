(function(window, $){
	
	$(function(){
		
		
		nr_links = $("a").length; //number of links in content
		max_nr_links = 2000; //if the number of links is higher than this, some processing is skipped, to avoid very high page loading time
		
		document_url = document.location.href;

		removeUnecessaryCSS();
		
		$(window).load(function(){
			fixFlashIE();
			resizeImages();
		});
		
		// these functions don't run on FAMILY pages
		if($("head").find('[href*="/welcome.css"]').length == 0){

			fixRunfooter();
			
			addMainContainers();
			
			addClassesForH();

			drawGlossary();

//			addHorizontalRules();
			
			//drawBreadcrumbsSteps();
			
			drawTables();
			
			drawCheckpointItems();
			
			drawCollapseSection();
			
			addClassesForOl();

		
		////Cosmin
			
			/* --- Function CALLS --- */
			
			/* general */
			processGeneralElements();

			drawWelcomePage();
			
			addV18ChevronIcons();
			
			addV18InfoIcons();
			
			addV18AnchorDownIcons();
			
			processBottomSectionsLinks();
			
			addAllLinkIcons();
			
			
			/* colored information boxes */
			createColoredBoxes();
						
			/* exclusions */	
			removeSupIcons();
			
			processImageIcons();
			
			removeV18IndLinkIconPadding();
			
			removeV18IndLinkIconUnnecessary();
			
			removeRedundantBullets();
						
			considerStartAttributeInOL();
			
			processDescriptionLists();
			removeDesignBeforeFirstTitle();
		}
		
	});

	function removeDesignBeforeFirstTitle(){
		var firsth = $("body").find(".ibm-h1").first();	
		firsth.prevAll().removeClass('ibm-grid margin-bottom-1 ibm-ind-link ibm-anchor-down-link ibm-forward-link ibm-external-link').find('*').removeClass('ibm-ind-link ibm-anchor-down-link ibm-forward-link ibm-external-link');
		firsth.parent().prevAll().removeClass('ibm-ind-link ibm-anchor-down-link ibm-forward-link ibm-external-link');
	}
	
	function removeRunfooter() {
		$('#runfooterdiv').hide();
		$('.runningfooter').css( "display", "none" ).nextAll().hide();
	}
	function fixRunfooter(){
		$('.ibm-share-youtube, .ibm-share-linkedin, .ibm-share-twitter').text('');
	}
	
	function addMainContainers(){
		if ($('body').find('main').length==0){
			$("body").wrapInner( "<main></main>");
		}
		$('main').wrap('<div id="ibm-top"><div id="ibm-content-wrapper"></div></div>');
		$("html, body").addClass("ibm-background-white-core"); //for colors match the design
		$('main').first().addClass('ibm-padding-top-1');
	}
	
	function addClassesForH(){
		$("body").find("h1, h2, h3, .title, .topictitle1, .topictitle").not(".pageTitle").first().addClass('ibm-h1');
		$('h2:not(.ibm-h1)').addClass('ibm-h4');
		$('h1:not(.ibm-h1)').addClass('ibm-h3');
	}
	
	function drawGlossary(){
		var gloss_elem = $('a[href*="#gloss_"]')[0],
		ul=$(gloss_elem).closest('ul');
		
		if (ul.hasClass('ullinks')){
			ul.children('li').addClass('AZ-index').find('br').css('display','none');
			ul.find('span').css('text-decoration','none');
			ul.parent('div').addClass('ibm-link-list-az');
		}else{
			$(gloss_elem).parent().append('<div class="ibm-link-list-az"><ul></ul></div>');
			$(gloss_elem).nextAll('a').wrap("<li class='AZ-index'></li>");
			$(gloss_elem).wrap("<li class='AZ-index'></li>");
			$('.AZ-index').appendTo('.ibm-link-list-az ul');
		}
		
		$('.AZ-index').each(function(){
			if ($(this).find('a').text().indexOf('Numerics')>-1 || $(this).find('a').text().indexOf('Special Characters')>-1){
				$(this).addClass('AZ-index-block');
			}
		});
		
		
		if ($('.ibm-link-list-az').parent('section').length==0){
			$('.ibm-link-list-az').after('<div class="ibm-rule"><hr/></div>').addClass('ibm-alternate ibm-gray-30');			
		}else{
			$('.ibm-link-list-az').parent().next().addClass('ibm-alternate ibm-gray-30');			
		}
		
		$('dl').addClass('ibm-padding-top-1');
		$('#glossary dt').addClass('ibm-col-4-1 ibm-bold ibm-padding-bottom-1')
		$('#glossary dd:not(dl dl dd)').addClass('ibm-col-4-3 ibm-padding-bottom-1');
		$('#glossary dd').next('dt').before('<div class="ibm-rule"><hr/></div>');
		$('#glossary').find('dl:not("dl dl")').after('<div class="ibm-rule"><hr/></div>');

	}
	
	function addHorizontalRules(){
		$('dd').next('dt').before('<div class="ibm-rule"><hr/></div>');
		$('section:not(.topic.reference.nested1 section)').after('<div class="ibm-rule"><hr/></div>');
		$('p.shortdesc, div.example').addClass('ibm-padding-bottom-1');
		$('p.shortdesc:not(".tutorialSummaryBody .shortdesc, .kc_welcome_header .shortdesc, .landing_header .shortdesc"), div.example, div.step, ol.steps, ul.steps-unordered, dl:not("dl dl")').after('<div class="ibm-rule"><hr/></div>');
	}
	
	function drawBreadcrumbsSteps(){
		$('ol.steps:not(:empty)').each(function( index ) {
			if ($(this).find('.ibm-anchor-down-link').length==0){
				var ol,breadcrumbs;
				ol=$(this);
				var nrsteps = ol.children('li').length;
				breadcrumbs='<div class="ibm-rule ibm-alternate"><hr/></div><ul id="ibm-navigation-trail" itemscope>';
				for (var i=0; i<nrsteps; i++){
					breadcrumbs+='<li itemprop="itemListElement"><a class="breadcrumbs-steps" itemprop="item" href="#step'+(i+1)+'""><span itemprop="name">Step '+(i+1)+'</span></a><meta itemprop="position" content="'+(i+1)+'"></li>'
					ol.children('li:eq('+i+')').attr('id','step'+(i+1));
				}
				breadcrumbs+='</ul><div class="ibm-rule"><hr/></div>';
				ol.before(breadcrumbs);
			}
		});
	}
	
	function drawTables(){
		$("table").not('[border="0"]').addClass('ibm-grid margin-bottom-1');
	}
	
	function drawCheckpointItems(){
		$('.tutorialSummary .topictitle2').addClass('ibm-textcolor-green-40');
		var titleShortdesc = $('.tutorialSummaryBody .shortdesc').text();
		var titleWithoutSpace = titleShortdesc.replace(/ /g,"");
		if (titleWithoutSpace.length>0) $('.tutorialSummaryBody .shortdesc').prepend('<a href="#" class="ibm-confirm-link ibm-inlinelink">&nbsp; &nbsp;</a>');
			else $('.tutorialSummaryBody .lessonsLearned p:nth-child(1)').addClass('ibm-bold').prepend('<a href="#" class="ibm-confirm-link ibm-inlinelink">&nbsp; &nbsp;</a>');
		$('ul.checkoff').addClass('ibm-plain-list');
	}
	
	function drawCollapseSection(){
		$('div[class^="collapsehead"]').each(function( index, element ) {
			var h2text = $(element).find('a.collapsehead').text();
			var content = $(element).parent().find('.collapsecontent, .termcollapsecontent').html();
			$(element).parent().html('<div data-widget="showhide" data-type="panel" class="ibm-show-hide"><h2>'+h2text+'</h2><div class="ibm-container-body">'+ content +'</div></div>');
		});
		$('[data-widget="showhide"]').showhide();
	}
	
	
	/* --- Function DEFINITIONS --- */
	
	// general elements are processed first
	function processGeneralElements(){
		$("body").addClass("ibm-type");
		$(".note.ic .notetitle").addClass("ibm-bold ibm-fontsize-body");
		$("h4, h5, h6").addClass("ibm-bold");
		$("h3:not(.ibm-band h3), h4:not(.ibm-band h4), h2:not(.ibm-band h2)").addClass("ibm-padding-top-1");
	
		$("div.p").addClass("ibm-padding-bottom-1");
		
		$("dd:not(.example dd, #glossary dd)").addClass("margin-left-2");
				
		$("code").parent('pre').addClass("ibm-textcolor-default ibm-background-neutral-white-40");
	
		$("section dt").addClass("ibm-bold");
		$(".varname, .var").addClass("ibm-item-note-alternate");
		
		$(".model div, .model p, .model span, .model h2, .model h3, .model a").addClass("ibm-small")
		$(".model .image-hint p").addClass("margin-top-1");
				
		$("blockquote").prev("p").css("padding-bottom", "0px");
		
		$("ul, ol").addClass("ibm-colored-list ibm-textcolor-gray-80");
		
		// space too small between characters in "V7" text - increase letter spacing
		$( "span.keyword:contains('V7')" ).css( "letter-spacing", "2px" );
		
		// add necessary v18 parent class for link classes already in the content
		$("a.ibm-video-link, a.ibm-download-link, a.ibm-pdf-link").parent().addClass("ibm-ind-link")
	}
	
	
	function drawWelcomePage(){
		$("div.landing_header, div.kc_welcome_header, header.kc_welcome_header, .gs-container .head").addClass("product-welcome-header").parent().addClass("product-welcome");
		$(".landing_box, .kc_welcome_box, .gs-container .box").addClass("product-welcome-box");
		$(".landing_box_inner, .kc_welcome_box_inner, .product-welcome-box .container").addClass("product-welcome-box-inner");
		$(".landing_box h3, .kc_welcome_box h3, .product-welcome-box>h2").not(":empty").addClass("product-welcome-box-h3");
		
		if($(".product-welcome-box").length != $(".product-welcome-box").first().parent().children().length)
			$(".product-welcome-box").wrapAll("<article class='article-cards'><aside></aside></article>");
		else
			$(".product-welcome-box").parent().addClass("article-cards");
		
		$(".article-cards").next(":visible").css("display", "block")
		
		$(".product-welcome-box>strong").addClass("product-welcome-box-h3").next("br").hide();
		$(".product-welcome-header").closest("main").removeClass("ibm-padding-top-1")
		$(".product-welcome-header p").next("br").hide();
		
		$('.article-cards').find('.linklist').each(function(){
			if ($(this).text() == ''){ $(this).hide(); };
			$(".ibm-item-note-alternate").removeClass("ibm-item-note-alternate")
		})
		
		// welcome page cards content should have padding, except card title (h3 element)
		$(".product-welcome-box").each(function(){
			$(this).contents().wrapAll("<div class='product-welcome-box-content'></div>");
			$(this).find(".product-welcome-box-h3").prependTo($(this).closest(".product-welcome-box"))
		})
	}
	
	
	// chevron images - replaced by v18 chevron icons
	function addV18ChevronIcons(){
		$("img[src*='delta.gif']").after("<span class='ibm-icon-nolink ibm-lastpage-link' style='margin-left: 1px'>&nbsp;</span>");
		$("img[src*='deltaend.gif']").before("<span style='margin-left: 5px;' class='ibm-icon-nolink ibm-firstpage-link'>&nbsp;</span>")
		
		$(".ibm-lastpage-link, .ibm-firstpage-link").each(function(){
			var title = $(this).prev().attr("alt");
			$(this).attr("title", title).attr("alt", title);
		});
	}
	
	// info links icons
	function addV18InfoIcons(){
		$("img[src*='newinfo.gif'],img[src*='newinfo.jpg']").hide().next('a').addClass('ibm-information-link').parent().addClass('ibm-ind-link');
	}
	
	// anchor-down-links - for ordered lists
	function addV18AnchorDownIcons(){
		$('ol:not(.steps) li:not(.AZ-index), ul:not(.steps, #tabs ul) li:not(.AZ-index)').each(function( index ) {
			var ol;
			thisol=$(this), htmlname=document.location.pathname.match(/[^\/]+$/)[0];
			if ($(this).find('a[href^="#"]').length>0 || $(this).find('a[href*="'+htmlname+'"]').length>0){
				$(this).find('a[href^="#"], a[href*="'+htmlname+'"]').addClass('ibm-anchor-down-link').parent().addClass('ibm-ind-link');
//				$(this).addClass('ibm-plain-list');
			}
		});
	}
	
	
	// function that creates the colored information boxes
	function createColoredBoxes(){
		
		// this contains objects with classes for all note types
		var notes = [
		             	{
		             		"noteClasses": ".notetitle, .tiptitle, .remembertitle",
		             		"noteTitleClasses": "ibm-textcolor-blue-50 background-blue",
			            	"noteContentClasses": ".note, .notebody, .tipbody, .rememberbody",
			            	"noteBorderColor": "ibm-border-blue-50"
						 },
						 {
							"noteClasses": ".importanttitle, .attentiontitle",
							"noteTitleClasses": "background-yellow",
							"noteContentClasses": ".note, .importantbody, .attentionbody",
							"noteBorderColor": "ibm-border-yellow-30"
						 },
						 {
							"noteClasses": ".dangertitle, .cautiontitle, .restrictiontitle, .alerttitle",
							"noteTitleClasses": "ibm-background-red-10",
							"noteContentClasses": ".note, .dangerbody, .cautionbody, .restrictionbody, .alertbody",
							"noteBorderColor": "ibm-border-red-core"
						}
				    ]
		
		$(notes).each(function(){
			var thisNote = this
			$(thisNote.noteClasses).each(function(){
				
				$(this).addClass("ibm-bold "+thisNote.noteTitleClasses+" ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1");
				
				var parent = $(this).parent();
				if(!$(parent).hasClass("note")){
					$(this).next(thisNote.noteContentClasses).andSelf().wrapAll('<div class="noteParent border-2 '+thisNote.noteBorderColor+' margin-top-1 margin-bottom-1" />');
					parent = $(this).parent();
				}
				else
					$(parent).addClass("border-2 "+thisNote.noteBorderColor+" margin-top-1 margin-bottom-1");
				
				var parent_ibm_ind_link = $(parent).hasClass("ibm-ind-link")?"ibm-ind-link padding-right-2":"";
				
				$(parent).wrapInner("<div class='"+parent_ibm_ind_link+" noteBody ibm-padding-top-1 ibm-padding-bottom-1 padding-left-1 padding-right-1 margin-0'></div>");
				$(this).prependTo(parent);
				
				prettifyNote(this);
			})
			
		})
		
	}
	
	// bottom sections links treated separately
	function processBottomSectionsLinks(){
		
		var bottom_sections_selector = $(".familylinks, .relconcepts, .reltasks, .relref, .rellinks, .relinfo");
		
		var bottom_sections_all = $(bottom_sections_selector).filter(function () { // only elements that have content
			return ($(this).text().trim() != "");
		});
	
		var btm_total_nr = bottom_sections_all.length;
		if (btm_total_nr == 3){
			bottom_sections_all.addClass("ibm-col-6-2").css("list-style", "none");
		}else{
			bottom_sections_all.addClass("ibm-col-"+btm_total_nr+"-1").css("list-style", "none");
		}
		$(bottom_sections_selector).parent().addClass("ibm-padding-top-1 ibm-padding-bottom-2").css("overflow", "auto").find(".ibm-col-1-1").css("width", "100%");;
		$(bottom_sections_selector).parent().find("h2").addClass("ibm-bold").css("padding-bottom", "0").removeClass("ibm-padding-top-1"); // added
		$("ul.familylinks, ul.relconcepts, ul.reltasks, ul.relref, ul.rellinks, ul.relinfo").find("li").css("padding-left", "0");
		$(bottom_sections_selector).addClass("margin-bottom-1").find("ul").css("margin-left", "0").find("li").css("padding-left", "0");
		$(bottom_sections_selector).find("a").css("display", "block");
		$(bottom_sections_selector).next().removeClass("ibm-h4");
		
		
		// process the bottom links that have chevron icons around them
		$(bottom_sections_selector).find("a").prev(".ibm-lastpage-link").next().each(function(){
			if($(this).prev().hasClass("ibm-lastpage-link") && $(this).next().hasClass("ibm-firstpage-link")){
				$(this).css("display", "inline").prev().andSelf().wrapAll("<span style='display:block'></span>");
				$(this).parent().parent().find(".ibm-firstpage-link").appendTo($(this).parent())
			}
		});
	}
	
	
	// function that adds specific link icons
	function addAllLinkIcons(){

		if(nr_links < max_nr_links){
		
		//	- element is considered inline if previous node (is inline AND has text) OR (is a <br> element)
		
		 // by default add internal link icon to all links - most of the links will be internal
		$("a:not(:empty):not(#tabs a, .banner-box a, .webfeed-link, .tutorialPrevNext a, .model a, .ibm-anchor-down-link, .ibm-video-link, .ibm-download-link, .breadcrumbs-steps, .AZ-index a, .ibm-information-link, ol a, .socialsites a)").addClass("ibm-forward-link").parent().addClass("ibm-ind-link");
		
		// now for each link check if internal link is ok or needs external link icon
		// - also - check if link is INLINE -> in which case icon needs to be moved after link OR removed
		$("a:not(:empty):not(#tabs a, .model a, .breadcrumbs-steps, .AZ-index a, .socialsites a, .ibm-video-link, .ibm-download-link)").each(function(){

			var original_link = this;
			var original_text = $(original_link).text();
			var considered_link = original_link;
			var parent = $(considered_link).parent();
			var first_child = parent.contents()[0];

			if(!($(original_link).text().trim() || $(original_link).find("img").length))
				$(original_link).hide();
			else
			if($(original_link).attr("href") != undefined){

				//add [PDF] span at the end of every link that redirects to a pdf file - and doesn't contain 'pdf' in link text
				var url = $(considered_link).attr("href").toLowerCase();
				if(url.substr(url.lastIndexOf('.') + 1).indexOf("pdf") != -1 && $(considered_link).text().toLowerCase().indexOf("pdf") == -1) // added2
					$(considered_link).append("<span class='ibm-textcolor-default ibm-regular'> [PDF] </span>")
				// if link is external, remove internal link icon and add external link one
				if(isExternalURL($(considered_link).attr("href"))){
					$(considered_link).attr('target', '_blank');
					$(considered_link).removeClass("ibm-forward-link").addClass("ibm-external-link").parent().addClass("ibm-ind-link");// external link => icon before link

				}


				var outerHTML_init = $("<a />").append($(considered_link).clone()).html().trim();	


				if(nr_links > 500 && $(parent).html().trim().indexOf(outerHTML_init)){ // inline

					// inline external link => icon after link
		    		if($(considered_link).hasClass("ibm-external-link"))
		    			$(considered_link).addClass("ibm-inlinelink ibm-icon-after");
		    		else
		    		// inline internal => remove icon
		    			$(considered_link).removeClass("ibm-forward-link ibm-anchor-down-link");
				}
				else

				// ignore certain elements that cannot be inline - for faster processing of pages with MANY links // added
				if(!((first_child.nodeType!=3 && $(parent).text().trim().indexOf(outerHTML_init)==0 && $(parent).is("li") && $(parent).css("display")=="list-item") // parent text starts with link text AND parent is a "li" element AND parent is a list item
				  || (first_child.nodeType!=3 && $(considered_link).closest("li") && $(considered_link).closest("li").text().trim().indexOf(original_text) == 0) && $(considered_link).closest("li").css("display")=="list-item")){ // closest "li" parent starts with the link AND is a list item
					// hide external link image used as icon (replaced by v18)
					if($(original_link).css("background-image").indexOf("sout.gif") != -1)
		    			$(original_link).css("background-image", "none");
					
					// treat the most distant parent that starts with the link, as the actual link, so that verifications are accurate
					var i = 0;
					var outerHTML = $("<a />").append($(considered_link).clone()).html();

					while ($(parent).html().trim().indexOf(outerHTML)==0 && $(considered_link).prev().text()=="") {

						considered_link = $(considered_link).parent();
						outerHTML = $("<a />").append($(considered_link).clone()).html();
						parent = $(considered_link).parent();
						i++;

						// Prevent infinite loop
						if(i == 20){
							//console.log("Error: link parent");
							break;
						}
					}


					// only consider the previous non-empty node
					var parentContents = $(parent).contents();

					var prevElem_index = $(parentContents).index(considered_link) - 1;
					var elem = $(parentContents)[prevElem_index];

					i = 0;
					while(prevElem_index>=0 && !$(elem).text().trim() && !$(elem).is("br")){

						prevElem_index--;
						elem = $(parentContents)[prevElem_index]; //previous node
						i++;

						// Prevent infinite loop
						if(i == 20){
							//console.log("Error: link previous node");
							break;
						}
					}
					
					// test the node which was saved above
					if(!$(considered_link).prev().is("br")
					   && $(considered_link).css("display")!="block"
					   && !$(elem).is("h1, h2, h3")
					   && $(elem).text().trim()
					   && (elem.nodeType == 3 || (elem.nodeType != 3 && $(elem).css("display").indexOf("inline") != -1))){

						// inline external link => icon after link
			    		if($(original_link).hasClass("ibm-external-link"))
			    			$(original_link).addClass("ibm-inlinelink ibm-icon-after");
			    		else
			    		// inline internal => remove icon
			    			$(original_link).removeClass("ibm-forward-link ibm-anchor-down-link");
					}
				}
			}
			else
				$(original_link).removeClass("ibm-forward-link");// no href => remove icon
		}); 
		//remove icons when external link is first in ol, keep only numbering (Task 146162):
		$("ol a.ibm-external-link:not(.ibm-icon-after)").removeClass('ibm-external-link');
		
		//remove icons (defect 147798: DB2z team would like the arrows omitted. 
		//Even though there is a line break between the box icon and the associated link, they would like this treated as if the box icon and link are one. )
		//https://www-03preprod.ibm.com/support/knowledgecenter/SSEPEK_11.0.0/adapter/src/tpc/adapter_installoverview.html
		$("img[src*='ibmcheckoff.gif']").closest('li').find('a.ibm-forward-link').removeClass('ibm-forward-link');
	}

	}
	
	// checks if a list is a description list(each element contains a link and a description below) and adds the specific v18 classes to it
	function processDescriptionLists(){
		if($("ul .ibm-ind-link").length < 500){ // only applies to pages with less than 500 links - to limit the performance impact
			$("ul").each(function(){
				var currentList = $(this);
				if($(currentList).children("li").length == $(currentList).children("li").children(".ibm-ind-link").length){
					$(currentList).addClass("ibm-link-list").find("li").addClass("ibm-link-description");
					$(currentList).find("li").each(function(){
						
						// if current <li> has other text than the link (description)
						if($(this).clone().find(".ibm-ind-link"||">*").remove().end().text().trim() != "")
							$(this).wrapInner("<p></p>").find(".ibm-lastpage-link, .ibm-ind-link, .ibm-firstpage-link, br:first").prependTo($(this).closest(".ibm-link-description"))
					})
				}
			})
		}
}
	
	//remove bullet for items that already have an image bullet
	function removeRedundantBullets(){
		
		if(nr_links < max_nr_links){
			
			$("li a").each(function(){
				if($(this).css("background").indexOf(".gif") > -1)
					$(this).parent().addClass("no-bullet");
			})
			
			//remove bullets from icons-lists:
			$("ul").each(function(){
				var ul=$(this), icons=0;
				ul.children('li').each(function(){
					if($(this).hasClass('ibm-ind-link') || $(this).children('.ibm-ind-link').length>0){icons++;}
				});
				if (ul.children('li:not(:empty)').length === icons){
					ul.addClass('ibm-plain-list');
				}else{
					ul.children('li').removeClass('ibm-ind-link').children('.ibm-forward-link, .ibm-external-link:not(.ibm-icon-after)').removeClass('ibm-forward-link ibm-external-link');
				}
			})
		
		}
		
		//remove numbers if square:
		$("img[src*='ibmcheckoff.gif']").closest('li').parent('ul,ol').addClass('ibm-plain-list');
	}
	
	// remove icons from <sup> elements
	function removeSupIcons(){
		$('sup a, code a').removeClass("ibm-forward-link ibm-external-link ibm-anchor-down-link").css("padding-left","0");
		$('a sup').parent().removeClass("ibm-forward-link ibm-external-link ibm-anchor-down-link").css("padding-left","0");	
	}
	
	// remove left padding for all links that are children of .ibm-ind-link class but don't have any icon
	function removeV18IndLinkIconPadding(){
		$(".ibm-ind-link a:not(.ibm-forward-link, .ibm-external-link, .ibm-anchor-down-link, .ibm-information-link, .ibm-video-link, .ibm-download-link)").css("padding-left", 0);
	}
	
	//remove ibm-ind-link if not necessary
	function removeV18IndLinkIconUnnecessary(){
		$('.ibm-ind-link').each(function(){
			if($(this).children(".ibm-forward-link,.ibm-external-link:not(.ibm-icon-after),.ibm-anchor-down-link, .ibm-information-link, .ibm-video-link, .ibm-download-link").length == 0)
				$(this).removeClass("ibm-ind-link");
		})
		
		//dd, dt elements don't need new link icon
		$("dd, dt").removeClass("ibm-icon-nolink");
		
		// for the missing ol numbers
		$("ol>li>.ibm-inlinelink").parent().removeClass("ibm-ind-link");
	}
	
	//remove unnecessary icon images that are replaced with v18
	function processImageIcons(){
		
		//document, pdf, chevron icons, external link icons
		$("img[src*='linkin.gif'], img[src*='pdf.gif'], img[src*='delta.gif'], img[src*='deltaend.gif'], img[src*='sout.gif']").hide();
		
		//remove link icons for every image link - also remove whole link if it contains specific images
		$("a img").parent().removeClass("ibm-forward-link ibm-external-link ibm-anchor-down-link");
		
		// hide images that were used for kc internal links (now replaced by v18 internal link icon)
		$("img[src*='KC.png']").hide();
	}
	
	
	/* Auxiliary functions */
	
	// improves the appearance of a colored information box
	function prettifyNote(notetitle){
			// remove ':' from note titles
			var title = $(notetitle).text().trim();
			if(title && title.indexOf(":") == title.length-1)
				$(notetitle).text(title.slice(0,-1));

			// add necessary v18 link class
			$(this).parent().find(".ibm-forward-link, .ibm-external-link:not(.ibm-icon-after), .ibm-anchor-down-link, .ibm-information-link, .ibm-video-link, .ibm-download-link").parent().addClass("ibm-ind-link");
	}
	
	// function for verifying if link is external
	function isExternalURL(url){
		return /^https?:\/\/.*/g.test(url);
	}
	
	function addClassesForOl(){
		$('ol[type="a"]').addClass('ibm-alpha-list');
		$('ol[type="i"]').addClass('ibm-roman-list');
		$('#tabs ul').addClass('ibm-plain-list'); //tabs that are created with jQueryUI - Defect 149669
	}
	
	function considerStartAttributeInOL(){
		// reset ordered lists number to specific 'start' attribute
		$("ol[start]").each(function(){			
			$(this).css("counter-reset", "item " + (+($(this).attr("start"))-1));
		});
	}
	
	// remove unnecessary custom CSS files
	function removeUnecessaryCSS() {
		$('link[rel="stylesheet"][href*="ibmdita.css"]').remove()
		$('link[rel="stylesheet"][href*="swg_info_common.css"]').remove()
		$('link[rel="stylesheet"][href*="wlp.css"]').remove();
		$('link[rel="stylesheet"][href*="wsrr.css"]').remove();
		$('link[rel="stylesheet"][href*="swg_info_dmanager.css"]').remove();
		$('link[rel="stylesheet"][href*="accessibility.css"]').remove();
		$('link[rel="stylesheet"][href*="commerce_help.css"]').remove();
		$('link[rel="stylesheet"][href*="bip4.css"]').remove();
		$('link[rel="stylesheet"][href*="prettify.css"]').remove();
		$('link[rel="stylesheet"][href*="pv_welcome.css"]').remove();
		$('link[rel="stylesheet"][href*="help.css"]').remove();
		$('link[rel="stylesheet"][href*="/ic.css"]').remove();
		$('link[rel="stylesheet"][href*="/infocenter.css"]').remove();
	}
	
	//fix for video that overflows breadcrumbs in IE
    function fixFlashIE() {
        $('object').each(function(){
        	var objectElement = $(this);
        	objectElement.find('embed').attr('wmode','transparent');
            if(objectElement.find('param[name=wmode]').attr('value') != 'transparent') {
            	objectElement.prepend('<param name="wmode" value="transparent" />');
            }
            var parentContent = objectElement.parent().html();
            objectElement.parent().html(parentContent);
        });
    }
	
	function resizeImages(){
		$('img').each(function(){
			var img = $(this);
			if (img.height() > 100 && img.width() > 100) img.addClass('ibm-downsize');
		});
	}

})(window, jQuery);