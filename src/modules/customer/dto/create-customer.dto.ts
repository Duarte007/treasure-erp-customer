import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsDefined,
  IsObject,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';

export class CustomerAddressDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  street: string;
  @ApiPropertyOptional()
  @IsString()
  @IsOptional()
  complement: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  neighborhood: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  city: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  state: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  postal_code: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  country: string;
}

export class CreateCustomerDTO {
  @ApiProperty()
  @IsString()
  @IsDefined()
  name: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  document: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  email: string;
  @ApiProperty()
  @IsString()
  @IsDefined()
  phone: string;
  @ApiProperty({ type: CustomerAddressDTO })
  @IsObject()
  @IsDefined()
  @ValidateNested()
  address: CustomerAddressDTO;
}
