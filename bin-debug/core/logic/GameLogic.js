var __reflect = (this && this.__reflect) || function (p, c, t) {
    p.__class__ = c, t ? t.push(c) : t = [c], p.__types__ = p.__types__ ? t.concat(p.__types__) : t;
};
/**
 *
 * @author
 *
 */
var GameLogic = (function () {
    function GameLogic() {
    }
    GameLogic.getInstance = function () {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    };
    GameLogic.prototype.startMain = function () {
        this.removeGame();
        if (this.main == null) {
            this.main = new MainScene();
        }
        this.GameStage.addChild(this.main);
    };
    GameLogic.prototype.removeMain = function () {
        if (this.main != null && this.main.parent != null) {
            this.main.parent.removeChild(this.main);
        }
    };
    GameLogic.prototype.getMonsterVOByID = function (id) {
        for (var i = 0; i < this.data.length; i++) {
            if (this.data[i].id == id) {
                return this.data[i];
            }
        }
        return null;
    };
    //socket连接成功之后的处理
    GameLogic.prototype.onSocketOpen = function () {
        var obj = {
            userid: 1,
            type: 'create'
        };
        var cmd = JSON.stringify(obj);
        console.log("the connection is successful, send data: " + cmd);
        this.WebSocket.writeUTF(cmd);
    };
    GameLogic.prototype.sendGameData = function (arr) {
        var cmd = JSON.stringify(arr);
        console.log("the send data: " + cmd);
        this.WebSocket.writeUTF(cmd);
    };
    //socket获得数据之后的处理
    GameLogic.prototype.onReceiveMessage = function () {
        var msg = this.WebSocket.readUTF();
        var recData = JSON.parse(msg);
        switch (recData.type) {
            case 'holdOn':
                break;
            case 'game':
                this.game.play(+recData.player);
                break;
            case 'ready':
                this.player = recData.player;
                // this.createGame();
                break;
            case 'go':
                if (this.player !== 1) {
                    this.player = recData.player;
                }
                this.createGame();
                break;
            case 'vo':
                this.monsterRandomData = recData.gameData.monsterRandomData;
                this.data = recData.gameData.data;
                this.beginGame();
                break;
            case 'addMonster':
                this.game.addMonster(+recData.gameData.catchID, +recData.gameData.randomY);
                break;
            case 'goOn':
                this.game["ship_" + recData.player + "p"].goOn();
                break;
        }
    };
    GameLogic.prototype.beginGame = function () {
        if (this.game == null) {
            this.game = new GameScene(this.player);
        }
        this.GameStage.addChild(this.game);
    };
    GameLogic.prototype.createGame = function () {
        if (this.player == 1) {
            if (this.data == null) {
                this.data = [];
                var arr = RES.getRes("mission_json");
                for (var i = 0; i < arr.length; i++) {
                    var vo = new MonsterVO();
                    vo.id = parseInt(arr[i]['id']);
                    vo.image = arr[i]['image'];
                    vo.max_num = parseInt(arr[i]['max_num']);
                    vo.left = parseInt(arr[i]['left']);
                    vo.pos = parseInt(arr[i]['pos']);
                    vo.movetype = parseInt(arr[i]['movetype']);
                    vo.speedtime = parseInt(arr[i]['speedtime']);
                    vo.score = parseInt(arr[i]['score']);
                    for (var j = 0; j < vo.max_num; j++) {
                        this.data.push(vo);
                    }
                }
            }
            var moArr = this.data;
            if (moArr != null) {
                var monsterRandomData = [];
                for (var i = 0; i < moArr.length; i++) {
                    var y = Math.random() * 300 + 240;
                    monsterRandomData.push(y);
                }
            }
            this.sendGameData(new SendData('vo', 1, { data: moArr, monsterRandomData: monsterRandomData }));
        }
    };
    GameLogic.prototype.startGame = function () {
        this.removeMain();
        this.WebSocket = new egret.WebSocket();
        this.WebSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.WebSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.WebSocket.connect("192.168.10.210", 8001);
    };
    GameLogic.prototype.removeGame = function () {
        if (this.game != null && this.game.parent != null) {
            this.game.parent.removeChild(this.game);
        }
    };
    return GameLogic;
}());
__reflect(GameLogic.prototype, "GameLogic");
//# sourceMappingURL=GameLogic.js.map