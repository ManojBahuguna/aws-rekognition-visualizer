const sampleVideoUrl =
  "https://upload.wikimedia.org/wikipedia/commons/transcoded/4/4e/Forest_How_Squirrels_%288042953618%29_-_video.webm/Forest_How_Squirrels_%288042953618%29_-_video.webm.240p.webm";

/** [startTime, endTime, left, top, width, height][] */
const squirrelTimestamps = [
  [0, 7000, 0.52, 0.45, 0.2, 0.4],
  [7000, 43500, 0.48, 0.3, 0.2, 0.4],
  [43500, 45000, 0.7, 0.4, 0.2, 0.4],
];

const sampleData = {
  VideoMetadata: {
    FrameWidth: 427,
    FrameHeight: 240,
  },
  Persons: squirrelTimestamps.map(
    ([_startTimestamp, _endTimestamp, Left, Top, Width, Height]) => ({
      _startTimestamp,
      _endTimestamp,
      Person: { Face: { BoundingBox: { Left, Top, Width, Height } } },
      FaceMatches: [{ Face: { ExternalImageId: "Squirrel" } }],
    })
  ),
};

function playSample() {
  videoUrlElement.value = sampleVideoUrl;
  dataElement.value = JSON.stringify(sampleData, null, 1);
  document.querySelector("#Play").click();
}

document.querySelector("#PlaySample").addEventListener("click", playSample);
