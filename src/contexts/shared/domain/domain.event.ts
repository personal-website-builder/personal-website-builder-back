import { v4 } from 'uuid';

export abstract class DomainEvent {
  protected readonly id: string;
  protected readonly ocurredOn: Date;
  protected readonly userId: string;
  protected readonly eventName: string;
  protected readonly eventType: 'SYSTEM' | 'USER' = 'SYSTEM';

  constructor(
    userId: string,
    eventName: string,
    eventType: 'SYSTEM' | 'USER' = 'SYSTEM',
  ) {
    this.id = v4();
    this.ocurredOn = new Date();
    this.userId = userId;
    this.eventName = eventName;
    this.eventType = eventType;
  }

  abstract toPrimitives(): any;
}
