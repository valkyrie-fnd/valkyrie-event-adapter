/**
 * Copyright (c) Valkyrie Foundation. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

/**
 * Create an instance of ValkyrieWrapper and pass it the parent/wrapper window as well as an implementation of `ValkyrieReceiver`
 * 
 * ```
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
   * ```
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
      if (m?.data?.type === "VALKYRIE_AUTOPLAY") {
        const ap = m.data as Autoplay;
        this.receiver.autoPlay(ap.action);
      }
    }
    if (this.receiver) {
      this.target.addEventListener("message", listener);
    }
    return () => { this.target.removeEventListener("message", listener); }
  }
  /**
  * Send VALKYRIE_LOAD_DONE message to parent
  */
  gameLoaded() {
    this.parent.postMessage({ type: "VALKYRIE_LOAD_DONE" }, '*');
  }
  /**
   * Send VALKYRIE_LOAD_ERROR message to parent
   * @param errorMsg will end up on error property of sent message
   */
  gameLoadError(errorMsg: string) {
    this.parent.postMessage({ type: "VALKYRIE_LOAD_ERROR", error: errorMsg }, '*');
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
  autoPlay: (action: "pause" | "resume" | "stop") => {}
}