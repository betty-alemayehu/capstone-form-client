// src/utils/poseDatabase.js

export const poseDatabase = {
  // mountain: {
  //   name: "Mountain Pose",
  //   conditions: (landmarks) => {
  //     const leftAnkle = landmarks[27];
  //     const rightAnkle = landmarks[28];
  //     const leftKnee = landmarks[25];
  //     const rightKnee = landmarks[26];

  //     const feetClose = Math.abs(leftAnkle.x - rightAnkle.x) < 0.1;
  //     const kneesAligned = Math.abs(leftKnee.x - rightKnee.x) < 0.1;

  //     return feetClose && kneesAligned;
  //   },
  //   feedback:
  //     "Great job! You're standing upright with feet together for Mountain Pose.",
  // },
  extendedHandToToe: {
    name: "Extended Hand-to-Big-Toe Pose (Utthita Hasta Pādāṅguṣṭhāsana)",
    conditions: (landmarks) => {
      const leftHand = landmarks[15];
      const rightHand = landmarks[16];
      const leftFoot = landmarks[27];
      const rightFoot = landmarks[28];
      const leftHip = landmarks[23];
      const rightHip = landmarks[24];

      // Conditions:
      // 1. One hand reaches to the same-side foot.
      // 2. The lifted leg is extended forward or to the side.
      // 3. The torso is upright and hips are relatively level.

      // Check left leg extension:
      const isLeftLegExtended =
        leftFoot.y < leftHip.y && Math.abs(leftFoot.x - leftHand.x) < 0.2;

      // Check right leg extension:
      const isRightLegExtended =
        rightFoot.y < rightHip.y && Math.abs(rightFoot.x - rightHand.x) < 0.2;

      // Hips level:
      const areHipsLevel = Math.abs(leftHip.y - rightHip.y) < 0.1;

      return (isLeftLegExtended || isRightLegExtended) && areHipsLevel;
    },
    feedback: "Well done! Keep your torso upright for ExtendedHandToToe",
  },
};
