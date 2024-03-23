import * as express from "express";
import Message, { initialBody } from "../services/ThirdParty/Message";
import Generate from "../services/ThirdParty/Generate";

// export default class RoleRoutes {
//   private router: express.Router;
//   constructor() {
//     this.router = express.Router();
//   }

//   setupRoutes() {
//     return this.router;
//   }
// }

const testRoute = express.Router();

testRoute.get("/email-service", async (req: express.Request, res: express.Response) => {
  const emailService = new Message.EmailService();

  initialBody.email.message = req.query.message.toString();
  initialBody.email.subject = req.query.subject.toString();
  initialBody.email.to = req.query.to.toString();

  await emailService.send(initialBody.email);
  res.json({
    message: "success",
  });
});

testRoute.get("/notification-service", async (req: express.Request, res: express.Response) => {
  const emailService = new Message.NotificationService();

  initialBody.notification.lang = "en";
  initialBody.notification.content = "hello content";
  initialBody.notification.title = "hello";

  await emailService.send(initialBody.notification);
  res.json({
    message: "success",
  });
});

testRoute.get("/generate-service", async (req: express.Request, res: express.Response) => {
  const generateHTMLService = new Generate.GenerateHTMLService();

  const result = generateHTMLService.generate("/test-email.hbs", { title: "test", message: "testing aja" });
  // res.json({
  //   message: "success",
  // });
  res.send(result);
});

export default testRoute;
