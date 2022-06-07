import { Texture, Loader } from 'pixi.js';
import Button from '../button/Button';
import { ConfigInterface } from '../../config/ConfigInterface';

// import playButtonActive from './assets/active.png';
// import playButtonInactive from './assets/inactive.png';
// import playButtonDisabled from './assets/disabled.png';

export default class PlayButton extends Button {
  constructor(config: ConfigInterface) {
    super({
      activeTexture: Texture.from('playButtonActive'),
      inactiveTexture: Texture.from('playButtonInactive'),
      disabledTexture: Texture.from('playButtonDisabled')
    });
    this.position.set(config.playButtonPosition.x, config.playButtonPosition.y);
  }
}

Loader.shared.add('playButtonActive', );
Loader.shared.add('playButtonInactive', );
Loader.shared.add('playButtonDisabled', );
