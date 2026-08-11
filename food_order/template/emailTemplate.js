export const getWelcomeEmailTemplate = (name, type) => {
  let title;
  let subtitle;
  let message;
  let icon;
  let buttonText;
  let buttonLink;

  // USER
  if (type === "user") {
    title = `Welcome to Food_order, ${name}! 🎉`;
    subtitle = "Good Food. Good Mood. ❤️";
    message = `
      Your account has been successfully created.
      You can now discover restaurants, explore delicious food,
      place orders, and enjoy fast delivery right at your doorstep.
    `;
    icon = "🍽️";
    buttonText = "Explore Restaurants 🍴";
    buttonLink = "https://food-order.com/restaurants";
  }

  // PROVIDER
  else if (type === "provider") {
    title = `Welcome to Food_order, ${name}! 🎉`;
    subtitle = "Grow your business with Food_order";
    message = `
      Your provider account has been successfully created.
      You can now manage your services, connect with customers,
      and grow your business with Food_order.
    `;
    icon = "👨‍🍳";
    buttonText = "Go to Provider Dashboard";
    buttonLink = "https://food-order.com/provider/dashboard";
  }

  // RESTAURANT
  else if (type === "restaurant") {
    title = `${name} Added Successfully! 🎉`;
    subtitle = "Welcome to Food_order";
    message = `
      Your restaurant has been successfully added to Food_order.
      You can now manage your restaurant, add food items,
      manage orders, and serve your customers.
    `;
    icon = "🏪";
    buttonText = "Manage Restaurant";
    buttonLink = "https://food-order.com/restaurant/dashboard";
  }

  // INVALID TYPE
  else {
    throw new Error("Invalid email template type");
  }

  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>${title}</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#F4F7F2;
  font-family:Arial, Helvetica, sans-serif;
  color:#333333;
">

<table
  width="100%"
  cellpadding="0"
  cellspacing="0"
  border="0"
  style="background:#F4F7F2;"
>
  <tr>
    <td align="center" style="padding:25px 10px;">

      <!-- Main Card -->
      <table
        width="600"
        cellpadding="0"
        cellspacing="0"
        border="0"
        style="
          width:100%;
          max-width:600px;
          background:#ffffff;
          border-radius:12px;
          overflow:hidden;
        "
      >

        <!-- Header -->
        <tr>
          <td
            align="center"
            style="
              background:#FF6B35;
              padding:35px 20px;
            "
          >

            <div style="
              font-size:42px;
              line-height:1;
              margin-bottom:12px;
            ">
              ${icon}
            </div>

            <h1 style="
              margin:0;
              color:#ffffff;
              font-size:32px;
              font-weight:700;
            ">
              Food_order
            </h1>

            <p style="
              margin:10px 0 0;
              color:#ffffff;
              font-size:14px;
            ">
              ${subtitle}
            </p>

          </td>
        </tr>


        <!-- Content -->
        <tr>
          <td style="padding:40px 35px 25px;">

            <h2 style="
              margin:0 0 18px;
              font-size:25px;
              color:#1F2937;
            ">
              ${title}
            </h2>

            <p style="
              margin:0 0 20px;
              font-size:15px;
              line-height:1.7;
              color:#555555;
            ">
              Hello <strong>${name}</strong>,
            </p>

            <p style="
              margin:0;
              font-size:15px;
              line-height:1.8;
              color:#555555;
            ">
              ${message}
            </p>


            <!-- Success Box -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
              style="
                margin:30px 0;
                background:#FFF1E8;
                border-radius:10px;
                border:1px solid #FFE0D0;
              "
            >
              <tr>
                <td
                  align="center"
                  style="padding:25px;"
                >

                  <div style="
                    font-size:38px;
                    margin-bottom:10px;
                  ">
                    ✅
                  </div>

                  <h3 style="
                    margin:0 0 8px;
                    color:#FF6B35;
                    font-size:18px;
                  ">
                    Successfully Added
                  </h3>

                  <p style="
                    margin:0;
                    font-size:14px;
                    line-height:1.6;
                    color:#666666;
                  ">
                    Your ${type} is now successfully registered
                    with Food_order.
                  </p>

                </td>
              </tr>
            </table>


            <!-- CTA -->
            <table
              width="100%"
              cellpadding="0"
              cellspacing="0"
              border="0"
            >
              <tr>
                <td align="center">

                  <a
                    href="${buttonLink}"
                    style="
                      display:inline-block;
                      background:#FF6B35;
                      color:#ffffff;
                      text-decoration:none;
                      padding:15px 32px;
                      border-radius:7px;
                      font-size:15px;
                      font-weight:bold;
                    "
                  >
                    ${buttonText}
                  </a>

                </td>
              </tr>
            </table>


            <!-- Support -->
            <p style="
              margin:30px 0 0;
              padding-top:25px;
              border-top:1px solid #eeeeee;
              font-size:13px;
              line-height:1.7;
              color:#777777;
            ">
              Need help? Our support team is always here for you.
              Contact us at
              <a
                href="mailto:support@food-order.com"
                style="
                  color:#FF6B35;
                  text-decoration:none;
                  font-weight:bold;
                "
              >
                support@food-order.com
              </a>
            </p>

          </td>
        </tr>


        <!-- Footer -->
        <tr>
          <td
            align="center"
            style="
              background:#F8FAF7;
              padding:25px 20px;
              border-top:1px solid #eeeeee;
            "
          >

            <p style="
              margin:0 0 8px;
              font-size:12px;
              color:#888888;
            ">
              © 2026 Food_order. All rights reserved.
            </p>

            <p style="
              margin:0;
              font-size:12px;
              color:#999999;
            ">
              This email was sent by Food_order.
            </p>

            <p style="
              margin:15px 0 0;
              font-size:12px;
            ">

              <a
                href="#"
                style="
                  color:#FF6B35;
                  text-decoration:none;
                "
              >
                Privacy Policy
              </a>

              &nbsp; • &nbsp;

              <a
                href="#"
                style="
                  color:#FF6B35;
                  text-decoration:none;
                "
              >
                Terms
              </a>

              &nbsp; • &nbsp;

              <a
                href="#"
                style="
                  color:#FF6B35;
                  text-decoration:none;
                "
              >
                Contact
              </a>

            </p>

          </td>
        </tr>

      </table>

    </td>
  </tr>
</table>

</body>
</html>
`;
};

export const getLoginSuccessEmailTemplate = (userName) => {
  return `
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta
    name="viewport"
    content="width=device-width, initial-scale=1.0"
  />
  <title>Login Successful - Food_order</title>
</head>

<body style="
  margin:0;
  padding:0;
  background:#F4F7F2;
  font-family:Arial, Helvetica, sans-serif;
  color:#333333;
">

  <table
    width="100%"
    cellpadding="0"
    cellspacing="0"
    border="0"
  >
    <tr>
      <td align="center">

        <!-- Main Container -->
        <table
          width="600"
          cellpadding="0"
          cellspacing="0"
          border="0"
          style="
            max-width:600px;
            width:100%;
            background:#ffffff;
            margin:30px auto;
            border-radius:10px;
            overflow:hidden;
          "
        >

          <!-- Header -->
          <tr>
            <td
              style="
                background:#FF6B35;
                padding:30px 20px;
                text-align:center;
                color:#ffffff;
              "
            >

              <h1 style="
                margin:0;
                font-size:30px;
              ">
                🍽️ Food_order
              </h1>

              <p style="
                margin:8px 0 0;
                font-size:15px;
              ">
                Welcome Back!
              </p>

            </td>
          </tr>


          <!-- Body -->
          <tr>
            <td style="padding:35px 30px;">

              <h2 style="
                margin:0 0 15px;
                color:#1F2937;
                font-size:24px;
              ">
                Login Successful! 🎉
              </h2>

              <p style="
                font-size:15px;
                line-height:1.7;
                color:#555555;
              ">
                Hello <strong>${userName}</strong>,
              </p>

              <p style="
                font-size:15px;
                line-height:1.7;
                color:#555555;
              ">
                You have successfully logged in to your
                <strong>Food_order</strong> account.
                We're happy to see you again!
              </p>


              <!-- Login Success Box -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background:#FFF1E8;
                  border-radius:8px;
                  margin:25px 0;
                  border:1px solid #FFE0D0;
                "
              >
                <tr>
                  <td style="
                    padding:22px;
                    text-align:center;
                  ">

                    <div style="
                      font-size:40px;
                      margin-bottom:10px;
                    ">
                      ✅
                    </div>

                    <h3 style="
                      margin:0 0 8px;
                      color:#FF6B35;
                      font-size:18px;
                    ">
                      You're Successfully Logged In
                    </h3>

                    <p style="
                      margin:0;
                      font-size:14px;
                      color:#666666;
                      line-height:1.6;
                    ">
                      Your Food_order account is ready.
                      Start exploring delicious food and restaurants!
                    </p>

                  </td>
                </tr>
              </table>


              <!-- What You Can Do -->
              <h3 style="
                margin:25px 0 15px;
                color:#1F2937;
                font-size:18px;
              ">
                🍴 What's waiting for you?
              </h3>


              <p style="
                margin:10px 0;
                font-size:14px;
                color:#555555;
              ">
                🔍 Discover restaurants near you
              </p>

              <p style="
                margin:10px 0;
                font-size:14px;
                color:#555555;
              ">
                🍕 Explore delicious food and menus
              </p>

              <p style="
                margin:10px 0;
                font-size:14px;
                color:#555555;
              ">
                🛒 Order your favorite meals
              </p>

              <p style="
                margin:10px 0;
                font-size:14px;
                color:#555555;
              ">
                🚴 Enjoy fast doorstep delivery
              </p>

              <p style="
                margin:10px 0;
                font-size:14px;
                color:#555555;
              ">
                ⭐ Rate and review your orders
              </p>


              <!-- CTA -->
              <div style="
                text-align:center;
                margin:30px 0;
              ">

                <a
                  href="https://food-order.com/restaurants"
                  style="
                    background:#FF6B35;
                    color:#ffffff;
                    padding:14px 32px;
                    text-decoration:none;
                    border-radius:6px;
                    font-size:16px;
                    font-weight:bold;
                    display:inline-block;
                  "
                >
                  Explore Restaurants 🍴
                </a>

              </div>


              <!-- Security Notice -->
              <table
                width="100%"
                cellpadding="0"
                cellspacing="0"
                border="0"
                style="
                  background:#F8FAF7;
                  border-radius:8px;
                  margin:25px 0;
                  border:1px solid #E5E7EB;
                "
              >
                <tr>
                  <td style="padding:20px;">

                    <h3 style="
                      margin:0 0 8px;
                      color:#1F2937;
                      font-size:16px;
                    ">
                      🔐 Security Notice
                    </h3>

                    <p style="
                      margin:0;
                      font-size:13px;
                      color:#666666;
                      line-height:1.6;
                    ">
                      If you did not perform this login, please change
                      your password immediately and contact our support team.
                    </p>

                  </td>
                </tr>
              </table>


              <!-- Support -->
              <p style="
                font-size:14px;
                color:#666666;
                line-height:1.7;
                margin-top:25px;
              ">
                Need help? Our support team is always here for you.
                Contact us at
                <strong style="color:#FF6B35;">
                  support@food-order.com
                </strong>.
              </p>


              <hr style="
                border:none;
                border-top:1px solid #eeeeee;
                margin:30px 0;
              " />


              <p style="
                margin:0;
                font-size:14px;
              ">
                Happy ordering! 🍕🍔🍟
              </p>

              <p style="
                margin:6px 0 0;
                font-size:14px;
              ">
                <strong>Team Food_order</strong>
              </p>

            </td>
          </tr>


          <!-- Footer -->
          <tr>
            <td
              style="
                background:#F8FAF7;
                text-align:center;
                padding:20px;
                font-size:12px;
                color:#888888;
              "
            >

              <p style="margin:5px 0;">
                © 2026 Food_order. All rights reserved.
              </p>

              <p style="margin:5px 0;">
                You received this email because you logged in
                to your Food_order account.
              </p>

              <p style="margin:12px 0 0;">

                <a
                  href="#"
                  style="
                    color:#FF6B35;
                    text-decoration:none;
                  "
                >
                  Privacy Policy
                </a>

                &nbsp; | &nbsp;

                <a
                  href="#"
                  style="
                    color:#FF6B35;
                    text-decoration:none;
                  "
                >
                  Terms
                </a>

                &nbsp; | &nbsp;

                <a
                  href="#"
                  style="
                    color:#FF6B35;
                    text-decoration:none;
                  "
                >
                  Contact Us
                </a>

              </p>

            </td>
          </tr>

        </table>

      </td>
    </tr>
  </table>

</body>
</html>
`;
};
