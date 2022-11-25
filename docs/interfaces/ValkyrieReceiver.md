[@valkyrie-fnd/valkyrie-event-adapter](../README.md) / ValkyrieReceiver

# Interface: ValkyrieReceiver

Interface to be implemented per provider.

Functions will be triggered by  [ValkyrieWrapper](../classes/ValkyrieWrapper.md) when it receives event messages from the wrapper.

## Table of contents

### Properties

- [autoPlay](ValkyrieReceiver.md#autoplay)
- [refreshBalance](ValkyrieReceiver.md#refreshbalance)
- [volume](ValkyrieReceiver.md#volume)

## Properties

### autoPlay

• `Optional` **autoPlay**: (`action`: ``"pause"`` \| ``"stop"`` \| ``"resume"``) => `void`

#### Type declaration

▸ (`action`): `void`

Called when wrapper needs to control autoplay (if it has been started within the game).

##### Parameters

| Name | Type |
| :------ | :------ |
| `action` | ``"pause"`` \| ``"stop"`` \| ``"resume"`` |

##### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:130](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L130)

___

### refreshBalance

• `Optional` **refreshBalance**: () => `void`

#### Type declaration

▸ (): `void`

Called when wrapper receives information that balance has been changed on the backend. 
If provider does not receive such updates automatically, balance refresh should be initiated upon receiving this message.

##### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:139](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L139)

___

### volume

• `Optional` **volume**: (`muted`: `boolean`) => `void`

#### Type declaration

▸ (`muted`): `void`

Called when the game volume should be changed, muted or not.

##### Parameters

| Name | Type |
| :------ | :------ |
| `muted` | `boolean` |

##### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:134](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L134)
