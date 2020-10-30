const dev = {
  STRIPE_KEY:
    "pk_test_51HdyzhB7dJPV96N9YgSWTTujEJu9MwJiCGlEbEjrLJpHcAiUvh5ValInmdP1AzJlc9UcL98dWmYX4kOlXWLEWtsH00zHelb4Pn\n",
  s3: {
    REGION: "us-east-1",
    BUCKET: "dev-mana-notes-infrastructure-s3-uploads4f6eb0fd-1uj1w21yfl5zt",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.mana-serverless-app.co.uk/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_vt5sCrSHU",
    APP_CLIENT_ID: "419gc3vi07p9n2r9qbcnqcc7f8",
    IDENTITY_POOL_ID: "us-east-1:e0af568d-86af-48b7-b820-b87dc4590620",
  },
};

const prod = {
  STRIPE_KEY:
    "pk_test_51HdyzhB7dJPV96N9YgSWTTujEJu9MwJiCGlEbEjrLJpHcAiUvh5ValInmdP1AzJlc9UcL98dWmYX4kOlXWLEWtsH00zHelb4Pn\n",
  s3: {
    REGION: "us-east-1",
    BUCKET: "prod-mana-notes-infrastructure-s3-uploads4f6eb0fd-oiv5eac7qia6",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.mana-serverless-app.co.uk/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_15GBaxUYK",
    APP_CLIENT_ID: "4gjoq5j4l31scv97hv9bcucbn1",
    IDENTITY_POOL_ID: "us-east-1:83e9673d-8ace-41a8-ab47-3f7a95631dc5",
  },
}

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config
}

// npm start and npm run build will default to the dev environment.
// set "REACT_APP_STAGE=prod" && npm start and set "REACT_APP_STAGE=prod" && npm run build will be prod environment.
