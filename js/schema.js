"use strict";
var LIlGGAttachContext = {
    PLSA: function PLSA() {
        $("article.post-list-thumb:not(.post-list-show)").each(function(index, item) { var pTop = item.getBoundingClientRect().top; var window_height = $(window).height(); if (pTop <= window_height) { $(item).addClass("post-list-show") } else { return false } });
        $(window).scroll(function() { var window_height = $(window).height(); var hide_post_thumb_first = $("article.post-list-thumb:not(.post-list-show):first"); if (hide_post_thumb_first.length > 0) { var pTop = hide_post_thumb_first[0].getBoundingClientRect().top; if (pTop <= window_height) hide_post_thumb_first.addClass("post-list-show") } })
    },
    TOC: function TOC() {
        if (document.body.clientWidth <= 1200) { return }
        var baseTopPadding = 240,
            maxToppadding = 134,
            offset = 100,
            bottomOffset = 30;
        if ($("div").hasClass("toc")) { $(".toc-container").css("height", $(".site-content").outerHeight()) } else { return }
        $(".entry-content , .links").children("h1,h2,h3,h4,h5").each(function(index) {
            var hyphenated = "toc-head-" + index;
            $(this).attr("id", hyphenated)
        });
        tocbot.init({ tocSelector: ".toc", contentSelector: [".entry-content", ".links"], headingSelector: "h1, h2, h3, h4, h5", collapseDepth: !!PageAttr.metas.tocDepth && [0, 1, 2, 3, 4, 5].includes(Number(PageAttr.metas.tocDepth)) ? Number(PageAttr.metas.tocDepth) : Poi.tocDepth, hasInnerContainers: false, headingsOffset: $("#page").find(".pattern-center").length > 0 ? -500 : -230, scrollEndCallback: function scrollEndCallback(e) { if ($(".is-active-link").length == 0) { return } if ($(window).scrollTop() == 0) { $(".toc").animate({ scrollTop: 0 }); return } var activeLikeOffset = $(".is-active-link").offset().top - $(window).scrollTop(); if (activeLikeOffset < offset) { $(".toc").animate({ scrollTop: $(".toc").scrollTop() - (offset - activeLikeOffset + $(".is-active-link").height()) }) } else if (activeLikeOffset > $(window).height() - bottomOffset) { $(".toc").animate({ scrollTop: $(".toc").scrollTop() + (activeLikeOffset - offset) }) } } });
        (function() {
            $(".toc").css("max-height", $(document).scrollTop() + ($(window).height() - baseTopPadding) + "px");
            $(window).scroll(function() { var s = $(document).scrollTop(); if (s == 0) { $(".toc").css("max-height", $(document).scrollTop() + ($(window).height() - baseTopPadding) + "px") } else if (s > offset) { $(".toc").css("max-height", $(window).height() - maxToppadding + "px") } else { $(".toc").css("max-height", $(document).scrollTop() + ($(window).height() - baseTopPadding) + "px") } })
        })()
    },
    CHS: function CHS() {
        var attributes = { autocomplete: "off", autocorrect: "off", autocapitalize: "off", spellcheck: "false", contenteditable: "false", design: "by LIlGG" };
        $("pre").each(function(i, item) {
            var $code = $(this).children("code");
            var classNameStr = $code[0].className;
            var classNameArr = classNameStr.split(" ");
            var lang = "";
            classNameArr.some(function(className) { if (className.indexOf("language-") > -1) { lang = className.substring(className.indexOf("-") + 1, className.length); return true } });
            var language = hljs.getLanguage(lang.toLowerCase());
            if (language == undefined) {
                var autolanguage = hljs.highlightAuto($code.text());
                $code.removeClass("language-" + lang);
                lang = autolanguage.language;
                if (lang == undefined) { lang = "text" }
                $code.addClass("language-" + lang)
            } else { lang = language.name }
            $(this).addClass("highlight-wrap");
            $(this).attr(attributes);
            $code.attr("data-rel", lang.toUpperCase()).addClass(lang.toLowerCase());
            hljs.highlightBlock($code[0]);
            if (Poi.codeLine) hljs.lineNumbersBlock($code[0])
        });
        $("pre").on("dblclick", function(e) {
            if (e.target !== this) return;
            $(this).toggleClass("code-block-fullscreen");
            $("html").toggleClass("code-block-fullscreen-html-scroll")
        });
        $("pre code").each(function(i, block) {
            $(block).attr({ id: "hljs-" + i });
            $(this).after('<a class="copy-code" href="javascript:" data-clipboard-target="#hljs-' + i + '" title="鎷疯礉浠ｇ爜"><i class="fa fa-clipboard" aria-hidden="true"></i></a>');
            new ClipboardJS(".copy-code")
        })
    },
    CBG: function CBG() {
        var themeConfig = {};
        var checkBgImgEcho = function checkBgImgEcho() {
            var configTag = Util.getCookie("bgTagClass");
            if (!configTag) { configTag = Poi.defaultTheme }
            var bgConfigTags = Object.keys(bgConfig);
            bgConfigTags.includes(configTag) ? configTag : Poi.defaultTheme;
            changeBg(configTag)
        };
        var changeSkinGear = function changeSkinGear() {
            $(".changeSkin-gear").off("click").on("click", function() { $(".skin-menu").toggleClass("show") });
            Object.keys(bgConfig).forEach(function(currBg) {
                $(".skin-menu " + "#" + currBg).on("click", function() {
                    changeBg(currBg, function() {
                        Util.setCookie("bgTagClass", currBg, 30);
                        $(".skin-menu").removeClass("show");
                        setTimeout(function() { $(".changeSkin-gear").css("visibility", "visible") }, 300)
                    })
                })
            });
            $(".changeSkin-gear").css("visibility", "visible")
        };
        var changeBg = function changeBg(tagClass, callback) {
            var bgAttr = bgConfig[tagClass];
            if (!bgAttr) return;
            themeConfig.bgAttr = bgAttr;
            $("body").removeAttr("style");
            $("body").css("background-image", bgAttr["url"] == "" ? "none" : "url(" + bgAttr["url"] + ")");
            changeSkinSecter();
            !callback || typeof callback == "undefined" || callback == undefined ? false : callback(bgAttr["isNight"])
        };
        var changeSkinSecter = function changeSkinSecter() {
            if (Object.getOwnPropertyNames(themeConfig).length == 0) { return }
            var bgAttr = themeConfig.bgAttr;
            var comments = document.getElementsByTagName("halo-comment");
            Util.removeClassByPrefix($("body")[0], "theme_");
            $("body").remove("theme_" + bgAttr["id"]);
            $("body").addClass("theme_" + bgAttr["id"]);
            if (bgAttr["isNight"]) {
                $("html").css("background", "#31363b");
                $(".site-content").css("background-color", "#fff");
                $("body").addClass("dark");
                for (var i = 0; i < comments.length; i++) {
                    var shadowDom = comments[i].shadowRoot.getElementById("halo-comment");
                    $(shadowDom).addClass("dark")
                }
            } else {
                $("html").css("background", "unset");
                $("body").removeClass("dark");
                $(".site-content").css("background-color", "rgba(255, 255, 255, .8)");
                for (var i = 0; i < comments.length; i++) {
                    var shadowDom = comments[i].shadowRoot.getElementById("halo-comment");
                    $(shadowDom).removeClass("dark")
                }
            }
            switch (bgAttr["strategy"]) {
                case "no-repeat":
                    // $("body").css("background-repeat", "no-repeat");
                    $("body").css("background-size", "100% 100%");
                    $("body").css("background-attachment", "fixed")
                    break;
                case "repeat":
                    $("body").css("background-repeat", "repeat");
                    $("body").css("background-attachment", "fixed")
                    break;
                case "cover":
                    $("body").css("background-size", "cover");
                    $("body").css("background-attachment", "fixed")
                    break;
                case "contain":
                    $("body").css("background-size", "contain");
                    $("body").css("background-attachment", "fixed")
                default:
                    break
            }
        };
        if (document.body.clientWidth > 660) {
            checkBgImgEcho();
            changeSkinGear()
        }
        return { changeSkinSecter: changeSkinSecter }
    },
    MGT: function MGT() {
        var offset = 20,
            scroll_top_duration = 700,
            $m_back_to_top = $(".m-cd-top");
        $(window).scroll(function() { if ($(this).scrollTop() > offset) { $m_back_to_top.addClass("cd-is-visible") } else { $m_back_to_top.removeClass("cd-is-visible") } });
        $m_back_to_top.on("click", function(event) {
            event.preventDefault();
            $("body,html").animate({ scrollTop: 0 }, scroll_top_duration)
        })
    },
    CPY: function CPY() {
        document.body.addEventListener("copy", function(e) { if (Poi.copyrightNotice && window.getSelection().toString().length > 30) { setClipboardText(e) } if (toast) { toast.create("澶嶅埗鎴愬姛锛�<br>Copied to clipboard successfully!", 2e3) } });
        var setClipboardText = function setClipboardText(event) {
            event.preventDefault();
            var htmlData = "# 鍟嗕笟杞浇璇疯仈绯讳綔鑰呰幏寰楁巿鏉冿紝闈炲晢涓氳浆杞借娉ㄦ槑鍑哄銆�<br>" + "# For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.<br>" + "# 鍗忚(License)锛氱讲鍚�-闈炲晢涓氭€т娇鐢�-鐩稿悓鏂瑰紡鍏变韩 4.0 鍥介檯 (CC BY-NC-SA 4.0)<br>" + "# 浣滆€�(Author)锛�" + Poi.nickname + "<br>" + "# 閾炬帴(URL)锛�" + window.location.href + "<br>" + "# 鏉ユ簮(Source)锛�" + Poi.sitename + "<br><br>" + window.getSelection().toString().replace(/\r\n/g, "<br>");
            var textData = "# 鍟嗕笟杞浇璇疯仈绯讳綔鑰呰幏寰楁巿鏉冿紝闈炲晢涓氳浆杞借娉ㄦ槑鍑哄銆俓n" + "# For commercial use, please contact the author for authorization. For non-commercial use, please indicate the source.\n" + "# 鍗忚(License)锛氱讲鍚�-闈炲晢涓氭€т娇鐢�-鐩稿悓鏂瑰紡鍏变韩 4.0 鍥介檯 (CC BY-NC-SA 4.0)\n" + "# 浣滆€�(Author)锛�" + Poi.nickname + "\n" + "# 閾炬帴(URL)锛�" + window.location.href + "\n" + "# 鏉ユ簮(Source)锛�" + Poi.sitename + "\n\n" + window.getSelection().toString().replace(/\r\n/g, "\n");
            if (event.clipboardData) {
                event.clipboardData.setData("text/html", htmlData);
                event.clipboardData.setData("text/plain", textData)
            } else if (window.clipboardData) { return window.clipboardData.setData("text", textData) }
        }
    },
    PHO: function PHO() {
        var $photoPage = $(".photo-page");
        if ($photoPage.length == 0) { return }
        var $masonrys = $(".masonry-gallery.gallery");
        var justify = function justify() {
            var option = { margins: isNaN(Poi.photosGutter) ? 10 : Number(Poi.photosGutter), rowHeight: 200 };
            if (Poi.defaultGroup) {
                var filter = "." + Poi.defaultGroup;
                $("#gallery-filter li a").removeClass("active");
                $("#gallery-filter li a").each(function() { if ($(this).data("filter") == filter) { $(this).addClass("active"); return false } });
                option.filter = filter
            }
            $masonrys.justifiedGallery(option);
            $("#gallery-filter li a").on("click", function() {
                $("#gallery-filter li a").removeClass("active");
                $(this).addClass("active");
                var dataFilter = $(this).data("filter");
                $masonrys.justifiedGallery({ filter: dataFilter });
                return false
            })
        };
        var masonry = function masonry() {
            var option = Poi.photosStyle == "masonry" ? { masonry: { gutter: isNaN(Poi.photosGutter) ? 10 : Number(Poi.photosGutter) }, itemSelector: ".gallery-item" } : { layoutMode: "packery", packery: { columnWidth: 100, gutter: isNaN(Poi.photosGutter) ? 10 : Number(Poi.photosGutter) }, itemSelector: ".gallery-item" };
            if (Poi.defaultGroup) {
                var filter = "." + Poi.defaultGroup;
                $("#gallery-filter li a").each(function() { $("#gallery-filter li a").removeClass("active"); if ($(this).data("filter") == filter) { $(this).addClass("active"); return false } });
                option.filter = filter
            }
            $masonrys.find("img.lazyload").on("load", function() {
                $(this).parents(".gallery-item").css("background", "#222");
                delete option.filter;
                $masonrys.isotope(option)
            });
            $("#gallery-filter li a").on("click", function() {
                $("#gallery-filter li a").removeClass("active");
                $(this).addClass("active");
                var dataFilter = $(this).data("filter");
                $masonrys.isotope({ filter: dataFilter });
                return false
            });
            if (Poi.photosStyle == "masonry") {
                $("#grid-changer a").on("click", function() {
                    $("#grid-changer a").removeClass("active");
                    $(this).toggleClass("active");
                    for (var i = 2; i < 9; i++) { $masonrys.find(".gallery-item").removeClass("col-" + i) }
                    $masonrys.find(".gallery-item").toggleClass($(this).closest("li").attr("class"));
                    $masonrys.isotope(option)
                })
            }
        };
        if ($masonrys.length > 0) { if (Poi.photosStyle == "masonry" || Poi.photosStyle == "packery") { masonry() } else { justify() } }
    },
    SS: function SS() {
        var getTimeIcon = function getTimeIcon(time) {
            var ICON_DAY = "kaiqitaiyangguangshezhi",
                ICON_MORN = "gengzaotubiao_tianqi-qingchen",
                ICON_NIGHT = "yueliang";
            var date = new Date(time);
            var hours = date.getHours();
            if (isNaN(hours)) { return ICON_DAY }
            if (5 <= hours && hours < 12) { return ICON_MORN } else if (12 <= hours && hours < 18) { return ICON_DAY } else { return ICON_NIGHT }
        };
        return function() {
            if ($(".journal").length > 0) {
                $(".journal").each(function() {
                    var $firstSpan = $(this).find(".journal-time>span").first();
                    if ($firstSpan.find("i").length == 0) { $firstSpan.prepend('<i class="iconfont icon-' + getTimeIcon($firstSpan.text()) + '"></i> ') }
                    var $imgs = $(this).find(".journal-label img");
                    $imgs.each(function() { if (!$(this).hasClass("journal-img")) { $(this).addClass("journal-img").wrap('<a data-fancybox="gallery" href="' + $(this).attr("src") + '">') } })
                })
            }
        }
    },
    CMN: function CMN() {
        var commentStyle = $("#comment-style").clone();
        commentStyle.attr("media", "all");
        var comments = $("halo-comment");
        for (var i = 0; i < comments.length; i++) { comments[i].shadowRoot.appendChild(commentStyle[0]) }
    },
    MATHJAX: function MATHJAX() { if (window.MathJax) { MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName("entry-content")[0]]) } else { Util.loadJS("https://cdn.bootcss.com/mathjax/2.7.5/MathJax.js?config=TeX-MML-AM_CHTML", function() { Util.loadJS(Poi.resBaseUrl + "/plugins/mathjax/js/index.js", function() { MathJax.Hub.Queue(["Typeset", MathJax.Hub, document.getElementsByClassName("entry-content")[0]]) }) }) } },
    BGEVEN: function BGEVEN() {
        function nextBG() {
            if (Poi.coverOpen == "true" && Poi.rimageUrl != "") {
                var url = new URL($(".centerbg").css("background-image").split('"')[1]);
                if (!url) { return }
                if (Poi.coverNum == 0) { url.searchParams.set("t", (new Date).getTime()) } else { url.searchParams.set("t", url.searchParams.get("t") % Poi.coverNum + 1) }
                $(".centerbg").css("background-image", "url(" + url.href + ")")
            }
        }

        function preBG() {
            if (Poi.coverOpen == "true" && Poi.rimageUrl != "") {
                var url = new URL($(".centerbg").css("background-image").split('"')[1]);
                if (!url) { return }
                if (Poi.coverNum == 0) { url.searchParams.set("t", (new Date).getTime()) } else {
                    var t = url.searchParams.get("t");
                    t = t - 1 || Poi.coverNum;
                    url.searchParams.set("t", t)
                }
                $(".centerbg").css("background-image", "url(" + url.href + ")")
            }
        }
        $("#bg-next").on("click", function() { nextBG() });
        $("#bg-pre").on("click", function() { preBG() })
    },
    TOMAIL: function TOMAIL() {
        if (!Poi.meEmail) { return }
        var mail = "mailto:" + Poi.meEmail;
        window.open(mail)
    },
    LA: function LA() {}
};
var imgError = function imgError(ele) { ele.src = "https://cdn.lixingyong.com/2020/07/18/98fca04416944b282a558b98b2131879.png" };
// var pjaxFun = function pjaxFun() {
//     $(document).pjax("a[target!=_top][target!=_blank]", "#page", { fragment: "#page", timeout: 8e3 }).on("pjax:send", function() {
//         NProgress.start();
//         Siren.MNH()
//     }).on("pjax:complete", function() {
//         Siren.AH();
//         Siren.PE();
//         Siren.CE();
//         LIlGGAttachContext.PJAX();
//         NProgress.done();
//         $("#loading").fadeOut(500)
//     }).on("submit", ".search-form,.s-search", function(event) {
//         event.preventDefault();
//         $.pjax.submit(event, "#page", { fragment: "#page", timeout: 8e3 });
//         if ($(".js-search.is-visible").length > 0) {
//             $(".js-toggle-search").toggleClass("is-active");
//             $(".js-search").toggleClass("is-visible")
//         }
//     });
//     window.addEventListener("popstate", function(e) {
//         Siren.AH();
//         Siren.PE();
//         Siren.CE()
//     }, false)
// };
var home = location.href,
    Siren = {
        MN: function MN() {
            $(".iconflat").on("click", function() {
                $("body").toggleClass("navOpen");
                $("#main-container,#mo-nav,.openNav").toggleClass("open")
            })
        },
        MNH: function MNH() {
            if ($("body").hasClass("navOpen")) {
                $("body").toggleClass("navOpen");
                $("#main-container,#mo-nav,.openNav").toggleClass("open")
            }
        },
        AH: function AH() {
            if (Poi.windowheight == "auto") {
                if (window.outerWidth <= 860) {
                    $("#centerbg").css({ height: 300 });
                    $(".headertop").addClass("headertop-bar");
                    return
                }
                $(".headertop").removeClass("headertop-bar");
                if ($("h1.main-title").length > 0) {
                    var _height = $(window).height();
                    $("#centerbg").css({ height: _height });
                    $("#bgvideo").css({ "min-height": _height });
                    $(window).resize(function() { Siren.AH() })
                }
            } else { $(".headertop").addClass("headertop-bar") }
        },
        PE: function PE() {
            if ($(".headertop").length > 0) {
                if ($("h1.main-title").length > 0) {
                    $(".blank").css({ "padding-top": "0px" });
                    $(".headertop").css({ height: "auto" }).show()
                } else {
                    $(".blank").css({ "padding-top": "5.2%" });
                    $(".headertop").css({ height: "0px" }).hide()
                }
            }
            if ($(".entry-content").children("table").length > 0) { $(".entry-content").children("table").wrap("<div class='table-wrapper'></div>") }
            if ($(".entry-content").length > 0 && $(".entry-content").find("img").length > 0) {
                var $imgs = $(".entry-content").find("img");
                $imgs.each(function() { if (!$(this).hasClass("gallery-img")) { $(this).addClass("gallery-img").wrap('<a data-fancybox="gallery" href="' + $(this).attr("src") + '"></a>') } });
                if (Poi.toc) { $imgs.on("load", function() { if ($("div").hasClass("toc")) { $(".toc-container").css("height", $(".site-content").outerHeight()) } else { return } }) }
            }
            if ($("#tag-wordcloud").length > 0 && $("#tag-wordcloud").children().length == 0) { $("#tag-wordcloud").jQCloud(wordcloud, { autoResize: true, delayedMode: true }) }
            if ($(".chip").length > 0) { $(".chip").each(function() { $(this).css("background-color", Util.getRandomColor(Poi.tagRandomColorMin, Poi.tagRandomColorMax)) }) }
            if ($("#category-echarts").length > 0 && $("#category-echarts").children().length == 0) {
                var values = Object.values(categoryRadar),
                    keys = Object.keys(categoryRadar);
                if (keys.length < 3) { $("#category-echarts").remove(); return }
                var maxNum = Math.ceil(Math.max.apply(Math, _toConsumableArray(values)) / 5) * 5;
                var categoryChart = echarts.init(document.getElementById("category-echarts"));
                var option = { title: { text: "鏂囩珷鍒嗙被闆疯揪鍥�", left: "center", top: "25px", textStyle: { fontSize: 22, fontWeight: "normal" } }, tooltip: { trigger: "item", textStyle: { align: "left" } }, radar: [{ indicator: function() { var indicators = []; for (var i = 0; i < keys.length; i++) { indicators.push({ text: keys[i], max: maxNum }) } return indicators }(), name: { textStyle: { color: $(".dark").length > 0 ? "#bebebe" : "black" } }, center: ["50%", "60%"], radius: "60%" }], series: [{ type: "radar", itemStyle: { color: "rgb(123,234,185)" }, lineStyle: { color: "rgb(123,234,185)" }, areaStyle: { color: "rgb(123,234,185)" }, data: [{ value: values, name: "鏂囩珷鍒嗙被鏁伴噺" }] }] };
                categoryChart.setOption(option)
            }
            if ($("#qrcode").length > 0 && $("#qrcode").children().length == 0) { new QRCode(document.getElementById("qrcode"), { text: $("#qrcode").data("url"), width: 128, height: 128, colorDark: "#000000", colorLight: "#ffffff" }) }
            LIlGGAttachContext.SS()()
        },
        CE: function CE() {
            $(".archives").hide();
            $(".archives:first").show();
            $("#archives-temp h3").click(function() { $(this).next().slideToggle("fast"); return false });
            $(".js-toggle-search").on("click", function() {
                $(".js-toggle-search").toggleClass("is-active");
                $(".js-search").toggleClass("is-visible")
            });
            $(".search_close").on("click", function() {
                if ($(".js-search").hasClass("is-visible")) {
                    $(".js-toggle-search").toggleClass("is-active");
                    $(".js-search").toggleClass("is-visible")
                }
            });
            $("#show-nav").on("click", function() {
                if ($("#show-nav").hasClass("showNav")) {
                    $("#show-nav").removeClass("showNav").addClass("hideNav");
                    $(".site-top .lower nav").addClass("navbar")
                } else {
                    $("#show-nav").removeClass("hideNav").addClass("showNav");
                    $(".site-top .lower nav").removeClass("navbar")
                }
            });
            $("#loading").click(function() { $("#loading").fadeOut(500) })
        },
        NH: function NH() {
            var h1 = 0,
                h2 = 50,
                ss = $(document).scrollTop();
            $(window).scroll(function() {
                var s = $(document).scrollTop();
                var surplus = document.documentElement.scrollHeight - document.documentElement.clientHeight;
                var coorY = s / surplus;
                NProgress.set(coorY);
                if (s == h1) { $(".site-header").removeClass("yya") }
                if (s > h1) { $(".site-header").addClass("yya") }
                if (s > h2) {
                    $(".site-header").addClass("gizle");
                    if (s > ss) { $(".site-header").removeClass("sabit") } else { $(".site-header").addClass("sabit") }
                    ss = s
                }
            })
        },
        XLS: function XLS() {
            var $body = window.opera ? document.compatMode == "CSS1Compat" ? $("html") : $("body") : $("html,body");
            // $body.on("click", "#pagination a", function() {
            //     var tempScrollTop = $(window).scrollTop();
            //     $(this).addClass("loading").text("");
            //     $.ajax({
            //         type: "GET",
            //         url: $(this).attr("href") + "#main",
            //         success: function success(data) {
            //             var result = $(data).find("#main .post");
            //             var nextHref = $(data).find("#pagination a").attr("href");
            //             $("#main").append(result.fadeIn(500));
            //             $("#pagination a").removeClass("loading").text("涓嬩竴椤�");
            //             $(window).scrollTop(tempScrollTop);
            //             LIlGGAttachContext.PLSA();
            //             if (nextHref != undefined) { $("#pagination a").attr("href", nextHref) } else { $("#pagination").html("<span>娌℃湁鏇村鏂囩珷浜�</span>") }
            //             I18N.init()
            //         }
            //     });
            //     return false
            // });
            $body.on("click", "#journals-pagination a", function() {
                $(this).addClass("loading").text("");
                var tempScrollTop = $(window).scrollTop();
                $.ajax({
                    type: "GET",
                    url: $(this).attr("href") + "#main",
                    success: function success(data) {
                        var result = $(data).find("#main .journal");
                        var nextHref = $(data).find("#journals-pagination a").attr("href");
                        $("#main").append(result.fadeIn(500));
                        $("#journals-pagination a").removeClass("loading").text("鍔犺浇鏇村...");
                        LIlGGAttachContext.SS()();
                        $(window).scrollTop(tempScrollTop);
                        if (nextHref != undefined) { $("#journals-pagination a").attr("href", nextHref) } else { $("#journals-pagination a").remove() }
                    }
                });
                return false
            })
        },
        GT: function GT() {
            var offset = 100,
                offset_opacity = 1200,
                scroll_top_duration = 700,
                $back_to_top = $(".cd-top");
            $(window).scroll(function() {
                if ($(this).scrollTop() > offset) {
                    $back_to_top.addClass("cd-is-visible");
                    $(".changeSkin-gear").css("bottom", "0");
                    if ($(window).height() > 950) { $(".cd-top.cd-is-visible").css("top", "0") } else { $(".cd-top.cd-is-visible").css("top", $(window).height() - 950 + "px") }
                } else {
                    $(".changeSkin-gear").css("bottom", "-999px");
                    $(".cd-top.cd-is-visible").css("top", "-900px");
                    $back_to_top.removeClass("cd-is-visible cd-fade-out")
                }
                if ($(this).scrollTop() > offset_opacity) { $back_to_top.addClass("cd-fade-out") }
                $(".skin-menu").removeClass("show")
            });
            $back_to_top.on("click", function(event) {
                event.preventDefault();
                $("body,html").animate({ scrollTop: 0 }, scroll_top_duration)
            })
        }
    };
