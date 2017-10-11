/**
 * Created by franc on 03/10/2017.
 */
const config = {
    apiKey: "AIzaSyDI2W6Cj-8-4sAx5GpxM7ZDahAcCUOo0HU",
    authDomain: "introducing-node-js.firebaseapp.com",
    databaseURL: "https://introducing-node-js.firebaseio.com",
    projectId: "introducing-node-js",
    storageBucket: "introducing-node-js.appspot.com",
    messagingSenderId: "406305413917"
};
firebase.initializeApp(config);
const storage = firebase.storage();
const storageRef = storage.ref();



function setImage() {
    var starsRef = storageRef.child('MiniosFondo.jpg');

// Get the download URL
    starsRef.getDownloadURL().then(function(url) {
        var img = document.getElementById("img1");
        img.src = url;
        img.onclick = function () {
            var win = window.open(url, '_blank');
            win.focus();
        }
    }).catch(function(error) {

        // A full list of error codes is available at
        // https://firebase.google.com/docs/storage/web/handle-errors
        switch (error.code) {
            case 'storage/object_not_found':
                // File doesn't exist
                break;

            case 'storage/unauthorized':
                // User doesn't have permission to access the object
                break;

            case 'storage/canceled':
                // User canceled the upload
                break;

            case 'storage/unknown':
                // Unknown error occurred, inspect the server response
                break;

            default:
                break;
        }
    });
}

function readUserData() {
    var user = firebase.database().ref('messages/' + 1);
    user.on('value', function(snapshot) {
        var i = snapshot.val();
        document.getElementById("text").innerHTML = i.text;
    });
}

function sendFile(file,dropzone) {

// Create the file metadata
    var metadata = {
        contentType: 'image/jpeg'
    };

// Upload file and metadata to the object 'images/mountains.jpg'
    var uploadTask = storageRef.child(file.name).put(file, metadata);

// Listen for state changes, errors, and completion of the upload.
    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED, // or 'state_changed'
        function(snapshot) {
            // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
            var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
            dropzone.on("totaluploadprogress", function(progressBar) {
                progressBar = progress
            });
            console.log('Upload is ' + progress + '% done');
            switch (snapshot.state) {
                case firebase.storage.TaskState.PAUSED: // or 'paused'
                    console.log('Upload is paused');
                    break;
                case firebase.storage.TaskState.RUNNING: // or 'running'
                    console.log('Upload is running');
                    break;
            }
        }, function(error) {
            console.log('Error');
        }, function() {
            dropzone.on("success", function(file,messege) {

            });
            var downloadURL = uploadTask.snapshot.downloadURL;
        });

}