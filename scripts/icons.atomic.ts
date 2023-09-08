import { curIconSetGenerateConfig } from '../fathym-atomic-icons.config.ts';
import { useFileIconSet, useIconSetComponents } from '@fathym/atomic-icons';

await useFileIconSet('./static/icons.sprite.svg', curIconSetGenerateConfig.IconSet);

await useIconSetComponents(curIconSetGenerateConfig);