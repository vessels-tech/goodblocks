const GetSheetDone = require('get-sheet-done');

//sharing url: https://docs.google.com/spreadsheets/d/e/2PACX-1vRskXaHumpIGUdLXJmW3sM14YNNsCAfnEmWJHd8xYKrOYoFWP_gRqdyG29CiWEwWWC2jkMv25PeolQm/pubhtml
const  DOC_KEY = '14BPQIqnDUTyinkp9eJ7bwYwsg22RJz0AVU9vOSSU94o';


GetSheetDone.raw(DOC_KEY).then(sheet => {
    console.log(sheet)
});
