require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3000;

/* ---------------- MIDDLEWARE ---------------- */

app.use(cors());
app.use(express.json());

/* ---------------- DATABASE ---------------- */

mongoose
.connect(process.env.MONGO_URI)
.then(() => console.log("MongoDB connected"))
.catch((err) => console.log("Mongo error:", err));

/* ---------------- ZOHO TOKEN FUNCTION ---------------- */

async function getAccessToken() {

try {

const response = await axios.post(
"https://accounts.zoho.in/oauth/v2/token",
null,
{
params: {
refresh_token: process.env.ZOHO_REFRESH_TOKEN,
client_id: process.env.ZOHO_CLIENT_ID,
client_secret: process.env.ZOHO_CLIENT_SECRET,
grant_type: "refresh_token"
}
}
);

return response.data.access_token;

} catch (error) {

console.log("Error generating Zoho access token:", error.response?.data || error.message);
throw error;

}

}

/* ---------------- CONTACT FORM ROUTE ---------------- */

app.post("/api/contact", async (req, res) => {

const { firstname, lastname, email, phone, inquiryType, city, message } = req.body;

console.log("New Contact Form Submission");

try {

/* get new access token automatically */

const accessToken = await getAccessToken();

/* create ticket in Zoho Desk */

const zohoResponse = await axios.post(
"https://www.zohoapis.in/desk/api/v1/tickets",
{
subject: inquiryType + " - Website Inquiry",

departmentId: process.env.ZOHO_DEPARTMENT_ID,

contact: {
firstName: firstname,
lastName: lastname,
email: email,
phone: phone
},

description:
"City: " + city +
"\nInquiry Type: " + inquiryType +
"\n\nMessage:\n" + message

},
{
headers: {
Authorization: Zoho-oauthtoken ${accessToken},
orgId: process.env.ZOHO_ORG_ID
}
}
);

console.log("Zoho Ticket Created:", zohoResponse.data);

res.json({
success: true,
message: "Thanks for contacting us. Our team will get back to you soon."
});

} catch (error) {

console.log("Zoho API Error:", error.response?.data || error.message);

res.status(500).json({
success: false,
message: "Something went wrong. Please try again later."
});

}

});

/* ---------------- SERVER START ---------------- */

app.listen(PORT, () => {

console.log(Server running at http://localhost:${PORT});

});