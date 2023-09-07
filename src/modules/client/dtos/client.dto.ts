import {
  IsString,
  IsNotEmpty,
  IsPositive,
  IsOptional,
  IsEmail,
  IsDate,
  Matches,
  IsNumber,
} from 'class-validator';
import { Exclude, Expose } from 'class-transformer';

export enum ServiceType {
  EXISTING    = "EXISTING",
  PROSPECTIVE = "PROSPECTIVE"
}

export class SigninDto {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsString()
  @IsNotEmpty()
  name: string;
}

export class CreateClientDto {
  @IsString()
  @IsNotEmpty()
  status: string;

  @IsOptional()
  @IsPositive()
  fee: number;

  @IsOptional()
  @IsDate()
  from_date: Date;

  @IsOptional()
  @IsDate()
  to_date: Date;

  @IsNotEmpty()
  job_department_id: number;

  @IsString()
  @IsNotEmpty()
  job_code: string;

  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  client_code: string;

  @IsNotEmpty()
  category_id: number;

  @IsDate()
  @IsNotEmpty()
  incorporation_date: Date;

  @IsOptional()
  @IsString()
  gstn: string;

  @IsOptional()
  @IsString()
  pan: string;

  @IsOptional()
  @IsString()
  tin: string;

  @IsOptional()
  @IsString()
  cin: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  location_type: string;

  @IsString()
  @IsNotEmpty()
  address_1: string;

  @IsString()
  @IsOptional()
  address_2: string;

  @IsNotEmpty()
  pincode: number;

  @IsString()
  @IsNotEmpty()
  city: string;

  @IsString()
  @IsNotEmpty()
  state: string;

  @IsString()
  @IsNotEmpty()
  country: string;

  @IsString()
  std: string;

  @IsString()
  land_line: string;

  @IsNotEmpty()
  department_id: number;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  middle_name: string;

  @IsNotEmpty()
  @Matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)
  mobile_number: string;
}

export class UpdateClientDto {
  @IsOptional()
  @IsPositive()
  fee: number;

  @IsOptional()
  @IsDate()
  from_date: Date;

  @IsOptional()
  @IsDate()
  to_date: Date;

  @IsOptional()
  @IsNotEmpty()
  job_department_id: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  job_code: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  name: string;

  // @IsOptional()
  // @IsString()
  // @IsNotEmpty()
  // client_code: string;

  @IsOptional()
  @IsNotEmpty()
  category_id: number;

  @IsOptional()
  @IsDate()
  @IsNotEmpty()
  incorporation_date: Date;

  @IsOptional()
  @IsString()
  gstn: string;

  @IsOptional()
  @IsString()
  pan: string;

  @IsOptional()
  @IsString()
  tin: string;

  @IsOptional()
  @IsString()
  cin: string;

  @IsOptional()
  @IsString()
  website: string;

  @IsOptional()
  @IsString()
  std: string;

  @IsOptional()
  @IsString()
  land_line: string;

  @IsOptional()
  @IsNotEmpty()
  department_id: number;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  first_name: string;

  @IsOptional()
  @IsNotEmpty()
  @IsString()
  last_name: string;

  @IsOptional()
  @IsString()
  middle_name: string;

  @IsOptional()
  @IsNotEmpty()
  @Matches(/^(\+91[\-\s]?)?[0]?(91)?[789]\d{9}$/)
  mobile_number: string;
}

export class UpdateClientLocationDto {
  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  location_type: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  address_1: string;

  @IsOptional()
  @IsString()
  @IsOptional()
  address_2: string;

  @IsOptional()
  @IsNotEmpty()
  pincode: number;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  city: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  state: string;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  country: string;
}

export class ResponseDto {
  @Exclude()
  is_delete: string;
  id: number;

  // @Exclude()
  incorporation_date: Date;

  @Exclude()
  fee: number;
  @Exclude()
  from_date: Date;
  @Exclude()
  to_date: Date;
  @Exclude()
  pan: string;
  @Exclude()
  gstn: string;
  @Exclude()
  tin: string;
  @Exclude()
  cin: string;
  @Exclude()
  std: string;
  @Exclude()
  land_line: string;
  @Exclude()
  website: string;
  @Exclude()
  job_code: string;
  @Exclude()
  status: string;
  @Exclude()
  admin_email: string;
  @Exclude()
  admin_first_name: string;
  @Exclude()
  admin_last_name: string;
  @Exclude()
  admin_middle_name: string;
  @Exclude()
  admin_mobile_number: string;
  @Exclude()
  category_id: number;

  @Exclude()
  category: {
    id: number;
    name: string;
    description: string;
  };

  @Exclude()
  job_department_id: number;
  @Exclude()
  job_department: {
    id: number;
    name: string;
    activity_code: string;
  };
  @Exclude()
  department_id: number;
  @Exclude()
  department: {
    id: number;
    name: string;
    description: string;
  };

  @Exclude()
  client_id: number;

  @Exclude()
  client: {
    id: number;
    name: string;
    client_code: string;
  };

  @Exclude()
  locations: {
    id: number;
    address_1: string;
    address_2: string;
    location: string;
    location_type: string;
    pincode: number;
    city: string;
    state: string;
    country: string;
  }[];

  @Expose({ name: 'clientName' })
  transformClient() {
    return this.client.name;
  }

  @Expose({ name: 'clinetCode' })
  transformClientCode() {
    return this.client.client_code;
  }

  @Expose({ name: 'category' })
  tranformcategory() {
    return this.category.name;
  }

  @Expose({ name: 'location' })
  transformlocation() {
    return this.locations[0].location;
  }

  @Expose({ name: 'address' })
  transformAddress() {
    return this.locations[0].address_1;
  }

  @Expose({ name: 'city' })
  transformCity() {
    return this.locations[0].city;
  }

  @Expose({ name: 'pincode' })
  transformPincode() {
    return this.locations[0].pincode;
  }

  @Expose({ name: 'state' })
  transformState() {
    return this.locations[0].state;
  }

  @Expose({ name: 'country' })
  transformCountry() {
    return this.locations[0].country;
  }

  constructor(partial: Partial<ResponseDto>) {
    Object.assign(this, partial);
  }
}
