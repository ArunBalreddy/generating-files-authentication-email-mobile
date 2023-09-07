import { Test, TestingModule } from '@nestjs/testing';
import { ClientService, selectData } from './client.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';


const mockClientReturnData = {
  is_delete: "No",
  id: 2,
  incorporation_date: "2023-07-26T18:30:00.000Z",
  fee: 5000,
  from_date: "2023-07-26T18:30:00.000Z",
  to_date: "2024-07-26T18:30:00.000Z",
  pan: "CJPLB6244G",
  gstn: "gstn number",
  tin: "tin number",
  cin: "cin number",
  std: "4455455",
  land_line: "44646455 landline number",
  website: "website link1",
  job_code: "aaaa",
  status: "EXISTING",
  admin_email: "arun@gmail.com",
  admin_first_name: "Arun",
  admin_last_name: "Kumar",
  admin_middle_name: "",
  admin_mobile_number: "8074085858",
  category_id: 1,
  category: {
    id: 1,
    name: "Category1",
    description: "Category1 Description",
  },
  job_department_id: 1,
  job_department: {
    id: 1,
    name: "JobDepartment IT",
    activity_code: "ITITIT",
  },
  department_id: 1,
  department: {
    id: 1,
    name: "Backend Department",
    description: "Backend department description",
  },
  client_id: 1,
  client: {
    id: 1,
    name: "Arun Balreddy",
    client_code: "ggg",
  },
  locations: [
    {
      id: 1,
      address_1: "5-5-7, Papireddy nagar",
      address_2: "5-4--4, jagathgiri gutta",
      location: "hyderabad",
      location_type: "Home",
      pincode: 500037,
      city: "hyderabad",
      state: "Telangana",
      country: "India",
    },
  ],
}

const getClientsReturnData  = [
  {...mockClientReturnData},
   // The rest of the objects follow the same pattern
 ];

const mockClientDetails = {
  is_delete: "No",
  id: 2,
  incorporation_date: "2023-07-26T18:30:00.000Z",
  fee: 5000,
  from_date: "2023-07-26T18:30:00.000Z",
  to_date: "2024-07-26T18:30:00.000Z",
  pan: "CJPLB6244G",
  gstn: "gstn number",
  tin: "tin number",
  cin: "cin number",
  std: "4455455",
  land_line: "44646455 landline number",
  website: "website link1",
  job_code: "aaaa",
  status: "EXISTING",
  admin_email: "arun@gmail.com",
  admin_first_name: "Arun",
  admin_last_name: "Kumar",
  admin_middle_name: "",
  admin_mobile_number: "8074085858",
  category_id: 1,
  category: {
    id: 1,
    name: "Category1",
    description: "Category1 Description",
  },
  job_department_id: 1,
  job_department: {
    id: 1,
    name: "JobDepartment IT",
    activity_code: "ITITIT",
  },
  department_id: 1,
  department: {
    id: 1,
    name: "Backend Department",
    description: "Backend department description",
  },
  client_id: 1,
  client: {
    id: 1,
    name: "Arun Balreddy",
    client_code: "ggg",
  },
  locations: [
    {
      id: 1,
      address_1: "5-5-7, Papireddy nagar",
      address_2: "5-4--4, jagathgiri gutta",
      location: "hyderabad",
      location_type: "Home",
      pincode: 500037,
      city: "hyderabad",
      state: "Telangana",
      country: "India",
    },
  ],
}

const mockLocation = {
  id: 1,
  address_1: "5-5-7, Papireddy nagar",
  address_2: "5-4--4, jagathgiri gutta",
  location: "hyderabad",
  location_type: "Home",
  pincode: 500037,
  city: "hyderabad",
  state: "Telangana",
  country: "India",
}

const mockClient = {
  id: 1,
  name: "Arun Balreddy",
  client_code: "ggg",
}


