class SendData {
	public constructor(type:string,gameData:any) {
		this.type = type;
		this.userid = GameLogic.getInstance().userId;
		this.roomId = GameLogic.getInstance().roomId;
		this.player = GameLogic.getInstance().player;
		this.gameData = gameData;
	}
	public type:string;
	public userid:number;
	public player:number;
	public gameData:any;
	public roomId:number;
}