var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var RecData = (function () {
    function RecData(data) {
        var tmp = data.split(',');
        var leng = tmp.length;
        this.leftHook = { x: tmp[0], y: tmp[1], hookedFishType: tmp[leng - 3], hasHooked: tmp[leng - 4], score: tmp[leng - 6] };
        this.rightHook = { x: tmp[2], y: tmp[3], hookedFishType: tmp[leng - 1], hasHooked: tmp[leng - 2], score: tmp[leng - 5] };
        this.fishCount = +tmp[4];
        var tmpArr = [];
        for (var i = 0; i < +tmp[4]; i++) {
            var tmpObj = {
                x: tmp[i * 4 + 5],
                y: tmp[i * 4 + 6],
                type: tmp[i * 4 + 7],
                direction: tmp[i * 4 + 8]
            };
            tmpArr.push(tmpObj);
        }
        this.fishList = tmpArr;
    }
    return RecData;
}());
__reflect(RecData.prototype, "RecData");
//# sourceMappingURL=RecData.js.map