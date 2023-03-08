[@valkyrie-fnd/valkyrie-event-adapter](../README.md) / ValkyrieWrapper

# Class: ValkyrieWrapper

Create an instance of ValkyrieWrapper and pass it the parent/wrapper window as well as an implementation of [ValkyrieReceiver](../interfaces/ValkyrieReceiver.md)

``` typescript
const vw = new ValkyrieWrapper(window.parent, window, receiverImpl);
// Call init to register all listeners
const removeListeners = vm.init();
//...
removeListeners();
```

Calling `init()` the instance will set up listeners on window to listen for messages from wrapper.
Use ValkyrieWrapper methods to post messages to wrapper.

Create an implementation of `ValkyrieReceiver` and pass it to `ValkyrieWrapper`. Its methods will be called when wrapper posts messages.

## Table of contents

### Constructors

- [constructor](ValkyrieWrapper.md#constructor)

### Properties

- [parent](ValkyrieWrapper.md#parent)
- [receiver](ValkyrieWrapper.md#receiver)
- [target](ValkyrieWrapper.md#target)

### Methods

- [enterFullScreen](ValkyrieWrapper.md#enterfullscreen)
- [exitFullScreen](ValkyrieWrapper.md#exitfullscreen)
- [gameBusy](ValkyrieWrapper.md#gamebusy)
- [gameIdle](ValkyrieWrapper.md#gameidle)
- [gameLoadError](ValkyrieWrapper.md#gameloaderror)
- [gameLoaded](ValkyrieWrapper.md#gameloaded)
- [gameLoading](ValkyrieWrapper.md#gameloading)
- [init](ValkyrieWrapper.md#init)
- [openCashier](ValkyrieWrapper.md#opencashier)
- [openHome](ValkyrieWrapper.md#openhome)
- [openLobby](ValkyrieWrapper.md#openlobby)
- [pauseAutoPlay](ValkyrieWrapper.md#pauseautoplay)
- [resumeAutoPlay](ValkyrieWrapper.md#resumeautoplay)
- [stopAutoPlay](ValkyrieWrapper.md#stopautoplay)

## Constructors

### constructor

• **new ValkyrieWrapper**(`parent`, `currTarget`, `receiver?`)

Used to post messages to parent window

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `parent` | `Window` | parent window to postMessage events to |
| `currTarget` | `EventTarget` | target to listen on postMessage events. Most likely `window` |
| `receiver?` | [`ValkyrieReceiver`](../interfaces/ValkyrieReceiver.md) | implementation to receive messages from parent window |

#### Defined in

[valkyrie-wrapper.ts:34](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L34)

## Properties

### parent

• **parent**: `Window`

#### Defined in

[valkyrie-wrapper.ts:25](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L25)

___

### receiver

• **receiver**: [`ValkyrieReceiver`](../interfaces/ValkyrieReceiver.md)

#### Defined in

[valkyrie-wrapper.ts:27](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L27)

___

### target

• **target**: `EventTarget`

#### Defined in

[valkyrie-wrapper.ts:26](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L26)

## Methods

### enterFullScreen

▸ **enterFullScreen**(): `void`

If game provides fullscreen capability, call this when entering fullscreen so wrapper can handle that event.

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:136](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L136)

___

### exitFullScreen

▸ **exitFullScreen**(): `void`

If game provides fullscreen capability, call this when exiting fullscreen so wrapper can handle that event.

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:142](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L142)

___

### gameBusy

▸ **gameBusy**(): `void`

Call when game starts with player participation. 
Wrapper will avoid displaying any UI overlays while the game is busy.

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:111](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L111)

___

### gameIdle

▸ **gameIdle**(): `void`

Call when game becomes idle (betting time). 
Idle time can be used by the wrapper to display regulatory popups etc.

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:104](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L104)

___

### gameLoadError

▸ **gameLoadError**(`errorMsg`): `void`

Call when game fails to load.
The wrapper can perform logging and automatic retries to try and recover.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorMsg` | `string` | will end up on `reason` property of sent message |

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:84](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L84)

___

### gameLoaded

▸ **gameLoaded**(): `void`

Call once the game is loaded and has the UI ready to be shown to the player.
Should not be called while the game is still in process of loading assets etc

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:76](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L76)

___

### gameLoading

▸ **gameLoading**(`progress`): `void`

Send game loading progress to wrapper.
Should be called with 0 as soon as the page loads inside the iframe.
Following, as the game starts loading, events with an increasing progress
should be dispatched several times until the loading completes.
A minimum number of 10 events is suggested.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `progress` | `number` | number between 0-100 to signal loading progress. Will be clamped between 0-100 |

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:96](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L96)

___

### init

▸ **init**(): () => `void`

call init after creating an instance, to set up listeners.
``` typescript
const vm = new ValkyrieWrapper(window.parent, window, receiverImpl);
const removeListeners = vm.init();
//....
// to remove listeners call returned function from init
removeListeners();
```

#### Returns

`fn`

function to remove event listeners

▸ (): `void`

call init after creating an instance, to set up listeners.
``` typescript
const vm = new ValkyrieWrapper(window.parent, window, receiverImpl);
const removeListeners = vm.init();
//....
// to remove listeners call returned function from init
removeListeners();
```

##### Returns

`void`

function to remove event listeners

#### Defined in

[valkyrie-wrapper.ts:50](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L50)

___

### openCashier

▸ **openCashier**(): `void`

Call when a Cashier or Deposit button is pressed within the game to instruct the wrapper to open the appropriate UI for that.

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:117](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L117)

___

### openHome

▸ **openHome**(): `void`

Call when Player navigates to home by pressing a "home" button.

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:130](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L130)

___

### openLobby

▸ **openLobby**(): `void`

Call when a Lobby or Home button is pressed within the game.
The wrapper will be closed and user will be navigated to lobby or licensee page depending on casino configuration

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:124](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L124)

___

### pauseAutoPlay

▸ **pauseAutoPlay**(): `void`

Send pause auto play event to wrapper.
If autoplay has been started withing the game, in order to sync state of play with wrapper

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:149](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L149)

___

### resumeAutoPlay

▸ **resumeAutoPlay**(): `void`

Send resume auto play event to wrapper.
If autoplay has been started withing the game, in order to sync state of play with wrapper

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:156](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L156)

___

### stopAutoPlay

▸ **stopAutoPlay**(): `void`

Send stop auto play event to wrapper.
If autoplay has been started withing the game, in order to sync state of play with wrapper

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:163](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L163)
