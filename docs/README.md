@valkyrie-fnd/valkyrie-event-adapter

# @valkyrie-fnd/valkyrie-event-adapter

## Table of contents

### Classes

- [ValkyrieWrapper](classes/ValkyrieWrapper.md)

### Interfaces

- [ValkyrieReceiver](interfaces/ValkyrieReceiver.md)

### Type Aliases

- [AutoPlayAction](README.md#autoplayaction)
- [Autoplay](README.md#autoplay)

## Type Aliases

### AutoPlayAction

Ƭ **AutoPlayAction**: ``"pause"`` \| ``"resume"`` \| ``"stop"``

Possible values for autoplay action

#### Defined in

[valkyrie-wrapper.ts:170](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L170)

___

### Autoplay

Ƭ **Autoplay**: `Object`

Received data from iframe when autoplay event

#### Type declaration

| Name | Type |
| :------ | :------ |
| `action` | [`AutoPlayAction`](README.md#autoplayaction) |
| `type` | `string` |

#### Defined in

[valkyrie-wrapper.ts:175](https://github.com/valkyrie-fnd/valkyrie-event-adapter/blob/master/src/valkyrie-wrapper.ts#L175)
