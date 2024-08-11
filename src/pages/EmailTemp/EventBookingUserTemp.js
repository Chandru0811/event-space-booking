import axios from "axios";
import { toast } from "react-toastify";

const eventBookingUserTemplate = async (data, companyId) => {
  //  console.log("Data is ", data);

  const mailContent = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <title>Event Booking Confirmation</title>
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
          <h1 style="color: black;">Hi, ${data.firstName + data.lastName}</h1>
          <p style="margin: 2rem 0;">Thank you for booking your event with <strong>${"ECS Cloud"}</strong>!</p>
          <p>We're excited to confirm your booking for the following event:</p>
          <ul>
            <li><strong>Date:</strong> ${data.date || "--"}</li>
            <li><strong>Time:</strong> ${
              data.time || "09:00 am"
            } (Asia/Singapore)</li>
            <li><strong>Location:</strong> 111 North Bridge Road #06-34 Peninsula Plaza, Singapore 179098</li>
          </ul>
          <p>We're looking forward to having you at the event! If you have any questions, feel free to reach out to us at connect@mitspace.sg.</p>
          <p style="margin: 0 0 2rem 0;">Powered by ECS</p>
          <hr />
        </div>
      </div>
    </body>
    </html>`;

  try {
    const response = await axios.post(
      `https://crmlah.com/ecscrm/api/sendMail`,
      {
        toMail: data.businessEmail,
        fromMail: "noreply@example.com", // Use a valid sender email
        subject: `Event Booking Confirmation`,
        htmlContent: mailContent,
      }
    );

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

export default eventBookingUserTemplate;
