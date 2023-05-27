import { Injectable, Logger } from '@nestjs/common';
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
    try {
      const customerToSave = CustomerAdapter.toDatabase(customerData);

      const customer = await this.customerRepository.createCustomer(
        customerToSave,
      );

      Logger.log({
        message: 'New Customer',
        customerData,
        customerToSave,
        customer,
      });

      this.customerEventsProvider.publishNewAddressEvent({
        uuid: customerToSave.address_uuid,
        ...customerData.address,
      });

      return customer;
    } catch (error) {
      Logger.error({
        message: 'Error saving customer',
        error: error.response?.data || error.message,
        customerData,
      });
      throw error;
    }
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
