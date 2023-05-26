import { Inject, Injectable } from '@nestjs/common';
import { DITokens } from '../../../common/enums/DITokens';
import { EventsProvider } from '../../../common/providers/events/events.service';

@Injectable()
export class CustomerEventProvider {
  constructor(
    @Inject(DITokens.EventsProvider)
    private readonly eventsProvider: EventsProvider,
  ) {}

  async publishNewAddressEvent(data: object) {
    const topicName = 'address';
    const topicAttributes = {
      event: 'NEW_CUSTOMER_ADDRESS',
      payloadVersion: '1.0.0',
    };
    return this.eventsProvider.publish(topicName, data, topicAttributes);
  }
}