var toast = null;
$(function() {
    Siren.AH();
    Siren.PE();
    Siren.NH();
    Siren.GT();
    Siren.XLS();
    Siren.CE();
    Siren.MN();
    LIlGGAttachContext.BGEVEN();
    Poi.themeChange && LIlGGAttachContext.CBG();
    LIlGGAttachContext.PLSA();
    Poi.headFocus && Poi.bgvideo && LIlGGAttachContext.BGV();
    Poi.toc && LIlGGAttachContext.TOC();
    Poi.mathjax && !!PageAttr.metas.math && PageAttr.metas.math == "true" && LIlGGAttachContext.MATHJAX();
    LIlGGAttachContext.CHS();
    LIlGGAttachContext.MGT();
    Poi.photosStyle == "packery" && supplement();
    LIlGGAttachContext.PHO();
    Poi.copyMonitor && LIlGGAttachContext.CPY();
    LIlGGAttachContext.CMN();
    // Poi.pjax && pjaxFun();
    // I18N.init();
    if (Poi.openToast && window.outerWidth > 860) {
        toast = new Toast;
        toast.init({ width: Poi.toastWidth, height: Poi.toastHeight, top: Poi.toastTop, background: Poi.toastBackground, color: Poi.toastColor, "font-size": Poi.toastFontSize })
    }
    $.fn.postLike = function() {
        if ($(this).hasClass("done")) { return false } else {
            $(this).addClass("done");
            var id = $(this).data("id"),
                action = $(this).data("action"),
                rateHolder = $(this).children(".count");
            var ajax_data = { action: "specs_zan", um_id: id, um_action: action };
            $.post(Poi.ajaxurl, ajax_data, function(data) { $(rateHolder).html(data) });
            return false
        }
    };
    $(document).on("click", ".specsZan", function() { $(this).postLike() });
    console.log("%c Github %c", "background:#24272A; color:#ffffff", "", "https://github.com/LIlGG/halo-theme-Sakura")
});

