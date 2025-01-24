export default function useCamera() {
  async function getCameraList() {
    try {
      const deviceList = await navigator.mediaDevices.enumerateDevices();

      const cameraList = deviceList.filter((item) => item.kind == "videoinput");

      return cameraList;
    } catch (error) {
      console.error(error);

      return [];
    }
  }

  async function openCamera(
    cameraId: ConstrainDOMString,
    video: HTMLVideoElement,
    width: number,
    height: number
  ) {
    if (video) {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { width, height, deviceId: cameraId },
        audio: false,
      });
      video.srcObject = stream;
      video.play();

      return stream;
    }
  }

  function closeCamera(stream: MediaStream) {
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

  return { getCameraList, openCamera, closeCamera };
}
