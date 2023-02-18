// Create an AudioContext
const audioContext = new AudioContext();

// Create a PitchDetectorNode
const pitchDetector = new PitchDetectorNode(audioContext);

// Create a variable to store the current chord
let currentChord = null;

// Retrieve the start and stop buttons from the HTML
const startButton = document.getElementById('start-button');
const stopButton = document.getElementById('stop-button');

// Add a click event listener to the start button
startButton.addEventListener('click', async () => {
    try {
        // Disable the start button and enable the stop button
        startButton.disabled = true;
        stopButton.disabled = false;

        // Get the user's microphone and create a MediaStreamAudioSourceNode from the audio stream
        const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
        const source = audioContext.createMediaStreamSource(stream);

        // Connect the source to the pitch detector and the pitch detector to the destination
        source.connect(pitchDetector);
        pitchDetector.connect(audioContext.destination);

        // Add a callback function to the onnote event of the pitch detector
        pitchDetector.onnote = (note) => {
            if (note !== null) {
                // Check if the note is part of a chord
                const chord = Chord.detect(note, { chordType: 'full' });

                if (chord !== null) {
                    // If the note is part of a chord, update the current chord
                    currentChord = chord;
                }
            } else {
                // If there is no note, the current chord is null
                currentChord = null;
            }
        };

        // Start the pitch detector
        pitchDetector.start();

        // Call the updateChordsList function to start updating the chords list
        requestAnimationFrame(updateChordsList);
    } catch (error) {
        console.error(error);
    }
});

// Add a click event listener to the stop button
stopButton.addEventListener('click', () => {
    // Disable the stop button and enable the start button
    stopButton.disabled = true;
    startButton.disabled = false;

    // Stop the pitch detector
    pitchDetector.stop();

    // Stop the microphone stream
    const stream = pitchDetector.stream;
    if (stream !== null) {
        const tracks = stream.getTracks();
        tracks.forEach(track => track.stop());
    }

    // Clear the current chord and the chords list
    currentChord = null;
    const chordsList = document.getElementById('chords-list');
    chordsList.innerHTML = '';
});

// Add a function to update the chords list
function updateChordsList() {
    const chordsList = document.getElementById('chords-list');

    if (currentChord !== null) {
        // If there is a current chord, add it to the list
        const chordElement = document.createElement('li');
        chordElement.innerText = currentChord.name;
        chordsList.appendChild(chordElement);
    } else {
        // If there is no current chord, clear the list
        chordsList.innerHTML = '';
    }

    // Call this function again on the next animation frame
    requestAnimationFrame(updateChordsList);
}