import axios from "axios";
import { toast } from "react-toastify";

const newEventAlertAdminTemplate = async (data, companyId) => {

    const mailContent = `
      <!DOCTYPE html>
      <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <title>New Event Registration Alert</title>
        <style>
          body {
            background-color: #ddd;
          }
          .invoice-box {
            font-size: 12px;
            max-width: 600px;
            background-color: #fff;
            margin: auto;
            padding: 30px;
            border-bottom: 3px solid #0059ff;
            line-height: 24px;
            font-family: "Helvetica Neue", "Helvetica", Arial, sans-serif;
            color: #555;
            min-height: 85vh;
          }
          .invoice-box table {
            width: 100%;
            line-height: inherit;
            text-align: left;
          }
          .invoice-box table td {
            padding: 5px;
            vertical-align: top;
          }
          .invoice-box table tr.heading td {
            background: #eee;
            border-bottom: 1px solid #ddd;
            font-weight: bold;
          }
          .invoice-box table tr.item td {
            border-bottom: 1px solid #eee;
          }
          .invoice {
            padding: 1rem;
          }
          @media print {
            .invoice-box {
              border: 0;
            }
          }
        </style>
      </head>
      <body>
        <div class="invoice-box">
          <table>
            <tr class="top">
              <td colspan="2">
                <table>
                  <tr>
                    <td class="title">
                      <img
                        src='https://mitspace.sg/wp-content/uploads/2024/04/cropped-MITSplogofinal-scaled-1.jpg'
                        style="width: 75%; max-width: 180px"
                        alt="Logo"
                      />
                    </td>
                  </tr>
                </table>
              </td>
            </tr>
          </table>
          <div class="invoice">
            <h1 style="color: black;">Hello Sir</h1>
            <p style="margin: 2rem 0;">We wanted to inform you that a new event has been registered in the system:</p>
            <ul>
              <li><strong>Event Name:</strong> ${data.eventName || "Event Name"}</li>
              <li><strong>Date:</strong> ${data.date || "Event Date"}</li>
              <li><strong>Time:</strong> ${data.time || "Event Time"} (Asia/Singapore)</li>
              <li><strong>Registered By:</strong> ${data.first_name + data.last_name || "--"}</li>
            </ul>
            <p>Please review the event details in the admin panel and ensure all necessary preparations are made.</p>
            <p>If you have any questions, feel free to reach out to us at ${"Company Mail"}.</p>
            <p style="margin: 0 0 2rem 0;">Best regards,</p>
            <p style="margin: 0;">${"Company Name"} Team</p>
            <p style="margin: 0 0 2rem 0;">Powered by ECS</p>
            <hr />
          </div>
        </div>
      </body>
      </html>`;
  
    try {
      const response = await axios.post(`http://13.213.208.92:8080/ecscrm/api/sendMail`, {
        toMail: data.email,
        fromMail: "noreply@example.com", // Use a valid sender email
        subject: `New Event Registered: ${data.eventName || "--"}`,
        htmlContent: mailContent,
      });
  
      if (response.status === 200) {
        toast.success(response.data.message);
        toast.success("Mail sent successfully");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error("Mail not sent");
    }
  };
  
  export default newEventAlertAdminTemplate;
  