function headertop_down() {
    var coverOffset = $("#content").offset().top;
    $("html,body").animate({ scrollTop: coverOffset }, 600)
}
var supplement = function supplement() {
    var PackeryMode = Isotope.LayoutMode.modes.packery;
    var __resetLayout = PackeryMode.prototype._resetLayout;
    PackeryMode.prototype._resetLayout = function() {
        __resetLayout.call(this);
        var parentSize = getSize(this.element.parentNode);
        var colW = this.columnWidth + this.gutter;
        this.fitWidth = Math.floor((parentSize.innerWidth + this.gutter) / colW) * colW;
        this.packer.width = this.fitWidth;
        this.packer.height = Number.POSITIVE_INFINITY;
        this.packer.reset()
    };
    PackeryMode.prototype._getContainerSize = function() { var emptyWidth = 0; for (var i = 0, len = this.packer.spaces.length; i < len; i++) { var space = this.packer.spaces[i]; if (space.y === 0 && space.height === Number.POSITIVE_INFINITY) { emptyWidth += space.width } } return { width: this.fitWidth - this.gutter, height: this.maxY - this.gutter } };
    PackeryMode.prototype.needsResizeLayout = function() { return true }
};
var isWebkit = navigator.userAgent.toLowerCase().indexOf("webkit") > -1,
    isOpera = navigator.userAgent.toLowerCase().indexOf("opera") > -1,
    isIe = navigator.userAgent.toLowerCase().indexOf("msie") > -1;
