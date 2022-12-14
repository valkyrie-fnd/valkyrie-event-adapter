import { ValkyrieWrapper, ValkyrieReceiver } from '../src/valkyrie-wrapper';

// window.postMessage is async so we need to wait for the listener
function flushMessageQueue(ms = 0) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

describe("Listeners are set up on init", () => {
  let vr: ValkyrieReceiver;
  beforeAll(() => {
    vr = {
      autoPlay: jest.fn(),
      volume: jest.fn(),
      refreshBalance: jest.fn(),
    };
  });
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("AutoPlay is triggered", async () => {
    const vw = new ValkyrieWrapper(window, window, vr);
    const rl = vw.init();
    window.postMessage({ type: "VALKYRIE_AUTOPLAY", action: "pause" }, '*');
    await flushMessageQueue();
    expect(vr.autoPlay).toHaveBeenCalledWith("pause");
    rl();
  });

  test("Volume is triggered", async () => {
    const vw = new ValkyrieWrapper(window, window, vr);
    const rl = vw.init();
    window.postMessage({ type: "VALKYRIE_VOLUME", muted: true }, '*');
    await flushMessageQueue();
    expect(vr.volume).toHaveBeenCalledWith(true);
    rl();
  });

  test("Refresh is triggered", async () => {
    const vw = new ValkyrieWrapper(window, window, vr);
    const rl = vw.init();
    window.postMessage({ type: "VALKYRIE_REFRESH_BALANCE" }, '*');
    await flushMessageQueue();
    expect(vr.refreshBalance).toHaveBeenCalled();
    rl();
  });

  test("and are removed when callback is called", async () => {
    const vw = new ValkyrieWrapper(window, window, vr);
    const rl = vw.init();
    window.postMessage({ type: "VALKYRIE_AUTOPLAY", action: "pause" }, '*');
    await flushMessageQueue();
    expect(vr.autoPlay).toHaveBeenCalledWith("pause");
    rl();
    window.postMessage({ type: "VALKYRIE_VOLUME", muted: true }, '*');
    await flushMessageQueue();
    expect(vr.volume).not.toHaveBeenCalled();
  });

  describe("if interface is not implemented", () => {

    test("autoplay will not throw error", async () => {
      const vw = new ValkyrieWrapper(window, window, {});
      const rl = vw.init();
      window.postMessage({ type: "VALKYRIE_AUTOPLAY", action: "pause" }, '*');
      await flushMessageQueue();
      rl();
      // No expect since test will fail if error is thrown
    });
    test("volume will not throw error", async () => {
      const vw = new ValkyrieWrapper(window, window, {});
      const rl = vw.init();
      window.postMessage({ type: "VALKYRIE_VOLUME", muted: true }, '*');
      await flushMessageQueue();
      rl();
      // No expect since test will fail if error is thrown
    });
    test("refresh balance will not throw error", async () => {
      const vw = new ValkyrieWrapper(window, window, {});
      const rl = vw.init();
      window.postMessage({ type: "VALKYRIE_REFRESH_BALANCE", action: "pause" }, '*');
      await flushMessageQueue();
      rl();
      // No expect since test will fail if error is thrown
    });
  });
});

describe("sending messages to parent", () => {
  let vw: ValkyrieWrapper;
  beforeAll(() => {
    jest.spyOn(window, "postMessage");
    vw = new ValkyrieWrapper(window, window, {});
  });
  afterEach(() => {
    jest.clearAllMocks();
  })
  test("gameLoaded", () => {
    vw.gameLoaded();
    expect(window.postMessage)
      .toHaveBeenCalledWith(expect.objectContaining({ type: "VALKYRIE_LOAD_DONE" }), '*');
  });
  test("gameLoadError", () => {
    vw.gameLoadError("some error");
    expect(window.postMessage)
      .toHaveBeenCalledWith(expect.objectContaining({ type: "VALKYRIE_LOAD_ERROR", error: "some error" }), '*');
  });
  test("gameIdle", () => {
    vw.gameIdle();
    expect(window.postMessage)
      .toHaveBeenCalledWith(expect.objectContaining({ type: "VALKYRIE_IDLE" }), '*');
  });
  test("gameBusy", () => {
    vw.gameBusy();
    expect(window.postMessage)
      .toHaveBeenCalledWith(expect.objectContaining({ type: "VALKYRIE_BUSY" }), '*');
  });
  test("openCashier", () => {
    vw.openCashier();
    expect(window.postMessage)
      .toHaveBeenCalledWith(expect.objectContaining({ type: "VALKYRIE_OPEN_CASHIER" }), '*');
  });
  test("openLobby", () => {
    vw.openLobby();
    expect(window.postMessage)
      .toHaveBeenCalledWith(expect.objectContaining({ type: "VALKYRIE_OPEN_LOBBY" }), '*');
  });
});