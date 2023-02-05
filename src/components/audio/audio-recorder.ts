

let audioBlobs: Blob[] = [];
let mediaRecorder: MediaRecorder | null;
let streamBeingCaptured: MediaStream | null;



const audioRecorder = {
    
    /** 
      * @returns {Promise} - returns a promise that resolves if audio recording successfully started
      */
    start: (): Promise<any> => {
        if (!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) {
            //Feature is not supported in browser
            //return a custom error
            return Promise.reject(
                new Error('mediaDevices API or getUserMedia method is not supported in this browser.')
            );
        }
        else {
            return navigator.mediaDevices
                .getUserMedia({ audio: true })
                .then((stream)  => {
                    streamBeingCaptured = stream;
                    mediaRecorder = new MediaRecorder(stream);
                    audioBlobs = [];

                    mediaRecorder.addEventListener("dataavailable", event => {
                        audioBlobs.push(event.data);
                    });

                    mediaRecorder.start();
                });
        }
    },

    /** 
      * @returns {Promise} - returns a promise that resolves to the audio as a blob file
      */
    stop: function () {
        return new Promise(resolve => {
            if (mediaRecorder == null) {
                return;
            }

            const mimeType = mediaRecorder.mimeType;
 
            mediaRecorder.addEventListener("stop", () => {
                const audioBlob = new Blob(audioBlobs, { type: mimeType });
                resolve(audioBlob);
            });
 
            mediaRecorder.stop();
    
            audioRecorder.stopStream();
            audioRecorder.resetRecordingProperties();
        });
    },
    
    cancel: function () {
        if (mediaRecorder == null) {
            return;
        }

         mediaRecorder.stop();
 
         audioRecorder.stopStream();
         audioRecorder.resetRecordingProperties();
    },

    stopStream: function() {
        if (streamBeingCaptured == null) {
            return;
        }

        streamBeingCaptured
            .getTracks()
            .forEach(track => track.stop());
    },

    resetRecordingProperties: function () {
        mediaRecorder = null;
        streamBeingCaptured = null;
 
    }
}


export default audioRecorder;

