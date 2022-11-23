/**
 * Copyright (c) Valkyrie Foundation. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create an instance of ValkyrieWrapper and pass it the parent/wrapper window as well as an implementation of `ValkyrieReceiver`
 * 
 * ``` typescript
 * const vw = new ValkyrieWrapper(window.parent, window, receiverImpl);
 * // Call init to register all listeners
 * const removeListeners = vm.init();
 * //...
 * removeListeners();
 * ```
 * 
 * Calling `init()` the instance will set up listeners on window to listen for messages from wrapper.
 * Use ValkyrieWrapper methods to post messages to wrapper.
 * 
 * Create an implementation of `ValkyrieReceiver` and pass it to `ValkyrieWrapper`. Its methods will be called when wrapper posts messages.
 */
export class ValkyrieWrapper {
  parent: Window;
  target: EventTarget;
  receiver: ValkyrieReceiver | undefined
  /**
   * Used to post messages to parent window
   * @param parent parent window to postMessage events to
   * @param currTarget target to listen on postMessage events. Most likely `window`
   * @param receiver implementation to receive messages from parent window
   */
  constructor(parent: Window, currTarget: EventTarget, receiver?: ValkyrieReceiver) {
    this.parent = parent;
    this.target = currTarget;
    this.receiver = receiver;
  }
  /**
   * call init after creating an instance, to set up listeners.
   * ``` typescript
   * const vm = new ValkyrieWrapper(window.parent, window, receiverImpl);
   * const removeListeners = vm.init();
   * //....
   * // to remove listeners call returned function from init
   * removeListeners();
   * ```
   * @returns function to remove event listeners
   */
  init(): () => void {
    const listener = (e: Event) => {
      const m = e as MessageEvent;
      switch (m?.data?.type) {
        case "VALKYRIE_AUTOPLAY":
          const ap = m.data as Autoplay;
          this.receiver.autoPlay?.(ap.action);
          break;
        case "VALKYRIE_VOLUME":
          const muted: boolean = m.data.muted;
          this.receiver.volume?.(muted);
          break;
        case "VALKYRIE_REFRESH_BALANCE":
          this.receiver.refreshBalance?.()
          break;
      }
    }
    if (this.receiver) {
      this.target.addEventListener("message", listener);
    }
    return () => { this.target.removeEventListener("message", listener); }
  }
  /**
  * Call once the game is loaded and has the UI ready to be shown to the player.
  * Should not be called while the game is still in process of loading assets etc
  */
  gameLoaded() {
    this.parent.postMessage({ type: "VALKYRIE_LOAD_DONE" }, '*');
  }
  /**
   * Call when game fails to load.
   * The wrapper can perform logging and automatic retries to try and recover.
   * @param errorMsg will end up on error property of sent message
   */
  gameLoadError(errorMsg: string) {
    this.parent.postMessage({ type: "VALKYRIE_LOAD_ERROR", error: errorMsg }, '*');
  }
  /**
   * Call when game becomes idle (betting time). 
   * Idle time can be used by the wrapper to display regulatory popups etc.
   */
  gameIdle() {
    this.parent.postMessage({ type: "VALKYRIE_IDLE" }, '*');
  }
  /**
   * Call when game starts with player participation. 
   * Wrapper will avoid displaying any UI overlays while the game is busy.
   */
  gameBusy() {
    this.parent.postMessage({ type: "VALKYRIE_BUSY" }, '*');
  }
  /**
   * Call when a Cashier or Deposit button is pressed within the game to instruct the wrapper to open the appropriate UI for that.
   */
  openCashier() {
    this.parent.postMessage({ type: "VALKYRIE_OPEN_CASHIER" }, '*');
  }
  /**
   * Call when a Lobby or Home button is pressed within the game.
   * The wrapper will be closed and user will be navigated to lobby or licensee page depending on casino configuration
   */
  openLobby() {
    this.parent.postMessage({ type: "VALKYRIE_OPEN_LOBBY" }, '*');
  }
}

type Autoplay = {
  type: string;
  action: "pause" | "resume" | "stop";
}

/**
 * Interface to be implemented per provider
 */
export interface ValkyrieReceiver {
  /**
   * Called when wrapper needs to control autoplay (if it has been started within the game).
   */
  autoPlay?: (action: "pause" | "resume" | "stop") => void
  /**
   * Called when the game volume should be changed, muted or not.
   */
  volume?: (muted: boolean) => void
  /**
   * Called when wrapper receives information that balance has been changed on the backend. 
   * If provider does not receive such updates automatically, balance refresh should be initiated upon receiving this message.
   */
  refreshBalance?: () => void
}