import { Injectable } from '@nestjs/common';
import { CustomerAdapter } from '../adapters/customer.adapter';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { Customer } from '../entities/customer.entity';
import { CustomerRepository } from '../repositories/customer.repository';
import { CustomerEventProvider } from './customer.events.service';

@Injectable()
export class CustomerService {
  constructor(
    private customerRepository: CustomerRepository,
    private readonly customerEventsProvider: CustomerEventProvider,
  ) {}

  async create(customerData: CreateCustomerDTO): Promise<Customer> {
    const customerToSave = CustomerAdapter.toDatabase(customerData);

    this.customerEventsProvider.publishNewAddressEvent({
      uuid: customerToSave.address_uuid,
      ...customerData.address,
    });

    return this.customerRepository.createCustomer(customerToSave);
  }

  async update(
    id: number,
    customerData: Partial<CreateCustomerDTO>,
  ): Promise<Customer> {
    const customerToSave = CustomerAdapter.toDatabase(customerData);

    return this.customerRepository.updateCustomer(id, customerToSave);
  }

  async delete(id: number): Promise<void> {
    await this.customerRepository.deleteCustomer(id);
  }

  async findOne(id: number): Promise<Customer> {
    return this.customerRepository.getCustomerById(id);
  }

  async findAll(): Promise<Customer[]> {
    return this.customerRepository.getAllCustomers();
  }
}
