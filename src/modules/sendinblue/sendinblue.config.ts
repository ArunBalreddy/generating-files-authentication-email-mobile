import { registerAs} from '@nestjs/config'

export default registerAs('sendinBlue', () =>  ({
    apiKey: process.env.SENDINBLUE_API_KEY,
}))