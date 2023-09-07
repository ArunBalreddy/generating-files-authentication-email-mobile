import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { getHtmlContent } from './getHtml';

const SibApiV3Sdk = require('sib-api-v3-sdk');
let defaultClient = SibApiV3Sdk.ApiClient.instance;

@Injectable()
export class SendinblueService {

  async sendTransactionalEmail(to: string, subject: string, content: string) {
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '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';
    let apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

    let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail();

  

    sendSmtpEmail.subject = subject;
    sendSmtpEmail.htmlContent = getHtmlContent(content); //"<html><body><h1>This is my first transactional email {{params.parameter}}</h1></body></html>";
    sendSmtpEmail.sender = {name: 'Arun Balreddy',email: 'arun@syncoffice.com',};
    sendSmtpEmail.to = [{ email: to }];
    // sendSmtpEmail.cc = [{"email":"example2@example2.com","name":"Janice Doe"}];
    // sendSmtpEmail.bcc = [{"email":"John Doe","name":"example@example.com"}];
    // sendSmtpEmail.replyTo = {"email":"replyto@domain.com","name":"John Doe"};
    // sendSmtpEmail.headers = {"Some-Custom-Name":"unique-id-1234"};
    // sendSmtpEmail.params = {"parameter":"My param value","subject":"New Subject"};

    apiInstance.sendTransacEmail(sendSmtpEmail).then(
      function (data) {
        console.log(
          'API called successfully. Returned data: ' + JSON.stringify(data),
        );
      },
      function (error) {
        console.error(error);
      },
    );
  }

  async sendSMS(mobile: string, content: string){
    let apiKey = defaultClient.authentications['api-key'];
    apiKey.apiKey = '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';

    let apiInstance = new SibApiV3Sdk.TransactionalSMSApi();

    let sendTransacSms = new SibApiV3Sdk.SendTransacSms();

    sendTransacSms = {
        "sender":"Arun",
        "recipient":mobile,
        "content":content
    };

    apiInstance.sendTransacSms(sendTransacSms).then(function(data) {
      console.log('API called successfully. Returned data: ' + JSON.stringify(data));
    }, function(error) {
      console.error(error);
    });
    
  }

}
