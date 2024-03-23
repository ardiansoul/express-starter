import * as nodemailer from "nodemailer";
import * as onesignal from "@onesignal/node-onesignal";
export interface MessageDelivery {
  service: any;
  send(message: any): Promise<any>;
}

export const initialBody = {
  email: {
    subject: "",
    message: "",
    to: "",
    html: "",
    from: "",
  },
  notification: {
    lang: "en",
    content: "",
    title: "",
  },
};

class EmailService implements MessageDelivery {
  service: nodemailer.Transporter;
  constructor() {
    this.service = nodemailer.createTransport({
      host: process.env.NODEMAILER_HOST,
      port: 587,
      auth: {
        user: process.env.NODEMAILER_EMAIL,
        pass: process.env.NODEMAILER_PASS,
      },
    });
    console.log("setting up email service");
  }
  async send(body: typeof initialBody.email) {
    try {
      const result = await this.service.sendMail(body);
      console.log(result);

      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

class NotificationService implements MessageDelivery {
  service: onesignal.DefaultApi;
  constructor() {
    const config = onesignal.createConfiguration({
      userKey: process.env.ONESIGNAL_USER_KEY,
    });

    this.service = new onesignal.DefaultApi(config);
  }
  async send(body: typeof initialBody.notification) {
    try {
      const { title, content, lang } = body;
      const result = await this.service.createNotification({
        app_id: process.env.ONESIGNAL_APP_ID,
        headings: {
          [lang]: title,
        },
        contents: {
          [lang]: content,
        },
      });
      return result;
    } catch (err) {
      console.log(err);
    }
  }
}

class WhatsAppService implements MessageDelivery {
  readonly phoneNumber: string;
  service: any;
  constructor(phoneNumber: string) {
    this.phoneNumber = phoneNumber;
  }
  async register(service: any) {}
  async send(message: any) {
    return true;
  }
}

export default {
  EmailService,
  NotificationService,
  WhatsAppService,
};
