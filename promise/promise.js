let wait5s = function () {
	return new Promise((resolve, reject) => {
		setTimeout(function () {
			reject('gap loi roi');
		}, 3000)
	});
};
//
// wait5s().then((data) => {
// 	console.log(data);
// }).then(wait5s).then((data) => {
// 	console.log(data);
// }).catch((e) => {
// 	console.log(e);
// });

const asyncFun = async () => {
	try {
		console.log('start');

		let data = await wait5s();
		console.log(data);

		let data1 = await wait5s();
		console.log(data1);

		let data2 = await wait5s();
		console.log(data2);

		let data3 = await wait5s();
		console.log(data3);
	} catch (e) {
		console.log(e);
	}
};

asyncFun();