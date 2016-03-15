//cookie
jQuery.cookie=function(name,value,options){if(typeof value!='undefined'){options=options||{};if(value===null){value='';options=$.extend({},options);options.expires=-1}var expires='';if(options.expires&&(typeof options.expires=='number'||options.expires.toUTCString)){var date;if(typeof options.expires=='number'){date=new Date();date.setTime(date.getTime()+(options.expires*24*60*60*1000))}else{date=options.expires}expires='; expires='+date.toUTCString()}var path=options.path?'; path='+(options.path):'';var domain=options.domain?'; domain='+(options.domain):'';var secure=options.secure?'; secure':'';document.cookie=[name,'=',encodeURIComponent(value),expires,path,domain,secure].join('')}else{var cookieValue=null;if(document.cookie&&document.cookie!=''){var cookies=document.cookie.split(';');for(var i=0;i<cookies.length;i++){var cookie=jQuery.trim(cookies[i]);if(cookie.substring(0,name.length+1)==(name+'=')){cookieValue=decodeURIComponent(cookie.substring(name.length+1));break}}}return cookieValue}};
//cycle
(function(g){var h="2.32";var c=g.browser.msie&&/MSIE 6.0/.test(navigator.userAgent);function d(){if(window.console&&window.console.log){window.console.log("[cycle] "+Array.prototype.join.call(arguments,""))}}g.fn.cycle=function(j){if(this.length==0){d("terminating; zero elements found by selector"+(g.isReady?"":" (DOM not ready)"));return this}var k=arguments[1];return this.each(function(){if(j===undefined||j===null){j={}}if(j.constructor==String){switch(j){case"stop":if(this.cycleTimeout){clearTimeout(this.cycleTimeout)}this.cycleTimeout=0;g(this).data("cycle.opts","");return;case"pause":this.cyclePause=1;return;case"resume":this.cyclePause=0;if(k===true){j=g(this).data("cycle.opts");if(!j){d("options not found, can not resume");return}if(this.cycleTimeout){clearTimeout(this.cycleTimeout);this.cycleTimeout=0}b(j.elements,j,1,1)}return;default:j={fx:j}}}else{if(j.constructor==Number){var s=j;j=g(this).data("cycle.opts");if(!j){d("options not found, can not advance slide");return}if(s<0||s>=j.elements.length){d("invalid slide index: "+s);return}j.nextSlide=s;if(this.cycleTimeout){clearTimeout(this.cycleTimeout);this.cycleTimeout=0}b(j.elements,j,1,s>=j.currSlide);return}}if(this.cycleTimeout){clearTimeout(this.cycleTimeout)}this.cycleTimeout=0;this.cyclePause=0;var y=g(this);var t=j.slideExpr?g(j.slideExpr,this):y.children();var o=t.get();if(o.length<2){d("terminating; too few slides: "+o.length);return}var l=g.extend({},g.fn.cycle.defaults,j||{},g.metadata?y.metadata():g.meta?y.data():{});if(l.autostop){l.countdown=l.autostopCount||o.length}y.data("cycle.opts",l);l.container=this;l.elements=o;l.before=l.before?[l.before]:[];l.after=l.after?[l.after]:[];l.after.unshift(function(){l.busy=0});if(l.continuous){l.after.push(function(){b(o,l,0,!l.rev)})}if(c&&l.cleartype&&!l.cleartypeNoBg){e(t)}var A=this.className;l.width=parseInt((A.match(/w:(\d+)/)||[])[1])||l.width;l.height=parseInt((A.match(/h:(\d+)/)||[])[1])||l.height;l.timeout=parseInt((A.match(/t:(\d+)/)||[])[1])||l.timeout;if(y.css("position")=="static"){y.css("position","relative")}if(l.width){y.width(l.width)}if(l.height&&l.height!="auto"){y.height(l.height)}if(l.startingSlide){l.startingSlide=parseInt(l.startingSlide)}if(l.random){l.randomMap=[];for(var p=0;p<o.length;p++){l.randomMap.push(p)}l.randomMap.sort(function(B,w){return Math.random()-0.5});l.randomIndex=0;l.startingSlide=l.randomMap[0]}else{if(l.startingSlide>=o.length){l.startingSlide=0}}var r=l.startingSlide||0;t.css({position:"absolute",top:0,left:0}).hide().each(function(w){var B=r?w>=r?o.length-(w-r):r-w:o.length-w;g(this).css("z-index",B)});g(o[r]).css("opacity",1).show();if(g.browser.msie){o[r].style.removeAttribute("filter")}if(l.fit&&l.width){t.width(l.width)}if(l.fit&&l.height&&l.height!="auto"){t.height(l.height)}if(l.containerResize){var u=0,n=0;for(var p=0;p<o.length;p++){var m=g(o[p]),x=m.outerWidth(),q=m.outerHeight();u=x>u?x:u;n=q>n?q:n}y.css({width:u+"px",height:n+"px"})}if(l.pause){y.hover(function(){this.cyclePause++},function(){this.cyclePause--})}var z=g.fn.cycle.transitions[l.fx];if(g.isFunction(z)){z(y,t,l)}else{if(l.fx!="custom"){d("unknown transition: "+l.fx)}}t.each(function(){var w=g(this);this.cycleH=(l.fit&&l.height)?l.height:w.height();this.cycleW=(l.fit&&l.width)?l.width:w.width()});l.cssBefore=l.cssBefore||{};l.animIn=l.animIn||{};l.animOut=l.animOut||{};t.not(":eq("+r+")").css(l.cssBefore);if(l.cssFirst){g(t[r]).css(l.cssFirst)}if(l.timeout){l.timeout=parseInt(l.timeout);if(l.speed.constructor==String){l.speed=g.fx.speeds[l.speed]||parseInt(l.speed)}if(!l.sync){l.speed=l.speed/2}while((l.timeout-l.speed)<250){l.timeout+=l.speed}}if(l.easing){l.easeIn=l.easeOut=l.easing}if(!l.speedIn){l.speedIn=l.speed}if(!l.speedOut){l.speedOut=l.speed}l.slideCount=o.length;l.currSlide=r;if(l.random){l.nextSlide=l.currSlide;if(++l.randomIndex==o.length){l.randomIndex=0}l.nextSlide=l.randomMap[l.randomIndex]}else{l.nextSlide=l.startingSlide>=(o.length-1)?0:l.startingSlide+1}var v=t[r];if(l.before.length){l.before[0].apply(v,[v,v,l,true])}if(l.after.length>1){l.after[1].apply(v,[v,v,l,true])}if(l.click&&!l.next){l.next=l.click}if(l.next){g(l.next).bind("click",function(){return i(o,l,l.rev?-1:1)})}if(l.prev){g(l.prev).bind("click",function(){return i(o,l,l.rev?1:-1)})}if(l.pager){a(o,l)}l.addSlide=function(B,C){var w=g(B),D=w[0];if(!l.autostopCount){l.countdown++}o[C?"unshift":"push"](D);if(l.els){l.els[C?"unshift":"push"](D)}l.slideCount=o.length;w.css("position","absolute");w[C?"prependTo":"appendTo"](y);if(C){l.currSlide++;l.nextSlide++}if(c&&l.cleartype&&!l.cleartypeNoBg){e(w)}if(l.fit&&l.width){w.width(l.width)}if(l.fit&&l.height&&l.height!="auto"){t.height(l.height)}D.cycleH=(l.fit&&l.height)?l.height:w.height();D.cycleW=(l.fit&&l.width)?l.width:w.width();w.css(l.cssBefore);if(l.pager){g.fn.cycle.createPagerAnchor(o.length-1,D,g(l.pager),o,l)}if(typeof l.onAddSlide=="function"){l.onAddSlide(w)}};if(l.timeout||l.continuous){this.cycleTimeout=setTimeout(function(){b(o,l,0,!l.rev)},l.continuous?10:l.timeout+(l.delay||0))}})};function b(o,j,n,q){if(j.busy){return}var m=j.container,s=o[j.currSlide],r=o[j.nextSlide];if(m.cycleTimeout===0&&!n){return}if(!n&&!m.cyclePause&&((j.autostop&&(--j.countdown<=0))||(j.nowrap&&!j.random&&j.nextSlide<j.currSlide))){if(j.end){j.end(j)}return}if(n||!m.cyclePause){if(j.before.length){g.each(j.before,function(p,t){t.apply(r,[s,r,j,q])})}var k=function(){if(g.browser.msie&&j.cleartype){this.style.removeAttribute("filter")}g.each(j.after,function(p,t){t.apply(r,[s,r,j,q])})};if(j.nextSlide!=j.currSlide){j.busy=1;if(j.fxFn){j.fxFn(s,r,j,k,q)}else{if(g.isFunction(g.fn.cycle[j.fx])){g.fn.cycle[j.fx](s,r,j,k)}else{g.fn.cycle.custom(s,r,j,k,n&&j.fastOnEvent)}}}if(j.random){j.currSlide=j.nextSlide;if(++j.randomIndex==o.length){j.randomIndex=0}j.nextSlide=j.randomMap[j.randomIndex]}else{var l=(j.nextSlide+1)==o.length;j.nextSlide=l?0:j.nextSlide+1;j.currSlide=l?o.length-1:j.nextSlide-1}if(j.pager){g.fn.cycle.updateActivePagerLink(j.pager,j.currSlide)}}if(j.timeout&&!j.continuous){m.cycleTimeout=setTimeout(function(){b(o,j,0,!j.rev)},f(s,r,j,q))}else{if(j.continuous&&m.cyclePause){m.cycleTimeout=setTimeout(function(){b(o,j,0,!j.rev)},10)}}}g.fn.cycle.updateActivePagerLink=function(j,k){g(j).find("a").removeClass("activeSlide").filter("a:eq("+k+")").addClass("activeSlide")};function f(n,l,m,k){if(m.timeoutFn){var j=m.timeoutFn(n,l,m,k);if(j!==false){return j}}return m.timeout}function i(j,k,n){var m=k.container,l=m.cycleTimeout;if(l){clearTimeout(l);m.cycleTimeout=0}if(k.random&&n<0){k.randomIndex--;if(--k.randomIndex==-2){k.randomIndex=j.length-2}else{if(k.randomIndex==-1){k.randomIndex=j.length-1}}k.nextSlide=k.randomMap[k.randomIndex]}else{if(k.random){if(++k.randomIndex==j.length){k.randomIndex=0}k.nextSlide=k.randomMap[k.randomIndex]}else{k.nextSlide=k.currSlide+n;if(k.nextSlide<0){if(k.nowrap){return false}k.nextSlide=j.length-1}else{if(k.nextSlide>=j.length){if(k.nowrap){return false}k.nextSlide=0}}}}if(k.prevNextClick&&typeof k.prevNextClick=="function"){k.prevNextClick(n>0,k.nextSlide,j[k.nextSlide])}b(j,k,1,n>=0);return false}function a(k,l){var j=g(l.pager);g.each(k,function(m,n){g.fn.cycle.createPagerAnchor(m,n,j,k,l)});g.fn.cycle.updateActivePagerLink(l.pager,l.startingSlide)}g.fn.cycle.createPagerAnchor=function(m,n,k,l,o){var j=(typeof o.pagerAnchorBuilder=="function")?o.pagerAnchorBuilder(m,n):'<a href="#">'+(m+1)+"</a>";if(!j){return}var p=g(j);if(p.parents("body").length==0){p.appendTo(k)}p.bind(o.pagerEvent,function(){o.nextSlide=m;var r=o.container,q=r.cycleTimeout;if(q){clearTimeout(q);r.cycleTimeout=0}if(typeof o.pagerClick=="function"){o.pagerClick(o.nextSlide,l[o.nextSlide])}b(l,o,1,o.currSlide<m);return false});if(o.pauseOnPagerHover){p.hover(function(){o.container.cyclePause++},function(){o.container.cyclePause--})}};function e(l){function k(m){var m=parseInt(m).toString(16);return m.length<2?"0"+m:m}function j(o){for(;o&&o.nodeName.toLowerCase()!="html";o=o.parentNode){var m=g.css(o,"background-color");if(m.indexOf("rgb")>=0){var n=m.match(/\d+/g);return"#"+k(n[0])+k(n[1])+k(n[2])}if(m&&m!="transparent"){return m}}return"#ffffff"}l.each(function(){g(this).css("background-color",j(this))})}g.fn.cycle.custom=function(u,o,j,l,k){var t=g(u),p=g(o);p.css(j.cssBefore);var m=k?1:j.speedIn;var s=k?1:j.speedOut;var n=k?null:j.easeIn;var r=k?null:j.easeOut;var q=function(){p.animate(j.animIn,m,n,l)};t.animate(j.animOut,s,r,function(){if(j.cssAfter){t.css(j.cssAfter)}if(!j.sync){q()}});if(j.sync){q()}};g.fn.cycle.transitions={fade:function(k,l,j){l.not(":eq("+j.startingSlide+")").css("opacity",0);j.before.push(function(){g(this).show()});j.animIn={opacity:1};j.animOut={opacity:0};j.cssBefore={opacity:0};j.cssAfter={display:"none"};j.onAddSlide=function(m){m.hide()}}};g.fn.cycle.ver=function(){return h};g.fn.cycle.defaults={fx:"fade",timeout:4000,timeoutFn:null,continuous:0,speed:1000,speedIn:null,speedOut:null,next:null,prev:null,prevNextClick:null,pager:null,pagerClick:null,pagerEvent:"click",pagerAnchorBuilder:null,before:null,after:null,end:null,easing:null,easeIn:null,easeOut:null,shuffle:null,animIn:null,animOut:null,cssBefore:null,cssAfter:null,fxFn:null,height:"auto",startingSlide:0,sync:1,random:0,fit:0,containerResize:1,pause:0,pauseOnPagerHover:0,autostop:0,autostopCount:0,delay:0,slideExpr:null,cleartype:0,nowrap:0,fastOnEvent:0}})(jQuery);(function(a){a.fn.cycle.transitions.scrollUp=function(c,d,b){c.css("overflow","hidden");b.before.push(function(g,e,f){a(this).show();f.cssBefore.top=e.offsetHeight;f.animOut.top=0-g.offsetHeight});b.cssFirst={top:0};b.animIn={top:0};b.cssAfter={display:"none"}}})(jQuery);

