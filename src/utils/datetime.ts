import { DateTime as DT } from "laser-utils";

export class DateTime extends DT {
  clone() {
    return new DateTime(this.getTime());
  }

  public nextMonth(n = 1) {
    this.setMonth(this.getMonth() + n);
    this.setDate(1);
    this.setHours(0, 0, 0, 0);
    return this;
  }

  public nextDay(n = 1) {
    this.setDate(this.getDate() + n);
    this.setHours(0, 0, 0, 0);
    return this;
  }

  public nextHour(n = 1) {
    this.setHours(this.getHours() + n);
    this.setMinutes(0, 0, 0);
    return this;
  }

  public deferMonth(n = 1) {
    this.setMonth(this.getMonth() + n);
    return this;
  }

  public deferDay(n = 1) {
    this.setDate(this.getDate() + n);
    return this;
  }

  public deferHour(n = 1) {
    this.setHours(this.getHours() + n);
    return this;
  }
}
