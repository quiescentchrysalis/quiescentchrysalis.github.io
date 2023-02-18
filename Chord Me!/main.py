import pyaudio
import numpy as np
from music21 import *

# Set up PyAudio
CHUNK = 1024
FORMAT = pyaudio.paInt16
CHANNELS = 1
RATE = 44100
RECORD_SECONDS = 5

p = pyaudio.PyAudio()

# Open microphone stream
stream = p.open(format=FORMAT,
                channels=CHANNELS,
                rate=RATE,
                input=True,
                frames_per_buffer=CHUNK)

print("Recording...")

# Record audio data
frames = []
for i in range(0, int(RATE / CHUNK * RECORD_SECONDS)):
    data = stream.read(CHUNK)
    frames.append(data)

print("Recording finished.")

# Stop recording
stream.stop_stream()
stream.close()
p.terminate()

# Convert audio data to numpy array
audio_data = np.frombuffer(b''.join(frames), dtype=np.int16)

# Use music21 to analyze the audio data
audio_stream = stream.Stream()
for i in range(len(audio_data)):
    audio_stream.append(note.Note(audio_data[i]))

chords = audio_stream.chordify()
chord = chords[-1]

# Output the detected chord
if chord.isChord:
    print("Detected chord: ", chord.pitchedCommonName)
else:
    print("No chord detected.")