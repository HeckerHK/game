class SendData {
	public constructor(type:string,player:number,gameData:any) {
		this.type = type;
		this.player = player;
		this.gameData = gameData;
	}
	public type:string;
	public player:number;
	public gameData:any;
}