class RecData {
	public constructor(data: string) {
		let tmp = data.split(',');
		let leng = tmp.length;
		this.leftHook = { x: tmp[0], y: tmp[1], hookedFishType: tmp[leng - 3], hasHooked: tmp[leng - 4], score: tmp[leng - 6] };
		this.rightHook = { x: tmp[2], y: tmp[3], hookedFishType: tmp[leng - 1], hasHooked: tmp[leng - 2], score: tmp[leng - 5] };
		this.fishCount = +tmp[4];
		let tmpArr = [];
		for (let i = 0; i < +tmp[4]; i++) {
			let tmpObj = {
				x: tmp[i * 4 + 5],
				y: tmp[i * 4 + 6],
				type: tmp[i * 4 + 7],
				direction: tmp[i * 4 + 8]
			}
			tmpArr.push(tmpObj);
		}
		this.fishList = tmpArr;
	}
	public leftHook;
	public rightHook;
	public fishCount: number;
	public fishList: Object[];
}