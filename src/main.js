const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const video = document.querySelector("video");
const videoUrlElement = document.querySelector("#VideoURL");
const dataElement = document.querySelector("#Data");

function drawBoundingBox(boundingBox, label, width, height) {
  const x = boundingBox.Left * width;
  const y = boundingBox.Top * height;
  const w = boundingBox.Width * width;
  const h = boundingBox.Height * height;

  ctx.strokeStyle = "white";
  ctx.lineWidth = 2;
  ctx.strokeRect(x, y, w, h);

  ctx.font = "bold 32px sans-serif";
  ctx.fillStyle = "white";

  if (label) ctx.fillText(label, x, y);
}

function getBoundingBoxesForTime(data, timeInMS, offset = 200) {
  return data.Persons.filter(
    (person) =>
      person.Timestamp > timeInMS - offset &&
      person.Timestamp < timeInMS + offset
  );
}

let lastFrame;
function play() {
  if (lastFrame) {
    cancelAnimationFrame(lastFrame);
    lastFrame = null;
  }

  video.currentTime = 0;
  video.src = videoUrlElement.value;
  video.play();

  const data = JSON.parse(dataElement.value || null);
  if (!data) {
    alert("No data found!");
    return;
  }

  const width = data.VideoMetadata.FrameWidth;
  canvas.width = width;
  video.width = width;

  const height = data.VideoMetadata.FrameHeight;
  canvas.height = height;
  video.height = height;

  
  function loop() {
    ctx.clearRect(0, 0, width, height);
    getBoundingBoxesForTime(data, video.currentTime * 1000).forEach((box) => {
      drawBoundingBox(
        box.Person.Face.BoundingBox,
        box.FaceMatches[0]?.Face.ExternalImageId,
        width,
        height
      );
    });

    lastFrame = requestAnimationFrame(loop);
  }
  loop();
}

document.querySelector("#Play").onclick = play;





// autofill example data
