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

- [gameBusy](ValkyrieWrapper.md#gamebusy)
- [gameIdle](ValkyrieWrapper.md#gameidle)
- [gameLoadError](ValkyrieWrapper.md#gameloaderror)
- [gameLoaded](ValkyrieWrapper.md#gameloaded)
- [init](ValkyrieWrapper.md#init)
- [openCashier](ValkyrieWrapper.md#opencashier)
- [openLobby](ValkyrieWrapper.md#openlobby)

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

### gameBusy

▸ **gameBusy**(): `void`

Call when game starts with player participation. 
Wrapper will avoid displaying any UI overlays while the game is busy.

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:98](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L98)

___

### gameIdle

▸ **gameIdle**(): `void`

Call when game becomes idle (betting time). 
Idle time can be used by the wrapper to display regulatory popups etc.

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:91](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L91)

___

### gameLoadError

▸ **gameLoadError**(`errorMsg`): `void`

Call when game fails to load.
The wrapper can perform logging and automatic retries to try and recover.

#### Parameters

| Name | Type | Description |
| :------ | :------ | :------ |
| `errorMsg` | `string` | will end up on error property of sent message |

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

[valkyrie-wrapper.ts:104](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L104)

___

### openLobby

▸ **openLobby**(): `void`

Call when a Lobby or Home button is pressed within the game.
The wrapper will be closed and user will be navigated to lobby or licensee page depending on casino configuration

#### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:111](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L111)
