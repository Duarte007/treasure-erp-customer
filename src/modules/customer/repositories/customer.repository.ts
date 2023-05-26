import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Customer } from '../entities/customer.entity';

@Injectable()
export class CustomerRepository {
  constructor(
    @InjectRepository(Customer)
    private customerRepository: Repository<Customer>,
  ) {}

  async createCustomer(customerData: Partial<Customer>): Promise<Customer> {
    const customer = this.customerRepository.create(customerData);
    return this.customerRepository.save(customer);
  }

  async updateCustomer(
    id: number,
    customerData: Partial<Customer>,
  ): Promise<Customer> {
    const customer = await this.getCustomerById(id);
    if (!customer) {
      return null;
    }
    this.customerRepository.merge(customer, customerData);
    return this.customerRepository.save(customer);
  }

  async deleteCustomer(customer_id: number): Promise<void> {
    await this.customerRepository.delete(customer_id);
  }

  async getCustomerById(customer_id: number): Promise<Customer> {
    return this.customerRepository.findOne({
      where: { customer_id },
    });
  }

  async getAllCustomers(): Promise<Customer[]> {
    return this.customerRepository.find();
  }
}
