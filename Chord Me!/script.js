import * as Tone from 'tone';

const audioContext = new Tone.AudioContext();

const startBtn = document.getElementById('start-btn');
const chordDisplay = document.getElementById('chord-display');

startBtn.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    const source = audioContext.createMediaStreamSource(stream);
    const analyser = new Tone.Analyser('chord', 2048);
    source.connect(analyser);

    setInterval(() => {
      const chord = analyser.getValue();
      chordDisplay.innerHTML = chord ? `Chord: ${chord}` : 'No chord detected';
    }, 1000);
  } catch (error) {
    console.log(error);
  }
});