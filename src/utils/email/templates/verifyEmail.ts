export const verifyEmail = `
<!DOCTYPE html>
<html>
  <head>
    <title>FoodTroops Activation Email</title>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <style type="text/css">
      /* Base */
      body {
        margin: 0;
        padding: 0;
        min-width: 100%;
        font-family: Arial, sans-serif;
        font-size: 16px;
        line-height: 1.5;
        background-color: #fafafa;
        color: #222222;
      }
      a {
        color: #000;
        text-decoration: none;
        margin-bottom: 24px;
      }
      h1 {
        font-size: 24px;
        font-weight: 700;
        line-height: 1.25;
        margin-top: 0;
        margin-bottom: 15px;
        text-align: center;
      }
      p {
        margin-top: 0;
        margin-bottom: 24px;
      }
      table td {
        vertical-align: top;
      }
      /* Layout */
      .email-wrapper {
        max-width: 600px;
        margin: 0 auto;
      }
      .email-header {
        background-color: #ed8936;
        padding: 24px;
        color: #ffffff;
      }
      .email-body {
        padding: 24px;
        background-color: #ffffff;
      }
      .email-footer {
        background-color: #f6f6f6;
        padding: 24px;
      }
      /* Buttons */
      .button {
        display: inline-block;
        background-color: #0070f3;
        color: #ffffff;
        font-size: 16px;
        font-weight: 700;
        text-align: center;
        text-decoration: none;
        padding: 12px 24px;
        border-radius: 4px;
      }
    </style>
  </head>
  <body>
    <div class="email-wrapper">
      <div class="email-header">
        <h1>Welcome to FoodTroops</h1>
      </div>
      <div class="email-body">
        <p>Hello {{name}},</p>
        <p>
          Thank you for joining FoodTroops! To get started, please verify your
          email address by clicking the link below. The link is valid within 30 minutes.
        </p>

        <a href="{{url}}" target="_blank">
          <button
            style="
              color: #fff;
              background-color: #34d399;
              padding: 0.5rem 1rem;
              margin-top: 0.5rem;
              border: none;
              font-weight: bold;
            "
          >
            Verify Your Email Address
          </button>
        </a>

        <p style="margin-top: 24px;">
          If you did not create an account with FoodTroops, please ignore this
          email.
        </p>
      </div>
      <div class="email-footer">
        <p>
          Happy exploring! <br />
          FoodTroops' team
        </p>
      </div>
    </div>
  </body>
</html>
;

`;
