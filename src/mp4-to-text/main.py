import speech_recognition as sr
import subprocess
import os
import sys
import urllib.parse


converter = os.path.join(os.path.dirname(os.path.normpath(__file__)), "ffmpeg", "bin", "ffmpeg.exe")
path_mp4 = os.path.join(os.path.dirname(os.path.normpath(__file__)), "input.mp4")
path_wav = os.path.join(os.path.dirname(os.path.normpath(__file__)), "audio.wav")

if os.path.exists(path_wav):
    os.unlink(path_wav)
# convert mp4 to wav
subprocess.call([converter, "-i", path_mp4, path_wav])

# speech recognition
r = sr.Recognizer()
data = sr.AudioFile(path_wav)

with data as source:
    audio = r.record(source)
try:
    txt = r.recognize_google(audio, language="vi-VN")
except sr.UnknownValueError:
    txt = "noise!!!"
print(urllib.parse.quote(txt))