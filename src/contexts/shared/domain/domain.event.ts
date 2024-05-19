import { v4 } from 'uuid';

export abstract class DomainEvent {
  protected readonly id: string;
  protected readonly ocurredOn: Date;
  protected readonly eventName: string;
  protected readonly eventType: 'SYSTEM' | 'USER' = 'SYSTEM';
  protected readonly data?: any;

  constructor(
    eventName: string,
    eventType: 'SYSTEM' | 'USER' = 'SYSTEM',
    data?: any,
  ) {
    this.id = v4();
    this.ocurredOn = new Date();
    this.eventName = eventName;
    this.eventType = eventType;
    this.data = data;
  }

  toPrimitives(): any {
    return {
      id: this.id,
      eventName: this.eventName,
      ocurredOn: this.ocurredOn,
      eventType: this.eventType,
      data: this.data,
    };
  }
}
