import { component, field, Type } from '@lastolivegames/becsy';

@component
export class Player {
  @field({ type: Type.uint32, default: 0 }) declare score: number;
}
