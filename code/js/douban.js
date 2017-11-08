
var Top250 = {
    init: function(){
        this.$top250 = $('.wrap-top250');
        this.$ct = this.$top250.find('.ct');
        this.loadings = this.$top250.find('.loadings');
        this.idx = 0;
        this.num = 10;

        this.isload = false;   // 是否正在加载
        this.isover = false;    // 是否结束

        this.start();
        this.Event();
    },
    Event: function(){
        var _this = this;
        var timer;
        this.$top250.on('scroll',function(){
            if(timer){
                clearTimeout(timer);
            }
            timer = setTimeout(function(){
                if(!_this.isEnd() && !_this.isover ){
                     _this.start();
                }
            },300)
            return false;
        });
    },
    start: function(){
        var _this = this;  
        this.getData();
    },
    getData: function(){
        var _this = this;
        // 判断是否在加载
        if(this.isload){
            return;
        }
        // 判断是否没有数据了
        if(this.isover){
            return;
        }
        this.isload = true;
        this.loadings.fadeIn();
        $.ajax({
            url: 'http://api.douban.com/v2/movie/top250',   // 跨域到 http:// 
            type: 'get',                                    // 数据类型
            dataType: 'jsonp',　　　　　　　　　　　　　　　　　　// 指定为　jsonp 类型
            data: {　　　　　　　　　　　　　　　　　　　　　　　　 // 数据参数
                start: _this.idx,
                count: _this.num
            }, 
            jsonp: 'callback',                              // 服务端获取回调函数的 key
            jsonpCallback: 'getName',                       // 回调函数名
            success: function(res){                         //　成功执行处理，对应后台返回的　getName(data) 的方法。
                _this.isload = false;
                if(_this.idx >= res.total){
                    _this.isover = true;
                }   
                _this.idx += _this.num;
                _this.reader(res);　　　　　　　　　　　　　　　

            },
            error: function(){　
                _this.isload = false;　　　　　　　　　　　　　  // 执行错误

            },
            complete: function(){                            // 请求完成后执行
                _this.isload = false;　
                _this.loadings.hide();
            }
        });
        
    },
    reader: function(data){
        var _this = this;

        data.subjects.forEach(function(element) {
            // 先创建节点
            var html = 
            '<div class="movie-item">\
                <a href="#">\
                    <div class="cover">\
                        <img src="" alt="">\
                    </div>\
                    <div class="detail">\
                        <h2></h2>\
                        <div class="extra"><span class="score"></span> / <span class="count"></span>收藏</div>\
                        <div class="extra"><span class="year"></span> / <span class="type"></span></div>\
                        <div class="extra">导演: <span class="director"></span></div>\
                        <div class="extra">主演: <span class="actor"></span></div>\
                    </div>\
                </a>\
            </div>';
            var $node = $(html);
            $node.find('a').attr('href', element.alt);
            $node.find('h2').text(element.title);
            $node.find('img').attr('src', element.images.small);
            $node.find('.score').text(element.rating.average);
            $node.find('.count').text(element.collect_count);
            $node.find('.year').text(element.year);
            $node.find('.type').text(element.genres.join(' / '));
            $node.find('.director').text(function(){
                var a = [];
                element.directors.forEach(function(b){
                    a.push(b.name);
                });
                return a.join('');
            });
            $node.find('.actor').text(function(){
                var a = [];
                element.casts.forEach(function(b){
                    a.push(b.name);
                });
                return a.join(' / ');
            });
            
            _this.$ct.append($node);
            
        }, this);
    },
    isEnd: function(){
        if(this.$top250.height() + this.$top250.scrollTop() + 10 <= this.$ct.height() ){
            return true;
        }else {
            return false;
        }
    }

};