function dk_slideplayer(object, config) {
    this.obj = object;
    this.config = config ? config: {
        width: "300px",
        height: "200px",
        fontsize: "12px",
        right: "10px",
        bottom: "10px",
        time: "5000"
    };
    this.pause = false;
    var _this = this;
    if (!this.config.right) {
        this.config.right = "0px";
    }
    if (!this.config.bottom) {
        this.config.bottom = "3px";
    }
    if (this.config.fontsize == "12px" || !this.config.fontsize) {
        this.size = "12px";
        this.height = "21px";
        this.right = "6px";
        this.bottom = "10px";
    } else if (this.config.fontsize == "14px") {
        this.size = "14px";
        this.height = "23px";
        this.right = "6px";
        this.bottom = "15px";
    }
    this.count = jQuery(this.obj + " li").size();
    this.n = 0;
    this.j = 0;
    var t;
    this.factory = function() {
        jQuery(this.obj).css({
            position: "relative",
            zIndex: "0",
            margin: "0",
            padding: "0",
            width: this.config.width,
            height: this.config.height,
            overflow: "hidden"
        });
        jQuery(this.obj).prepend("<div style='position:absolute;z-index:20;right:" + this.config.right + ";bottom:" + this.config.bottom + "'></div>");
        jQuery(this.obj + " li").css({
            width: "100%",
            height: "100%",
            overflow: "hidden"
        }).each(function(i) {
            jQuery(_this.obj + " div").append("<a>" + (i + 1) + "</a>");
        });
        jQuery(this.obj + " img").css({
            border: "none",
            width: "100%",
            height: "100%"
        });
        this.resetclass(this.obj + " div a", 0);
        jQuery(this.obj + " p").each(function(i) {
            jQuery(this).parent().append(jQuery(this).clone(true));
            jQuery(this).html("");
            jQuery(this).css({
                position: "absolute",
                margin: "0",
                padding: "0",
                zIndex: "1",
                bottom: "0",
                left: "0",
                height: _this.height,
                width: "100%",
                background: "#000",
                opacity: "0.4",
                overflow: "hidden"
            });
            jQuery(this).next().css({
                position: "absolute",
                margin: "0",
                padding: "0",
                zIndex: "2",
                bottom: "0",
                left: "0",
                height: _this.height,
                lineHeight: _this.height,
                textIndent: "5px",
                width: "100%",
                textDecoration: "none",
                fontSize: _this.size,
                color: "#FFFFFF",
                background: "none",
                zIndex: "1",
                opacity: "1",
                overflow: "hidden"
            });
            if (i != 0) {
                jQuery(this).hide().next().hide();
            }
        });
        this.slide();
        this.addhover();
        t = setInterval(this.autoplay, this.config.time);
    }
    this.slide = function() {
        jQuery(this.obj + " div a").mouseover(function() {
            _this.j = jQuery(this).text() - 1;
            _this.n = _this.j;
            if (_this.j >= _this.count) {
                return
            }
            jQuery(_this.obj + " li").hide();
            jQuery(_this.obj + " p").hide();
            jQuery(_this.obj + " li").eq(_this.j).fadeIn("slow");
            jQuery(_this.obj + " li").eq(_this.j).find("p").show();
            _this.resetclass(_this.obj + " div a", _this.j);
        })
    }
    this.addhover = function() {
        jQuery(this.obj).hover(function() {
            clearInterval(t);
        },
        function() {
            t = setInterval(_this.autoplay, _this.config.time);
        })
    }
    this.autoplay = function() {
        _this.n = _this.n >= (_this.count - 1) ? 0: ++_this.n;
        jQuery(_this.obj + " div a").eq(_this.n).triggerHandler('mouseover');
    }
    this.resetclass = function(obj, i) {
        jQuery(obj).css({
            float: "left",
            marginRight: "3px",
            width: "15px",
            height: "14px",
            lineHeight: "15px",
            textAlign: "center",
            fontWeight: "800",
            fontSize: "12px",
            color: "#000",
            background: "#FFFFFF",
            cursor: "pointer"
        });
        jQuery(obj).eq(i).css({
            color: "#FFFFFF",
            background: "#FF7D01",
            textDecoration: "none"
        })
    }
    this.factory();
}

