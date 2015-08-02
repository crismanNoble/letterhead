var globalEditor;

var whoData = {
	angela : {
		phone: '+1 630 677 8855',
		email: 'angela@kovalent.co'
	},
	cris : {
		phone: '+1 619 549 7322',
		email: 'cris@kovalent.co'
	},
	kovalent: {
		phone: '+1 619 719 1769',
		email: 'info@kovalent.co'
	}
}

$(document).ready(function(){
	console.log('yolo');

	listen();

	listenToControls();

});

function listenToControls(){
	$('.tool').click(function(){
		var what = $(this).data('action');
		console.log(what);
		if(what == 'toggle'){
			toggle();
		} else if (what == 'newGroup') {
			newGroup();
		}
	});
	$('.switch').click(function(){
		var what = $(this).data('action');
		$('.switch').removeClass('btn-red');
		$(this).addClass('btn-red');
		if(what == 'changeFrom') {
			var who = $(this).data('who');
			changeFrom(who);
		}
	});
}
function changeFrom(who){
	console.log('changing from');
	console.log(who);
	$('.fromWho').each(function(){
		var what = $(this).data('what');
		$(this).text(whoData[who][what]);
	});
}

function toggle(){
	console.log('toggle');
	$('.invoice').toggleClass('hidden');
}

function newSection(){
	console.log('new section');
}
var locked = false;
var editing = false;
function listen(){
	calcTotals();

	$('.editable').off('click');
	$('.editable').on('click',function(){

		editOn($(this));
	});

	$('.save').off('click');
	$('.save').on('click',function(e){
		locked = true;
		setTimeout(function(){locked = false;},50);
		e.preventDefault();
		e.stopPropagation();
		editOff($(this).parent());
	});


	$('.newRow').off('click');
	$('.newRow').on('click',function(e){
		locked = true;
		setTimeout(function(){locked = false;},50);
		e.preventDefault();
		e.stopPropagation();
		newRow($(this).parent());
	});

	$('.killRow').off('click');
	$('.killRow').on('click',function(e){
		locked = true;
		setTimeout(function(){locked = false;},50);
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().parent().parent().parent().remove();
		editing = false;
	});
	$('.killItem').off('click');
	$('.killItem').on('click',function(e){
		locked = true;
		setTimeout(function(){locked = false;},50);
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().parent().remove();
		editing = false;
	});

	$('.newSub').off('click');
	$('.newSub').on('click',function(e){
		locked = true;
		setTimeout(function(){locked = false;},50);
		e.preventDefault();
		e.stopPropagation();
		newSub($(this).parent().parent().parent());
	});

	$('.newGroup').off('click');
	$('.newGroup').on('click',function(e){
		locked = true;
		setTimeout(function(){locked = false;},50);
		e.preventDefault();
		e.stopPropagation();
		newGroup();
	});

	$('.killGroup').off('click');
	$('.killGroup').on('click',function(e){
		locked = true;
		setTimeout(function(){locked = false;},50);
		e.preventDefault();
		e.stopPropagation();
		$(this).parent().parent().parent().parent().remove();
		editing = false;
	});

	$('.colSwitch').on('click',function(e){
		locked = true;
		setTimeout(function(){locked = false;},50);
		console.log(e);
		e.preventDefault();
		e.stopPropagation();
		var cols = 'col-' + $(this).data('cols');
		var $group;
		//if($(this).parent().parent().hasClass('total')){
			$group = $(this).parent().parent().parent();
		// } else {
		// 	$group = $(this).parent().parent().parent();
		// }

		$group.removeClass('col-2');
		$group.removeClass('col-3');
		$group.removeClass('col-4');
		$group.addClass(cols);
	});


	// this is hard because if you click a button that is part of the editor
	//, things get wierd
	$('.editing').off('blur');
	$('.editing').on('blur',function(e){
		setTimeout(function(){
			console.log('blurred line');
			if(locked){
				console.log('nerp');
				locked = false;
			} else {
				console.log('can edit');
				editOff(globalEditor.find('.save').parent());
			}
		},40);

	});
}

function newGroup(){

	var $el = $('.groups');
	var $group = $el.find('.group:last-of-type').clone();

	$el.append($group);


	listen();
}
function newSub($el){
	$html = '<p class="editable subItem">sub item</p>';
	var current = $el.html();
	current += $html;
	$el.html(current);
	listen();
}
function newRow($el){
	var $parent = $el.parent().parent();
	console.log($parent);
	$row ='<div class="row"><div class="col editable date">12-12-2014</div><div class="col task"><span class="title editable subAdder">Fixing Product Image</span></div><div class="col subHours editable">12</div><div class="col editable subDollars">600</div></div>';
	$parent.append($row);
	listen();
}
function editOn($el) {
	console.log('edit on');
	globalEditor = $el;
	if(editing == false){
		editing = true;
		$old = $el.text().trim();

		console.log('old: ' + $old);

		var $input = '<input type="text" class="editing" value="'+$old+'"/><div class="inline-controls"><button class="save inline-btn">save</button>';
		if($el.hasClass('subAdder')){
			$input += '<button class="newSub inline-btn">newSub</button><button class="killRow inline-btn">kill row</button>';
		}
		if($el.hasClass('rowAdder')){
			$input += '<button class="newRow inline-btn">new row</button><button class="killGroup inline-btn">kill group</button>';
		}
		if($el.hasClass('subItem')){
			$input += '<button class="killItem inline-btn">kill item</button>';
		}

		if($el.hasClass('colSwitcher')){
			$input += '<span style="margin-left:5px;float:left">cols:</span><button class="colSwitch inline-btn" data-cols="2">2</button>';
			$input += '<button class="colSwitch inline-btn" data-cols="3">3</button>';
			$input += '<button class="colSwitch inline-btn" data-cols="4">4</button>';
		}
		$input += '</div>';

		$el.html($input);
		$el.find('.editing').focus();

		$el.addClass('p-editing');
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
	$parent.removeClass('p-editing');
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


