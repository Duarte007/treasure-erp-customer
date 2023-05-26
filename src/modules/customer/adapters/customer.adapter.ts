import { v4 as uuidv4 } from 'uuid';
import { CreateCustomerDTO } from '../dto/create-customer.dto';
import { CustomerRecord } from '../entities/customer.entity';

export class CustomerAdapter {
  static toDatabase(customerData: Partial<CreateCustomerDTO>): CustomerRecord {
    return {
      customer_name: customerData.name,
      customer_uuid: uuidv4(),
      customer_document: customerData.document,
      customer_email: customerData.email,
      customer_phone: customerData.phone,
      address_uuid: uuidv4(),
    };
  }
}
