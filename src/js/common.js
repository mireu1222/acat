$(function () {
    gnbSubdepth();
    $('header .btn-menu-all').click(function(){
        $(this).hasClass('open') ? gnbClose() : gnbOpen();
    });
    headerScroll();
    moreMenu();
    toTop('.floating-menu .totop');
    $(this).find('.nice-select').niceSelect(); // selectbox
    fileUpload(); // fileupload
    uiDropdown('.dropdown');
    modalToggle();
});

$(window).on('load', function(){
    xScroll('.sub-depth-wrap .scroll');
});

// floating menu(main only)
function floatingDip() {
    var didScroll,
        lastScrollTop = 0,
        delta = 5,
        oh = $(window).outerHeight();

    if ( $('.floating-menu').length <= 0 ) return;

    $(window).scroll(function (e) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 150);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop && st > oh) {
            $('.floating-menu').addClass('on');
        } else if (st < lastScrollTop && st < oh) {
            $('.floating-menu').removeClass('on');
        }

        lastScrollTop = st;
    }
}

// header event
function headerScroll() {
    var didScroll,
        lastScrollTop = 0,
        delta = 5,
        navbarHeight = $('header').outerHeight();

    $(window).scroll(function (e) {
        didScroll = true;
    });
    setInterval(function () {
        if (didScroll) {
            hasScrolled();
            didScroll = false;
        }
    }, 150);

    function hasScrolled() {
        var st = $(this).scrollTop();
        if (Math.abs(lastScrollTop - st) <= delta)
            return;

        if (st > lastScrollTop) {
            $('header').addClass('scroll');
        } else if (st < lastScrollTop) {
            $('header').removeClass('scroll');
        }

        lastScrollTop = st;
    }
}

function gnbSubdepth() {
    var depth1 = $('header .head-top .menu-all'),
        header = $('header');

    depth1.on('click', function(){
        if ($(this).hasClass('open')) {
            header.removeClass('open');
            $(this).removeClass('open');
        } else {
            header.addClass('open');
            $(this).addClass('open');
        }
    });
}

function moreMenu() {
    $('header .dep1-more').click(function() {
        var parent = $(this).parent('li'),
            allLi = parent.siblings('li'),
            allDepth = allLi.children('ul.depth2'),
            allBtn = allLi.children('.dep1-more'),
            depth = $(this).siblings('ul.depth2');

        allDepth.slideUp();
        allBtn.removeClass('open');

        $(this).addClass('open');
        depth.slideDown();
    });
}

function gnbOpen() {
    var header = $('header'),
        gnb = $('header .gnb-all'),
        menuBtn = $('header .btn-menu-all'),
        dim = '<div class="header-dim" onclick="gnbClose()">&nbsp;</div>';

    gnb.before(dim);
    gnb.show();
    scrollPrevent(true);
    setTimeout(function(){
        header.addClass('m-open');
        menuBtn.addClass('open');
    }, 20);
}

function gnbClose() {
    var header = $('header'),
        gnb = $('header .gnb-all'),
        menuBtn = $('header .btn-menu-all');

    $('.header-dim').remove();
    menuBtn.removeClass('open');
    header.removeClass('m-open');
    scrollPrevent(false);
    setTimeout(function () {
        gnb.hide();
    }, 200);
}

function scrollPrevent(prop) {
    if ( prop == true ) {
        $('body').css({'overflow':'hidden'});
    } else {
        $('body').css({'overflow':'initial'});
    }
}

// sub depth 
function subdepthToggle() {
    var $subdepth = $('.sub-depth-wrap'),
        menus = $subdepth.find('.dropdown-menu'),
        button = $subdepth.find('.selected');

    button.on('click', function(e){
        var prt = $(this).parent('.dropdown-menu');

        e.preventDefault();
        if (prt.hasClass('open')) {
            prt.removeClass('open');
        } else {
            menus.removeClass('open');
            prt.addClass('open');
        }
    });

    $(document).on('click', 'html', function(e){
        var prt = $(e.target).parents();
        if (!prt.is($subdepth) ) {
            menus.removeClass('open');
        }
    });
}

// totop
function toTop(obj) {
    var $btn = $(obj);

    $btn.click(function(e){
        e.preventDefault();
        $('html, body').animate({
            scrollTop : 0
        }, 400);
        return false;
    });
}

