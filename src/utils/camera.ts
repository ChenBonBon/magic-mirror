export async function openCamera(video: HTMLVideoElement) {
  if (video) {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { width: 715, height: 715 },
      audio: false,
    });
    video.srcObject = stream;
    video.play();

    return stream;
  }
}

export function closeCamera(stream: MediaStream) {
  stream
    .getTracks()
    .forEach(function (track: {
      readyState: string;
      kind: string;
      stop: () => void;
    }) {
      if (track.readyState == "live" && track.kind === "video") {
        track.stop();
      }
    });
}
