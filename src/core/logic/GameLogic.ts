/**
 *
 * @author 
 *
 */
class GameLogic {
    public constructor() {
    }

    private static _instance: GameLogic;
    private WebSocket: egret.WebSocket;
    private player: number;
    public static getInstance(): GameLogic {
        if (this._instance == null) {
            this._instance = new GameLogic();
        }
        return this._instance;
    }

    public GameStage: egret.Stage;
    public GameStage_width: number;
    public GameStage_height: number;

    public main: MainScene;
    public game: GameScene;


    public data: MonsterVO[];
    public monsterRandomData: Monster[];

    public startMain(): void {
        this.removeGame();
        if (this.main == null) {
            this.main = new MainScene();
        }
        this.GameStage.addChild(this.main);
    }

    public removeMain(): void {
        if (this.main != null && this.main.parent != null) {
            this.main.parent.removeChild(this.main);
        }
    }

    public getMonsterVOByID(id: number): MonsterVO {
        for (var i: number = 0; i < this.data.length; i++) {
            if (this.data[i].id == id) {
                return this.data[i];
            }
        }
        return null;
    }



    //socket连接成功之后的处理
    private onSocketOpen(): void {
        let obj = {
            userid: 1,
            type: 'create'
        }
        let cmd = JSON.stringify(obj);
        console.log("the connection is successful, send data: " + cmd);
        this.WebSocket.writeUTF(cmd);
    }

    public sendGameData(arr: any) {
        let cmd = JSON.stringify(arr);
        console.log("the send data: " + cmd);
        this.WebSocket.writeUTF(cmd);
    }

    //socket获得数据之后的处理，测试git
    private onReceiveMessage(): void {
        let msg = this.WebSocket.readUTF();
        let recData = JSON.parse(msg);

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
                this.game[`ship_${recData.player}p`].goOn();
                break;
        }
    }

    private beginGame(): void {
        if (this.game == null) {
            this.game = new GameScene(this.player);
        }
        this.GameStage.addChild(this.game);
    }

    private createGame(): void {

        if (this.player == 1) {
            if (this.data == null) {
                this.data = [];
                let arr: Object[] = RES.getRes("mission_json");
                for (let i: number = 0; i < arr.length; i++) {
                    let vo: MonsterVO = new MonsterVO();
                    vo.id = parseInt(arr[i]['id']);
                    vo.image = arr[i]['image'];
                    vo.max_num = parseInt(arr[i]['max_num']);
                    vo.left = parseInt(arr[i]['left']);
                    vo.pos = parseInt(arr[i]['pos']);
                    vo.movetype = parseInt(arr[i]['movetype']);
                    vo.speedtime = parseInt(arr[i]['speedtime']);
                    vo.score = parseInt(arr[i]['score']);

                    for (let j: number = 0; j < vo.max_num; j++) {
                        this.data.push(vo);
                    }
                }
            }

            let moArr: MonsterVO[] = this.data;
            if (moArr != null) {
                var monsterRandomData = [];
                for (let i: number = 0; i < moArr.length; i++) {
                    let y = Math.random() * 300 + 240;
                    monsterRandomData.push(y);
                }
            }

            this.sendGameData(new SendData('vo', 1, { data: moArr, monsterRandomData: monsterRandomData }));
        }
    }

    public startGame(): void {
        this.removeMain();

        this.WebSocket = new egret.WebSocket();
        this.WebSocket.addEventListener(egret.ProgressEvent.SOCKET_DATA, this.onReceiveMessage, this);
        this.WebSocket.addEventListener(egret.Event.CONNECT, this.onSocketOpen, this);
        this.WebSocket.connect("192.168.10.210", 8001);
    }

    public removeGame(): void {
        if (this.game != null && this.game.parent != null) {
            this.game.parent.removeChild(this.game);
        }
    }
}
