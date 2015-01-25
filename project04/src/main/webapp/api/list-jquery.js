var saveList = null;

$(function() {
	/* 최초 검색 결과 */
	daumShoppingSearch.init();
	daumShoppingSearch.search();

	$('#min_price').click(function(event) {
		daumShopping.sort = 'min_price';
		daumShoppingSearch.search();
	});

	$('#max_price').click(function(event) {
		daumShopping.sort = 'max_price';
		daumShoppingSearch.search();
	});

	$('#pop').click(function(event) {
		daumShopping.sort = 'pop';
		daumShoppingSearch.search();
	});	

	$('#searchPrice').click(function(event) {
		alert('가격검색결과');
	});

	$('#good').click(function(event) {
		alert('좋아요');
	});

	$('#bad').click(function(event) {
		alert('나빠요');
	});
});

$('#select-choice').on('change', function() {
    //alert($("#select-choice").val());
	daumShopping.sort = $("#select-choice").val();
	daumShoppingSearch.search();

});

$(document).on("click", "#minPrice", function() {
	daumShopping.sort = 'min_price';
	daumShoppingSearch.search();
});

$(document).on("click", ".heart", function() {
	console.log('하트클릭' + $('.heart').index(this));
	var index = $('.heart').index(this);
	var style = {
		'opacity' : '1',
		'filter' : 'none',
		'-webkit-filter' : 'grayscale(0%)'
	};
	$('.heart:eq(' + index + ')').css(style);

	console.log("하트 선택 : " + saveList[index].title);
});

$(document).on("click", "#addMoreBtn", function() {
	daumShopping.pgno += 1;

	daumShopping.pingSearch(daumShopping.pgno);
});

var daumShoppingSearch = {
	/** 초기화. * */
	init : function() {
		console.log('daumShoppingSearch 초기화');

		this.apikey = "e38e5c77dea80a89e0e857cf0ee268dd4879734c";

		this.q = getURLParameter('searchKey');
		console.log("검색 키워드 : " + this.q);

		// 검색 객체들 초기화.
		daumShopping.init(6);
	},
	/** 검색 * */
	search : function() {
		console.log('daumShoppingSearch search()');

		this.query = '?apikey=' + this.apikey + '&output=json&q='
				+ encodeURI(this.q);

		console.log(this.query);

		// 검색어에 맞게 각각 첫페이지를 띄움.
		daumShopping.pingSearch(1);
	},
	/** callback 함수 호출. * */
	pingSearch : function(api, pgno, callback, result, sort) {
		$.ajax({
			url : api + this.query + encodeURI(this.q) + '&pageno=' + pgno
					+ '&result=' + result + '&sort=' + sort,
			type : "GET",
			dataType : "jsonp",
			crossDomain : true,
			contentType : "text/json;charset=UTF-8",
			success : function(responseData, textStatus, errorThrown) {
				if (saveList == null) {
					saveList = responseData.channel.item;
					resultNav(responseData);
				} else {
					$.merge(saveList, responseData.channel.item);
				}

				var transfromData = yyyyMMdd(responseData);
				transfromData = priceFormat(transfromData);

				daumShoppingSearch.pongSearch(transfromData);
			},
			error : function(responseData, textStatus, errorThrown) {
				alert('POST failed.');
			}
		});

	},
	/** 결과를 뿌려줌. * */
	pongSearch : function(data) {
		if (daumShopping.pgno == 1) {
		require([ 'text!templates/api-top.html' ], function(html) {
			var template = Handlebars.compile(html);			
			$('#listDiv').html(template(data));
		});
		}
		
		require([ 'text!templates/api-table.html' ], function(html) {
			var template = Handlebars.compile(html);
			if (daumShopping.pgno == 1) {
				$('#listDiv').html(template(data));
			} else {
				$("#listDiv").append(template(data));
			}
			$('#board').page('destroy').page();
		});
	}
};

/** 쇼핑 검색. * */
var daumShopping = {
	/** 초기화. * */
	init : function(r) {
		console.log('daumShopping 초기화');

		daumShopping.api = 'http://apis.daum.net/shopping/search';
		daumShopping.pgno = 1;
		daumShopping.result = r;
		daumShopping.sort = 'min_price';
	},
	/** callback 함수 호출. * */
	pingSearch : function(pgno) {
		daumShopping.pgno = pgno;

		var callback = 'daumShopping.pongSearch';

		daumShoppingSearch.pingSearch(daumShopping.api, daumShopping.pgno,
				callback, daumShopping.result, daumShopping.sort);
	}
};

function yyyyMMdd(data) {
	var str;
	var date;

	for ( var i in data.channel.item) {
		date = data.channel.item[i].publish_date;
		str = date.substr(0, 4) + "-" + date.substr(4, 2) + "-"
				+ date.substr(6, 2);
		data.channel.item[i].publish_date = str;
	}

	return data;
}

function priceFormat(data) {
	var price;
	for ( var i in data.channel.item) {
		price = data.channel.item[i].price_min;				 
		data.channel.item[i].price_min =
			price.split(/(?=(?:\d{3})+(?:\.|$))/g).join(',');
	}
	
	return data
}

/* url parse */
function getURLParameter(name) {
	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
			, null ])[1]);
}

function resultNav(data) {
	$(totalResult).html(data.channel.totalCount);
}