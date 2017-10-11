/**
 * Created by franc on 06/10/2017.
 */
var count = true;

$("#text").click(function () {
    if(count) {
        $(this).prepend("Dijo: ")
        count = false;
    }
});

var vue = new Vue({
    el: '#mensaje',
    data: {
        styleObject: {
            color: 'green'
        },
        seconds: 0
    },
    mounted : function () {
        setInterval(function (){vue.tick()},1000);
    },
    methods : {
        tick : function () {
            var lastValue = this.seconds;

            this.seconds = this.seconds +1;
            switch (true) {
                case (lastValue === 10):
                    this.seconds = 0;
                    this.styleObject.color = 'green';
                    break;
                case (lastValue > 3 && lastValue < 7):
                    this.styleObject.color = 'blue';
                    break;
                case (lastValue > 6 && lastValue < 11):
                    this.styleObject.color = 'red';
                    break;
                default:
                    this.styleObject.color = 'green';
                    break;
            }
        }
    }
});
