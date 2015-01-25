/* 추가 : 입력한 searchKey에 따라 검색 */  
  var keyWord = getURLParameter('searchKey');
  console.log(keyWord);  // 키값

  
    var daumShoppingSearch = {
        /** 초기화. **/
        init : function(){
            this.apikey = "DAUM_SHOP_DEMO_APIKEY";
            //this.q = document.getElementById('daumShoppingSearch');
            /* 추가 : 입력한 searchKey 에 따라 검색 */
            this.q = keyWord;
            //console.log(this.q);
            
            //검색 객체들 초기화.
            daumShopping.init(6);
        },
        /** 검색 **/
        search : function(){
            /* this.query = '?apikey=' + this.apikey + '&output=json&q=' 
                + encodeURI(this.q.value); */
            this.query = '?apikey=' + this.apikey + '&output=json&q=' 
            + encodeURI(this.q);    
            console.log(this.query);

            //검색어에 맞게 각각 첫페이지를 띄움.
            daumShopping.pingSearch(1);
        },
        /** callback 함수 호출. **/
        pingSearch : function(ds, api, pgno, callback, result, sort){
            ds.innerHTML = "";
            
            var s = document.createElement('script');
            s.type = 'text/javascript';
            s.charset = 'utf-8';
            s.src = api + this.query + '&pageno=' + pgno + '&callback=' 
                + callback + '&result='+result + '&sort='+sort; 
            
            ds.appendChild(s);
        },
        /** 결과를 뿌려줌. **/
        pongSearch : function(search, z){
            var ul = document.createElement('ul');
            
            for(var i=0; i<z.channel.item.length; i++){
                //title 정보를 얻음.
                var title = document.createElement('h4');
                var a = document.createElement('a');
                a.href = z.channel.item[i].link;
                a.target = '_blank';
               /* 상자 밖으로 title 출력 
               a.innerHTML = this.escapeHtml(z.channel.item[i].title) 
                    + '<br'+'/>'; */

                title.appendChild(a);
                
                //세부 내용을 얻음.
                var content = search.getContent(z.channel.item[i]);
                
                //리스트 화면.
                ul.appendChild(search.getSearch(title,content));
            }
            return ul;
        },
        /** PageNumber를 그려줌. **/
        pongPgno : function(pgno,max,func){
            var maxpg = (pgno+6<max)?pgno+6:max;
            
            var div = document.createElement('div');
            div.align = 'center';
            div.style.clear = 'left'; 
            
            //좌측 화살표.
            var left = document.createElement('a');
            left.innerHTML = "<< ";
            if(pgno-5>1)
                this.onMouseDown(left,pgno-6,func);
            else{
                left.style.color = "gray";
                left.style.cursor = "default";
            }
            div.appendChild(left);
            
            //페이지 번호.
            for(var i=(pgno-5>1)?pgno-5:1; i<maxpg; i++){
                var a = document.createElement('a');
                a.innerHTML = " " + i + " ";

                if(i==pgno){
                    a.style.color = 'yellow';
                    a.style.cursor = "default";
                }
                else
                    this.onMouseDown(a,i,func);
                
                div.appendChild(a);
            }
            
            //우측 화살표.
            var right = document.createElement('a');
            right.innerHTML = ">> ";
            if(pgno+6<max)
                this.onMouseDown(right,pgno+7,func);
            else{
                right.style.color = "gray";
                right.style.cursor = "default";
            }
            div.appendChild(right);
            
            return div;
        },
        
        /* 더보기 : 다음페이지로 */
        nextPage : function (pgno,max,func) {
            var div = document.createElement('div');
            div.align = 'center';
            
            //if (pageno+1 < max) {
              div.innerHTML = '더보기';                            
              this.onMouseDown(div,pgno+1,func);
            //}  

            return div;
        },
        
        /** 마우스 이벤트. **/
        onMouseDown: function(a, i, func){
            a.style.cursor = 'pointer';
            a.onmousedown = function(){
                func(i);
            }
        },
        /** HTML태그 안 먹게 하는 함수 **/
        escapeHtml: function (str) {
            str = str.replace(/&amp;/g, "&");
            str = str.replace(/&lt;/g, "<");
            str = str.replace(/&gt;/g, ">");
            return str;
        }
    };
    
    window.onload = function () {
      /* 최초 검색 결과  */
        daumShoppingSearch.init();
        daumShoppingSearch.search();
        var minPrice = document.getElementById('min_price');
        minPrice.style.color = 'red';

        
     /* 낮은 가격순 */ 
       var minPrice = document.getElementById('min_price');
       minPrice.onclick = function() {
         //alert('낮은가격순');
         daumShopping.sort='min_price';
         daumShoppingSearch.search();     
         toggleFont('min_price');  
       };
       
       /* 높은 가격순 */ 
       var maxPrice = document.getElementById('max_price');
       maxPrice.onclick = function() {
         //alert('높은가격순');
         daumShopping.sort='max_price';
         daumShoppingSearch.search();
         toggleFont('max_price');  

       };
       
       /* 인기순 */
       var popularity = document.getElementById('pop');
       popularity.onclick = function() {
         //alert('인기순');
         daumShopping.sort='pop';
         daumShoppingSearch.search();    
         toggleFont('pop');        

       };           
       
       /* 가격 검색 결과 */ 
         var searchPrice = document.getElementById('searchPrice');
         searchPrice.style.backgroundColor='#A0A0A0';
         searchPrice.onclick = function() {
           alert('가격 검색 결과');
         
         };
         
       /* 좋아요 */ 
       var good = document.getElementById('good');
       good.onclick = function() {
         alert('좋아요');
       
       };
       
       /* 나빠요 */ 
       var minPrice = document.getElementById('bad');
       bad.onclick = function() {
         alert('나빠요');        
       };
    };
    
    /* 카테고리 토글 선택 (색 변경) */
    function toggleFont(obj) {    
      var minPrice = document.getElementById('min_price');
      var maxPrice = document.getElementById('max_price');        
      var popularity = document.getElementById('pop');
      var el = document.getElementById(obj);

      minPrice.style.color = 'black';
      maxPrice.style.color = 'black';
      popularity.style.color = 'black'; 

      el.style.color = 'red';
    }
    
    /** 쇼핑 검색. **/
    var daumShopping = {
        /** 초기화. **/
        init : function(r){
            daumShopping.api = 'http://apis.daum.net/shopping/search';
            daumShopping.pgno = 1;
            daumShopping.result = r;
            /*  */
            daumShopping.sort = 'min_price';
        },
        /** callback 함수 호출. **/
        pingSearch : function(pgno){
            daumShopping.pgno = pgno;
            
            var ds = document.getElementById('daumShoppingScript');
            var callback = 'daumShopping.pongSearch';
            
            daumShoppingSearch.pingSearch(ds,daumShopping.api, 
                daumShopping.pgno, callback, daumShopping.result, daumShopping.sort);  
        },
        /** 결과를 뿌려줌. **/
        pongSearch : function(z){
            var dv = document.getElementById('daumShopping');
            dv.innerHTML ="";
            
            /* 전체 검색 결과 개수 */
            var p = document.createElement('p');
            p.innerHTML = '전제검색결과 : ' + z.channel.totalCount + '<br'+'/>'; 
            //p.style.fontSize='20px';
            //p.style.fontStyle='italic';

            dv.appendChild(p);
            
            
            dv.appendChild(daumShoppingSearch.pongSearch(this, z));
            /* dv.appendChild(daumShoppingSearch.pongPgno(daumShopping.pgno, 
              z.channel.totalCount/daumShopping.result,daumShopping.pingSearch)); */
            dv.appendChild(daumShoppingSearch.nextPage(daumShopping.pgno, 
                    z.channel.totalCount/daumShopping.result,daumShopping.pingSearch));              
              
        },
        /** li setting **/
        getSearch : function(title,content){
            var li = document.createElement('li');
            
            li.style.height = '150px';
            li.appendChild(title);
            li.appendChild(content);
            
            return li;
        },
        /** 설명 return **/
       getContent : function(z){
           var div = document.createElement('div');
           var a = document.createElement('a');
           var div02 = document.createElement('div');
           var ba0 = document.createElement('a');
           var ba1 = document.createElement('a');
           var ba2 = document.createElement('a');
           var ba3 = document.createElement('a');
           var ba4 = document.createElement('a');
           var ba5 = document.createElement('a');
           var img = document.createElement('img');
           var aimg = document.createElement('a');
           var zzim = document.createElement('img'); // 보관함, 찜하기
           var azzim = document.createElement('a');
           
           img.width = 100;
           img.height = 100;
           img.src = z.image_url;
           img.style.paddingRight = '20px';
                      
           aimg.target = '_blank';
           aimg.href = z.link;
           aimg.style.float = 'left';
           
           aimg.appendChild(img);
           
           a.style.clear = 'left';
           
         /* 상세내용 출력
           a.innerHTML = daumShoppingSearch.escapeHtml(z.price_group) 
                + daumShoppingSearch.escapeHtml(z.description) + '<br'+'/>';
            */
           /* 추가 */
           ba0.innerHTML = z.title+ '<br'+'/>';     
           //ba0.style.font='italic bold 20px blue';
           //ba0.style.fontStyle='italic';
           ba0.style.fontSize='15px';
           ba0.style.fontWeight='bold';


           /* ---최저가--- */
           ba1.innerHTML = z.price_min + '원<br'+'/>';
           ba1.style.fontSize='30px';
           ba1.style.color='#00CCFF';
           ba1.style.fontFamily='Hanna';


       /*     ba2.innerHTML = 'Maker : ' 
                + daumShoppingSearch.escapeHtml(z.maker) + '<br'+'/>'; */
           ba3.innerHTML = '카테고리 : ' 
                + daumShoppingSearch.escapeHtml(z.category_name) + '<br'+'/>';
           ba3.style.color='#808080';
           ba3.style.fontSize='12px';
           

           ba4.innerHTML = '등록일  ' 
                + daumShoppingSearch.escapeHtml(z.publish_date) + '<br'+'/>';
           ba4.style.color='#383838';
           ba4.style.fontSize='12px';
                     
           //ba5.innerHTML = '상품평 : ' + z.review_count + '<br'+'/>';

           /******************* 보관함 하트모양 *****************************/
           zzim.width = 64;
           zzim.height = 64;
           zzim.src = '../image/heart-64.png';
           zzim.style.float = 'right';
           zzim.style.position = 'relative';
           zzim.style.bottom = '-85px';


           //img.style.paddingRight = '20px';
                      
           //azzim.target = '_blank';
           //azzim.href = z.link;
           //azzim.style.float = 'left';
           //azzim.appendChild(zzim);           

           zzim.onclick = function () {
             zzim.className='colorHeart';
             alert('하트클릭');
           }
           
           /* 추가 */
           div02.appendChild(ba0);
           /* ------ */

           div02.appendChild(ba1);
           div02.appendChild(ba2);
           div02.appendChild(ba3);
           div02.appendChild(ba4);
           div02.appendChild(ba5);
           div.appendChild(zzim);
           
           div.appendChild(aimg);
           div.appendChild(div02);
           div.appendChild(a);
                      
           return div;
       }
    };
    
    /* url parse */
    function getURLParameter(name) {
    	return decodeURI((RegExp(name + '=' + '(.+?)(&|$)').exec(location.search) || [
    			, null ])[1]);
    }