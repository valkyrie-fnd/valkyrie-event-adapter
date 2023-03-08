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
      .toHaveBeenCalledWith({ type: "VALKYRIE_LOAD_DONE", status: "done" }, '*');
  });
  test("gameLoadError", () => {
    vw.gameLoadError("some error");
    expect(window.postMessage)
      .toHaveBeenCalledWith({ type: "VALKYRIE_LOAD_ERROR", reason: "some error" }, '*');
  });
  test("gameIdle", () => {
    vw.gameIdle();
    expect(window.postMessage)
      .toHaveBeenCalledWith({ type: "VALKYRIE_IDLE" }, '*');
  });
  test("gameBusy", () => {
    vw.gameBusy();
    expect(window.postMessage)
      .toHaveBeenCalledWith({ type: "VALKYRIE_BUSY" }, '*');
  });
  test("openCashier", () => {
    vw.openCashier();
    expect(window.postMessage)
      .toHaveBeenCalledWith({ type: "VALKYRIE_OPEN_CASHIER" }, '*');
  });
  test("openLobby", () => {
    vw.openLobby();
    expect(window.postMessage)
      .toHaveBeenCalledWith({ type: "VALKYRIE_OPEN_LOBBY" }, '*');
  });
  test("openHome", () => {
    vw.openHome();
    expect(window.postMessage)
      .toHaveBeenCalledWith({ type: "VALKYRIE_OPEN_HOME" }, '*');
  });
  test("enter fullscreen", () => {
    vw.enterFullScreen();
    expect(window.postMessage)
      .toHaveBeenCalledWith({ type: "VALKYRIE_FULLSCREEN", action: "enter" }, '*');
  });
  test("exit fullscreen", () => {
    vw.exitFullScreen();
    expect(window.postMessage)
      .toHaveBeenCalledWith({ type: "VALKYRIE_FULLSCREEN", action: "exit" }, '*');
  });
  describe("autoPlay", () => {
    test("pause", () => {
      vw.pauseAutoPlay();
      expect(window.postMessage)
        .toHaveBeenCalledWith({ type: "VALKYRIE_AUTOPLAY", action: "pause" }, '*');
    });
    test("resume", () => {
      vw.resumeAutoPlay();
      expect(window.postMessage)
        .toHaveBeenCalledWith({ type: "VALKYRIE_AUTOPLAY", action: "resume" }, '*');
    });
    test("stop", () => {
      vw.stopAutoPlay();
      expect(window.postMessage)
        .toHaveBeenCalledWith({ type: "VALKYRIE_AUTOPLAY", action: "stop" }, '*');
    });
  })
  describe("gameLoading", () => {
    test("sending progress below 0", () => {
      vw.gameLoading(-10)
      expect(window.postMessage)
        .toHaveBeenCalledWith({ type: "VALKYRIE_LOAD_PROGRESS", progress: 0 }, '*');
    });
    test("sending progress above 100", () => {
      vw.gameLoading(110)
      expect(window.postMessage)
        .toHaveBeenCalledWith({ type: "VALKYRIE_LOAD_PROGRESS", progress: 100 }, '*');
    });
    test("sending progress between 0 and 100", () => {
      vw.gameLoading(66)
      expect(window.postMessage)
        .toHaveBeenCalledWith({ type: "VALKYRIE_LOAD_PROGRESS", progress: 66 }, '*');
    });
  });
});