describe('ClientService', () => {
  let service: ClientService;
  let prismaService: PrismaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ClientService, {
        provide: PrismaService,
        useValue: {
          clientDetails: {
            findMany: jest.fn().mockReturnValue(getClientsReturnData),
            create: jest.fn().mockReturnValue(mockClientDetails),
            findUnique: jest.fn().mockReturnValue(mockClientDetails),
            update: jest.fn().mockReturnValue(mockClientDetails),
            delete: jest.fn().mockReturnValue("Deleted Successfully")
          },
          client: {
            create: jest.fn().mockReturnValue(mockClient),
            update: jest.fn().mockReturnValue(mockClient),
            findUnique: jest.fn().mockReturnValue(mockClient),
            delete: jest.fn().mockReturnValue("Deleted Successfully")
          },
          location:{
            create: jest.fn().mockReturnValue(mockLocation),
            updateMany: jest.fn().mockReturnValue("Deleted Successfully")
          }
        }
      }],
    }).compile();

    service = module.get<ClientService>(ClientService);
    prismaService = module.get<PrismaService>(PrismaService);
  });

  describe("getClients", () => {
    it("get all clients", async () => {
      const mockPrismaFindManyClients = jest.fn().mockReturnValue(getClientsReturnData)
      
      jest
      .spyOn(prismaService.clientDetails, "findMany")
      .mockImplementation(mockPrismaFindManyClients)

      await service.getClients()

      expect(mockPrismaFindManyClients).toBeCalledWith({
        select : {
          is_delete: true,
          ...selectData
        }
      })
    })

    it("should throw not found exception if not homes are found", async () => {
      const mockPrismaFindManyClients = jest.fn().mockReturnValue([])

      jest
      .spyOn(prismaService.clientDetails, "findMany")
      .mockImplementation(mockPrismaFindManyClients)

      await expect(service.getClients()).rejects.toThrowError(NotFoundException)
    })

    it("get client by Id", async () => {
      const mockPrismaFindClient = jest.fn().mockReturnValue(mockClientReturnData)

      jest
      .spyOn(prismaService.clientDetails, "findUnique")
      .mockImplementation(mockPrismaFindClient)

      await service.getClient(2)

      expect(mockPrismaFindClient).toBeCalledWith({
        where: {
          id: 2
        }
      })
    })
  })

  describe("createMany", () => {
    const createClientParams = {
      incorporation_date:"2023-07-26T18:30:00.000Z",
      fee: 5000,
      from_date:"2023-07-26T18:30:00.000Z",
      to_date: "2024-07-26T18:30:00.000Z",
      pan: "CJPLB6244G",
      gstn: "gstn number",
      tin: "tin number",
      cin: "cin number",
      std: "4455455",
      land_line: "44646455 landline number",
      website: "website link1",
      job_code: "aaaa",
      status: "EXISTING",
      category_id: 1,
      job_department_id: 1,
      department_id: 1,
      client_id: 1,
      dmin_email: "arun@gmail.com",
      admin_first_name: "Arun",
      admin_last_name: "Kumar",
      admin_middle_name: "",
      admin_mobile_number: "8074085858",
    }
    it('should call prisma clientDetails.create with the correct payload', async () => {
      const mockCreateClientDetails = jest.fn().mockReturnValue(mockClientDetails)

      jest
      .spyOn(prismaService.clientDetails, "create")
      .mockImplementation(mockCreateClientDetails)

      await service.createClient(createClientParams)
    })
  })

  describe("updateMany", () => {
    const updateClientParams = {
      incorporation_date:"2023-07-26T18:30:00.000Z",
      fee: 5000,
      from_date:"2023-07-26T18:30:00.000Z",
      to_date: "2024-07-26T18:30:00.000Z",
      pan: "CJPLB6244G",
      gstn: "gstn number",
      tin: "tin number",
      cin: "cin number",
      std: "4455455",
      land_line: "44646455 landline number",
      website: "website link1",
      job_code: "aaaa",
      status: "EXISTING",
      category_id: 1,
      job_department_id: 1,
      department_id: 1,
      // admin_email: "ar@gmail.com",
      // admin_first_name: "Ar",
      // admin_last_name: "Kumar",
      // admin_middle_name: "",
      // admin_mobile_number: "8074085858",
    }

    const updateClient = {
      name: "Arun Balreddy",
      client_code: "ggg",
    }

    it('updateClientDetails', async () => {
      const mockUpdateClientDetails = jest.fn().mockReturnValue(mockClientReturnData)
      const mockUpdateClient = jest.fn().mockReturnValue(mockClient)

      jest.spyOn(prismaService.client, "update").mockImplementation(mockUpdateClient)
      jest.spyOn(prismaService.clientDetails, "update").mockImplementation(mockUpdateClientDetails)

      await service.updateClientDetails(updateClient, 2)
      await service.updateClientDetails(updateClientParams, 2)

      expect(mockUpdateClientDetails).toBeCalledWith({
        data: {
          ...updateClientParams
        },
        where: {
          client_id: 2,
        }
      })
    })
  })

  describe('DeleteClient', () => {
    it('Delete a Client', async () => {
      const mockDeleteClient = jest.fn().mockReturnValue("Deleted Successfully")
      const mockDeleteClientDetails = jest.fn().mockReturnValue("Deleted Successfully")
      // const mockDeleteClientLocation = jest.fn().mockReturnValue("Deleted Successfully")



      jest.spyOn(prismaService.client, 'update').mockImplementation(mockDeleteClient)
      jest.spyOn(prismaService.clientDetails, 'update').mockImplementation(mockDeleteClientDetails)
      // jest.spyOn(prismaService.location, 'updateMany').mockImplementation(mockDeleteClientLocation)



      await  service.deleteClient(2)
      expect(mockDeleteClient).toBeCalledWith({
        where: {
          id: 2
        },
        data: {
          is_delete: 'Yes'
        }
      })
      expect(mockDeleteClientDetails).toBeCalledWith({
        where: {
          client_id: 2
        },
        data: {
          is_delete: 'Yes'
        }
      })
      // expect(mockDeleteClientLocation).toBeCalledWith({
      //   where: {
      //     client_details_id: 2
      //   },
      //   data: {
      //     is_delete: 'Yes'
      //   }
      // })


    })
  })

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

});

