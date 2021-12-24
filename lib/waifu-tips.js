function render(template, context) {

    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return template.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {  
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
}
String.prototype.render = function (context) {
    return render(this, context);
};

var re = /x/;
console.log(re);
re.toString = function() {
    showMessage('哈哈，你打开了控制台，是想要看看我的秘密吗？', 5000);
    return '';
};

$(document).on('copy', function (){
    showMessage('你都复制了些什么呀，转载要记得加上出处哦', 5000);
});

$.ajax({
    cache: true,
    url: "./waifu/waifu/waifu-tips.json",
    dataType: "json",
    success: function (result){
        $.each(result.mouseover, function (index, tips){
            $(document).on("mouseover", tips.selector, function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
        $.each(result.click, function (index, tips){
            $(document).on("click", tips.selector, function (){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({text: $(this).text()});
                showMessage(text, 3000);
            });
        });
        $.each(result.seasons, function (index, tips){
            var now = new Date();
            var after = tips.date.split('-')[0];
            var before = tips.date.split('-')[1] || after;

            if((after.split('/')[0] <= now.getMonth()+1 && now.getMonth()+1 <= before.split('/')[0]) && 
             (after.split('/')[1] <= now.getDate() && now.getDate() <= before.split('/')[1])){
                var text = tips.text;
                if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                text = text.render({year: now.getFullYear()});
                showMessage(text, 6000, true);
            }
        });
    }
});

(function (){
    var text;
    var now = (new Date()).getHours();
    if (now > 23 || now <= 5) {
        text = '你是夜猫子呀？这么晚还不睡觉，明天起的来嘛';
    } else if (now > 5 && now <= 7) {
        text = '早上好！一日之计在于晨，美好的一天就要开始了';
    } else if (now > 7 && now <= 11) {
        text = '上午好！工作顺利嘛，不要久坐，多起来走动走动哦！';
    } else if (now > 11 && now <= 14) {
        text = '中午了，工作了一个上午，现在是午餐时间！';
    } else if (now > 14 && now <= 17) {
        text = '午后很容易犯困呢，今天的运动目标完成了吗？';
    } else if (now > 17 && now <= 19) {
        text = '傍晚了！窗外夕阳的景色很美丽呢，最美不过夕阳红~';
    } else if (now > 19 && now <= 21) {
        text = '晚上好，今天过得怎么样？';
    } else if (now > 21 && now <= 23) {
        text = '已经这么晚了呀，早点休息吧，晚安~';
    } else {
        text = '嗨~ 快来逗我玩吧！';
    }
    text = '欢迎阅读<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span><br>PS: ' +
      text;
    showMessage(text, 6000);
})();

//window.setInterval(showHitokoto,30000);

//function showHitokoto(){
//    $.getJSON('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json',function(result){
//        showMessage(result.hitokoto, 5000);
//    });
//}

function showMessage(text, timeout){
    // if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
    // console.log(text);
    // $('.waifu-tips').stop();
    // $('.waifu-tips').html(text).fadeTo(200, 1);
    // if (timeout === null) timeout = 5000;
    // hideMessage(timeout);
}
function hideMessage(timeout){
    $('.waifu-tips').stop().css('opacity',1);
    if (timeout === null) timeout = 5000;
    $('.waifu-tips').delay(timeout).fadeTo(200, 0);
}
