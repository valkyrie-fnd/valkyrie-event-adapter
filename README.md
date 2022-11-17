## valkyrie-event-adapter
Frontend library written in Typescript to use in game provider games to communicate with operator displaying your game.

Also used on operator side in order to map events from providers to your system.

## Usage

## Provider 
If your're a provider and want to follow Valkyrie events you use `ValkyrieWrapper`

``` typescript
import { ValkyrieWrapper } from '@valkyrie-fnd/valkyrie-event-adapter';

const vw = new ValkyrieWrapper(window.parent, window, valkyrieReceiver);
const unregister = vw.init();

//....
// eg when your game is finished loaded.
vw.gameLoaded();

//...
// If you need to remove any event listeners
unregister();
```
`valkyrieReceiver` needs to implement the `ValkyrieReceiver` interface. Commands sent by the wrapper of your game can be handled by that. When the wrapper send a autoplay command with any of the three options, the game should respect that command.
``` typescript
interface ValkyrieReceiver {
  autoPlay: (action: "pause" | "resume" | "stop") => {}
}
```
`unregister` is a function that will remove event listeners that is added to the second parameter(`window`).

## Operator
TBW

## Events
TBW

### Publishing

Increment the package version (major | minor | patch | ... | prerelease), 
for more info, see `yarn help version`
This will tag and commit the incremented version in git.

```shell
yarn version --prerelease
```

Publish the package to npm repository. This requires that you've logged in using `yarn login` and that your npm user has access 
to the valkyrie-fnd organization.

```shell
yarn publish
```