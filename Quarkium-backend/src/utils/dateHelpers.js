// backend/src/utils/dateHelpers.js

// Convierte "09:30:00" a 570 (minutos)
exports.timeToMinutes = (timeStr) => {
  const [h, m] = timeStr.split(":").map(Number);
  return h * 60 + m;
};

// Convierte 570 a "09:30"
exports.minutesToTime = (mins) => {
  const h = Math.floor(mins / 60)
    .toString()
    .padStart(2, "0");
  const m = (mins % 60).toString().padStart(2, "0");
  return `${h}:${m}`;
};
