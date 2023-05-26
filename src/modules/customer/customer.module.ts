import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { EventsProviderModule } from '../../common/providers/events/events.module';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerEventProvider } from './services/customer.events.service';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [DatabaseModule, EventsProviderModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository, CustomerEventProvider],
})
export class CustomerModule {}
