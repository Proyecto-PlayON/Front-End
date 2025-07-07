export function removeBackgroundVideo() {
  const video = document.querySelector('.video-background');
  const overlay = document.querySelector('.overlay');
  if (video) video.remove();
  if (overlay) overlay.remove();
}