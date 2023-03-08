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

• `Optional` **autoPlay**: (`action`: [`AutoPlayAction`](../README.md#autoplayaction)) => `void`

#### Type declaration

▸ (`action`): `void`

Called when wrapper needs to control autoplay (if it has been started within the game).

##### Parameters

| Name | Type |
| :------ | :------ |
| `action` | [`AutoPlayAction`](../README.md#autoplayaction) |

##### Returns

`void`

#### Defined in

[valkyrie-wrapper.ts:189](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L189)

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

[valkyrie-wrapper.ts:198](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L198)

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

[valkyrie-wrapper.ts:193](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L193)
