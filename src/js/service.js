/*jQuery(function () {
	
	jQuery('#gvGridView20014 thead td').bind("click",function (event) {
		
		debugger;
		//var date1 = (new Date()).getTime();
		var dataType = jQuery(this).attr('dataType');
		
		var index = jQuery('#gvGridView20014').find('td').index(this) + 1;
		var arr = [];
		var row = jQuery('#gvGridView20014').find('tbody tr');
		jQuery.each(row, function (i) {
			arr[i] = row[i];
		})
		if (jQuery(this).hasClass('gv_sort')) {
			arr.reverse();
		} else {
			arr.sort(sortStr(index, dataType));
			jQuery('#gvGridView20014 td').find('.gv_sort').removeClass();
			jQuery('#gvGridView20014').find('td:nth-child(' + index + ')').addClass('gv_sort');
			jQuery(this).addClass('gv_sort');
		}
		var fragment = document.createDocumentFragment();
			jQuery.each(arr, function (i) {
				fragment.appendChild(arr[i]);
			})
			// $('tbody').remove();
			//$('table').append('<tbody></tbody>')
			//Each(arr,function(o){fragment.appendChild(o)})
			jQuery('#tbody20014').append(fragment);
			//var date2 = (new Date()).getTime()
			//jQuery('gvGridView20014 thead span').text(date2 - date1)
			event.stopPropagation();
			event.preventDefault(); 
	})
})*/

function gvSort(obj,vGridId,vDataType){

	//var dataType = jQuery(this).attr('dataType');
	
	var index = jQuery('#gvGridView'+vGridId).find('td').index(this) + 1;
	var arr = [];
	var row = jQuery('#gvGridView'+vGridId).find('tbody tr');
	jQuery.each(row, function (i) {
		arr[i] = row[i];
	});
	if (jQuery(this).hasClass('gv_sort')) {
		arr.reverse();
	} else {
		arr.sort(sortStr(index, vDataType));
		jQuery('#gvGridView'+vGridId+' td').find('.gv_sort').removeClass();
		jQuery('#gvGridView'+vGridId).find('td:nth-child(' + index + ')').addClass('gv_sort');
		jQuery(this).addClass('gv_sort');
	}
	var fragment = document.createDocumentFragment();
		jQuery.each(arr, function (i) {
			fragment.appendChild(arr[i]);
		});
		// $('tbody').remove();
		//$('table').append('<tbody></tbody>')
		//Each(arr,function(o){fragment.appendChild(o)})
		jQuery('#tbody'+vGridId).append(fragment);
		//var date2 = (new Date()).getTime()
		//jQuery('gvGridView20014 thead span').text(date2 - date1)
		event.stopPropagation();
		event.preventDefault(); 
	
}


function sortStr(index, dataType) {
	return function (a, b) {
		var aText = jQuery(a).find('td:nth-child(' + index + ')').text();
		var bText = jQuery(b).find('td:nth-child(' + index + ')').text();

		if (dataType !== 'roomType') {
			
			aText = new Parse(aText, dataType);
				bText =new Parse(bText, dataType);
				return aText > bText ? -1 : bText > aText ? 1 : 0;
		} else{
			return aText.localeCompare(bText);
		}		
	};
}
function Parse(data, dataType) {
	switch (dataType) {
	case 'num':
		return parseFloat(data) || 0 ;
	case 'date':
		return Date.parse(data) || 0 ;
	default:
		return splitStr(data) ;
	}
}
function splitStr(data) {
	var re = /^[\$a-zA-z\u4e00-\u9fa5 ]*(.*?)[a-zA-z\u4e00-\u9fa5 ]*$/ ;
		data = data.replace(re, '$1') ;
		return parseFloat(data) ;
}