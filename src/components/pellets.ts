import { component, field, Type } from '@lastolivegames/becsy';

@component
export class PelletEater {
  @field({ type: Type.uint32, default: 0 }) declare pelletsEaten: number;
}

@component
export class Pellet {}
