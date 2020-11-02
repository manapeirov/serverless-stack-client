const dev = {
  STRIPE_KEY:
    "pk_test_51HdyzhB7dJPV96N9YgSWTTujEJu9MwJiCGlEbEjrLJpHcAiUvh5ValInmdP1AzJlc9UcL98dWmYX4kOlXWLEWtsH00zHelb4Pn\n",
  s3: {
    REGION: "us-east-1",
    BUCKET: "dev-mana-notes-infra-s3-uploads4f6eb0fd-c5wljmm4g08v",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.mana-serverless-app.co.uk/dev",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_2KcYDFYnn",
    APP_CLIENT_ID: "3bbi2ngca6ut6ctopog6pvtvpp",
    IDENTITY_POOL_ID: "us-east-1:ed5b4081-7529-42cf-b14d-8937a1e77130",
  },
};

const prod = {
  STRIPE_KEY:
    "pk_test_51HdyzhB7dJPV96N9YgSWTTujEJu9MwJiCGlEbEjrLJpHcAiUvh5ValInmdP1AzJlc9UcL98dWmYX4kOlXWLEWtsH00zHelb4Pn\n",
  s3: {
    REGION: "us-east-1",
    BUCKET: "prod-mana-notes-infra-s3-uploads4f6eb0fd-id2wrd5ncmr9",
  },
  apiGateway: {
    REGION: "us-east-1",
    URL: "https://api.mana-serverless-app.co.uk/prod",
  },
  cognito: {
    REGION: "us-east-1",
    USER_POOL_ID: "us-east-1_5sPbeNl0e",
    APP_CLIENT_ID: "7kbgdfumcbmjlucdvdfpo6g7dg",
    IDENTITY_POOL_ID: "us-east-1:234f93a8-1652-4d9b-9c44-4fa387a4be33",
  },
};

const config = process.env.REACT_APP_STAGE === "prod" ? prod : dev;

export default {
  MAX_ATTACHMENT_SIZE: 5000000,
  ...config,
};

// npm start and npm run build will default to the dev environment.
// set "REACT_APP_STAGE=prod" && npm start and set "REACT_APP_STAGE=prod" && npm run build will be prod environment.