var Beimei = {
    init: function(){
        this.$beimei = $('.wrap-beimei');
        this.$ct = this.$beimei.find('.ct');
        this.loadings = this.$beimei.find('.loadings');

        this.start();
        
    },
    start: function(){
        var _this = this;  
        this.getData();
    },
    getData: function(){
        var _this = this;
        this.loadings.fadeIn();
        $.ajax({
            url: 'http://api.douban.com/v2/movie/us_box',   // 跨域到 http:// 
            type: 'get',                                    // 数据类型
            dataType: 'jsonp',　　　　　　　　　　　　　　　　　　// 指定为　jsonp 类型
            jsonp: 'callback',                              // 服务端获取回调函数的 key
            jsonpCallback: 'getName',                       // 回调函数名
            success: function(res){  
                                                             //　成功执行处理，对应后台返回的　getName(data) 的方法。
                _this.reader(res);　　　　　　　　　　　　　　　
                
            },
            error: function(){　
                _this.isload = false;　　　　　　　　　　　　　  // 执行错误
           
            },
            complete: function(){                            // 请求完成后执行
                _this.isload = false;　
                _this.loadings.hide();
            }
        });
        
    },
    reader: function(data){
        var _this = this;
        data.subjects.forEach(function(item) {
                var element = item.subject;
                // 先创建节点
                var html = 
                '<div class="movie-item">\
                    <a href="#">\
                        <div class="cover">\
                            <img src="" alt="">\
                        </div>\
                        <div class="detail">\
                            <h2></h2>\
                            <div class="extra"><span class="score"></span> / <span class="count"></span>收藏</div>\
                            <div class="extra"><span class="year"></span> / <span class="type"></span></div>\
                            <div class="extra">导演: <span class="director"></span></div>\
                            <div class="extra">主演: <span class="actor"></span></div>\
                        </div>\
                    </a>\
                </div>';
                var $node = $(html);
                $node.find('a').attr('href', element.alt);
                $node.find('h2').text(element.title);
                $node.find('img').attr('src', element.images.medium);
                $node.find('.score').text(element.rating.average);
                $node.find('.count').text(element.collect_count);
                $node.find('.year').text(element.year);
                $node.find('.type').text(element.genres.join(' / '));
                $node.find('.director').text(function(){
                    var a = [];
                    element.directors.forEach(function(b){
                        a.push(b.name);
                    });
                    return a.join('');
                });
                $node.find('.actor').text(function(){
                    var a = [];
                    element.casts.forEach(function(b){
                        a.push(b.name);
                    });
                    return a.join(' / ');
                });
                
                _this.$ct.append($node);
         
        });
    }
};

var Search = {
    init: function(){
        this.$search = $('.wrap-search');
        this.$ct = this.$search.find('.ct');
        this.$input = this.$search.find('input');
        this.$btn = this.$search.find('.button');
        this.loadings = this.$search.find('.loadings');

        this.searchVal = '';
        this.idx = 0;
        this.num = 10;

        this.Event();
    },
    Event: function(){
        var _this = this;
        this.$btn.click(function(){
            _this.$input.empty();
            _this.$ct.empty();
            _this.searchVal = _this.$input.val();
            _this.getData();
        });
    },
    getData: function(){
        var _this = this;
        this.loadings.fadeIn();
        $.ajax({
            url: 'http://api.douban.com//v2/movie/search',   // 跨域到 http:// 
            type: 'get',                                    // 数据类型
            dataType: 'jsonp',　　　　　　　　　　　　　　　　　　// 指定为　jsonp 类型
            jsonp: 'callback',                              // 服务端获取回调函数的 key
            jsonpCallback: 'getName',                       // 回调函数名
            data: {
                q: _this.searchVal,
            },
            success: function(res){  
                                                             //　成功执行处理，对应后台返回的　getName(data) 的方法。
                _this.reader(res);　　　　　　　　　　　　　　　
                
            },
            error: function(){　
                _this.isload = false;　　　　　　　　　　　　　  // 执行错误
                
            },
            complete: function(){                            // 请求完成后执行
                _this.isload = false;　
                _this.loadings.hide();
            }
        });
        
    },
    reader: function(data){
        var _this = this;
        
        data.subjects.forEach(function(element) {
            // 先创建节点
            var html = 
            '<div class="movie-item">\
                <a href="#">\
                    <div class="cover">\
                        <img src="" alt="">\
                    </div>\
                    <div class="detail">\
                        <h2></h2>\
                        <div class="extra"><span class="score"></span> / <span class="count"></span>收藏</div>\
                        <div class="extra"><span class="year"></span> / <span class="type"></span></div>\
                        <div class="extra">导演: <span class="director"></span></div>\
                        <div class="extra">主演: <span class="actor"></span></div>\
                    </div>\
                </a>\
            </div>';
            var $node = $(html);
            $node.find('a').attr('href', element.alt);
            $node.find('h2').text(element.title);
            $node.find('img').attr('src', element.images.medium);
            $node.find('.score').text(element.rating.average);
            $node.find('.count').text(element.collect_count);
            $node.find('.year').text(element.year);
            $node.find('.type').text(element.genres.join(' / '));
            $node.find('.director').text(function(){
                var a = [];
                element.directors.forEach(function(b){
                    a.push(b.name);
                });
                return a.join('');
            });
            $node.find('.actor').text(function(){
                var a = [];
                element.casts.forEach(function(b){
                    a.push(b.name);
                });
                return a.join(' / ');
            });
            
            _this.$ct.append($node);
            
        }, this);
    },
};

var app = {
    init: function(){
        this.$tab = $('footer>div');
        this.$ct = $('main>section');

        this.Event();
        Top250.init();
    },
    Event: function(){
        var _this = this;
        this.$tab.click(function(e){
            var index = $(this).index();
            _this.$ct.hide().eq(index).fadeIn();
            
            $(this).addClass('active').siblings().removeClass('active');

            if(parseInt(index) == 0){
                var url = location.pathname + '#' + $(this).attr('data-name');
                console.log(url);
                Top250.init();
            }else if(parseInt(index) === 1){
                Beimei.init();
            }else if(parseInt(index) === 2){
                Search.init();
            }

        }); 
    },
};

app.init();