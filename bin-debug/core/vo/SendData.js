var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var SendData = (function () {
    function SendData(type, gameData) {
        this.type = type;
        this.userid = GameLogic.getInstance().userId;
        this.roomId = GameLogic.getInstance().roomId;
        this.player = GameLogic.getInstance().player;
        this.gameData = gameData;
    }
    return SendData;
}());
__reflect(SendData.prototype, "SendData");
//# sourceMappingURL=SendData.js.map