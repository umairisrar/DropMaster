export const checkLastTime = (time: Date) => {
  const lastCheckTime = new Date(time);
  const now = new Date();
  const timeElapsed = now.getTime() - lastCheckTime.getTime();

  let displayTime;
  if (timeElapsed < 60000) {
    // 1 minute
    let time = Math.round(timeElapsed / 1000);
    displayTime = ` ${time < 30 ? "10" : time < 60 ? "50" : "60"} sec ago`;
  } else if (timeElapsed < 3600000) {
    // 1 hour
    displayTime = `${Math.round(timeElapsed / 60000)} mins ago`;
  } else if (timeElapsed < 86400000) {
    // 1 day
    displayTime = `${Math.round(timeElapsed / 3600000)} hrs ago`;
  } else {
    displayTime = `${Math.round(timeElapsed / 86400000)} days ago`;
  }
  // Display the time
  return displayTime;
};
