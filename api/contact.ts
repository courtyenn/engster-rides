const CONTACT_US_URL = `https://y3wbiee0ni.execute-api.us-west-1.amazonaws.com/engsta/engsta-rides-contact-us`;

export const config = {
  runtime: "edge",
};

export default async function handler(request: Request) {
  const body = await request.json();
  const res = await fetch(CONTACT_US_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body,
  });
  // console.log(res.body);
  // const data = await res.json();
  // console.log("data", data);
  // return 200;
  if (res.ok) {
    return new Response(
      JSON.stringify({
        body: "success",
      }),
      {
        status: 200,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  } else {
    return new Response(
      JSON.stringify({
        body: "error",
      }),
      {
        status: 401,
        headers: {
          "content-type": "application/json",
        },
      },
    );
  }
}
