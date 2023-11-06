"use strict";

/**
 *
 * Event doc: https://docs.aws.amazon.com/apigateway/latest/developerguide/set-up-lambda-proxy-integrations.html#api-gateway-simple-proxy-for-lambda-input-format
 * @param {Object} event - API Gateway Lambda Proxy Input Format
 *
 */

import { sendEmail } from "./ses.mjs";
const headers = {
  "Content-Type": "application/json",
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "Content-Type",
  "Access-Control-Allow-Methods": "OPTIONS,POST",
};

// const sendEmail = () => Promise.resolve('hi')

export const handler = async (event) => {
  try {
    // Send email
    console.log(event);
    await Promise.all([sendEmail(event)]);

    return {
      statusCode: 200,
      body: "OK!",
      headers,
    };
  } catch (err) {
    console.error("parsing error:", err);
    return {
      statusCode: 500,
      body: err,
      headers,
    };
  }
};
