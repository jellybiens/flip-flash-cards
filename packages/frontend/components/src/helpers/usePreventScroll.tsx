function preventDefault(this: Window, e: WheelEvent) {
  e.preventDefault();
  return false;
}
// call this to Disable
function disableScroll() {
  window.addEventListener('wheel', preventDefault, { passive: false }); // modern desktop
}

// call this to Enable
function enableScroll() {
  window.removeEventListener('wheel', preventDefault);
}
/*
 * [disableScrollFunction, enableScrollFunction]
 */
export const usePreventScroll = (): {
  disableScroll: () => void;
  enableScroll: () => void;
} => {
  return { disableScroll, enableScroll };
};
