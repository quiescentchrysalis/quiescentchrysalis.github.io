import * as Tone from 'tone';

const startBtn = document.getElementById('start-btn');
const chordDisplay = document.getElementById('chord-display');
let audioContext = null;
let analyser = null;

startBtn.addEventListener('click', async () => {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new Tone.Context();
    const source = audioContext.createMediaStreamSource(stream);
    analyser = new Tone.Analyser('chord', 2048);
    source.connect(analyser);

    Tone.Transport.start();
    Tone.context.resume();

    setInterval(() => {
      const chord = analyser.getValue();
      chordDisplay.innerHTML = chord ? `Chord: ${chord}` : 'No chord detected';
    }, 1000);
  }
  catch (error) {
    console.log(error);
  }
  if (audioContext.state === 'suspended') {
    await audioContext.resume();
  }
  
  if (analyser.context.state === 'suspended') {
    await analyser.context.resume();
  }
  
  if (!Tone.context.rawContext.isRunning) {
    await Tone.context.rawContext.resume();
  }
  
  await Tone.start();
  
  if (typeof toneUserGesture !== 'undefined') {
    await Tone.start();
  }
  
});
