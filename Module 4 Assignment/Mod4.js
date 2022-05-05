let varNames = new Array();
varNames[0] = "Yaakov";
varNames[1] = "John";
varNames[2] = "Jen";
varNames[3] = "jason";
varNames[4] = "paul";
varNames[5] = "frank";
varNames[6] = "larry";
varNames[7] = "paula";
varNames[8] = "laura";
varNames[9] = "jim";


for (var i = 0; i < varNames.length; i++) {
    if (varNames[i].charAt(0) === 'J' || varNames[i].charAt(0) === 'j') {
        console.log("Goodbye " + varNames[i])
    } else {
        console.log("Hello " + varNames[i])
    }
}