if ((isWebkit || isOpera || isIe) && document.getElementById && window.addEventListener) {
    window.addEventListener("hashchange", function() {
        var id = location.hash.substring(1),
            element;
        if (!/^[A-z0-9_-]+$/.test(id)) { return }
        element = document.getElementById(id);
        if (element) {
            if (!/^(?:a|select|input|button|textarea)$/i.test(element.tagName)) { element.tabIndex = -1 }
            element.focus()
        }
    }, false)
}
var IllegalStateException = function IllegalStateException(message) {
    IllegalStateException.prototype = new RuntimeException;
    IllegalStateException.prototype = {get name() { return "IllegalStateException" } }
};
var InvalidArgumentException = function InvalidArgumentException(message) {
    InvalidArgumentException.prototype = new RuntimeException;
    InvalidArgumentException.prototype = {get name() { return "InvalidArgumentException" } }
};
var NotImplementedException = function NotImplementedException(message) {
    NotImplementedException.prototype = new RuntimeException;
    NotImplementedException.prototype = {get name() { return "NotImplementedException" } }
};

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread() }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.") }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen) }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter) }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr) }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i] } return arr2 }

function _instanceof(left, right) { if (right != null && typeof Symbol !== "undefined" && right[Symbol.hasInstance]) { return !!right[Symbol.hasInstance](left) } else { return left instanceof right } }

function _classCallCheck(instance, Constructor) { if (!_instanceof(instance, Constructor)) { throw new TypeError("Cannot call a class as a function") } }

