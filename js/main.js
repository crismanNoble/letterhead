//still todo:

//make a grid for the table:
//11 cols of 42px with 12px gutters= 582 of available 583

//make the ability to add tasks / groups / subtasks

//reorder groups?

$(document).ready(function(){
	console.log('yo');

	listen();

});
var editing = false;
function listen(){
	calcTotals();

	$('.editable').off('click');
	$('.editable').on('click',function(){

		editOn($(this));
	});
	$('.save').off('click');
	$('.save').on('click',function(){
		editOff($(this));
	});
	$('.editing').off('blur');
	$('.editing').on('blur',function(){
		editOff($(this).parent().find('.save'));
	});

}
function editOn($el) {
	console.log('edit on');
	if(editing == false){
		editing = true;
		$old = $el.text();

		console.log('old: ' + $old);

		var $input = '<input type="text" class="editing" value="'+$old+'"/><button class="save">save</button';
		$el.html($input);
		$('.editable').off('click');
		$el.removeClass('editable');
		listen();
	} else {
		console.log('nerp');
	}

}

function editOff($el){
	setTimeout(function(){console.log('waited'); editing = false},40)
	console.log('off');
	$parent = $el.parent();
	$newVal = $parent.find('.editing').val();
	$parent.html($newVal);
	$parent.addClass('editable');
	listen();
	console.log($newVal);
}

function calcTotals(){
	var hours = 0;
	var dollars = 0;

	$('.subHours').each(function(){
		hours += parseFloat($(this).text());
	});

	$('.total-hours').text(hours);
	$('.subDollars').each(function(){
		dollars += parseFloat($(this).text().replace(',',''));
	});
	$('.total-amount').text(formatDollars(dollars));

}

function formatDollars(amount){
	var out = '$' ;
	return out + commaSeparateNumber(amount);
}

function commaSeparateNumber(val){
    while (/(\d+)(\d{3})/.test(val.toString())){
      val = val.toString().replace(/(\d+)(\d{3})/, '$1'+','+'$2');
    }
    return val;
  }


