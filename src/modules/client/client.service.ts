import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { ResponseDto } from './dtos/client.dto';

export const selectData = {
  id: true,
  incorporation_date: true,
  fee: true,
  from_date: true,
  to_date: true,
  pan: true,
  gstn: true,
  tin: true,
  cin: true,
  std: true,
  land_line: true,
  website: true,
  job_code: true,
  status: true,
  admin_email: true,
  admin_first_name: true,
  admin_last_name: true,
  admin_middle_name: true,
  admin_mobile_number: true,
  category_id: true,
  category: {
    select: {
      id: true,
      name: true,
      description: true,
    },
  },
  job_department_id: true,
  job_department: {
    select: {
      id: true,
      name: true,
      activity_code: true,
    },
  },
  department_id: true,
  department: {
    select: {
      id: true,
      name: true,
      description: true,
    },
  },
  client_id: true,
  client: {
    select: {
      id: true,
      name: true,
      client_code: true,
    },
  },
  locations: {
    select: {
      id: true,
      address_1: true,
      address_2: true,
      location: true,
      location_type: true,
      pincode: true,
      city: true,
      state: true,
      country: true,
    },
  },
};

@Injectable()
export class ClientService {
  constructor(private readonly prismaService: PrismaService) {}

  async createClient(body) {
    try {
      const client = await this.prismaService.client.create({
        data: {
          name: body.name,
          client_code: body.client_code,
        },
      });
      const clientDetails = await this.prismaService.clientDetails.create({
        data: {
          incorporation_date: body.incorporation_date,
          fee: body.fee,
          from_date: body.from_date,
          to_date: body.to_date,
          pan: body.pan,
          gstn: body.gstn,
          tin: body.tin,
          cin: body.cin,
          std: body.std,
          land_line: body.land_line,
          website: body.website,
          job_code: body.job_code,
          status: body.status,
          category_id: body.category_id,
          job_department_id: body.job_department_id,
          department_id: body.department_id,
          client_id: client.id,
          admin_email: body.email,
          admin_first_name: body.first_name,
          admin_last_name: body.last_name,
          admin_middle_name: body.middle_name,
          admin_mobile_number: body.mobile_number,
        },
      });
      const location = await this.prismaService.location.create({
        data: {
          address_1: body.address_1,
          address_2: body.address_2,
          location: body.location,
          location_type: body.location_type,
          pincode: body.pincode,
          city: body.city,
          state: body.state,
          country: body.country,
          client_details_id: clientDetails.id,
        },
      });
      return { client, clientDetails, location };

    } catch (error) {
      // throw new BadRequestException();
      throw error
    }
  }

  async getClients(): Promise<ResponseDto[]> {
    const response = await this.prismaService.clientDetails.findMany({
      select: {
        is_delete: true,
        ...selectData,
      },
    });

    const filteredClients = response.filter(
      (client) => client.is_delete === 'No',
    );
    if (filteredClients.length === 0)
      throw new NotFoundException({ message: 'There is no Clients to show' });
    const responseData = filteredClients.map(
      (client) => new ResponseDto(client),
    );
    return responseData;
  }

  async getClient(id: number): Promise<ResponseDto> {
    const client = await this.getClientDetailsById(id);
    if (client.is_delete === 'Yes')
      throw new NotFoundException({ message: 'This client has been deleted' });
    const response = await this.prismaService.clientDetails.findUnique({
      where: {
        id,
      },
      select: {
        ...selectData,
        is_delete: true,
      },
    });
    return new ResponseDto(response);
  }

  async updateClientDetails(body, id: number) {
    const client = await this.getClientById(id);

    if (client.is_delete === 'Yes')
      throw new NotFoundException({ message: 'This client has been deleted' });

    const updatedClient = await this.prismaService.client.update({
      where: {
        id,
      },
      data: {
        name: body.name,
        client_code: body.client_code,
      },
    });
    const updatedClientDetails = await this.prismaService.clientDetails.update({
      where: {
        client_id: id,
      },
      data: {
        incorporation_date: body.incorporation_date,
        fee: body.fee,
        from_date: body.from_date,
        to_date: body.to_date,
        pan: body.pan,
        gstn: body.gstn,
        tin: body.tin,
        cin: body.cin,
        std: body.std,
        land_line: body.land_line,
        website: body.website,
        job_code: body.job_code,
        status: body.status,
        category_id: body.category_id,
        job_department_id: body.job_department_id,
        department_id: body.department_id,
        admin_email: body.email,
        admin_first_name: body.first_name,
        admin_last_name: body.last_name,
        admin_middle_name: body.middle_name,
        admin_mobile_number: body.mobile_number,
      },
    });
    return updatedClientDetails;
  }

  async updateClientLocation(body, clientId: number, locationId: number) {
    const client = await this.getClientById(clientId);
    if (client.is_delete === 'Yes')
      throw new NotFoundException({ message: 'This client has been deleted' });
    const updatedClientLocation = await this.prismaService.location.update({
      where: {
        id: locationId,
        client_details_id: clientId,
      },
      data: {
        address_1: body.address_1,
        address_2: body.address_2,
        location: body.location,
        location_type: body.location_type,
        pincode: body.pincode,
        city: body.city,
        state: body.state,
        country: body.country,
      },
    });
    return updatedClientLocation;
  }

  async deleteClient(id: number) {
    const client = await this.getClientDetailsById(id);
    if (client.is_delete === 'Yes')
      throw new NotFoundException({ message: 'This client has been deleted' });
    const deletedClient = await this.prismaService.client.update({
      where: {
        id,
      },
      data: {
        is_delete: 'Yes',
      },
    });
    const deletedClientDetails = await this.prismaService.clientDetails.update({
      where: {
        client_id: id,
      },
      data: {
        is_delete: 'Yes',
      },
    });
    const deletedClientLocations = await this.prismaService.location.updateMany(
      {
        where: {
          client_details_id: deletedClientDetails.id,
        },
        data: {
          is_delete: 'Yes',
        },
      },
    );
    return 'Deleted Successfully';
  }

  async getClientDetailsById(id: number) {
    const response = await this.prismaService.clientDetails.findUnique({
      where: {
        id,
      },
    });
    if (!response)
      throw new NotFoundException({ message: 'There is no client on this id' });
    return response;
  }

  async getClientById(id: number) {
    const response = await this.prismaService.client.findUnique({
      where: {
        id,
      },
    });
    if (!response)
      throw new NotFoundException({ message: 'There is no client on this id' });
    return response;
  }
}
