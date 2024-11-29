// src/utils/poseDatabase.js

export const poseDatabase = {
  mountain: {
    name: "Mountain Pose",
    conditions: (landmarks) => {
      const leftAnkle = landmarks[27];
      const rightAnkle = landmarks[28];
      const leftKnee = landmarks[25];
      const rightKnee = landmarks[26];
      const leftHip = landmarks[23];
      const rightHip = landmarks[24];

      const feetClose = Math.abs(leftAnkle.x - rightAnkle.x) < 0.1;
      const kneesAligned = Math.abs(leftKnee.x - rightKnee.x) < 0.1;

      return feetClose && kneesAligned;
    },
    feedback:
      "Great job! You're standing upright with feet together for Mountain Pose.",
  },
  tree: {
    name: "Tree Pose",
    conditions: (landmarks) => {
      const leftKnee = landmarks[25];
      const rightKnee = landmarks[26];
      const leftAnkle = landmarks[27];
      const leftHip = landmarks[23];

      const leftLegLifted = leftKnee.y < leftHip.y && leftAnkle.y < leftHip.y;
      const rightLegLifted =
        rightKnee.y < landmarks[24].y && landmarks[28].y < landmarks[24].y;

      return leftLegLifted || rightLegLifted;
    },
    feedback:
      "Great job! You're raising one leg to balance and form Tree Pose.",
  },
};