// iscroll outerwidth
function calcWidth(target) {
    var $target = $(target);

    $target.each(function(){
        var child = $(this).children(),
            width = 0;

        child.each(function(){
            width += $(this).outerWidth(true);
        });
        $(this).css('width', width);
    });
}

// iscroll
function xScroll(obj) {
    var $obj = $(obj),
        tabs = $obj.find('.tabs');

    if ( $(obj).length <= 0 ) {
        return
    } else {
        $(window).resize(function(){
            calcWidth(tabs);
        });
        calcWidth(tabs);
        new IScroll(obj , {
            scrollX : true,
            scrollY : false,
            mouseWheel : false,
            autoCenterScroll : true,
            bounce : true
        });
    }
}

// accordion
function accordion() {
    var wrap = $('.ui-accordion'),
        list = wrap.find('li'),
        title = wrap.find('.accord-title'),
        toggle = title.find('.btn-toggle');

    if(wrap.length <= 0) return;

    // 접근성 대응
    list.each(function(){
        var $btn = $(this).find('.accord-title .btn-toggle'),
            $content = $(this).find('.accord-cont'),
            id = $(this).index();

        $btn.attr({
            'id' : 'accord-toggle' + id,
            'aria-controls' : 'accord-cont' + id
        });
        $content.attr({
            'id' : 'accord-cont' + id,
            'role' : 'region',
            'aria-labelledby' : 'accord-toggle' + id
        })
    });

    toggle.click(function(){
        var li = $(this).parent('.accord-title').parent('li'),
            cont = $(this).parent('.accord-title').siblings('.accord-cont'),
            blind = $(this).find('.blind');

        if (li.hasClass('open')) {
            $(this).attr('aria-expanded', 'false');
            cont.slideUp();
            li.removeClass('open');
            blind.text('상세보기');
        } else {
            $(this).attr('aria-expanded', 'true');
            cont.slideDown();
            li.addClass('open');
            blind.text('닫기');
        }
    });
}

// data sorting
function dataSorting() {
    var tab = '[data-type="sortingTab"]',
        $tab = $(tab),
        btn = $tab.find('a');

    var listWrap = '[data-type="sortingTarget"]',
        $wrap = $(listWrap),
        listAll = $wrap.find('li');

    if($tab.length <= 0) return;

    btn.click(function(e){
        var num = $(this).data('category-num'),
            $target = $('[data-category-id='+num+']');

        e.preventDefault();
        $(this).parent('li').siblings().removeClass('active');
        $(this).parent('li').addClass('active');
        listAll.hide();

        var empty = '<li class="empty"><p class="nodata">게시글이 없습니다.</p></li>',
            uls = $wrap.find('.lists');

        if (num === 'all') {
            uls.find('li.empty').remove();
            listAll.show();
        } else {
            if ($target.length <= 0) {
                uls.find('li.empty').remove();
                uls.append(empty);
            } else {
                uls.find('li.empty').remove();
                $target.show();
            }
        }
    });
}

// class toggle
function classToggle() {
    var classToggle = $('[data-toggle="class-toggle"]');

    if (classToggle.length <= 0) return;

    var btns = classToggle.find('button, a');
    
    btns.on('click', function(){
        btns.removeClass('active');
        $(this).addClass('active');    
    });
}

// file upload 
function fileUpload() {
    var obj = $('.inputfile-wrap');
    
    if (obj.length <= 0) return;

    var fileTarget = obj.find('input[type=file]');

    fileTarget.on('change', function(){
        if (window.FileReader) {
            var filename = $(this)[0].files[0].name;
        } else {
            var filename = $(this).val().split('/').pop().split('\\').pop();
        }

        $(this).siblings('input[type=text]').val(filename);
    });
}

