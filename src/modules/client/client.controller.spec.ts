import { Test, TestingModule } from '@nestjs/testing';
import { ClientController } from './client.controller';
import { ClientService } from './client.service';
import { PrismaService } from 'src/modules/prisma/prisma.service';
import { CreateClientDto, UpdateClientDto } from './dtos/client.dto';

const incorporationDate = new Date("07/27/2023")
const fromDate = new Date("2023-07-26")
const toDate = new Date("2024-07-26")
const createClientParams: CreateClientDto = {
  status: "EXISTING",
  fee: 5000,
  from_date: fromDate,
  to_date: toDate,
  job_department_id: 1,
  job_code: "aaaa",
  name: "Arun Balreddy",
  client_code: "ggg",
  category_id: 1,
  incorporation_date: incorporationDate,
  gstn: "gstn number",
  pan: "CJPLB6244G",
  tin: "tin number", 
  cin: "cin number",
  website: "website link1",
  location: "hyderabad",
  location_type: "Home",
  address_1: "5-5-7, Papireddy nagar", 
  address_2: "5-4--4, jagathgiri gutta",
  pincode: 500037, 
  city: "hyderabad",
  state: "Telangana",
  country: "India",
  std: "4455455",
  land_line: "44646455 landline number",
  department_id: 1,
  email: "arun@gmail.com",
  first_name: "Arun",
  last_name: "Kumar",
  middle_name: "", 
  mobile_number: "8074085858"
}


const mockClientReturnData= {
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
const mockLocationData = {
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
const getClientsReturnData  = [
  {...mockClientReturnData},
   // The rest of the objects follow the same pattern
 ];


describe('ClientController', () => {
  let controller: ClientController;
  let clientService: ClientService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ClientController],
      providers: [{
        provide: ClientService,
        useValue: {
          getClients: jest.fn().mockReturnValue(getClientsReturnData),
          getClient: jest.fn().mockReturnValue(mockClientReturnData),
          updateClientDetails: jest.fn().mockReturnValue(mockClientReturnData),
          updateClientLocation: jest.fn().mockReturnValue(mockLocationData),
          createClient: jest.fn().mockReturnValue(mockClientReturnData),
          deleteClient: jest.fn().mockReturnValue("Deleted Successfully")
        }
      },PrismaService]
    }).compile();

    controller = module.get<ClientController>(ClientController);
    clientService = module.get<ClientService>(ClientService)
  });

  describe("getAllClients", () => {
    it('should get all clients', async () => {
      const mockGetClients = jest.fn().mockReturnValue(getClientsReturnData)
      jest.spyOn(clientService, "getClients").mockImplementation(mockGetClients)
      await controller.getAllClients()
      expect(mockGetClients).toHaveBeenCalled();
    })
    it('should get a client by Id', async () => {
      const mockFindClient = jest.fn().mockReturnValue(mockClientReturnData)
      
      jest
      .spyOn(clientService, "getClient")
      .mockImplementation(mockFindClient)

      await controller.getClientById(2)
      expect(mockFindClient).toBeCalledWith(2)
    })
  })

  describe("createClients", () => {
   

    it('Create a Client', async () => {
      const mockCreateClient = jest.fn().mockReturnValue(mockClientReturnData)
      jest.spyOn(clientService, "createClient").mockImplementation(mockCreateClient)

      await controller.createClient(createClientParams)
    })
  })

  describe("update", () => {
    const incorporationDate = new Date("07/27/2023")
    const fromDate = new Date("2023-07-26")
    const toDate = new Date("2024-07-26")
    const updateClientParams : UpdateClientDto= {
      incorporation_date: incorporationDate,
      fee: 5000,
      from_date: fromDate,
      to_date: toDate,
      pan: "CJPLB6244G",
      gstn: "gstn number",
      tin: "tin number",
      cin: "cin number",
      std: "4455455",
      land_line: "44646455 landline number",
      website: "website link1",
      job_code: "aaaa",
      // status: "EXISTING",
      category_id: 1,
      job_department_id: 1,
      name: "Arun",
      department_id: 1,
      email: "ar@gmail.com",
      first_name: "Ar",
      last_name: "Kumar",
      middle_name: "",
      mobile_number: "8074085858",
    }

    it("update clientDetails by Id", async () => {
      const mockUpdateClientDetails = jest.fn().mockReturnValue(mockClientReturnData)

      jest.spyOn(clientService, "updateClientDetails").mockImplementation(mockUpdateClientDetails)
      await controller.updateClientDetails(2,updateClientParams)

      expect(mockUpdateClientDetails).toBeCalledWith(updateClientParams, 2)
    })
    it("update Client Location", async () => {
      const mockUpdateClientLocation = jest.fn().mockReturnValue(mockLocationData)

      jest.spyOn(clientService, "updateClientLocation").mockImplementation(mockUpdateClientLocation)

      await controller.updateClientLocation(2,1,mockLocationData)
    })
  })

  describe("DeleteClient", () => {
    it('Delete a Client', async () => {
      const mockDeleteClient = jest.fn().mockReturnValue("Deleted Successfully")
      jest.spyOn(clientService, 'deleteClient').mockImplementation(mockDeleteClient)

      await controller.deleteClientDetails(2)
      expect(mockDeleteClient).toBeCalledWith(2)
    })
  })

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
