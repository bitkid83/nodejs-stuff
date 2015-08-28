// generates a serial with a 3 character product code at the start
// example: product code "TST", serial TST1H-DFEON-47ZL4-MIWOO-3UIOS

function GenerateSerial(productCode, subsets)
{
	var serialNum = productCode;
    	var charSet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
	//var subsets = 5;
	
	for (var generations = 0; generations < subsets; generations++) {
		
		// first subset block with product code
		if (generations === 0) {
			for (var initial = 0; initial < 2; initial++) {
				serialNum += charSet.charAt(Math.floor(Math.random() * charSet.length));
			}
		} else {
			// additional subset blocks
			for( var remain = 0; remain < 5; remain++ ) {
				serialNum += charSet.charAt(Math.floor(Math.random() * charSet.length));
			}
		}
		
		if (generations < subsets - 1)
			serialNum += "-";
	}

    return serialNum;
}

var maxSerials = 100;
var tempSerial = "";
var serialsList = new Array(maxSerials);

for (var i = 0; i < maxSerials; i++) {	
	tempSerial = GenerateSerial("TST", 5);
	serialsList[i] = tempSerial;
	//console.log(serialsList[i]);
}

// check for duplicate serials
var startTime = process.hrtime();

for (var j = 0; j < maxSerials; j++) {	
	for (var x = 0; x < maxSerials; x++) {
		console.log("Checking %s against %s", serialsList[j], serialsList[x]);
		if ((x != j) && serialsList[x] === serialsList[j]) {
			console.log("dupe found!");
			break;
		}
	}
}

startTime = process.hrtime(startTime);
console.log("check took %d sec and %d ms", startTime[0], startTime[1]/1000000);