jQuerys(function(jQuerys) {
    jQuerys('#exponential').show().cycle({
        pause: 1,
        timeout: 4000,
        speed: 800,
        height: 8,
        width: "320px",
        fx: 'scrollUp'
    });
    jQuerys(".per_slide dl").mouseover(function() {
        jQuerys(".per_slide dl").removeClass("mouseover");
        jQuerys(this).addClass("mouseover");
    });
    jQuery("#version_showam, #version_showpm").click(function() {
        var className = jQuery(this).attr("rel");
        jQuery("#pub_main").attr("class", "pub_main " + className);
        return false;
    })
}); 

(function(jQuerys) {
    jQuerys.fn.lazyload = function() {
        this.each(function() {
            var DataContent = jQuerys(this);
            var DataWrap = DataContent.find("textarea");
            if (DataWrap.val()) {
                var DataChange = DataWrap.val().replace(/src=/i, "zbr=");
                jQuerys(this).append(DataChange).css("visibility", "hidden");
                DataWrap.remove();
            }
            function showload() {
                if (jQuerys(DataContent).css("visibility") != "visible" && jQuerys(DataContent).offset().top <= jQuerys(window).height() + jQuerys(window).scrollTop()) {
                    jQuerys(DataContent).css("visibility", "visible");
                    jQuerys(DataContent).find("img").each(function() {
                        var dynamic = jQuerys(this).attr("zbr");
                        jQuerys(this).attr("src", dynamic);
                        if (dynamic != "") {
                            jQuerys(this).removeAttr("zbr");
                        };
                        jQuerys(this).hide().fadeIn(500);
                    })
                }
            }
            showload();
            jQuerys(window).bind("resize", 
            function() {
                showload();
            }).bind("scroll", 
            function() {
                showload();
            })
        })
    }
})(jQuery);

function showTab(name,cur,n){
 for(i=1;i<=n;i++){
  var menu=document.getElementById(name+i);
  var con=document.getElementById("con_"+name+"_"+i);
  menu.className=i==cur?"zbr_hov":"";
  con.className=i==cur?"":"zbr_hid";
 }
}