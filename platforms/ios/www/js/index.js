
document.addEventListener("deviceready", init, false);

function init() {
    console.log("This device is ready to start!");
}

function onPrompt(results) {
    console.log("User did decision.");
    console.log("Pressed button is :" + results.buttonIndex);
    console.log("Entered text is :" + results.input1);
    if (results.buttonIndex == 1) {
        saveTextToFile(results.input1);        
    }
}

function myFunction() {
    navigator.notification.prompt(
        'Please enter the text you would like to save!',  // message
        onPrompt,                  // callback to invoke
        'Registration',            // title
        ['Ok','Exit'],             // buttonLabels
        'Hello World'                 // defaultText
    );
}

function fail(e) {
    console.log("FileSystem Error");
    console.dir(e);
}

function saveTextToFile(theText) {

    console.log("Start to save data");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        
        console.log("Filesystem loaded");
        console.log(fileSystem.root);

        console.log("Create file and write");

        fileSystem.root.getFile("test.txt", {create: true, exclusive: false}, function (fileEntry) {
                fileEntry.createWriter( function (fileWriter) {
                console.log("Create file and write");
                fileWriter.write(theText);  
            }, fail);
        }, fail);
    }, fail);
}

function loadDataFromDevice() {
    console.log("Start to load data");
    window.requestFileSystem(LocalFileSystem.PERSISTENT, 0, function (fileSystem) {
        console.log("Filesystem request successfully");
        console.log(fileSystem.root.nativeURL);
        fileSystem.root.getFile("test.txt", {create: true, exclusive: false}, function (fileEntry) {
            console.log(fileEntry);
            fileEntry.file( function (file) {
                console.log(file);
                var reader = new FileReader();

                reader.onloadend = function (e) {
                    console.log(e.target.result);
                    navigator.notification.alert(
                        e.target.result,  // message
                        function () {},         // callback
                        'Game Over',            // title
                        'Done'                  // buttonName
                    );
                };
                reader.readAsText(file);
            });
        }, fail);
    }, fail);
}
