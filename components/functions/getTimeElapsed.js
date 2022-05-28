export default function getTimeElapsed(timeElapsed) {
  const seconds = Math.round(timeElapsed / 1000);
  const minutes = Math.round(timeElapsed / 60000);
  const hours = Math.round(timeElapsed / 3600000);
  const days = Math.floor(timeElapsed / (24 * 3600000));
  const years = Math.floor(timeElapsed / (24 * 3600000 * 365));
  return timeElapsed < 60000
    ? seconds + (seconds < 2 ? " second" : " seconds")
    : timeElapsed < 3600000
    ? minutes + (minutes < 2 ? " minute" : " minutes")
    : timeElapsed < 24 * 3600000
    ? hours + (hours < 2 ? " hour" : " hours")
    : timeElapsed < 24 * 3600000 * 365
    ? days + (days < 2 ? " day" : " days")
    : years + (years < 2 ? " year" : " years");
}
