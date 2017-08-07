var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
/**
 *
 * @author
 *
 */
var MainScene = (function (_super) {
    __extends(MainScene, _super);
    function MainScene() {
        var _this = _super.call(this) || this;
        GameLogic.getInstance().main = _this;
        _this.skinName = "MainSceneSkin";
        return _this;
    }
    MainScene.prototype.childrenCreated = function () {
        _super.prototype.childrenCreated.call(this);
        RES.loadGroup("game");
    };
    MainScene.prototype.loadOver = function () {
        if (this.start_btn != null) {
            this.start_btn.visible = true;
            this.start_btn.addEventListener(egret.TouchEvent.TOUCH_TAP, this.start, this);
        }
    };
    MainScene.prototype.start = function () {
        GameLogic.getInstance().startGame();
    };
    return MainScene;
}(eui.Component));
__reflect(MainScene.prototype, "MainScene");
//# sourceMappingURL=MainScene.js.map