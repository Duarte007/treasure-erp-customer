import { Module } from '@nestjs/common';
import { DatabaseModule } from '../../common/database/database.module';
import { CustomerController } from './customer.controller';
import { CustomerRepository } from './repositories/customer.repository';
import { CustomerService } from './services/customer.service';

@Module({
  imports: [DatabaseModule],
  controllers: [CustomerController],
  providers: [CustomerService, CustomerRepository],
})
export class CustomerModule {}