// dropdown
function uiDropdown(obj) { 
    function classToggle(target) {
        if ( target.hasClass('open') ) {
            target.removeClass('open');
        } else {
            target.addClass('open');
        }
    }
    function determineDropDirection(target){
        var $target = $(target);
        $target.css({
            visibility: "hidden",
            display: "block"
        });
        $target.parent().removeClass("dropup");
    
        if ($target.offset().top + $target.outerHeight() > $(window).innerHeight() + $(window).scrollTop()){
            $target.parent().addClass("dropup");
        }
        $target.removeAttr("style");
    }

    var wrap = $(obj),
        ul = wrap.find('ul.lists');
    ul.each(function(){
        var self = $(this);
        determineDropDirection(self);
        $(window).scroll(function(){
            determineDropDirection(self);
        });
    });

    wrap.each(function(){
        var $wrap = $(this);
            btns = $wrap.find('.btn-toggle'),
            lists = $wrap.find('.lists');

        btns.click(function(e){
            e.stopPropagation();
            e.preventDefault();

            wrap.removeClass('open');
            classToggle($wrap);
        });
        lists.click(function(e){
            classToggle($wrap);
        });
        $('html').click(function(e){
            if ( !$(e.target).is($wrap) ) {
                $wrap.removeClass('open');
            }
        });
    });
}

// tab
function uiTab() {
    var tab = '[data-evt="tab"]';
    $(document).on('click', tab + ' a', function (e) {
        e.preventDefault();

        var $this = $(this),
            id = $this.attr('href'),
            $target = $('[data-id=' + id + ']'),
            $siblings = $this.parents('li').siblings('').find('a');

        $siblings.each(function () {
            var id = $(this).attr('href');
            $(this).parents('li').removeClass('active');
            $('[data-id=' + id + ']').hide();
        });
        $this.parents('li').addClass('active');
        $target.show();

        return false;
    });

    if ( tab.length <= 0 ) return;
    $(tab).find('a').each(function(){
        var tg = $(this).attr('href');

        $('[data-id="'+tg+'"]').hide();
    });
    $(tab + ' > li:first-child a').click();
}

function mapChange() {
    // map click
    $(document).on('click', '.map-select .spot a.pin', function(e){
        var self = $(this),
            myNum = self.data('spot'),
            mySpot = self.parent('.spot'),
            spots = $('.map-select .spot');

        var tab = $('[data-toggle="mapChange"]'),
            lis = tab.find('li');

        e.preventDefault();
        spots.removeClass('active');
        mySpot.addClass('active');

        lis.removeClass('active');
        tab.find('[data-num="'+myNum+'"]').addClass('active');

        mapdataSwitch(myNum);
    });

    // tab click
    $(document).on('click', '[data-toggle="mapChange"] a', function(e){
        var self = $(this),
            myLi = self.parent('li'),
            myNum = myLi.data('num'),
            allLi = $('[data-toggle="mapChange"] li');

        var selects = $('.map-select'),
            spots = selects.find('div.spot');

        e.preventDefault();
        allLi.removeClass('active');
        myLi.addClass('active');

        spots.removeClass('active');
        selects.find('[data-spot="'+myNum+'"]').parent('.spot').addClass('active');

        mapdataSwitch(myNum);
    });

    $('.map-select .spot.spot01 a').click();
}

function mapdataSwitch(val) {
    var timestamp = "";
    var key = "";
    switch(val) {
        case "01" : // 강남
            timestamp = "1623027159997";
            key = "2647r";
            break;
        case "02" : // 영등포
            timestamp = "1623027269147";
            key = "2647x";
            break;
        case "03" : // 평택
            timestamp = "1623027527603";
            key = "26482";
            break;
        case "04" : // 천안
            timestamp = "1623027557419";
            key = "26483";
            break;
    }
    $('[data-toggle="mapSwitch"]').html('');
    $('[data-toggle="mapSwitch"]').attr('class', '');
    $('[data-toggle="mapSwitch"]').addClass('root_daum_roughmap root_daum_roughmap_landing');
    $('[data-toggle="mapSwitch"]').attr('id', 'daumRoughmapContainer'+timestamp);
    new daum.roughmap.Lander({
        "timestamp" : timestamp,
        "key" : key,
        "mapWidth" : "640",
        "mapHeight" : "360"
    }).render();
}

// modal 
function modalToggle() {
    var modalToggle = $('[data-toggle="modal"]'),
        modalClose = $('[data-toggle="modal-close"]');

    if (modalToggle.length <= 0) return;

    modalToggle.on('click', function(){
        var modalTarget = $(this).data('target') || $(this).attr('href');
            modal = $(modalTarget);

        modal.removeAttr('aria-hidden');
        modal.attr('aria-modal', true);
        modal.show();
    });

    modalClose.on('click', function(){
        var modal = $(this).parents('.modal');

        modal.hide();
        modal.removeAttr('aria-modal');
        modal.attr('aria-hidden', true);
    });
}