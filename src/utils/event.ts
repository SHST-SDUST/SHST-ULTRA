import type { Keys } from "laser-utils";
import { EventBus as AbstractEventBus } from "laser-utils";

const EVENT_TYPE = ["ON_LOADED", "REFRESH_TIMETABLE"] as const;

export const EVENT_ENUM = EVENT_TYPE.reduce(
  (acc, cur) => ({ ...acc, [cur]: `__${cur}__` }),
  {} as { [K in (typeof EVENT_TYPE)[number]]: `__${K}__` }
);

interface EventBusParams {
  [EVENT_ENUM.ON_LOADED]: null;
  [EVENT_ENUM.REFRESH_TIMETABLE]: null;
}

declare module "laser-utils" {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface EventBusType extends EventBusParams {}
}

class EventBus extends AbstractEventBus {
  public TYPE = EVENT_ENUM;
  public commit<T extends Keys>(key: T, value: EventBusParams[T]) {
    console.log("Event Commit:", key);
    this.emit(key, value);
  }
}

export const Event = new EventBus();
